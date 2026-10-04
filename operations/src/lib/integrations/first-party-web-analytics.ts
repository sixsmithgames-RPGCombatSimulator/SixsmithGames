import "server-only";

import { and, eq, gte } from "drizzle-orm";

import { databaseIsConfigured, getDatabase } from "@/db/client";
import { CUSTOMERS, WEB_ANALYTICS_EVENTS } from "@/db/schema";
import {
  ANALYTICS_RANGES,
  type AnalyticsRange,
} from "@/lib/integrations/vercel-web-analytics";

const DAY_MS = 24 * 60 * 60 * 1000;

export interface FirstPartyDimensionRow {
  key: string;
  label: string;
  count: number;
  share: number;
}

export interface FirstPartyTrendPoint {
  date: string;
  pageviews: number;
  conversionClicks: number;
}

export interface ReadyFirstPartyAnalyticsSnapshot {
  state: "ready";
  sourceMode: "live" | "preview";
  range: AnalyticsRange;
  rangeLabel: string;
  checkedAt: string;
  dataThrough: string;
  retentionDays: number;
  totals: {
    pageviews: number;
    conversionClicks: number;
    consentedSessions: number;
    engagedPageExits: number;
    averageActiveSeconds: number | null;
    newAccounts: number;
  };
  previousTotals: {
    pageviews: number;
    conversionClicks: number;
    newAccounts: number;
  };
  fsg: {
    itchAttributedPageviews: number;
    productPageviews: number;
    launchClicks: number;
    pricingClicks: number;
    signInPrompts: number;
    newAccountsAllSources: number;
  };
  trend: FirstPartyTrendPoint[];
  routes: FirstPartyDimensionRow[];
  sources: FirstPartyDimensionRow[];
  events: FirstPartyDimensionRow[];
  countries: FirstPartyDimensionRow[];
  devices: FirstPartyDimensionRow[];
}

export interface UnavailableFirstPartyAnalyticsSnapshot {
  state: "unconfigured" | "error";
  range: AnalyticsRange;
  rangeLabel: string;
  checkedAt: string;
  message: string;
}

export type FirstPartyAnalyticsSnapshot =
  | ReadyFirstPartyAnalyticsSnapshot
  | UnavailableFirstPartyAnalyticsSnapshot;

interface AnalyticsEventRow {
  eventName: string;
  occurredAt: Date;
  path: string;
  sourceType: string;
  sourceDetail: string;
  utmSource: string | null;
  countryCode: string;
  deviceType: string;
  sessionId: string | null;
  productSlug: string | null;
  engagementSeconds: number | null;
}

function isConversionClick(eventName: string): boolean {
  return eventName.endsWith("_click") || eventName.endsWith("_clicked");
}

function sourceKey(row: AnalyticsEventRow): string {
  if (row.utmSource) return row.utmSource;
  if (row.sourceDetail && row.sourceDetail !== "unknown") return row.sourceDetail;
  return row.sourceType || "unknown";
}

function readableSource(key: string): string {
  if (key === "itchio" || key === "itch.io") return "itch.io";
  if (key === "direct") return "Direct";
  if (key === "fsg.sixsmithgames.com") return "Four Star General app";
  return key;
}

function readableEvent(key: string): string {
  return key.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function dimensionRows(
  keys: string[],
  label: (key: string) => string = (key) => key,
  limit = 10,
): FirstPartyDimensionRow[] {
  const counts = new Map<string, number>();
  for (const key of keys) counts.set(key, (counts.get(key) ?? 0) + 1);
  const total = keys.length;
  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, limit)
    .map(([key, count]) => ({ key, label: label(key), count, share: total > 0 ? count / total : 0 }));
}

function summarizePeriod(rows: AnalyticsEventRow[], registrations: number) {
  const pageviews = rows.filter((row) => row.eventName === "page_view");
  const clicks = rows.filter((row) => isConversionClick(row.eventName));
  const engagements = rows.filter(
    (row) => row.eventName === "page_engaged" && row.engagementSeconds !== null,
  );
  const totalActiveSeconds = engagements.reduce(
    (sum, row) => sum + (row.engagementSeconds ?? 0),
    0,
  );

  return {
    pageviews: pageviews.length,
    conversionClicks: clicks.length,
    consentedSessions: new Set(rows.flatMap((row) => row.sessionId ? [row.sessionId] : [])).size,
    engagedPageExits: engagements.length,
    averageActiveSeconds: engagements.length > 0
      ? Math.round(totalActiveSeconds / engagements.length)
      : null,
    newAccounts: registrations,
  };
}

function isItchAttributed(row: AnalyticsEventRow): boolean {
  return row.utmSource === "itchio"
    || row.sourceDetail === "itch.io"
    || row.sourceType === "game_marketplace";
}

function buildReadySnapshot(
  range: AnalyticsRange,
  sourceMode: "live" | "preview",
  currentRows: AnalyticsEventRow[],
  previousRows: AnalyticsEventRow[],
  currentRegistrations: number,
  previousRegistrations: number,
  since: number,
): ReadyFirstPartyAnalyticsSnapshot {
  const totals = summarizePeriod(currentRows, currentRegistrations);
  const previous = summarizePeriod(previousRows, previousRegistrations);
  const currentPageviews = currentRows.filter((row) => row.eventName === "page_view");
  const fsgRows = currentRows.filter((row) => row.productSlug === "fourstargeneral");
  const days = ANALYTICS_RANGES[range].days;
  const trend = Array.from({ length: days }, (_, index) => {
    const date = new Date(since + index * DAY_MS).toISOString().slice(0, 10);
    const dailyRows = currentRows.filter((row) => row.occurredAt.toISOString().slice(0, 10) === date);
    return {
      date,
      pageviews: dailyRows.filter((row) => row.eventName === "page_view").length,
      conversionClicks: dailyRows.filter((row) => isConversionClick(row.eventName)).length,
    };
  });
  const lastEventAt = currentRows.reduce<Date | null>(
    (latest, row) => !latest || row.occurredAt > latest ? row.occurredAt : latest,
    null,
  );

  return {
    state: "ready",
    sourceMode,
    range,
    rangeLabel: ANALYTICS_RANGES[range].label,
    checkedAt: new Date().toISOString(),
    dataThrough: (lastEventAt ?? new Date()).toISOString(),
    retentionDays: 120,
    totals,
    previousTotals: {
      pageviews: previous.pageviews,
      conversionClicks: previous.conversionClicks,
      newAccounts: previous.newAccounts,
    },
    fsg: {
      itchAttributedPageviews: currentPageviews.filter(isItchAttributed).length,
      productPageviews: currentPageviews.filter((row) => row.path === "/apps/fourstargeneral").length,
      launchClicks: fsgRows.filter((row) => row.eventName === "product_launch_click").length,
      pricingClicks: fsgRows.filter((row) => row.eventName === "product_pricing_click").length,
      signInPrompts: fsgRows.filter((row) => row.eventName === "product_sign_in_prompt_click").length,
      newAccountsAllSources: currentRegistrations,
    },
    trend,
    routes: dimensionRows(currentPageviews.map((row) => row.path), (key) => key === "/" ? "Home · /" : key, 12),
    sources: dimensionRows(currentPageviews.map(sourceKey), readableSource),
    events: dimensionRows(
      currentRows.filter((row) => isConversionClick(row.eventName)).map((row) => row.eventName),
      readableEvent,
      12,
    ),
    countries: dimensionRows(currentPageviews.map((row) => row.countryCode)),
    devices: dimensionRows(currentPageviews.map((row) => row.deviceType), readableEvent),
  };
}

/**
 * Purpose: Builds the Operations-owned website report without relying on a
 * paid Vercel analytics API.
 * Parameters: range selects a 7, 30, or 90 day current/comparison window.
 * Returns: Live aggregates or an explicit configuration/source error.
 * Side effects: Reads privacy-minimized events and customer creation dates.
 */
export async function getFirstPartyWebAnalyticsSnapshot(
  range: AnalyticsRange,
): Promise<FirstPartyAnalyticsSnapshot> {
  const checkedAt = new Date().toISOString();
  if (!databaseIsConfigured()) {
    return {
      state: "unconfigured",
      range,
      rangeLabel: ANALYTICS_RANGES[range].label,
      checkedAt,
      message: "DATABASE_URL is required for the first-party analytics ledger.",
    };
  }

  const end = Date.now();
  const currentSince = Date.UTC(
    new Date(end).getUTCFullYear(),
    new Date(end).getUTCMonth(),
    new Date(end).getUTCDate() - (ANALYTICS_RANGES[range].days - 1),
  );
  const previousSince = currentSince - ANALYTICS_RANGES[range].days * DAY_MS;
  const database = getDatabase();

  try {
    const [eventRows, customerRows] = await Promise.all([
      database
        .select({
          eventName: WEB_ANALYTICS_EVENTS.eventName,
          occurredAt: WEB_ANALYTICS_EVENTS.occurredAt,
          path: WEB_ANALYTICS_EVENTS.path,
          sourceType: WEB_ANALYTICS_EVENTS.sourceType,
          sourceDetail: WEB_ANALYTICS_EVENTS.sourceDetail,
          utmSource: WEB_ANALYTICS_EVENTS.utmSource,
          countryCode: WEB_ANALYTICS_EVENTS.countryCode,
          deviceType: WEB_ANALYTICS_EVENTS.deviceType,
          sessionId: WEB_ANALYTICS_EVENTS.sessionId,
          productSlug: WEB_ANALYTICS_EVENTS.productSlug,
          engagementSeconds: WEB_ANALYTICS_EVENTS.engagementSeconds,
        })
        .from(WEB_ANALYTICS_EVENTS)
        .where(and(
          eq(WEB_ANALYTICS_EVENTS.environment, "production"),
          gte(WEB_ANALYTICS_EVENTS.occurredAt, new Date(previousSince)),
        )),
      database
        .select({ createdAt: CUSTOMERS.createdAt })
        .from(CUSTOMERS)
        .where(gte(CUSTOMERS.createdAt, new Date(previousSince))),
    ]);

    const currentRows = eventRows.filter((row) => row.occurredAt.getTime() >= currentSince);
    const previousRows = eventRows.filter((row) => row.occurredAt.getTime() < currentSince);
    const currentRegistrations = customerRows.filter((row) => row.createdAt.getTime() >= currentSince).length;
    const previousRegistrations = customerRows.length - currentRegistrations;

    return buildReadySnapshot(
      range,
      "live",
      currentRows,
      previousRows,
      currentRegistrations,
      previousRegistrations,
      currentSince,
    );
  } catch (error) {
    console.error(JSON.stringify({
      level: "error",
      message: "first_party_analytics_query_failed",
      range,
      detail: error instanceof Error ? error.message : "unknown_error",
    }));
    return {
      state: "error",
      range,
      rangeLabel: ANALYTICS_RANGES[range].label,
      checkedAt,
      message: "The first-party analytics ledger could not be read. Apply the latest Operations migration and verify Neon access.",
    };
  }
}

/** Supplies labeled sample data for the local Operations preview. */
export function getPreviewFirstPartyWebAnalyticsSnapshot(
  range: AnalyticsRange,
): ReadyFirstPartyAnalyticsSnapshot {
  const now = new Date();
  const since = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - (ANALYTICS_RANGES[range].days - 1),
  );
  const sample = (offset: number, eventName: string, overrides: Partial<AnalyticsEventRow> = {}): AnalyticsEventRow => ({
    eventName,
    occurredAt: new Date(since + offset * DAY_MS + 12 * 60 * 60 * 1000),
    path: "/apps/fourstargeneral",
    sourceType: "game_marketplace",
    sourceDetail: "itch.io",
    utmSource: "itchio",
    countryCode: "US",
    deviceType: "desktop",
    sessionId: null,
    productSlug: eventName === "page_view" || eventName === "page_engaged" ? null : "fourstargeneral",
    engagementSeconds: eventName === "page_engaged" ? 46 : null,
    ...overrides,
  });
  const rows: AnalyticsEventRow[] = [];
  for (let index = 0; index < ANALYTICS_RANGES[range].days; index += 1) {
    rows.push(sample(index, "page_view"));
    if (index % 2 === 0) rows.push(sample(index, "product_launch_click"));
    if (index % 3 === 0) rows.push(sample(index, "page_engaged"));
    if (index % 5 === 0) rows.push(sample(index, "product_pricing_click"));
  }
  return buildReadySnapshot(range, "preview", rows, rows.slice(0, Math.max(1, Math.floor(rows.length * 0.8))), 4, 3, since);
}
