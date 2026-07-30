"use client";

import Link from "next/link";
import { Download, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  CustomerDirectoryData,
  CustomerListItem,
  Tone,
} from "@/data/operations-types";
import { StatusBadge } from "@/components/operations/ui";

const LIFECYCLE_TONES: Record<CustomerListItem["lifecycle"], Tone> = {
  Subscriber: "green",
  Engaged: "green",
  "At Risk": "orange",
  "Payment Failed": "red",
  Canceling: "orange",
  Churned: "slate",
  "Win-Back": "purple",
};

/**
 * Purpose: Renders searchable, lifecycle-filterable normalized customers and summary evidence.
 * Parameters: data is the authorized customer directory view model.
 * Returns: The interactive customer table and lifecycle/health summary rail.
 * Side effects: Maintains local query and lifecycle filter state; no records are persisted.
 */
export function CustomersWorkspace({ data }: { data: CustomerDirectoryData }) {
  const [query, setQuery] = useState("");
  const [lifecycle, setLifecycle] = useState("All");
  const normalizedQuery = query.trim().toLowerCase();
  const customers = useMemo(
    () =>
      data.customers.filter((customer) => {
        const matchesLifecycle =
          lifecycle === "All" || customer.lifecycle === lifecycle;
        const searchable =
          `${customer.name} ${customer.email} ${customer.plan}`.toLowerCase();
        const matchesQuery =
          normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
        return matchesLifecycle && matchesQuery;
      }),
    [data.customers, lifecycle, normalizedQuery],
  );

  return (
    <div className="customer-layout">
      <section className="panel customer-directory">
        <div className="toolbar">
          <label className="search-field">
            <Search aria-hidden size={18} />
            <span className="sr-only">Search customers</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, email, company, or plan…"
              value={query}
            />
          </label>
          <label className="select-field">
            <span>Lifecycle stage</span>
            <select
              onChange={(event) => setLifecycle(event.target.value)}
              value={lifecycle}
            >
              <option>All</option>
              <option>Subscriber</option>
              <option>Engaged</option>
              <option>At Risk</option>
              <option>Payment Failed</option>
              <option>Canceling</option>
              <option>Churned</option>
              <option>Win-Back</option>
            </select>
          </label>
          <button className="button button-secondary" type="button">
            <SlidersHorizontal aria-hidden size={16} />
            Filters
          </button>
          <button className="button button-secondary" type="button">
            <Download aria-hidden size={16} />
            Export
          </button>
        </div>

        <div aria-label="Customer lifecycle shortcuts" className="segment-control">
          <button
            className={lifecycle === "All" ? "is-active" : ""}
            onClick={() => setLifecycle("All")}
            type="button"
          >
            All
          </button>
          {data.summary.lifecycle.slice(0, 4).map((stage) => (
            <button
              className={lifecycle === stage.label.replace("s", "") ? "is-active" : ""}
              key={stage.label}
              onClick={() =>
                setLifecycle(stage.label === "Subscribers" ? "Subscriber" : stage.label)
              }
              type="button"
            >
              {stage.label}
              <span>{stage.count}</span>
            </button>
          ))}
        </div>

        <div className="table-scroll">
          <table className="data-table customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Lifecycle stage</th>
                <th>Plan</th>
                <th>Products</th>
                <th>Health</th>
                <th>MRR</th>
                <th>Last activity</th>
                <th>Open issues</th>
                <th>Next action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <Link className="customer-name" href={`/customers/${customer.id}`}>
                      <span className="avatar">{customer.initials}</span>
                      <span><strong>{customer.name}</strong><small>{customer.email}</small></span>
                    </Link>
                  </td>
                  <td><StatusBadge tone={LIFECYCLE_TONES[customer.lifecycle]}>{customer.lifecycle}</StatusBadge></td>
                  <td>{customer.plan}</td>
                  <td><span className="mini-products">{customer.products.map((product) => <i key={product}>{product}</i>)}</span></td>
                  <td><span className={`health-ring ${customer.health < 40 ? "poor" : customer.health < 70 ? "fair" : "healthy"}`}>{customer.health}</span></td>
                  <td><strong>{customer.mrr}</strong></td>
                  <td><span className="activity-cell"><strong>{customer.lastActivity}</strong><small>{customer.activitySource}</small></span></td>
                  <td><span className={customer.openIssues > 0 ? "issue-count has-issues" : "issue-count"}>{customer.openIssues}</span></td>
                  <td><Link className="table-action" href={`/customers/${customer.id}`}>{customer.nextAction}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
          {customers.length === 0 ? (
            <div className="table-empty">No preview customers match these filters.</div>
          ) : null}
        </div>
        <footer className="table-footer">
          <span>Showing {customers.length} of {data.summary.total} customers</span>
          <span>Preview page 1 of 285</span>
        </footer>
      </section>

      <aside className="summary-rail">
        <section className="panel summary-panel">
          <h2>Lifecycle summary</h2>
          <div className="summary-list">
            {data.summary.lifecycle.map((stage) => (
              <div key={stage.label}>
                <i className={stage.tone} />
                <span>{stage.label}</span>
                <strong>{stage.count}</strong>
                <small>{stage.share}</small>
              </div>
            ))}
          </div>
          <footer><span>Total</span><strong>{data.summary.total}</strong></footer>
        </section>

        <section className="panel summary-panel">
          <h2>Health distribution</h2>
          <div className="health-distribution">
            <div
              aria-label="Customer health distribution"
              className="donut small"
              role="img"
              style={{
                background:
                  "conic-gradient(#2f9e44 0 43%, #72c67a 43% 78%, #f59f00 78% 93%, #e03131 93% 100%)",
              }}
            >
              <span>Health</span>
            </div>
            <div className="legend-list">
              {data.summary.health.map((health) => (
                <span key={health.label}>
                  <i style={{ background: health.color }} />
                  <strong>{health.label}</strong>
                  <small>{health.count} · {health.share}</small>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="panel summary-panel">
          <h2>Open issues summary</h2>
          <div className="summary-list">
            {data.summary.issues.map((issue) => (
              <div key={issue.label}>
                <i className={issue.tone} />
                <span>{issue.label}</span>
                <strong>{issue.count}</strong>
                <small>{issue.share}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="panel freshness-panel">
          <h2>Data freshness</h2>
          <p>{data.summary.freshness}</p>
        </section>
      </aside>
    </div>
  );
}
