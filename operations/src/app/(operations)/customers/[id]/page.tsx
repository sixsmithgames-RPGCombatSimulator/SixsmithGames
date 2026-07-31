import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, MapPin, MessageSquare, Send } from "lucide-react";
import { notFound } from "next/navigation";
import { getCustomerDetailData } from "@/data/operations";
import { LiveCustomerDetail } from "@/components/operations/live-workspaces";
import { getLiveOperationsSnapshot } from "@/lib/operations/live-snapshot";
import {
  ConnectedEmptyState,
  PageHeading,
  ProductMark,
  StatusBadge,
} from "@/components/operations/ui";

interface CustomerPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Customer 360",
};

/**
 * Purpose: Renders one normalized customer with identity, access, value, and activity.
 * Parameters: params contains the normalized customer route identifier.
 * Returns: Customer 360, a connected empty state, or the global not-found state.
 * Side effects: Enforces authorization and can terminate rendering with notFound.
 */
export default async function CustomerDetailPage({ params }: CustomerPageProps) {
  const { id } = await params;
  const { data, isPreview } = await getCustomerDetailData(id);

  if (!isPreview) {
    const snapshot = await getLiveOperationsSnapshot();
    const customerId = decodeURIComponent(id);
    const customer = snapshot.customers.find((record) => record.id === customerId);

    if (!customer) {
      notFound();
    }

    return <LiveCustomerDetail customer={customer} snapshot={snapshot} />;
  }

  if (!data && isPreview) {
    notFound();
  }

  if (!data) {
    return (
      <>
        <PageHeading title="Customer 360" description="Normalized identity, value, access, and activity" />
        <ConnectedEmptyState workflow="Customer 360" />
      </>
    );
  }

  return (
    <>
      <PageHeading
        eyebrow="Customers / Customer 360"
        title={data.name}
        description={`${data.email} · ${data.location}`}
        actions={
          <>
            <button className="button button-secondary" disabled type="button"><MessageSquare aria-hidden size={16} />Send message</button>
            <button className="button button-primary" disabled type="button">Manage customer</button>
          </>
        }
      />

      <section className="panel customer-hero">
        <div className="profile-block">
          <span className="avatar avatar-large">{data.initials}</span>
          <span>
            <strong>{data.name}</strong>
            <small>{data.email}</small>
            <em><MapPin aria-hidden size={14} />{data.location}</em>
          </span>
          <StatusBadge tone="green">{data.lifecycle}</StatusBadge>
        </div>
        <div className="hero-stat health-hero"><small>Health score</small><strong>{data.health}</strong><em>Healthy</em></div>
        <div className="hero-stat"><small>Member since</small><strong>{data.memberSince}</strong><em>Active owner</em></div>
        <div className="hero-stat"><small>Next billing</small><strong>{data.nextBilling}</strong><em>Monthly</em></div>
        <div className="hero-stat"><small>Current MRR</small><strong>{data.mrr}</strong><em>USD</em></div>
        <div className="hero-stat"><small>Lifetime value</small><strong>{data.lifetimeValue}</strong><em>USD</em></div>
      </section>

      <nav aria-label="Customer sections" className="tabs">
        <a className="is-active" href="#overview">Overview</a>
        <a href="#subscription">Subscription</a>
        <a href="#orders">Orders</a>
        <a href="#usage">Usage</a>
        <a href="#activity">Activity</a>
        <a href="#notes">Notes</a>
      </nav>

      <div className="customer-detail-grid" id="overview">
        <section className="panel detail-card">
          <header><h2>Identity links</h2><small>Normalized sources</small></header>
          <dl className="identity-list">
            {data.identities.map((identity) => (
              <div key={identity.source}>
                <dt>{identity.source}</dt>
                <dd>{identity.externalId}</dd>
                <Check aria-label="Verified" size={14} />
              </div>
            ))}
          </dl>
        </section>

        <section className="panel detail-card subscription-card" id="subscription">
          <header><h2>Active subscription & plan</h2><StatusBadge tone="green">{data.subscription.status}</StatusBadge></header>
          <div className="subscription-title"><strong>{data.subscription.name}</strong><span>{data.subscription.price}</span></div>
          <ul className="check-list">{data.subscription.products.map((product) => <li key={product}><Check aria-hidden size={14} />{product}</li>)}</ul>
          <dl className="inline-definition">
            <div><dt>Billing interval</dt><dd>{data.subscription.interval}</dd></div>
            <div><dt>Current period</dt><dd>{data.subscription.period}</dd></div>
          </dl>
        </section>

        <section className="panel detail-card">
          <header><h2>Entitlements / product access</h2><small>Expected = actual</small></header>
          <div className="entitlement-list">
            {data.entitlements.map((entitlement) => (
              <div key={entitlement.name}>
                <ProductMark name={entitlement.name} />
                <strong>{entitlement.name}</strong>
                <StatusBadge tone="green">{entitlement.status}</StatusBadge>
                <small>{entitlement.access}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="panel detail-card" id="usage">
          <header><h2>Product usage snapshot</h2><small>Last 30 days</small></header>
          <div className="usage-list">
            {data.usage.map((usage) => (
              <div key={usage.name}>
                <ProductMark name={usage.name} />
                <strong>{usage.name}</strong>
                <span>{usage.value}</span>
                <small>{usage.label}</small>
                <em>{usage.change}</em>
              </div>
            ))}
          </div>
        </section>

        <section className="panel detail-card orders-card" id="orders">
          <header><h2>Orders & payments</h2><small>One successful order</small></header>
          <div className="order-summary">
            <span><small>Total spent</small><strong>{data.order.amount}</strong></span>
            <span><small>Lifetime value</small><strong>{data.lifetimeValue}</strong></span>
          </div>
          <div className="order-row">
            <Link href="#orders">{data.order.id}</Link><span>{data.order.date}</span><span>{data.order.item}</span><strong>{data.order.amount}</strong><StatusBadge tone="green">{data.order.status}</StatusBadge>
          </div>
        </section>

        <section className="panel detail-card empty-support">
          <header><h2>Support cases</h2><small>Current state</small></header>
          <MessageSquare aria-hidden size={28} />
          <strong>No open support issues</strong>
          <p>No unresolved support cases are linked to this customer.</p>
        </section>

        <section className="panel detail-card timeline-card" id="activity">
          <header><h2>Communication & activity timeline</h2><small>Latest evidence</small></header>
          <div className="timeline">
            {data.timeline.map((item) => (
              <div key={`${item.date}-${item.title}`}>
                <time>{item.date}</time>
                <i className={`tone-${item.tone}`} />
                <span><strong>{item.title}</strong><small>{item.detail}</small></span>
                <em>{item.time}</em>
              </div>
            ))}
          </div>
        </section>

        <div className="detail-stack">
          <section className="panel detail-card health-card">
            <header><h2>Customer health</h2><small>Composite score</small></header>
            <div><span className="health-ring health-ring-large">{data.health}</span><ul className="check-list">{data.healthSignals.map((signal) => <li key={signal}><Check aria-hidden size={14} />{signal}</li>)}</ul></div>
          </section>
          <section className="panel detail-card" id="notes">
            <header><h2>Notes</h2><small>Owner context</small></header>
            {data.notes.map((note) => <p key={note}>{note}</p>)}
          </section>
        </div>
      </div>

      <section className="panel next-action-card">
        <div><span className="next-action-icon"><Send aria-hidden size={22} /></span><span><small>Recommended next action</small><strong>{data.nextAction.title}</strong><p>{data.nextAction.reason}</p></span></div>
        <button className="button button-gold" disabled type="button"><Send aria-hidden size={16} />Send update email</button>
      </section>
      <Link className="back-link" href="/customers"><ArrowLeft aria-hidden size={15} />Back to customers</Link>
    </>
  );
}
