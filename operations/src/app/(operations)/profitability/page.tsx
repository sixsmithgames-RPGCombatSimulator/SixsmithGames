import type { Metadata } from "next";
import { CalendarDays, Info } from "lucide-react";
import { getProfitabilityData } from "@/data/operations";
import { LiveAccounting } from "@/components/operations/live-workspaces";
import { getLiveOperationsSnapshot } from "@/lib/operations/live-snapshot";
import {
  ConnectedEmptyState,
  MetricCard,
  PageHeading,
  Sparkline,
} from "@/components/operations/ui";

export const metadata: Metadata = {
  title: "Profitability",
};

/**
 * Purpose: Renders source-backed revenue, costs, profit, and contribution margin.
 * Parameters: None; the authorized data layer resolves the financial snapshot.
 * Returns: The profitability workspace or an honest connected empty state.
 * Side effects: Enforces authorization through getProfitabilityData.
 */
export default async function ProfitabilityPage() {
  const { data, isPreview } = await getProfitabilityData();

  if (!isPreview) {
    return <LiveAccounting snapshot={await getLiveOperationsSnapshot()} title="Profitability" />;
  }

  if (!data) {
    return (
      <>
        <PageHeading title="Profitability" description="Revenue, cost, and margin analysis" />
        <ConnectedEmptyState workflow="Profitability reporting" />
      </>
    );
  }

  const costGradient = data.costs
    .reduce<{ stops: string[]; position: number }>(
      (result, cost) => {
        const next = result.position + cost.share;
        result.stops.push(`${cost.color} ${result.position}% ${next}%`);
        result.position = next;
        return result;
      },
      { stops: [], position: 0 },
    )
    .stops.join(", ");

  return (
    <>
      <PageHeading
        title="Profitability"
        description="Revenue, cost, gross profit, and contribution margin"
        actions={
          <>
            <span className="button button-secondary"><CalendarDays aria-hidden size={16} />{data.period}</span>
            <span className="status-badge tone-slate">All products</span>
            <span className="status-badge tone-slate">USD</span>
          </>
        }
      />
      <section aria-label="Profitability metrics" className="metric-grid six-up">
        {data.metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </section>

      <div className="profit-grid profit-grid-top">
        <section className="panel revenue-product-card">
          <header className="panel-header"><div><h2>Revenue by product</h2><p>Gross revenue with refunds and fees</p></div></header>
          <div className="bar-chart" role="img" aria-label="Revenue by product">
            {data.revenueByProduct.map((product) => (
              <div key={product.name}>
                <span className="bar-value">${(product.revenue / 1000).toFixed(1)}k</span>
                <span className="bar-stack" style={{ height: `${Math.max(28, (product.revenue / 20000) * 180)}px` }}>
                  <i className="bar-revenue" style={{ height: `${100 - ((product.refunds + product.fees) / product.revenue) * 100}%` }} />
                  <i className="bar-refunds" style={{ height: `${(product.refunds / product.revenue) * 100}%` }} />
                  <i className="bar-fees" style={{ height: `${(product.fees / product.revenue) * 100}%` }} />
                </span>
                <small>{product.name}</small>
              </div>
            ))}
          </div>
          <div className="chart-legend"><span><i className="blue" />Net collected</span><span><i className="pale-blue" />Refunds</span><span><i className="light-blue" />Fees</span></div>
        </section>

        <section className="panel profit-trend-card">
          <header className="panel-header"><div><h2>Profit over time</h2><p>Daily source-confirmed amounts</p></div><span className="status-badge tone-slate">Daily</span></header>
          <div className="multi-line-chart large">
            <Sparkline label="Gross profit over time" tone="green" values={data.trend.grossProfit} />
            <Sparkline label="Contribution margin over time" tone="gold" values={data.trend.contribution} />
            <Sparkline label="Net collected revenue over time" tone="blue" values={data.trend.netRevenue} />
          </div>
          <div className="chart-legend"><span><i className="green" />Gross profit</span><span><i className="gold" />Contribution margin</span><span><i className="blue" />Net collected</span></div>
        </section>

        <section className="panel margin-card">
          <header className="panel-header"><div><h2>Margin by product</h2><p>Net collected revenue and margin</p></div></header>
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr><th>Product</th><th>Net revenue</th><th>Gross profit</th><th>Contribution</th></tr></thead>
              <tbody>
                {data.margins.map((margin) => (
                  <tr key={margin.product}>
                    <td><strong>{margin.product}</strong></td>
                    <td>{margin.revenue}</td>
                    <td><span className="margin-meter"><i style={{ width: `${margin.grossProfit}%` }} /></span>{margin.grossProfit}%</td>
                    <td><span className="margin-meter gold"><i style={{ width: `${margin.contribution}%` }} /></span>{margin.contribution}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="profit-grid profit-grid-bottom">
        <section className="panel cost-card">
          <header className="panel-header"><div><h2>Cost breakdown</h2><p>Confirmed operating costs</p></div></header>
          <div className="cost-layout">
            <div aria-label="Cost distribution" className="donut large" role="img" style={{ background: `conic-gradient(${costGradient})` }}><span>$11,561<br /><small>100%</small></span></div>
            <div className="summary-list">{data.costs.map((cost) => <div key={cost.label}><i style={{ background: cost.color }} /><span>{cost.label}</span><strong>{cost.amount}</strong><small>{cost.share}%</small></div>)}</div>
          </div>
        </section>

        <section className="panel roi-card">
          <header className="panel-header"><div><h2>Top campaigns by return</h2><p>Attributable net revenue</p></div></header>
          <table className="data-table">
            <thead><tr><th>Campaign</th><th>Spend</th><th>Net revenue</th><th>ROI</th></tr></thead>
            <tbody>{data.campaigns.map((campaign) => <tr key={campaign.name}><td><strong>{campaign.name}</strong></td><td>{campaign.spend}</td><td>{campaign.revenue}</td><td className="positive"><strong>{campaign.roi}</strong></td></tr>)}</tbody>
          </table>
        </section>

        <section className="panel budget-actual-card">
          <header className="panel-header"><div><h2>Budget vs actual</h2><p>Current monthly period</p></div></header>
          <table className="data-table">
            <thead><tr><th>Category</th><th>Budget</th><th>Actual</th><th>Variance</th></tr></thead>
            <tbody>{data.budgets.map((budget) => <tr key={budget.category}><td><strong>{budget.category}</strong></td><td>{budget.budget}</td><td>{budget.actual}</td><td className="positive"><strong>{budget.variance}</strong></td></tr>)}</tbody>
          </table>
        </section>

        <section className="panel unreconciled-card">
          <header className="panel-header"><div><h2>Unreconciled amount</h2><p>{data.unreconciled.count}</p></div></header>
          <strong className="unreconciled-total">{data.unreconciled.total}</strong>
          <div className="unreconciled-list">{data.unreconciled.items.map((item) => <div key={item.source}><span>{item.source}</span><strong>{item.amount}</strong><small>{item.age}</small></div>)}</div>
        </section>
      </div>

      <p className="method-note"><Info aria-hidden size={17} />Gross revenue precedes refunds and fees. Net collected revenue equals gross revenue minus refunds and payment fees. Direct costs include delivery infrastructure and verified variable costs.</p>
    </>
  );
}
