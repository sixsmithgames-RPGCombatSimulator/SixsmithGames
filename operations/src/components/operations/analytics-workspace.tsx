import Link from "next/link";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Clock3,
  ExternalLink,
  Eye,
  Gamepad2,
  Gauge,
  Globe2,
  Laptop2,
  Link2,
  MousePointerClick,
  Route,
  ShieldCheck,
  Timer,
  UserPlus,
  UsersRound,
} from "lucide-react";
import { PageHeading, StatusBadge } from "@/components/operations/ui";
import {
  ANALYTICS_RANGES,
  type AnalyticsDimensionRow,
  type AnalyticsSnapshot,
  type AnalyticsTotals,
  type ReadyAnalyticsSnapshot,
} from "@/lib/integrations/vercel-web-analytics";
import {
  type FirstPartyAnalyticsSnapshot,
  type FirstPartyDimensionRow,
  type ReadyFirstPartyAnalyticsSnapshot,
} from "@/lib/integrations/first-party-web-analytics";
import styles from "./analytics-workspace.module.css";

const NUMBER_FORMAT = new Intl.NumberFormat("en-US");
const PERCENT_FORMAT = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});
const DATE_TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/New_York",
});
const SHORT_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function formatNumber(value: number): string {
  return NUMBER_FORMAT.format(value);
}

function formatDateTime(value: string): string {
  return DATE_TIME_FORMAT.format(new Date(value));
}

function percentChange(current: number, previous: number): number | null {
  if (previous <= 0) return null;
  return (current - previous) / previous;
}

function Comparison({ current, previous }: { current: number; previous: number }) {
  const change = percentChange(current, previous);
  if (change === null) return <span className={styles.neutral}>No prior baseline</span>;

  const positive = change >= 0;
  const Icon = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={positive ? styles.positive : styles.negative}>
      <Icon aria-hidden size={14} />
      {PERCENT_FORMAT.format(Math.abs(change))} vs prior period
    </span>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  detail,
  comparison,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
  detail: string;
  comparison?: { current: number; previous: number };
}) {
  return (
    <article className={styles.metric}>
      <span className={styles.metricIcon}><Icon aria-hidden size={20} /></span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        {comparison ? <Comparison {...comparison} /> : <span className={styles.neutral}>Current period</span>}
        <p>{detail}</p>
      </div>
    </article>
  );
}

function RankingTable({
  rows,
  emptyLabel,
  labelHeading,
}: {
  rows: AnalyticsDimensionRow[];
  emptyLabel: string;
  labelHeading: string;
}) {
  if (rows.length === 0) {
    return <p className={styles.emptyList}>{emptyLabel}</p>;
  }

  return (
    <div className={styles.tableScroll}>
      <table className={styles.rankingTable}>
        <thead>
          <tr><th>{labelHeading}</th><th>Visitors</th><th>Views</th><th>Share</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td><strong>{row.label}</strong><span><i style={{ width: `${Math.min(row.share * 100, 100)}%` }} /></span></td>
              <td>{formatNumber(row.visitors)}</td>
              <td>{formatNumber(row.pageviews)}</td>
              <td>{PERCENT_FORMAT.format(row.share)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FirstPartyRankingTable({
  rows,
  emptyLabel,
  labelHeading,
}: {
  rows: FirstPartyDimensionRow[];
  emptyLabel: string;
  labelHeading: string;
}) {
  if (rows.length === 0) return <p className={styles.emptyList}>{emptyLabel}</p>;

  return (
    <div className={styles.tableScroll}>
      <table className={styles.rankingTable}>
        <thead><tr><th>{labelHeading}</th><th>Count</th><th>Share</th></tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td><strong>{row.label}</strong><span><i style={{ width: `${Math.min(row.share * 100, 100)}%` }} /></span></td>
              <td>{formatNumber(row.count)}</td>
              <td>{PERCENT_FORMAT.format(row.share)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDuration(seconds: number | null): string {
  if (seconds === null) return "—";
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function FirstPartyTrendChart({ snapshot }: { snapshot: ReadyFirstPartyAnalyticsSnapshot }) {
  const maximum = Math.max(...snapshot.trend.map((point) => Math.max(point.pageviews, point.conversionClicks)), 1);
  const middleIndex = Math.floor((snapshot.trend.length - 1) / 2);

  return (
    <div className={styles.trendChart}>
      <div className={styles.chartLegend}>
        <span><i className={styles.viewsKey} /> Page views</span>
        <span><i className={styles.visitorsKey} /> Conversion clicks</span>
      </div>
      <div
        aria-label={`Daily first-party page views and conversion clicks for the last ${snapshot.rangeLabel}`}
        className={styles.plot}
        role="img"
      >
        {snapshot.trend.map((point, index) => (
          <span className={styles.dayColumn} key={point.date} title={`${point.date}: ${point.pageviews} views, ${point.conversionClicks} conversion clicks`}>
            <i className={styles.dayViews} style={{ height: `${Math.max(2, (point.pageviews / maximum) * 100)}%` }} />
            <i className={styles.dayVisitors} style={{ height: `${Math.max(2, (point.conversionClicks / maximum) * 100)}%` }} />
            {index === 0 || index === middleIndex || index === snapshot.trend.length - 1 ? (
              <small>{SHORT_DATE_FORMAT.format(new Date(`${point.date}T00:00:00Z`))}</small>
            ) : null}
          </span>
        ))}
      </div>
      <ul className="sr-only">
        {snapshot.trend.map((point) => (
          <li key={point.date}>{point.date}: {point.pageviews} page views and {point.conversionClicks} conversion clicks</li>
        ))}
      </ul>
    </div>
  );
}

function FirstPartyUnavailable({ snapshot }: { snapshot: Exclude<FirstPartyAnalyticsSnapshot, ReadyFirstPartyAnalyticsSnapshot> }) {
  return (
    <section className={styles.unavailable}>
      <span className={styles.unavailableIcon}><Activity aria-hidden size={27} /></span>
      <div>
        <span className={styles.kicker}>Operations first-party analytics</span>
        <h2>The aggregate ledger is not available yet</h2>
        <p>{snapshot.message}</p>
        <p className={styles.truthNote}>No sample traffic or false zero is substituted for this source.</p>
      </div>
    </section>
  );
}

function FirstPartyReport({ snapshot }: { snapshot: ReadyFirstPartyAnalyticsSnapshot }) {
  const fsgLaunchRate = snapshot.fsg.productPageviews > 0
    ? snapshot.fsg.launchClicks / snapshot.fsg.productPageviews
    : null;

  return (
    <>
      <section className={styles.sourceStrip}>
        <span className={styles.liveMark}><ShieldCheck aria-hidden size={20} /></span>
        <div><small>Primary collection</small><strong>Cookieless aggregate measurement</strong></div>
        <span><Clock3 aria-hidden size={15} /> Through {formatDateTime(snapshot.dataThrough)}</span>
        <span><Gauge aria-hidden size={15} /> {snapshot.retentionDays}-day retention</span>
        <span><ShieldCheck aria-hidden size={15} /> No IP, email, or raw user agent stored</span>
      </section>

      <section aria-label="First-party analytics summary" className={styles.metricGrid}>
        <Metric
          icon={Eye}
          label="Public page views"
          value={formatNumber(snapshot.totals.pageviews)}
          detail="First-party events with redacted paths and no anonymous visitor ID"
          comparison={{ current: snapshot.totals.pageviews, previous: snapshot.previousTotals.pageviews }}
        />
        <Metric
          icon={MousePointerClick}
          label="Conversion clicks"
          value={formatNumber(snapshot.totals.conversionClicks)}
          detail="Allowlisted launch, pricing, sign-in, and other cataloged CTA actions"
          comparison={{ current: snapshot.totals.conversionClicks, previous: snapshot.previousTotals.conversionClicks }}
        />
        <Metric
          icon={Timer}
          label="Average active time"
          value={formatDuration(snapshot.totals.averageActiveSeconds)}
          detail={`${formatNumber(snapshot.totals.engagedPageExits)} page exits reported visible active time`}
        />
        <Metric
          icon={UserPlus}
          label="New customer records"
          value={formatNumber(snapshot.totals.newAccounts)}
          detail="All-source Operations customer records; not attributed to an anonymous visit"
          comparison={{ current: snapshot.totals.newAccounts, previous: snapshot.previousTotals.newAccounts }}
        />
      </section>

      <section className={styles.trendPanel}>
        <header className={styles.panelHeader}>
          <div><span className={styles.sectionIcon}><BarChart3 aria-hidden size={18} /></span><div><h2>First-party trend</h2><p>Daily public-page views and allowlisted conversion actions</p></div></div>
          <strong>{formatNumber(snapshot.totals.pageviews)} total views</strong>
        </header>
        <FirstPartyTrendChart snapshot={snapshot} />
      </section>

      <section className={styles.funnelPanel}>
        <header className={styles.panelHeader}>
          <div><span className={styles.sectionIcon}><Gamepad2 aria-hidden size={18} /></span><div><h2>Four Star General acquisition and conversion</h2><p>itch.io → FSG → product page, play, pricing, and sign-in evidence</p></div></div>
          <strong>{fsgLaunchRate === null ? "No product-page baseline" : `${PERCENT_FORMAT.format(fsgLaunchRate)} page-to-play rate`}</strong>
        </header>
        <div className={styles.funnelGrid}>
          <article><span>1</span><small>itch.io-attributed views</small><strong>{formatNumber(snapshot.fsg.itchAttributedPageviews)}</strong></article>
          <article><span>2</span><small>FSG product-page views</small><strong>{formatNumber(snapshot.fsg.productPageviews)}</strong></article>
          <article><span>3</span><small>Play clicks</small><strong>{formatNumber(snapshot.fsg.launchClicks)}</strong></article>
          <article><span>4</span><small>Pricing clicks</small><strong>{formatNumber(snapshot.fsg.pricingClicks)}</strong></article>
          <article><span>5</span><small>Sign-in prompts</small><strong>{formatNumber(snapshot.fsg.signInPrompts)}</strong></article>
          <article><span>6</span><small>New customer records, all sources</small><strong>{formatNumber(snapshot.fsg.newAccountsAllSources)}</strong></article>
        </div>
        <footer>
          Anonymous steps are aggregate period totals, not a person-level path. Consented session IDs are random and session-scoped; {formatNumber(snapshot.totals.consentedSessions)} were observed in this period.
        </footer>
      </section>

      <div className={styles.twoColumn}>
        <section className={styles.panel}>
          <header className={styles.panelHeader}><div><span className={styles.sectionIcon}><Link2 aria-hidden size={18} /></span><div><h2>Acquisition sources</h2><p>UTM source first, then privacy-safe referrer category</p></div></div></header>
          <FirstPartyRankingTable rows={snapshot.sources} labelHeading="Source" emptyLabel="No source evidence is available yet." />
        </section>
        <section className={styles.panel}>
          <header className={styles.panelHeader}><div><span className={styles.sectionIcon}><MousePointerClick aria-hidden size={18} /></span><div><h2>Conversion actions</h2><p>Allowlisted semantic clicks across public pages</p></div></div></header>
          <FirstPartyRankingTable rows={snapshot.events} labelHeading="Action" emptyLabel="No conversion actions are available yet." />
        </section>
      </div>

      <div className={styles.twoColumn}>
        <section className={styles.panel}>
          <header className={styles.panelHeader}><div><span className={styles.sectionIcon}><Route aria-hidden size={18} /></span><div><h2>First-party routes</h2><p>Public paths with queries and fragments removed</p></div></div></header>
          <FirstPartyRankingTable rows={snapshot.routes} labelHeading="Route" emptyLabel="No route evidence is available yet." />
        </section>
        <section className={styles.boundaryPanel}>
          <header><ShieldCheck aria-hidden size={21} /><div><h2>Measurement boundary</h2><p>Maximum useful evidence before optional consent</p></div></header>
          <div className={styles.boundaryColumns}>
            <div><strong>Reported now</strong><ul><li>Visit timestamp and public route</li><li>itch.io and campaign attribution</li><li>Allowlisted CTA clicks</li><li>Visible active time per page exit</li><li>Country and device category</li></ul></div>
            <div><strong>Not claimed</strong><ul><li>Anonymous unique visitors</li><li>Anonymous cross-page journeys</li><li>Anonymous people or accounts</li><li>Private product content</li><li>Account attribution without consent</li></ul></div>
          </div>
          <footer><Activity aria-hidden size={16} />PostHog remains deferred. This ledger is provider-independent and Operations-owned.</footer>
        </section>
      </div>
    </>
  );
}

function Breakdown({
  title,
  icon: Icon,
  rows,
}: {
  title: string;
  icon: typeof Globe2;
  rows: AnalyticsDimensionRow[];
}) {
  return (
    <section className={styles.breakdownCard}>
      <header><Icon aria-hidden size={18} /><h3>{title}</h3></header>
      <div className={styles.breakdownRows}>
        {rows.slice(0, 5).map((row) => (
          <div key={row.key}>
            <span><strong>{row.label}</strong><small>{formatNumber(row.visitors)} visitors</small></span>
            <span className={styles.breakdownValue}>{PERCENT_FORMAT.format(row.share)}</span>
            <i><b style={{ width: `${Math.min(row.share * 100, 100)}%` }} /></i>
          </div>
        ))}
        {rows.length === 0 ? <p className={styles.emptyList}>No breakdown is available yet.</p> : null}
      </div>
    </section>
  );
}

function TrendChart({ snapshot }: { snapshot: ReadyAnalyticsSnapshot }) {
  const maximum = Math.max(...snapshot.trend.map((point) => point.pageviews), 1);
  const middleIndex = Math.floor((snapshot.trend.length - 1) / 2);

  return (
    <div className={styles.trendChart}>
      <div className={styles.chartLegend}>
        <span><i className={styles.viewsKey} /> Page views</span>
        <span><i className={styles.visitorsKey} /> Visitors</span>
      </div>
      <div
        aria-label={`Daily visitors and page views for the last ${snapshot.rangeLabel}`}
        className={styles.plot}
        role="img"
      >
        {snapshot.trend.map((point, index) => (
          <span className={styles.dayColumn} key={point.date} title={`${point.date}: ${point.pageviews} views, ${point.visitors} visitors`}>
            <i className={styles.dayViews} style={{ height: `${Math.max(2, (point.pageviews / maximum) * 100)}%` }} />
            <i className={styles.dayVisitors} style={{ height: `${Math.max(2, (point.visitors / maximum) * 100)}%` }} />
            {index === 0 || index === middleIndex || index === snapshot.trend.length - 1 ? (
              <small>{SHORT_DATE_FORMAT.format(new Date(`${point.date}T00:00:00Z`))}</small>
            ) : null}
          </span>
        ))}
      </div>
      <ul className="sr-only">
        {snapshot.trend.map((point) => (
          <li key={point.date}>{point.date}: {point.pageviews} page views and {point.visitors} visitors</li>
        ))}
      </ul>
    </div>
  );
}

function EmptyAnalytics({ snapshot }: { snapshot: ReadyAnalyticsSnapshot }) {
  return (
    <section className={styles.collectionState}>
      <span><Activity aria-hidden size={28} /></span>
      <div>
        <small>Collector connected</small>
        <h2>Waiting for the first production visit</h2>
        <p>
          Operations reached Vercel successfully, but the selected period contains no page views.
          This is a real zero from the source—not a missing-credential fallback.
        </p>
      </div>
      <Link href={snapshot.dashboardUrl} target="_blank" rel="noreferrer">
        Open Vercel Analytics <ExternalLink aria-hidden size={14} />
      </Link>
    </section>
  );
}

function UnavailableAnalytics({ snapshot }: { snapshot: Exclude<AnalyticsSnapshot, ReadyAnalyticsSnapshot> }) {
  const isConfiguration = snapshot.state === "unconfigured";
  return (
    <section className={styles.unavailable}>
      <span className={styles.unavailableIcon}>{isConfiguration ? <Gauge aria-hidden size={27} /> : <Activity aria-hidden size={27} />}</span>
      <div>
        <span className={styles.kicker}>Secondary source · Vercel Web Analytics · {snapshot.projectName}</span>
        <h2>{isConfiguration ? "Connect the aggregate reporting credential" : "The Vercel cross-check could not be refreshed"}</h2>
        <p>{snapshot.message}</p>
        {snapshot.missingKeys.length > 0 ? (
          <div className={styles.requirements}>
            {snapshot.missingKeys.map((key) => <code key={key}>{key}</code>)}
          </div>
        ) : null}
        <p className={styles.truthNote}>The Operations-owned report above remains independent of this provider state.</p>
      </div>
      <Link href={snapshot.dashboardUrl} target="_blank" rel="noreferrer">
        Open Vercel project <ExternalLink aria-hidden size={14} />
      </Link>
    </section>
  );
}

function viewsPerVisitor(totals: AnalyticsTotals): string {
  return totals.visitors > 0 ? (totals.pageviews / totals.visitors).toFixed(2) : "—";
}

/**
 * Purpose: Renders the first-class Phase 1 acquisition and collection-health workspace.
 * Parameters: snapshot is the authorized server-normalized Vercel aggregate report.
 * Returns: Connected analytics, an honest empty state, or an actionable provider state.
 * Side effects: None.
 */
export function AnalyticsWorkspace({
  snapshot,
  firstPartySnapshot,
}: {
  snapshot: AnalyticsSnapshot;
  firstPartySnapshot: FirstPartyAnalyticsSnapshot;
}) {
  const firstPartyReady = firstPartySnapshot.state === "ready";
  const range = firstPartySnapshot.range;
  return (
    <>
      <PageHeading
        eyebrow="Acquisition intelligence"
        title="Analytics"
        description="First-party traffic, active time, acquisition sources, conversion actions, customer records, and provider health"
        actions={
          <div className={styles.headingActions}>
            <StatusBadge tone={firstPartyReady ? (firstPartySnapshot.sourceMode === "live" ? "green" : "purple") : "red"}>
              {firstPartyReady
                ? firstPartySnapshot.sourceMode === "live" ? "First-party ledger live" : "Preview sample"
                : "Ledger unavailable"}
            </StatusBadge>
            <nav aria-label="Analytics date range" className={styles.rangePicker}>
              {Object.entries(ANALYTICS_RANGES).map(([key, definition]) => (
                <Link
                  aria-current={range === key ? "page" : undefined}
                  className={range === key ? styles.activeRange : undefined}
                  href={`/analytics?range=${key}`}
                  key={key}
                >
                  {definition.label}
                </Link>
              ))}
            </nav>
          </div>
        }
      />

      {firstPartySnapshot.state === "ready"
        ? <FirstPartyReport snapshot={firstPartySnapshot} />
        : <FirstPartyUnavailable snapshot={firstPartySnapshot} />}

      <div className={styles.providerHeading}>
        <div><span>Secondary provider cross-check</span><h2>Vercel Web Analytics</h2></div>
        <p>Visitor estimates and browser/OS aggregates when the current Vercel plan exposes its reporting API.</p>
      </div>

      {snapshot.state !== "ready" ? <UnavailableAnalytics snapshot={snapshot} /> : (
        <>
          <section className={styles.sourceStrip}>
            <span className={styles.liveMark}><ShieldCheck aria-hidden size={20} /></span>
            <div><small>Secondary source</small><strong>Vercel aggregate cross-check</strong></div>
            <span><Clock3 aria-hidden size={15} /> Through {formatDateTime(snapshot.dataThrough)}</span>
            <span><Gauge aria-hidden size={15} /> Refreshes every {snapshot.cacheSeconds / 60} minutes</span>
            <Link href={snapshot.dashboardUrl} target="_blank" rel="noreferrer">Source dashboard <ExternalLink aria-hidden size={13} /></Link>
          </section>

          {snapshot.totals.pageviews === 0 ? <EmptyAnalytics snapshot={snapshot} /> : (
            <>
          <section aria-label="Analytics summary" className={styles.metricGrid}>
            <Metric
              icon={UsersRound}
              label="Anonymous visitors"
              value={formatNumber(snapshot.totals.visitors)}
              detail={`Unique within Vercel's daily privacy boundary · ${snapshot.rangeLabel}`}
              comparison={{ current: snapshot.totals.visitors, previous: snapshot.previousTotals.visitors }}
            />
            <Metric
              icon={Eye}
              label="Page views"
              value={formatNumber(snapshot.totals.pageviews)}
              detail="Public routes only · queries and fragments removed"
              comparison={{ current: snapshot.totals.pageviews, previous: snapshot.previousTotals.pageviews }}
            />
            <Metric
              icon={Route}
              label="Views per visitor"
              value={viewsPerVisitor(snapshot.totals)}
              detail="Directional engagement, not session duration"
            />
            <Metric
              icon={CalendarDays}
              label="Active days"
              value={`${snapshot.activeDays} / ${ANALYTICS_RANGES[snapshot.range].days}`}
              detail="Days with at least one production page view"
            />
          </section>

          <section className={styles.trendPanel}>
            <header className={styles.panelHeader}>
              <div><span className={styles.sectionIcon}><BarChart3 aria-hidden size={18} /></span><div><h2>Traffic trend</h2><p>Daily production visitors and redacted public-page views</p></div></div>
              <strong>{formatNumber(snapshot.totals.pageviews)} total views</strong>
            </header>
            <TrendChart snapshot={snapshot} />
          </section>

          <div className={styles.twoColumn}>
            <section className={styles.panel}>
              <header className={styles.panelHeader}><div><span className={styles.sectionIcon}><Route aria-hidden size={18} /></span><div><h2>Top routes</h2><p>Where attention lands on the public site</p></div></div></header>
              <RankingTable rows={snapshot.routes} labelHeading="Route" emptyLabel="No route data is available yet." />
            </section>
            <section className={styles.panel}>
              <header className={styles.panelHeader}><div><span className={styles.sectionIcon}><Link2 aria-hidden size={18} /></span><div><h2>Acquisition sources</h2><p>Referring hostname supplied by the visitor’s browser</p></div></div></header>
              <RankingTable rows={snapshot.referrers} labelHeading="Referrer" emptyLabel="No referrer data is available yet." />
            </section>
          </div>

          <div className={styles.breakdownGrid}>
            <Breakdown title="Countries" icon={Globe2} rows={snapshot.countries} />
            <Breakdown title="Devices" icon={Laptop2} rows={snapshot.devices} />
            <Breakdown title="Operating systems" icon={Gauge} rows={snapshot.operatingSystems} />
            <Breakdown title="Browsers" icon={Gauge} rows={snapshot.browsers} />
          </div>

          <div className={styles.twoColumnBottom}>
            <section className={styles.panel}>
              <header className={styles.panelHeader}><div><span className={styles.sectionIcon}><MousePointerClick aria-hidden size={18} /></span><div><h2>Campaign source tags</h2><p>{snapshot.utmSourcesEnabled ? "Allowlisted `utm_source` values when present" : "Requires Vercel Web Analytics Plus or Enterprise"}</p></div></div></header>
              <RankingTable
                rows={snapshot.utmSources}
                labelHeading="UTM source"
                emptyLabel={snapshot.utmSourcesEnabled
                  ? "No UTM source data is available yet."
                  : "UTM source reporting is disabled on the current Vercel plan."}
              />
            </section>
            <section className={styles.boundaryPanel}>
              <header><ShieldCheck aria-hidden size={21} /><div><h2>Phase 1 measurement boundary</h2><p>Maximum useful anonymous evidence before optional consent</p></div></header>
              <div className={styles.boundaryColumns}>
                <div><strong>Reported now</strong><ul><li>Visit time and daily trend</li><li>Redacted public routes</li><li>Referrers{snapshot.utmSourcesEnabled ? " and UTM source" : ""}</li><li>Country, device, OS/browser aggregates</li></ul></div>
                <div><strong>Not claimed yet</strong><ul><li>Persistent person identity</li><li>Cross-day user history</li><li>Reliable active duration</li><li>Private product content</li></ul></div>
              </div>
              <footer>
                <Activity aria-hidden size={16} />
                {snapshot.customEvents.enabled
                  ? `${formatNumber(snapshot.customEvents.total ?? 0)} allowlisted semantic events are included.`
                  : "Semantic click events remain cost-gated until Vercel custom events are explicitly approved."}
              </footer>
            </section>
          </div>
            </>
          )}
        </>
      )}
    </>
  );
}
