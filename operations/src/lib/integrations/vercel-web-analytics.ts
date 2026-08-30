import "server-only";

const VERCEL_API_ORIGIN = "https://api.vercel.com";
const CACHE_SECONDS = 15 * 60;
const CACHE_WINDOW_MS = CACHE_SECONDS * 1_000;
const REQUEST_TIMEOUT_MS = 10_000;
const DAY_MS = 24 * 60 * 60 * 1_000;
const PRODUCTION_FILTER = "environment eq 'production'";
const SIXSMITH_VERCEL_TEAM_ID = "team_MV7H5Yr78mJD46i3lMjAMjOc";
const SIXSMITH_WEBSITE_PROJECT_ID = "prj_4q3lkO9SwySPux5Br1TaLKbYv0eD";

export const ANALYTICS_RANGES = {
  "7d": { days: 7, label: "7 days" },
  "30d": { days: 30, label: "30 days" },
  "90d": { days: 90, label: "90 days" },
} as const;

export type AnalyticsRange = keyof typeof ANALYTICS_RANGES;

export interface AnalyticsTotals {
  pageviews: number;
  visitors: number;
}

export interface AnalyticsTrendPoint extends AnalyticsTotals {
  date: string;
}

export interface AnalyticsDimensionRow extends AnalyticsTotals {
  key: string;
  label: string;
  share: number;
}

interface AnalyticsSnapshotBase {
  range: AnalyticsRange;
  rangeLabel: string;
  projectName: string;
  dashboardUrl: string;
  checkedAt: string;
}

export interface ReadyAnalyticsSnapshot extends AnalyticsSnapshotBase {
  state: "ready";
  sourceMode: "live" | "preview";
  dataThrough: string;
  cacheSeconds: number;
  totals: AnalyticsTotals;
  previousTotals: AnalyticsTotals;
  trend: AnalyticsTrendPoint[];
  routes: AnalyticsDimensionRow[];
  referrers: AnalyticsDimensionRow[];
  countries: AnalyticsDimensionRow[];
  devices: AnalyticsDimensionRow[];
  operatingSystems: AnalyticsDimensionRow[];
  browsers: AnalyticsDimensionRow[];
  utmSourcesEnabled: boolean;
  utmSources: AnalyticsDimensionRow[];
  activeDays: number;
  customEvents: {
    enabled: boolean;
    total: number | null;
    visitors: number | null;
    events: AnalyticsDimensionRow[];
  };
}

export interface UnavailableAnalyticsSnapshot extends AnalyticsSnapshotBase {
  state: "unconfigured" | "error";
  message: string;
  missingKeys: string[];
}

export type AnalyticsSnapshot =
  | ReadyAnalyticsSnapshot
  | UnavailableAnalyticsSnapshot;

export interface AnalyticsConnectionCheck {
  state: "connected" | "unconfigured" | "error";
  projectName: string;
  dashboardUrl: string;
  message: string;
  missingKeys: string[];
  totals?: AnalyticsTotals;
}

interface VercelAnalyticsConfig {
  token: string;
  teamId: string;
  projectId: string;
  projectName: string;
  dashboardUrl: string;
  utmSourcesEnabled: boolean;
  customEventsEnabled: boolean;
}

interface QueryRange {
  since: number;
  until: number;
  previousSince: number;
  previousUntil: number;
}

class AnalyticsProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AnalyticsProviderError";
  }
}

/**
 * Purpose: Converts an untrusted query parameter into one supported reporting window.
 * Parameters: value is the optional `range` search parameter.
 * Returns: A bounded 7, 30, or 90 day range, defaulting to 30 days.
 * Side effects: None.
 */
export function resolveAnalyticsRange(value: string | string[] | undefined): AnalyticsRange {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && candidate in ANALYTICS_RANGES
    ? (candidate as AnalyticsRange)
    : "30d";
}

/**
 * Purpose: Reads the server-only Vercel reporting contract without exposing its bearer token.
 * Parameters: None; values come from the Operations runtime environment.
 * Returns: Either a complete connector configuration or the exact missing keys.
 * Side effects: None.
 */
function getVercelAnalyticsConfig():
  | { ok: true; config: VercelAnalyticsConfig }
  | { ok: false; missingKeys: string[]; projectName: string; dashboardUrl: string } {
  const teamId = process.env.VERCEL_ANALYTICS_TEAM_ID?.trim() || SIXSMITH_VERCEL_TEAM_ID;
  const projectId = process.env.VERCEL_ANALYTICS_PROJECT_ID?.trim() || SIXSMITH_WEBSITE_PROJECT_ID;
  const token = process.env.VERCEL_ANALYTICS_READ_TOKEN?.trim() ?? "";
  const projectName = process.env.VERCEL_ANALYTICS_PROJECT_NAME?.trim() || "sixsmithgames";
  const dashboardUrl =
    process.env.VERCEL_ANALYTICS_DASHBOARD_URL?.trim()
    || "https://vercel.com/sixsmithgames-rpgcombatsimulators-projects/sixsmithgames/analytics";
  const requiredValues = {
    VERCEL_ANALYTICS_PROJECT_ID: projectId,
    VERCEL_ANALYTICS_READ_TOKEN: token,
    VERCEL_ANALYTICS_TEAM_ID: teamId,
  };
  const missingKeys = Object.entries(requiredValues)
    .filter(([, value]) => value.length === 0)
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    return { ok: false, missingKeys, projectName, dashboardUrl };
  }

  return {
    ok: true,
    config: {
      token,
      teamId,
      projectId,
      projectName,
      dashboardUrl,
      utmSourcesEnabled:
        process.env.VERCEL_ANALYTICS_UTM_SOURCES_ENABLED === "true",
      customEventsEnabled:
        process.env.VERCEL_ANALYTICS_CUSTOM_EVENTS_ENABLED === "true",
    },
  };
}

/**
 * Purpose: Keeps all Operations analytics queries on a shared 15-minute cache boundary.
 * Parameters: range selects the current and comparison periods.
 * Returns: Millisecond timestamps for equal current and previous windows.
 * Side effects: Reads the current clock.
 */
function buildQueryRange(range: AnalyticsRange): QueryRange {
  const days = ANALYTICS_RANGES[range].days;
  const until = Math.floor(Date.now() / CACHE_WINDOW_MS) * CACHE_WINDOW_MS;
  const untilDate = new Date(until);
  const since = Date.UTC(
    untilDate.getUTCFullYear(),
    untilDate.getUTCMonth(),
    untilDate.getUTCDate() - (days - 1),
  );
  const previousUntil = since - 1;
  const previousSince = previousUntil - days * DAY_MS + 1;

  return { since, until, previousSince, previousUntil };
}

/**
 * Purpose: Builds one bounded Vercel Web Analytics aggregate or count URL.
 * Parameters: Dataset, mode, connector IDs, period, and optional dimensions.
 * Returns: An authenticated API URL without credentials in its query string.
 * Side effects: None.
 */
function buildQueryUrl(
  config: VercelAnalyticsConfig,
  dataset: "events" | "visits",
  mode: "aggregate" | "count",
  since: number,
  until: number,
  dimensions: string[] = [],
  limit = 10,
): string {
  const url = new URL(`/v1/query/web-analytics/${dataset}/${mode}`, VERCEL_API_ORIGIN);
  url.searchParams.set("teamId", config.teamId);
  url.searchParams.set("projectId", config.projectId);
  url.searchParams.set("since", String(since));
  url.searchParams.set("until", String(until));
  url.searchParams.set("filter", PRODUCTION_FILTER);

  if (mode === "aggregate") {
    dimensions.forEach((dimension) => url.searchParams.append("by", dimension));
    url.searchParams.set("limit", String(Math.min(Math.max(limit, 1), 100)));
  }

  return url.toString();
}

/**
 * Purpose: Executes one cached, read-only provider request with sanitized failures.
 * Parameters: URL, server-only token, and cache tag describe the aggregate query.
 * Returns: The parsed unknown response for shape-specific normalization.
 * Side effects: Calls Vercel's API; responses are cached for 15 minutes.
 */
async function queryVercel(url: string, token: string, cacheTag: string): Promise<unknown> {
  let response: Response;

  try {
    response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "force-cache",
      next: {
        revalidate: CACHE_SECONDS,
        tags: ["vercel-web-analytics", cacheTag],
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    throw new AnalyticsProviderError(
      "Vercel Web Analytics did not answer before the reporting timeout.",
    );
  }

  if (!response.ok) {
    const message =
      response.status === 401 || response.status === 403
        ? "The Vercel reporting token cannot read Web Analytics for this project."
        : response.status === 404
          ? "The configured Vercel project or its Web Analytics dataset was not found."
          : response.status === 429
            ? "Vercel temporarily rate-limited the analytics report."
            : `Vercel Web Analytics returned HTTP ${response.status}.`;
    throw new AnalyticsProviderError(message);
  }

  try {
    return await response.json();
  } catch {
    throw new AnalyticsProviderError(
      "Vercel returned an analytics response that Operations could not parse.",
    );
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readFiniteNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function readTotals(payload: unknown, dataset: "events" | "visits" = "visits"): AnalyticsTotals {
  const data = isRecord(payload) && isRecord(payload.data) ? payload.data : {};
  const primary = dataset === "events"
    ? readFiniteNumber(data.events) || readFiniteNumber(data.count)
    : readFiniteNumber(data.pageviews) || readFiniteNumber(data.count);

  return {
    pageviews: primary,
    visitors: readFiniteNumber(data.visitors),
  };
}

function readAggregateRows(payload: unknown): Record<string, unknown>[] {
  if (!isRecord(payload) || !Array.isArray(payload.data)) return [];
  return payload.data.filter(isRecord);
}

function readDimensionValue(row: Record<string, unknown>, dimension: string): string {
  const value = row[dimension] ?? row.key ?? row.dimension;
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : "(none)";
}

function titleCase(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDimensionLabel(dimension: string, value: string): string {
  if (value === "(none)") {
    return dimension === "referrerHostname" || dimension === "utmSource"
      ? "Direct / none"
      : "Unknown";
  }

  if (dimension === "requestPath") {
    return value === "/" ? "Home · /" : value;
  }

  if (dimension === "country" && /^[A-Za-z]{2}$/.test(value)) {
    try {
      return new Intl.DisplayNames(["en"], { type: "region" }).of(value.toUpperCase()) || value;
    } catch {
      return value.toUpperCase();
    }
  }

  return dimension === "referrerHostname" ? value : titleCase(value);
}

function normalizeDimension(
  payload: unknown,
  dimension: string,
  totalPageviews: number,
): AnalyticsDimensionRow[] {
  return readAggregateRows(payload).map((row) => {
    const key = readDimensionValue(row, dimension);
    const pageviews = readFiniteNumber(row.pageviews) || readFiniteNumber(row.count);
    return {
      key,
      label: formatDimensionLabel(dimension, key),
      pageviews,
      visitors: readFiniteNumber(row.visitors),
      share: totalPageviews > 0 ? pageviews / totalPageviews : 0,
    };
  });
}

function normalizeTrend(
  payload: unknown,
  range: AnalyticsRange,
  since: number,
): AnalyticsTrendPoint[] {
  const indexed = new Map(
    readAggregateRows(payload).map((row) => {
      const date = readDimensionValue(row, "day").slice(0, 10);
      return [
        date,
        {
          date,
          pageviews: readFiniteNumber(row.pageviews) || readFiniteNumber(row.count),
          visitors: readFiniteNumber(row.visitors),
        },
      ];
    }),
  );

  return Array.from({ length: ANALYTICS_RANGES[range].days }, (_, index) => {
    const date = new Date(since + index * DAY_MS).toISOString().slice(0, 10);
    return indexed.get(date) ?? { date, pageviews: 0, visitors: 0 };
  });
}

/**
 * Purpose: Queries the complete Phase 1 acquisition report from Vercel aggregates.
 * Parameters: range is the bounded reporting period.
 * Returns: A ready, unconfigured, or explicit provider-error snapshot.
 * Side effects: Performs cached read-only Vercel API requests and writes structured runtime logs.
 */
export async function getVercelWebAnalyticsSnapshot(
  range: AnalyticsRange,
): Promise<AnalyticsSnapshot> {
  const checkedAt = new Date().toISOString();
  const configuration = getVercelAnalyticsConfig();
  const rangeLabel = ANALYTICS_RANGES[range].label;

  if (!configuration.ok) {
    return {
      state: "unconfigured",
      range,
      rangeLabel,
      projectName: configuration.projectName,
      dashboardUrl: configuration.dashboardUrl,
      checkedAt,
      message: "Operations is ready to report Web Analytics, but its server-only read credential is incomplete.",
      missingKeys: configuration.missingKeys,
    };
  }

  const { config } = configuration;
  const queryRange = buildQueryRange(range);
  const startedAt = Date.now();
  console.log(JSON.stringify({
    level: "info",
    message: "vercel_web_analytics_query_started",
    provider: "vercel",
    projectId: config.projectId,
    range,
  }));

  const countUrl = buildQueryUrl(config, "visits", "count", queryRange.since, queryRange.until);
  const previousCountUrl = buildQueryUrl(
    config,
    "visits",
    "count",
    queryRange.previousSince,
    queryRange.previousUntil,
  );
  const aggregateUrl = (dimension: string, limit = 10) =>
    buildQueryUrl(
      config,
      "visits",
      "aggregate",
      queryRange.since,
      queryRange.until,
      [dimension],
      limit,
    );

  try {
    const queryPromises: Promise<unknown>[] = [
      queryVercel(countUrl, config.token, `${range}-current-count`),
      queryVercel(previousCountUrl, config.token, `${range}-previous-count`),
      queryVercel(aggregateUrl("day", ANALYTICS_RANGES[range].days), config.token, `${range}-day`),
      queryVercel(aggregateUrl("requestPath", 12), config.token, `${range}-routes`),
      queryVercel(aggregateUrl("referrerHostname", 10), config.token, `${range}-referrers`),
      queryVercel(aggregateUrl("country", 10), config.token, `${range}-countries`),
      queryVercel(aggregateUrl("deviceType", 10), config.token, `${range}-devices`),
      queryVercel(aggregateUrl("osName", 10), config.token, `${range}-operating-systems`),
      queryVercel(aggregateUrl("browserName", 10), config.token, `${range}-browsers`),
      config.utmSourcesEnabled
        ? queryVercel(aggregateUrl("utmSource", 10), config.token, `${range}-utm-sources`)
        : Promise.resolve({ data: [] }),
    ];

    if (config.customEventsEnabled) {
      queryPromises.push(
        queryVercel(
          buildQueryUrl(config, "events", "count", queryRange.since, queryRange.until),
          config.token,
          `${range}-event-count`,
        ),
        queryVercel(
          buildQueryUrl(
            config,
            "events",
            "aggregate",
            queryRange.since,
            queryRange.until,
            ["eventName"],
            20,
          ),
          config.token,
          `${range}-events`,
        ),
      );
    }

    const [
      currentPayload,
      previousPayload,
      trendPayload,
      routesPayload,
      referrersPayload,
      countriesPayload,
      devicesPayload,
      operatingSystemsPayload,
      browsersPayload,
      utmSourcesPayload,
      eventCountPayload,
      eventsPayload,
    ] = await Promise.all(queryPromises);
    const totals = readTotals(currentPayload);
    const trend = normalizeTrend(trendPayload, range, queryRange.since);
    const eventTotals = config.customEventsEnabled
      ? readTotals(eventCountPayload, "events")
      : null;

    console.log(JSON.stringify({
      level: "info",
      message: "vercel_web_analytics_query_completed",
      provider: "vercel",
      projectId: config.projectId,
      range,
      pageviews: totals.pageviews,
      visitors: totals.visitors,
      durationMs: Date.now() - startedAt,
    }));

    return {
      state: "ready",
      sourceMode: "live",
      range,
      rangeLabel,
      projectName: config.projectName,
      dashboardUrl: config.dashboardUrl,
      checkedAt,
      dataThrough: new Date(queryRange.until).toISOString(),
      cacheSeconds: CACHE_SECONDS,
      totals,
      previousTotals: readTotals(previousPayload),
      trend,
      routes: normalizeDimension(routesPayload, "requestPath", totals.pageviews),
      referrers: normalizeDimension(referrersPayload, "referrerHostname", totals.pageviews),
      countries: normalizeDimension(countriesPayload, "country", totals.pageviews),
      devices: normalizeDimension(devicesPayload, "deviceType", totals.pageviews),
      operatingSystems: normalizeDimension(operatingSystemsPayload, "osName", totals.pageviews),
      browsers: normalizeDimension(browsersPayload, "browserName", totals.pageviews),
      utmSourcesEnabled: config.utmSourcesEnabled,
      utmSources: normalizeDimension(utmSourcesPayload, "utmSource", totals.pageviews),
      activeDays: trend.filter((point) => point.pageviews > 0).length,
      customEvents: {
        enabled: config.customEventsEnabled,
        total: eventTotals?.pageviews ?? null,
        visitors: eventTotals?.visitors ?? null,
        events: config.customEventsEnabled
          ? normalizeDimension(eventsPayload, "eventName", eventTotals?.pageviews ?? 0)
          : [],
      },
    };
  } catch (error) {
    const message = error instanceof AnalyticsProviderError
      ? error.message
      : "Operations could not complete the Vercel Web Analytics report.";
    console.error(JSON.stringify({
      level: "error",
      message: "vercel_web_analytics_query_failed",
      provider: "vercel",
      projectId: config.projectId,
      range,
      detail: message,
      durationMs: Date.now() - startedAt,
    }));

    return {
      state: "error",
      range,
      rangeLabel,
      projectName: config.projectName,
      dashboardUrl: config.dashboardUrl,
      checkedAt,
      message,
      missingKeys: [],
    };
  }
}

/**
 * Purpose: Supplies a visibly labeled local review dataset through the production view model.
 * Parameters: range selects the number of generated daily observations.
 * Returns: A deterministic-shape preview snapshot that never claims to be live.
 * Side effects: Reads the current clock only to label relative dates.
 */
export function getPreviewWebAnalyticsSnapshot(range: AnalyticsRange): ReadyAnalyticsSnapshot {
  const days = ANALYTICS_RANGES[range].days;
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  const trend = Array.from({ length: days }, (_, index) => {
    const date = new Date(end.getTime() - (days - index - 1) * DAY_MS);
    const weekday = date.getUTCDay();
    const pageviews = 18 + ((index * 13) % 31) + (weekday === 0 || weekday === 6 ? 9 : 0);
    return {
      date: date.toISOString().slice(0, 10),
      pageviews,
      visitors: Math.max(9, Math.round(pageviews * 0.68)),
    };
  });
  const totals = trend.reduce(
    (sum, point) => ({
      pageviews: sum.pageviews + point.pageviews,
      visitors: sum.visitors + point.visitors,
    }),
    { pageviews: 0, visitors: 0 },
  );
  const dimension = (
    rows: Array<[string, string, number]>,
  ): AnalyticsDimensionRow[] => rows.map(([key, label, pageviews]) => ({
    key,
    label,
    pageviews,
    visitors: Math.round(pageviews * 0.7),
    share: pageviews / totals.pageviews,
  }));

  return {
    state: "ready",
    sourceMode: "preview",
    range,
    rangeLabel: ANALYTICS_RANGES[range].label,
    projectName: "sixsmithgames",
    dashboardUrl: "https://vercel.com/sixsmithgames-rpgcombatsimulators-projects/sixsmithgames/analytics",
    checkedAt: new Date().toISOString(),
    dataThrough: new Date().toISOString(),
    cacheSeconds: CACHE_SECONDS,
    totals,
    previousTotals: {
      pageviews: Math.round(totals.pageviews * 0.87),
      visitors: Math.round(totals.visitors * 0.91),
    },
    trend,
    routes: dimension([
      ["/", "Home · /", Math.round(totals.pageviews * 0.32)],
      ["/pricing", "/pricing", Math.round(totals.pageviews * 0.21)],
      ["/apps/gamemastercraft", "/apps/gamemastercraft", Math.round(totals.pageviews * 0.16)],
      ["/apps/virtual-combat-simulator", "/apps/virtual-combat-simulator", Math.round(totals.pageviews * 0.12)],
      ["/merch", "/merch", Math.round(totals.pageviews * 0.08)],
    ]),
    referrers: dimension([
      ["(none)", "Direct / none", Math.round(totals.pageviews * 0.44)],
      ["google.com", "google.com", Math.round(totals.pageviews * 0.29)],
      ["chatgpt.com", "chatgpt.com", Math.round(totals.pageviews * 0.12)],
      ["facebook.com", "facebook.com", Math.round(totals.pageviews * 0.08)],
    ]),
    countries: dimension([
      ["US", "United States", Math.round(totals.pageviews * 0.71)],
      ["CA", "Canada", Math.round(totals.pageviews * 0.11)],
      ["GB", "United Kingdom", Math.round(totals.pageviews * 0.08)],
      ["AU", "Australia", Math.round(totals.pageviews * 0.05)],
    ]),
    devices: dimension([
      ["desktop", "Desktop", Math.round(totals.pageviews * 0.59)],
      ["mobile", "Mobile", Math.round(totals.pageviews * 0.36)],
      ["tablet", "Tablet", Math.round(totals.pageviews * 0.05)],
    ]),
    operatingSystems: dimension([
      ["Windows", "Windows", Math.round(totals.pageviews * 0.45)],
      ["iOS", "iOS", Math.round(totals.pageviews * 0.22)],
      ["macOS", "MacOS", Math.round(totals.pageviews * 0.18)],
      ["Android", "Android", Math.round(totals.pageviews * 0.12)],
    ]),
    browsers: dimension([
      ["Chrome", "Chrome", Math.round(totals.pageviews * 0.61)],
      ["Safari", "Safari", Math.round(totals.pageviews * 0.24)],
      ["Firefox", "Firefox", Math.round(totals.pageviews * 0.09)],
      ["Edge", "Edge", Math.round(totals.pageviews * 0.06)],
    ]),
    utmSourcesEnabled: true,
    utmSources: dimension([
      ["(none)", "Direct / none", Math.round(totals.pageviews * 0.76)],
      ["youtube", "Youtube", Math.round(totals.pageviews * 0.11)],
      ["newsletter", "Newsletter", Math.round(totals.pageviews * 0.08)],
    ]),
    activeDays: trend.filter((point) => point.pageviews > 0).length,
    customEvents: {
      enabled: false,
      total: null,
      visitors: null,
      events: [],
    },
  };
}

/**
 * Purpose: Verifies the minimum Vercel aggregate-read capability for Settings.
 * Parameters: None; the connector reads its server-only environment contract.
 * Returns: Connected, unconfigured, or provider-error evidence without raw visit data.
 * Side effects: Performs one cached seven-day aggregate count request.
 */
export async function checkVercelWebAnalyticsConnection(): Promise<AnalyticsConnectionCheck> {
  const configuration = getVercelAnalyticsConfig();

  if (!configuration.ok) {
    return {
      state: "unconfigured",
      projectName: configuration.projectName,
      dashboardUrl: configuration.dashboardUrl,
      message: "The aggregate reporting connector is missing required server configuration.",
      missingKeys: configuration.missingKeys,
    };
  }

  const range = buildQueryRange("7d");
  const { config } = configuration;

  try {
    const payload = await queryVercel(
      buildQueryUrl(config, "visits", "count", range.since, range.until),
      config.token,
      "connection-check",
    );
    return {
      state: "connected",
      projectName: config.projectName,
      dashboardUrl: config.dashboardUrl,
      message: "Vercel accepted a production Web Analytics aggregate query.",
      missingKeys: [],
      totals: readTotals(payload),
    };
  } catch (error) {
    return {
      state: "error",
      projectName: config.projectName,
      dashboardUrl: config.dashboardUrl,
      message: error instanceof AnalyticsProviderError
        ? error.message
        : "The Vercel aggregate reporting capability check failed.",
      missingKeys: [],
    };
  }
}
