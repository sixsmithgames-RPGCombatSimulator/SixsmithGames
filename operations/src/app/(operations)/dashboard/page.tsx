import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert } from "lucide-react";
import { getDashboardData } from "@/data/operations";
import type { Severity, Tone } from "@/data/operations-types";
import {
  ConnectedEmptyState,
  MetricCard,
  PageHeading,
  ProductMark,
  Sparkline,
  StatusBadge,
} from "@/components/operations/ui";

export const metadata: Metadata = {
  title: "Dashboard",
};

const SEVERITY_TONES: Record<Severity, Tone> = {
  Critical: "red",
  High: "red",
  Medium: "orange",
  Low: "blue",
};

/**
 * Purpose: Renders the owner-level operating snapshot defined by the Stage 2 contract.
 * Parameters: None; the authorized server data layer resolves the current snapshot.
 * Returns: The executive dashboard or an honest connected empty state.
 * Side effects: Enforces authorization through getDashboardData.
 */
export default async function DashboardPage() {
  const { data } = await getDashboardData();

  if (!data) {
    return (
      <>
        <PageHeading
          title="Dashboard"
          description="Your executive operating snapshot"
        />
        <ConnectedEmptyState workflow="The operations dashboard" />
      </>
    );
  }

  return (
    <>
      <PageHeading
        title="Dashboard"
        description="One operating picture across revenue, customers, products, and execution"
        actions={<span className="snapshot-label">{data.snapshotLabel}</span>}
      />

      <section aria-label="Key operating metrics" className="metric-grid six-up">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <div className="dashboard-grid dashboard-grid-top">
        <section className="panel panel-span-2">
          <header className="panel-header">
            <div>
              <h2>A. Critical and approval queue</h2>
              <p>Evidence-backed work requiring owner attention</p>
            </div>
            <Link href="/approvals">View all ({data.queue.length + 17})</Link>
          </header>
          <div className="table-scroll">
            <table className="data-table queue-table">
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Reason</th>
                  <th>Effect</th>
                  <th>Deadline</th>
                  <th>Recommended action</th>
                </tr>
              </thead>
              <tbody>
                {data.queue.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <StatusBadge tone={SEVERITY_TONES[item.severity]}>
                        {item.severity}
                      </StatusBadge>
                    </td>
                    <td>
                      <strong>{item.reason}</strong>
                      <small>{item.evidence} evidence ready</small>
                    </td>
                    <td>{item.effect}</td>
                    <td>
                      <strong>{item.deadline}</strong>
                      <small className={item.deadlineDetail === "Overdue" ? "danger" : ""}>
                        {item.deadlineDetail}
                      </small>
                    </td>
                    <td>
                      <Link className="table-action" href="/approvals">
                        {item.action}
                        <ArrowRight aria-hidden size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <header className="panel-header">
            <div>
              <h2>B. Subscriber & revenue health</h2>
              <p>Last 30 days</p>
            </div>
          </header>
          <div className="health-summary">
            <div className="compact-stats">
              <span>
                <small>New subscribers</small>
                <strong>{data.subscriberHealth.newSubscribers}</strong>
                <em>↑ 11.2%</em>
              </span>
              <span>
                <small>Recovered payments</small>
                <strong>{data.subscriberHealth.recoveredPayments}</strong>
                <em>↑ 8.7%</em>
              </span>
              <span>
                <small>Cancellations</small>
                <strong>{data.subscriberHealth.cancellations}</strong>
                <em className="danger">↑ 6.3%</em>
              </span>
              <span>
                <small>Churn rate</small>
                <strong>{data.subscriberHealth.churnRate}</strong>
                <em className="danger">↑ 0.21 pp</em>
              </span>
            </div>
            <div className="donut-wrap">
              <div
                aria-label="Plan mix by monthly recurring revenue"
                className="donut"
                role="img"
                style={{
                  background:
                    "conic-gradient(#ef3340 0 49%, #e4a400 49% 79%, #3b82f6 79% 94%, #8b5cf6 94% 100%)",
                }}
              >
                <span>MRR<br />mix</span>
              </div>
              <div className="legend-list">
                {data.subscriberHealth.plans.map((plan) => (
                  <span key={plan.name}>
                    <i style={{ background: plan.color }} />
                    <strong>{plan.name}</strong>
                    <small>{plan.amount} · {plan.value}%</small>
                  </span>
                ))}
              </div>
            </div>
            <div className="movement-list">
              {data.subscriberHealth.movement.map((movement) => (
                <span key={movement.label}>
                  <small>{movement.label}</small>
                  <strong className={movement.tone}>{movement.amount}</strong>
                </span>
              ))}
              <span className="movement-total">
                <small>Current MRR</small>
                <strong>$437,829</strong>
              </span>
            </div>
          </div>
        </section>

        <section className="panel recent-alerts">
          <header className="panel-header">
            <div>
              <h2>Recent alerts</h2>
              <p>Signals requiring attention</p>
            </div>
            <Link href="/approvals">View all</Link>
          </header>
          <div className="alert-list">
            {data.alerts.map((alert) => (
              <Link href="/approvals" key={alert.id}>
                <span className={`alert-dot tone-${alert.tone}`}>
                  <CircleAlert aria-hidden size={16} />
                </span>
                <span>
                  <strong>{alert.label}</strong>
                  <small>{alert.detail}</small>
                </span>
                <time>{alert.age}</time>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="dashboard-grid dashboard-grid-middle">
        <section className="panel panel-span-2">
          <header className="panel-header">
            <div>
              <h2>C. Growth funnel</h2>
              <p>Last 30 days · progression to paid and multi-product</p>
            </div>
          </header>
          <div className="funnel-row">
            {data.growthFunnel.map((stage, index) => (
              <div className="funnel-stage" key={stage.label}>
                <span className="funnel-number">{index + 1}</span>
                <small>{stage.label}</small>
                <strong>{stage.value}</strong>
                <em>{stage.change}</em>
              </div>
            ))}
          </div>
          <footer className="panel-footer">
            <span>Overall conversion</span>
            <strong>1.04%</strong>
          </footer>
        </section>

        <section className="panel campaign-card">
          <header className="panel-header">
            <div>
              <h2>D. Campaign & content performance</h2>
              <p>Active execution and approvals</p>
            </div>
            <Link href="/campaigns/camp-gmc-ai-activation">Open workspace</Link>
          </header>
          <div className="three-stat-row">
            <span><small>Active campaigns</small><strong>{data.campaignSummary.activeCampaigns}</strong></span>
            <span><small>Registrations</small><strong>{data.campaignSummary.registrations}</strong></span>
            <span><small>Subscriptions</small><strong>{data.campaignSummary.subscriptions}</strong></span>
          </div>
          <div className="split-lists">
            <div>
              <strong>Awaiting approval</strong>
              {data.campaignSummary.awaitingApproval.map((item) => (
                <span key={item}>{item}<StatusBadge tone="orange">Review</StatusBadge></span>
              ))}
            </div>
            <div>
              <strong>Scheduled</strong>
              {data.campaignSummary.scheduled.map((item) => (
                <span key={item.title}><time>{item.date}</time>{item.title}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="panel panel-span-2">
          <header className="panel-header">
            <div>
              <h2>E. Product portfolio health</h2>
              <p>Activation, retention, and access health</p>
            </div>
            <Link href="/products">View products</Link>
          </header>
          <div className="table-scroll">
            <table className="data-table product-health-table">
              <thead>
                <tr><th>Product</th><th>Active users</th><th>Activation</th><th>30-day retention</th><th>Status</th></tr>
              </thead>
              <tbody>
                {data.products.map((product) => (
                  <tr key={product.slug}>
                    <td><span className="product-name"><ProductMark name={product.name} size={26} /><strong>{product.name}</strong></span></td>
                    <td>{product.activeUsers}</td>
                    <td>{product.activation}</td>
                    <td>{product.retention}</td>
                    <td>
                      <StatusBadge tone={product.status === "Healthy" ? "green" : product.status === "At Risk" ? "orange" : "red"}>
                        {product.status}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="dashboard-grid dashboard-grid-bottom">
        <section className="panel">
          <header className="panel-header">
            <div><h2>F. Support & feedback summary</h2><p>Last 30 days</p></div>
            <Link href="/support">View all cases</Link>
          </header>
          <div className="support-layout">
            <div className="support-totals">
              <span><small>Open cases</small><strong>{data.support.open}</strong></span>
              <span><small>Overdue</small><strong className="danger">{data.support.overdue}</strong></span>
            </div>
            <div className="bar-list">
              {data.support.categories.map((category) => (
                <span key={category.name}>
                  <small>{category.name}</small>
                  <i><b style={{ width: `${category.value}%` }} /></i>
                  <strong>{category.count}</strong>
                  <em>{category.share}</em>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="panel finance-panel">
          <header className="panel-header">
            <div><h2>G. Financial snapshot</h2><p>{data.finance.period}</p></div>
            <Link href="/profitability">Profitability</Link>
          </header>
          <div className="finance-layout">
            <dl>
              <div><dt>Gross revenue</dt><dd>{data.finance.grossRevenue}</dd></div>
              <div><dt>Refunds</dt><dd className="danger">{data.finance.refunds}</dd></div>
              <div><dt>Stripe fees</dt><dd className="danger">{data.finance.stripeFees}</dd></div>
              <div><dt>Direct costs</dt><dd className="danger">{data.finance.directCosts}</dd></div>
              <div><dt>Marketing spend</dt><dd className="danger">{data.finance.marketingSpend}</dd></div>
            </dl>
            <div className="profit-snapshot">
              <small>Gross profit</small>
              <strong>{data.finance.grossProfit}</strong>
              <em>{data.finance.margin} margin</em>
              <Sparkline label="Gross profit over the last 30 days" tone="blue" values={data.finance.trend} />
            </div>
          </div>
        </section>

        <section className="panel integration-panel">
          <header className="panel-header">
            <div><h2>H. Integration health</h2><p>Source reliability and freshness</p></div>
            <Link href="/settings">Settings</Link>
          </header>
          <div className="integration-list">
            {data.integrations.map((integration) => (
              <div key={integration.key}>
                <span className={`integration-state ${integration.status.toLowerCase()}`}>
                  {integration.status === "Healthy" ? <CheckCircle2 aria-hidden size={16} /> : <CircleAlert aria-hidden size={16} />}
                </span>
                <strong>{integration.name}</strong>
                <StatusBadge tone={integration.status === "Healthy" ? "green" : integration.status === "Degraded" ? "orange" : "slate"}>
                  {integration.status}
                </StatusBadge>
                <span>{integration.health}</span>
                <small>{integration.freshness}</small>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
