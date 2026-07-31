import type { Metadata } from "next";
import { Check, Edit3, MoreHorizontal, ShieldCheck } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { getCampaignData } from "@/data/operations";
import {
  ConnectedEmptyState,
  MetricCard,
  PageHeading,
  Sparkline,
  StatusBadge,
} from "@/components/operations/ui";

interface CampaignPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Campaign Workspace",
};

/**
 * Purpose: Renders versioned campaign planning, evidence, scheduling, and controls.
 * Parameters: params contains the requested campaign identifier.
 * Returns: The campaign workspace, a connected empty state, or not-found.
 * Side effects: Enforces authorization and can terminate rendering with notFound.
 */
export default async function CampaignPage({ params }: CampaignPageProps) {
  const { id } = await params;
  const { data, isPreview } = await getCampaignData(id);

  if (!isPreview) {
    redirect("/marketing");
  }

  if (!data && isPreview) {
    notFound();
  }

  if (!data) {
    return (
      <>
        <PageHeading title="Campaign Workspace" description="Plan, approve, schedule, and measure one campaign" />
        <ConnectedEmptyState workflow="The campaign workspace" />
      </>
    );
  }

  return (
    <>
      <PageHeading
        eyebrow={`Marketing / Campaigns / ${data.code}`}
        title={data.name}
        description={`${data.dateRange} · ${data.code}`}
        actions={
          <>
            <button aria-label="More campaign actions" className="button button-secondary icon-only" disabled type="button"><MoreHorizontal aria-hidden size={17} /></button>
            <button className="button button-primary" disabled type="button"><Edit3 aria-hidden size={16} />Edit campaign</button>
          </>
        }
      />
      <div className="campaign-status-row"><StatusBadge tone="green">{data.status}</StatusBadge><span>Effective proposal version 3 · Preview snapshot</span></div>

      <nav aria-label="Campaign sections" className="tabs">
        <a className="is-active" href="#overview">Overview</a><a href="#audience">Audience</a><a href="#content">Content</a><a href="#schedule">Schedule</a><a href="#performance">Performance</a><a href="#budget">Budget</a><a href="#approvals">Approvals</a>
      </nav>

      <section aria-label="Campaign metrics" className="metric-grid six-up campaign-metrics">
        {data.metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </section>

      <div className="campaign-grid campaign-grid-top" id="overview">
        <section className="panel brief-card">
          <header className="panel-header"><div><h2>A. Campaign brief</h2><p>Approved operating intent</p></div><button className="text-button" disabled type="button"><Edit3 aria-hidden size={14} />Edit</button></header>
          <dl className="brief-list">
            <div><dt>Objective</dt><dd>{data.objective}</dd></div>
            <div id="audience"><dt>Audience</dt><dd>{data.audience}</dd></div>
            <div><dt>Offer</dt><dd>{data.offer}</dd></div>
            <div><dt>Channel mix</dt><dd>{data.channelMix}</dd></div>
            <div><dt>Attribution</dt><dd>{data.attributionWindow}</dd></div>
            <div><dt>Owner</dt><dd>{data.owner}</dd></div>
          </dl>
        </section>

        <section className="panel content-card" id="content">
          <header className="panel-header"><div><h2>B. Content & assets</h2><p>Versioned artifacts awaiting approval</p></div><button className="text-button" disabled type="button">View all</button></header>
          <div className="content-assets">
            {data.content.map((content) => (
              <div key={content.id}>
                <span className={`creative-thumb creative-${content.artwork}`}>{content.artwork === "ai" ? "AI\nTOOLKIT" : "BUILD\nSMARTER"}</span>
                <span><strong>{content.title}</strong><small>{content.updated}</small><StatusBadge tone="orange">{content.status}</StatusBadge></span>
                <StatusBadge tone={content.channel === "Email" ? "gold" : "red"}>{content.channel}</StatusBadge>
              </div>
            ))}
          </div>
          <h3>Scheduled publications</h3>
          <div className="publication-list">
            {data.publications.map((publication) => (
              <div key={publication.title}><StatusBadge tone="blue">{publication.channel}</StatusBadge><strong>{publication.title}</strong><time>{publication.date}</time><Check aria-label="Scheduled" size={14} /></div>
            ))}
          </div>
        </section>

        <section className="panel schedule-card" id="schedule">
          <header className="panel-header"><div><h2>C. Schedule</h2><p>Aug 1 – Aug 7, 2026</p></div><span className="status-badge tone-slate">Week</span></header>
          <div className="schedule-grid">
            <div className="schedule-days"><span>Channel</span>{[1, 2, 3, 4, 5, 6, 7].map((day) => <span key={day}><small>Day</small>{day}</span>)}</div>
            {["Email", "YouTube", "Blog", "Social"].map((channel) => (
              <div className="schedule-row" key={channel}>
                <strong>{channel}</strong>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                  const item = data.schedule.find((entry) => entry.channel === channel && entry.day === day);
                  return <span key={day}>{item ? <i className={`tone-${item.tone}`}>{item.label}</i> : null}</span>;
                })}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="campaign-grid campaign-grid-bottom">
        <section className="panel performance-card" id="performance">
          <header className="panel-header"><div><h2>D. Performance</h2><p>Actuals compared with campaign goals</p></div></header>
          <div className="multi-line-chart">
            <Sparkline label="Campaign registrations trend" tone="blue" values={data.performance.registrationSeries} />
            <Sparkline label="Campaign subscriptions trend" tone="green" values={data.performance.subscriptionSeries} />
            <Sparkline label="Campaign spend trend" tone="gold" values={data.performance.spendSeries} />
          </div>
          <div className="performance-stats">
            <span><small>Spend</small><strong>{data.performance.spend}</strong></span>
            <span><small>Registrations</small><strong>{data.performance.registrations}</strong></span>
            <span><small>Cost / registration</small><strong>{data.performance.costPerRegistration}</strong></span>
            <span><small>Subscriptions</small><strong>{data.performance.subscriptions}</strong></span>
            <span><small>Cost / subscription</small><strong>{data.performance.costPerSubscription}</strong></span>
          </div>
        </section>

        <section className="panel channel-card">
          <header className="panel-header"><div><h2>E. Audience / channel mix</h2><p>Spend and attributed subscriptions</p></div></header>
          <div className="channel-layout">
            <div
              aria-label="Campaign channel mix"
              className="donut"
              role="img"
              style={{ background: "conic-gradient(#2563eb 0 40%, #dc2626 40% 70%, #8b5cf6 70% 90%, #d99700 90% 100%)" }}
            ><span>Channel<br />mix</span></div>
            <div className="channel-list">{data.channels.map((channel) => <div key={channel.name}><i style={{ background: channel.color }} /><strong>{channel.name}</strong><span>{channel.spend}</span><small>{channel.results}</small></div>)}</div>
          </div>
          <div className="insight-callout">Email is driving the highest subscription volume at the lowest sample acquisition cost.</div>
        </section>

        <div className="campaign-side-stack">
          <section className="panel budget-card" id="budget">
            <header className="panel-header"><div><h2>F. Budget & controls</h2><p>Approved guardrails</p></div></header>
            <dl>
              <div><dt>Total budget</dt><dd>{data.budget.total}</dd></div>
              <div><dt>Spend to date</dt><dd>{data.budget.spend}</dd></div>
              <div><dt>Remaining</dt><dd>{data.budget.remaining}</dd></div>
              <div><dt>Pacing</dt><dd><StatusBadge tone="green">{data.budget.pacing}</StatusBadge></dd></div>
              <div><dt>Stop-loss threshold</dt><dd>{data.budget.stopLoss}</dd></div>
              <div><dt>Current forecast</dt><dd>{data.budget.forecast}</dd></div>
            </dl>
            <div className="progress-track"><i style={{ width: `${data.budget.progress}%` }} /></div>
          </section>
          <section className="panel approval-card" id="approvals">
            <header className="panel-header"><div><h2>G. Approvals</h2><p>Proposal version 3</p></div></header>
            <div><ShieldCheck aria-hidden size={20} /><span><strong>Email v3 — Toolkit launch</strong><small>Evidence bundle complete · Pending owner</small></span></div>
            <button className="button button-primary" disabled type="button">Review & approve</button>
          </section>
        </div>
      </div>
    </>
  );
}
