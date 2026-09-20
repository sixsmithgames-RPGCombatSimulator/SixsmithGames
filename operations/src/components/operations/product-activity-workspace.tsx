import Link from "next/link";
import {
  Activity,
  BadgeCheck,
  Clock3,
  DatabaseZap,
  RefreshCw,
  ShieldCheck,
  TriangleAlert,
  UsersRound,
} from "lucide-react";
import { synchronizeProductActivityAction } from "@/app/(operations)/product-activity/actions";
import { PageHeading } from "@/components/operations/ui";
import type {
  ProductActivityDisplayState,
  ProductActivityPortfolioSnapshot,
} from "@/lib/product-activity/types";
import styles from "./product-activity-workspace.module.css";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function formatDate(value: string | null): string {
  if (!value) return "No meaningful use yet";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function readableEvent(value: string): string {
  return value.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function stateLabel(state: ProductActivityDisplayState): string {
  return state.charAt(0).toUpperCase() + state.slice(1);
}

function stateIcon(state: ProductActivityDisplayState) {
  if (state === "fresh") return BadgeCheck;
  if (state === "stale") return Clock3;
  if (["rejected", "unavailable"].includes(state)) return TriangleAlert;
  return DatabaseZap;
}

/**
 * Purpose: Renders the authoritative portfolio activity projection independently from optional web analytics.
 * Parameters: snapshot contains normalized metrics and source states; syncResult labels the latest owner action.
 * Returns: Responsive portfolio cards, source-health evidence, activity timeline, rejections, and privacy boundary.
 * Side effects: The synchronization form invokes an owner-authorized Server Action in connected mode.
 */
export function ProductActivityWorkspace({
  snapshot,
  syncResult,
}: {
  snapshot: ProductActivityPortfolioSnapshot;
  syncResult: "complete" | "attention" | "not_available" | null;
}) {
  const canSynchronize = snapshot.mode === "connected" && !["disabled", "unconfigured"].includes(snapshot.ledgerState);
  return (
    <>
      <PageHeading
        eyebrow="Intelligence / Product activity"
        title="Product Activity"
        description="Source-authoritative customer use, owned objects, outcomes, and feed health"
        actions={
          <form action={synchronizeProductActivityAction}>
            <button className="button button-primary" disabled={!canSynchronize} type="submit">
              <RefreshCw aria-hidden size={16} />Synchronize sources
            </button>
          </form>
        }
      />

      {syncResult ? (
        <div className={`${styles.notice} ${syncResult === "complete" ? styles.noticeSuccess : styles.noticeAttention}`} role="status">
          {syncResult === "complete" ? "Source synchronization completed." : syncResult === "attention" ? "Synchronization completed with unavailable or rejected source records. Review source health below." : "Synchronization is unavailable until connected ingestion is enabled and configured."}
        </div>
      ) : null}

      <section className={styles.authorityBanner}>
        <span><ShieldCheck aria-hidden size={24} /></span>
        <div>
          <strong>Operational activity ledger</strong>
          <p>These records come from committed product behavior and explicit stable identities. They are not clicks, page views, or inferred browsing sessions.</p>
        </div>
        <div className={styles.bannerMeta}>
          <span className={`${styles.state} ${styles[`state${stateLabel(snapshot.ledgerState)}`]}`}>{stateLabel(snapshot.ledgerState)}</span>
          <small>Metric definitions v{snapshot.metricVersion}</small>
        </div>
      </section>

      {snapshot.message ? <div className={styles.message}>{snapshot.message}</div> : null}

      <section aria-label="Product activity summary" className={styles.metrics}>
        <article><span><UsersRound aria-hidden size={18} /></span><small>Daily active users</small><strong>{formatNumber(snapshot.summary.dau)}</strong><em>production customers only</em></article>
        <article><span><UsersRound aria-hidden size={18} /></span><small>Weekly active users</small><strong>{formatNumber(snapshot.summary.wau)}</strong><em>meaningful use · 7 days</em></article>
        <article><span><UsersRound aria-hidden size={18} /></span><small>Monthly active users</small><strong>{formatNumber(snapshot.summary.mau)}</strong><em>meaningful use · 30 days</em></article>
        <article><span><Clock3 aria-hidden size={18} /></span><small>Active time</small><strong>{formatDuration(snapshot.summary.activeSeconds30)}</strong><em>explicit product measurements</em></article>
        <article><span><Activity aria-hidden size={18} /></span><small>Usage sessions</small><strong>{formatNumber(snapshot.summary.sessions30)}</strong><em>product-defined · 30 days</em></article>
        <article><span><BadgeCheck aria-hidden size={18} /></span><small>Confirmed outcomes</small><strong>{formatNumber(snapshot.summary.completions30)}</strong><em>{formatNumber(snapshot.summary.internalEvents30)} internal events excluded</em></article>
      </section>

      <section className={styles.section}>
        <header><div><span className={styles.sectionIcon}><Activity aria-hidden size={19} /></span><div><h2>Product portfolio</h2><p>Customer-only production metrics; owner, test, and automation activity are excluded</p></div></div></header>
        {snapshot.products.length === 0 ? (
          <div className={styles.empty}><DatabaseZap aria-hidden size={28} /><strong>No product projections yet</strong><p>Source health below distinguishes a true zero from an unavailable or unconfigured feed.</p></div>
        ) : (
          <div className={styles.productGrid}>
            {snapshot.products.map((product) => {
              const Icon = stateIcon(product.sourceState);
              return (
                <article className={styles.productCard} key={product.slug}>
                  <header><div><strong>{product.name}</strong><small>{product.slug}</small></div><span className={`${styles.state} ${styles[`state${stateLabel(product.sourceState)}`]}`}><Icon aria-hidden size={14} />{stateLabel(product.sourceState)}</span></header>
                  <dl className={styles.productMetrics}>
                    <div><dt>DAU / WAU / MAU</dt><dd>{product.dau} / {product.wau} / {product.mau}</dd></div>
                    <div><dt>30-day return</dt><dd>{product.returnRate30}%</dd></div>
                    <div><dt>Sessions / outcomes</dt><dd>{product.sessions30} / {product.completions30}</dd></div>
                    <div><dt>Active time</dt><dd>{formatDuration(product.activeSeconds30)}</dd></div>
                    <div><dt>First use</dt><dd>{formatDate(product.firstUsedAt)}</dd></div>
                    <div><dt>Last meaningful use</dt><dd>{formatDate(product.lastUsedAt)}</dd></div>
                  </dl>
                  <div className={styles.adoption}><small>Feature adoption · 30 days</small>{product.topEvents.length > 0 ? <ul>{product.topEvents.map((event) => <li key={event.eventType}><span>{readableEvent(event.eventType)}</span><strong>{event.count}</strong></li>)}</ul> : <p>No cataloged events in range.</p>}</div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <header><div><span className={styles.sectionIcon}><DatabaseZap aria-hidden size={19} /></span><div><h2>Source health</h2><p>Freshness and failures remain separate from genuine zero activity</p></div></div><small>{snapshot.autoSyncEnabled ? "Auto-sync on open enabled" : "Manual synchronization"}</small></header>
        <div className={styles.tableWrap}>
          <table>
            <thead><tr><th>Source</th><th>State</th><th>Freshness</th><th>Accepted</th><th>Rejected</th><th>Evidence</th></tr></thead>
            <tbody>{snapshot.sources.map((source) => {
              const Icon = stateIcon(source.state);
              return <tr key={`${source.key}:${source.environment}`}><td><strong>{source.label}</strong><small>{source.environment} · {source.key}</small></td><td><span className={`${styles.state} ${styles[`state${stateLabel(source.state)}`]}`}><Icon aria-hidden size={14} />{stateLabel(source.state)}</span></td><td>{source.freshnessLabel}</td><td>{formatNumber(source.acceptedEvents)}</td><td>{formatNumber(source.rejectedRecords)}</td><td>{source.detail}</td></tr>;
            })}</tbody>
          </table>
        </div>
      </section>

      <div className={styles.bottomGrid}>
        <section className={styles.section}>
          <header><div><span className={styles.sectionIcon}><Activity aria-hidden size={19} /></span><div><h2>Activity timeline</h2><p>Authority, context, source, and outcome stay visible</p></div></div></header>
          <div className={styles.timeline}>{snapshot.recentEvents.length > 0 ? snapshot.recentEvents.map((event) => <article key={event.id}><i /><div><strong>{readableEvent(event.eventType)}</strong><p>{event.productName} · {event.aggregateType}</p><small>{event.authorityClass} · {event.usageContext} · {event.outcome} · {event.sourceKey}</small></div><time>{formatDate(event.occurredAt)}</time></article>) : <div className={styles.emptyCompact}>No normalized activity events yet.</div>}</div>
        </section>
        <section className={styles.section}>
          <header><div><span className={styles.sectionIcon}><TriangleAlert aria-hidden size={19} /></span><div><h2>Rejected records</h2><p>Failures are fingerprinted without retaining unsafe payloads</p></div></div></header>
          <div className={styles.rejections}>{snapshot.rejections.length > 0 ? snapshot.rejections.map((rejection) => <article key={rejection.id}><header><strong>{rejection.code}</strong><span>{rejection.sourceKey}</span></header><p>{rejection.summary}</p><small>{formatDate(rejection.rejectedAt)} · fingerprint {rejection.fingerprint}</small></article>) : <div className={styles.emptyCompact}>No rejected records.</div>}</div>
        </section>
      </div>

      <section className={styles.boundary}>
        <ShieldCheck aria-hidden size={21} />
        <div><strong>Privacy boundary</strong><p>Allowlisted owner-visible entity labels stay inside Operations. No campaign text, notes, chat, prompts, typed text, keystrokes, map contents, email addresses, or unrestricted JSON is accepted. Optional diagnostics remain consent-controlled in <Link href="/analytics">Analytics</Link>.</p></div>
      </section>
    </>
  );
}
