"use client";

import { Check, RefreshCw, Search, ShieldAlert, X } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  ReconciliationData,
  ReconciliationItem,
  Tone,
} from "@/data/operations-types";
import { MetricCard, Sparkline, StatusBadge } from "@/components/operations/ui";

const IMPACT_TONES: Record<ReconciliationItem["impact"], Tone> = {
  High: "red",
  Medium: "orange",
  Low: "blue",
};

/**
 * Purpose: Renders the review-first reconciliation queue with inspectable source evidence.
 * Parameters: data is the authorized reconciliation snapshot for the current run.
 * Returns: Metrics, filters, discrepancy evidence, and guarded proposal controls.
 * Side effects: Maintains local selection and preview-only approval-request state; never mutates a source.
 */
export function ReconciliationWorkspace({
  data,
}: {
  data: ReconciliationData;
}) {
  const [query, setQuery] = useState("");
  const [impact, setImpact] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(
    data.items[0]?.id ?? null,
  );
  const [approvalRequestedFor, setApprovalRequestedFor] = useState<string | null>(
    null,
  );
  const normalizedQuery = query.trim().toLowerCase();
  const filteredItems = useMemo(
    () =>
      data.items.filter((item) => {
        const matchesImpact = impact === "All" || item.impact === impact;
        const searchable =
          `${item.customer} ${item.email} ${item.plan} ${item.conflictType}`.toLowerCase();
        return (
          matchesImpact &&
          (normalizedQuery.length === 0 || searchable.includes(normalizedQuery))
        );
      }),
    [data.items, impact, normalizedQuery],
  );
  const selectedItem =
    data.items.find((item) => item.id === selectedId) ?? null;

  return (
    <>
      <section
        aria-label="Reconciliation metrics"
        className="metric-grid six-up"
      >
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <nav aria-label="Reconciliation sections" className="tabs">
        <a className="is-active" href="#overview">Overview</a>
        <a href="#discrepancies">Discrepancies <span>1,021</span></a>
        <a href="#events">Events</a>
        <a href="#webhooks">Webhooks</a>
        <a href="#logs">Logs</a>
      </nav>

      <section className="panel reconciliation-table-panel" id="discrepancies">
        <div className="toolbar">
          <label className="search-field">
            <Search aria-hidden size={18} />
            <span className="sr-only">Search discrepancies</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search customers or subscriptions…"
              value={query}
            />
          </label>
          <label className="select-field">
            <span>Impact</span>
            <select
              onChange={(event) => setImpact(event.target.value)}
              value={impact}
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </label>
          <label className="select-field">
            <span>Conflict type</span>
            <select defaultValue="All">
              <option>All</option>
              {data.conflicts.map((conflict) => (
                <option key={conflict.label}>{conflict.label}</option>
              ))}
            </select>
          </label>
          <button className="button button-secondary" type="button">
            <RefreshCw aria-hidden size={16} />
            Filters
          </button>
        </div>
        <div className="table-scroll">
          <table className="data-table reconciliation-table">
            <thead>
              <tr>
                <th><span className="sr-only">Select</span></th>
                <th>Customer</th>
                <th>Plan</th>
                <th>Stripe status</th>
                <th>Clerk status</th>
                <th>Product access</th>
                <th>Conflict type</th>
                <th>Impact</th>
                <th>Recommended action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  className={item.id === selectedId ? "is-selected" : ""}
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                >
                  <td>
                    <button
                      aria-label={`Inspect ${item.customer}`}
                      className={item.id === selectedId ? "row-selector is-selected" : "row-selector"}
                      onClick={() => setSelectedId(item.id)}
                      type="button"
                    >
                      {item.id === selectedId ? <Check aria-hidden size={12} /> : null}
                    </button>
                  </td>
                  <td><span className="customer-name"><span className="avatar">{item.initials}</span><span><strong>{item.customer}</strong><small>{item.email}</small></span></span></td>
                  <td><strong>{item.plan}</strong><small>{item.price}</small></td>
                  <td><span className={item.stripeStatus === "Active" ? "source-status good" : "source-status bad"}>{item.stripeStatus}</span></td>
                  <td><span className={item.clerkStatus === "Active" ? "source-status good" : "source-status bad"}>{item.clerkStatus}</span></td>
                  <td><span className={item.productAccess === "Full Access" ? "source-status good" : "source-status bad"}>{item.productAccess}</span></td>
                  <td><strong>{item.conflictType}</strong><small>{item.conflictDetail}</small></td>
                  <td><StatusBadge tone={IMPACT_TONES[item.impact]}>{item.impact}</StatusBadge></td>
                  <td><button className="text-button danger" onClick={() => setSelectedId(item.id)} type="button">{item.recommendedAction}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="table-footer"><span>1–{filteredItems.length} of 1,021 discrepancies</span><span>25 rows per page</span></footer>
      </section>

      <div className="reconciliation-summary-grid" id="overview">
        <section className="panel">
          <header className="panel-header"><div><h2>Discrepancy trend</h2><p>Last 30 days</p></div></header>
          <Sparkline label="Discrepancy count over 30 days" values={data.trend} />
        </section>
        <section className="panel">
          <header className="panel-header"><div><h2>By conflict type</h2><p>Open discrepancy composition</p></div></header>
          <div className="summary-list compact">{data.conflicts.map((item) => <div key={item.label}><i className={item.tone} /><span>{item.label}</span><strong>{item.count}</strong><small>{item.share}</small></div>)}</div>
        </section>
        <section className="panel">
          <header className="panel-header"><div><h2>By impact</h2><p>Prioritized by customer effect</p></div></header>
          <div className="impact-bars">{data.impact.map((item) => <div key={item.label}><StatusBadge tone={item.tone}>{item.label}</StatusBadge><i><b className={`tone-${item.tone}`} style={{ width: `${item.value}%` }} /></i><strong>{item.count}</strong><small>{item.share}</small></div>)}</div>
        </section>
        <section className="panel">
          <header className="panel-header"><div><h2>Data freshness</h2><p>Source state for this run</p></div></header>
          <div className="freshness-list">{data.freshness.map((source) => <div key={source.label}><Check aria-hidden size={15} /><strong>{source.label}</strong><StatusBadge tone="green">{source.status}</StatusBadge><small>{source.age}</small></div>)}</div>
          <dl className="reconciliation-times"><div><dt>Last reconciliation</dt><dd>{data.lastReconciliation}</dd></div><div><dt>Next scheduled</dt><dd>{data.nextScheduled}</dd></div></dl>
        </section>
      </div>

      {selectedItem ? (
        <>
          <button aria-label="Close discrepancy details" className="drawer-scrim" onClick={() => setSelectedId(null)} type="button" />
          <aside aria-label={`Discrepancy ${selectedItem.id}`} className="reconciliation-drawer">
            <header>
              <span><small>Discrepancy #{selectedItem.id}</small><strong>{selectedItem.customer}</strong><em>{selectedItem.email}</em></span>
              <button aria-label="Close details" className="icon-button" onClick={() => setSelectedId(null)} type="button"><X aria-hidden size={18} /></button>
            </header>
            <div className="drawer-badges"><StatusBadge tone={IMPACT_TONES[selectedItem.impact]}>{selectedItem.impact} impact</StatusBadge><StatusBadge tone="orange">{selectedItem.conflictType}</StatusBadge></div>

            <section className="evidence-card">
              <h3>Expected entitlement <small>Source of truth: Stripe</small></h3>
              <div className="evidence-heading"><span className="source-logo stripe">S</span><strong>Stripe</strong><StatusBadge tone="orange">{selectedItem.expected.status}</StatusBadge></div>
              <dl><div><dt>Subscription ID</dt><dd>{selectedItem.expected.subscriptionId}</dd></div><div><dt>Plan</dt><dd>{selectedItem.expected.plan}</dd></div><div><dt>Price</dt><dd>{selectedItem.expected.price}</dd></div><div><dt>Current period</dt><dd>{selectedItem.expected.period}</dd></div><div><dt>Last payment</dt><dd>{selectedItem.expected.lastPayment}</dd></div></dl>
            </section>

            <section className="evidence-card">
              <h3>Actual entitlement <small>Observed state</small></h3>
              <div className="evidence-heading"><span className="source-logo clerk">C</span><strong>Clerk</strong><StatusBadge tone={selectedItem.actual.status === "Active" ? "green" : "slate"}>{selectedItem.actual.status}</StatusBadge></div>
              <dl><div><dt>Subscription ID</dt><dd>{selectedItem.actual.clerkSubscriptionId}</dd></div><div><dt>Last seen</dt><dd>{selectedItem.actual.lastSeen}</dd></div><div><dt>Access level</dt><dd>{selectedItem.actual.accessLevel}</dd></div><div><dt>Products</dt><dd>{selectedItem.actual.products}</dd></div><div><dt>Last sync</dt><dd>{selectedItem.actual.lastSync}</dd></div></dl>
            </section>

            <section className="correction-card">
              <h3>Proposed correction</h3>
              <p>{selectedItem.recommendedAction} and then verify the post-condition against every affected source.</p>
              <ul>{selectedItem.correction.map((step) => <li key={step}><Check aria-hidden size={14} />{step}</li>)}</ul>
            </section>

            {approvalRequestedFor === selectedItem.id ? (
              <div className="preview-notice" role="status">
                <Check aria-hidden size={16} />
                Approval request simulated locally. Nothing was saved or sent.
              </div>
            ) : null}
            <div className="drawer-actions">
              <button className="button button-gold" onClick={() => setApprovalRequestedFor(selectedItem.id)} type="button">Request approval</button>
              <button className="button button-primary" disabled title="Connect sources and persist an approved proposal before applying" type="button">Approve & apply</button>
              <button className="button button-secondary" onClick={() => setSelectedId(null)} type="button">Dismiss</button>
            </div>
            <footer><ShieldAlert aria-hidden size={14} />High-impact changes require an approved proposal and immutable audit event.</footer>
          </aside>
        </>
      ) : null}
    </>
  );
}
