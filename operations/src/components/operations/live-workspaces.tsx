import Link from "next/link";
import {
  BadgeCheck,
  CircleAlert,
  CircleDollarSign,
  Database,
  ExternalLink,
} from "lucide-react";
import { PageHeading, StatusBadge } from "@/components/operations/ui";
import type {
  LiveCustomer,
  LiveOperationsSnapshot,
  LiveSourceSummary,
} from "@/lib/operations/live-snapshot";
import styles from "./live-workspaces.module.css";

interface WorkspaceProps {
  snapshot: LiveOperationsSnapshot;
}

const SOURCE_TONES = {
  connected: "green",
  empty: "blue",
  error: "red",
  not_configured: "slate",
} as const;

/** Purpose: Formats integer minor units using the source currency without assuming USD. */
function formatMoney(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

/** Purpose: Formats source timestamps in the owner's operating timezone. */
function formatDate(value: string, includeTime = false): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    ...(includeTime ? { timeStyle: "short" as const } : {}),
    timeZone: "America/New_York",
  }).format(new Date(value));
}

/** Purpose: Converts raw source states into plain owner-facing labels. */
function sourceStateLabel(source: LiveSourceSummary): string {
  if (source.state === "connected") return "Live data";
  if (source.state === "empty") return "Connected · no records";
  if (source.state === "error") return "Read error";
  return "Not connected";
}

/** Purpose: Prevents a failed provider read from being presented as a verified zero result. */
function sourceReadFailed(snapshot: LiveOperationsSnapshot, key: string): boolean {
  return snapshot.sources.some((source) => source.key === key && source.state === "error");
}

/** Purpose: Shows when a page was assembled from live source reads. */
function Freshness({ checkedAt }: { checkedAt: string }) {
  return (
    <span className={styles.freshness}>
      <BadgeCheck aria-hidden size={15} />
      Checked {formatDate(checkedAt, true)} · read only
    </span>
  );
}

/** Purpose: Explains a real zero result without implying a broken connector. */
function HonestEmpty({ title, detail }: { title: string; detail: string }) {
  return (
    <div className={styles.empty}>
      <span className={styles.emptyIcon}><BadgeCheck aria-hidden size={23} /></span>
      <h2>{title}</h2>
      <p>{detail}</p>
    </div>
  );
}

/** Purpose: Renders the current health and record count for each core operational source. */
function SourceList({ sources }: { sources: LiveSourceSummary[] }) {
  return (
    <div className={styles.sourceList}>
      {sources.map((source) => (
        <div className={styles.sourceRow} key={source.key}>
          <strong>{source.label}</strong>
          <StatusBadge tone={SOURCE_TONES[source.state]}>{sourceStateLabel(source)}</StatusBadge>
          <p>
            {source.detail}
            {source.recordCount !== null ? ` ${source.recordCount} source record${source.recordCount === 1 ? "" : "s"} returned.` : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Purpose: Renders a source-backed executive view using only current Stripe, Clerk, and Neon reads. */
export function LiveDashboard({ snapshot }: WorkspaceProps) {
  const currency = snapshot.totals.currency;

  return (
    <>
      <PageHeading
        title="Dashboard"
        description="Current billing, identity, catalog, and internal workflow state"
        actions={<Freshness checkedAt={snapshot.checkedAt} />}
      />
      <section aria-label="Live operating metrics" className={styles.metricGrid}>
        <Link className={styles.metric} href="/subscriptions/reconciliation">
          <span>Active subscribers</span>
          <strong>{snapshot.totals.activeSubscribers}</strong>
          <small>Distinct Stripe customers with active or trialing subscriptions</small>
        </Link>
        <Link className={styles.metric} href="/subscriptions/reconciliation">
          <span>Monthly recurring revenue</span>
          <strong>{formatMoney(snapshot.totals.monthlyRecurringCents, currency)}</strong>
          <small>Normalized from active Stripe subscription prices</small>
        </Link>
        <Link className={styles.metric} href="/orders">
          <span>Net collected</span>
          <strong>{formatMoney(snapshot.totals.collectedCents, currency)}</strong>
          <small>Successful Stripe charges less refunds in the returned history</small>
        </Link>
        <Link className={styles.metric} href="/approvals">
          <span>Needs owner attention</span>
          <strong>{snapshot.internal.pendingApprovals + snapshot.internal.criticalExceptions}</strong>
          <small>Pending approvals plus open critical or high exceptions</small>
        </Link>
      </section>

      <div className={styles.workspaceGrid}>
        <div className={styles.stack}>
          <section className="panel">
            <header className="panel-header">
              <div><h2>Revenue and customer activity</h2><p>Live Stripe and Clerk read</p></div>
              <Link href="/crm">Open CRM</Link>
            </header>
            {snapshot.customers.length === 0 ? (
              <HonestEmpty
                title={sourceReadFailed(snapshot, "stripe") || sourceReadFailed(snapshot, "clerk") ? "Customer data could not be fully read" : "No customers exist in the connected sources"}
                detail={sourceReadFailed(snapshot, "stripe") || sourceReadFailed(snapshot, "clerk") ? "One or more customer sources failed this request. Review the source checks before treating this as a zero result." : "Stripe returned no customer records and Clerk returned no registered identities. This is a current zero, not a setup error."}
              />
            ) : (
              <div className="table-scroll">
                <table className="data-table">
                  <thead><tr><th>Customer</th><th>Lifecycle</th><th>Subscriptions</th><th>MRR</th><th>Sources</th></tr></thead>
                  <tbody>{snapshot.customers.slice(0, 8).map((customer) => (
                    <tr key={customer.id}>
                      <td><Link className={styles.recordLink} href={`/crm/${encodeURIComponent(customer.id)}`}>{customer.displayName}</Link><small className={styles.subtle}>{customer.email}</small></td>
                      <td><StatusBadge tone={customer.lifecycle === "Subscriber" ? "green" : customer.lifecycle === "Payment failed" ? "red" : "blue"}>{customer.lifecycle}</StatusBadge></td>
                      <td>{customer.subscriptionCount}</td>
                      <td>{formatMoney(customer.mrrCents, customer.currency)}</td>
                      <td>{customer.sources.join(" + ")}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </section>

          <section className="panel">
            <header className="panel-header">
              <div><h2>Product and price catalog</h2><p>Active records from Stripe</p></div>
              <Link href="/products">View products</Link>
            </header>
            {snapshot.products.length === 0 ? (
              <HonestEmpty
                title={sourceReadFailed(snapshot, "stripe") ? "Stripe products could not be read" : "No Stripe products found"}
                detail={sourceReadFailed(snapshot, "stripe") ? "The Stripe read failed for this request. Check Settings and retry before treating the catalog as empty." : "The connected Stripe account returned no product records."}
              />
            ) : (
              <div className="table-scroll">
                <table className="data-table">
                  <thead><tr><th>Product</th><th>Recurring prices</th><th>One-time prices</th><th>Active subscribers</th></tr></thead>
                  <tbody>{snapshot.products.slice(0, 8).map((product) => (
                    <tr key={product.id}>
                      <td><strong>{product.name}</strong><small className={styles.subtle}>{product.description}</small></td>
                      <td>{product.recurringPrices.length}</td>
                      <td>{product.oneTimePrices.length}</td>
                      <td>{product.subscriberCount}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        <div className={styles.stack}>
          <section className="panel">
            <header className="panel-header"><div><h2>Attention queue</h2><p>Operations-owned work</p></div><Link href="/approvals">Open queue</Link></header>
            <dl className={styles.definitionGrid}>
              <div><dt>Pending approvals</dt><dd>{snapshot.internal.pendingApprovals}</dd></div>
              <div><dt>Open exceptions</dt><dd>{snapshot.internal.openExceptions}</dd></div>
              <div><dt>Critical / high</dt><dd>{snapshot.internal.criticalExceptions}</dd></div>
              <div><dt>Campaigns</dt><dd>{snapshot.internal.campaigns}</dd></div>
            </dl>
          </section>
          <section className="panel">
            <header className="panel-header"><div><h2>Source checks</h2><p>What actually populated this page</p></div><Link href="/settings">Details</Link></header>
            <SourceList sources={snapshot.sources} />
          </section>
        </div>
      </div>
    </>
  );
}

/** Purpose: Renders the canonical customer relationship and billing directory. */
export function LiveCrm({ snapshot }: WorkspaceProps) {
  return (
    <>
      <PageHeading title="CRM" description="Customer accounts, billing relationships, and account history" actions={<Freshness checkedAt={snapshot.checkedAt} />} />
      <div className={styles.notice}><Database aria-hidden size={18} /><span><strong>How matching works:</strong> records are joined by normalized email. A customer may exist only in Clerk, only in Stripe, or in both.</span></div>
      <section className="panel">
        <header className="panel-header"><div><h2>{snapshot.customers.length} customer relationship{snapshot.customers.length === 1 ? "" : "s"}</h2><p>Open any customer to see their account, plans, and payments</p></div></header>
        {snapshot.customers.length === 0 ? (
          <HonestEmpty
            title={sourceReadFailed(snapshot, "stripe") || sourceReadFailed(snapshot, "clerk") ? "Customer data could not be fully read" : "No customers yet"}
            detail={sourceReadFailed(snapshot, "stripe") || sourceReadFailed(snapshot, "clerk") ? "A Clerk or Stripe read failed. Review Settings and retry before treating the directory as empty." : "The live Clerk and Stripe reads both returned zero customer identities. New sign-ups or Stripe customers will appear automatically on refresh."}
          />
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr><th>Customer</th><th>Lifecycle</th><th>Active plans</th><th>MRR</th><th>Last sign-in</th><th>Source records</th><th>Created</th></tr></thead>
              <tbody>{snapshot.customers.map((customer) => (
                <tr key={customer.id}>
                  <td><Link className={styles.recordLink} href={`/crm/${encodeURIComponent(customer.id)}`}>{customer.displayName}</Link><small className={styles.subtle}>{customer.email}</small></td>
                  <td><StatusBadge tone={customer.lifecycle === "Subscriber" ? "green" : customer.lifecycle === "Payment failed" ? "red" : "blue"}>{customer.lifecycle}</StatusBadge></td>
                  <td>{customer.activeSubscriptions}</td>
                  <td>{formatMoney(customer.mrrCents, customer.currency)}</td>
                  <td>{customer.lastActiveAt ? formatDate(customer.lastActiveAt, true) : "Never"}</td>
                  <td>{customer.sources.join(" + ")}</td>
                  <td>{formatDate(customer.createdAt)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

/** Purpose: Renders one normalized customer without exposing secrets or unsupported product usage claims. */
export function LiveCustomerDetail({ customer, snapshot }: { customer: LiveCustomer; snapshot: LiveOperationsSnapshot }) {
  const subscriptions = snapshot.subscriptions.filter((subscription) => subscription.customerId === customer.id);
  const payments = snapshot.payments.filter((payment) => payment.customerEmail === customer.email);

  return (
    <>
      <PageHeading eyebrow="CRM / Customer" title={customer.displayName} description={customer.email} actions={<a className="button button-primary" href={`mailto:${customer.email}`}>Email customer</a>} />
      <div className={styles.workspaceGrid}>
        <div className={styles.stack}>
          <section className="panel">
            <header className="panel-header"><div><h2>Subscriptions</h2><p>Current Stripe source records</p></div></header>
            {subscriptions.length === 0 ? <HonestEmpty title="No Stripe subscriptions" detail="This identity has no subscription record in the connected Stripe account." /> : (
              <div className="table-scroll"><table className="data-table"><thead><tr><th>Subscription</th><th>Plans</th><th>Status</th><th>MRR</th><th>Period end</th></tr></thead><tbody>{subscriptions.map((subscription) => <tr key={subscription.id}><td><a className={styles.recordLink} href={`https://dashboard.stripe.com/subscriptions/${subscription.id}`} rel="noreferrer" target="_blank">{subscription.id}<ExternalLink aria-hidden size={12} /></a></td><td>{subscription.planNames.join(", ") || "Price only"}</td><td><StatusBadge tone={["active", "trialing"].includes(subscription.status) ? "green" : "orange"}>{subscription.status}</StatusBadge></td><td>{formatMoney(subscription.mrrCents, subscription.currency)}</td><td>{subscription.currentPeriodEnd ? formatDate(subscription.currentPeriodEnd) : "Unavailable"}</td></tr>)}</tbody></table></div>
            )}
          </section>
          <section className="panel">
            <header className="panel-header"><div><h2>Payments</h2><p>Stripe charge history returned for this email</p></div></header>
            {payments.length === 0 ? <HonestEmpty title="No payments" detail="Stripe returned no charges for this customer." /> : <PaymentTable payments={payments} />}
          </section>
        </div>
        <div className={styles.stack}>
          <section className="panel">
            <header className="panel-header"><div><h2>Identity links</h2><p>Immutable external references</p></div></header>
            <dl className={styles.definitionGrid}>
              <div><dt>Clerk user</dt><dd>{customer.clerkUserId ?? "Not linked"}</dd></div>
              <div><dt>Stripe customer</dt><dd>{customer.stripeCustomerId ?? "Not linked"}</dd></div>
              <div><dt>Sources</dt><dd>{customer.sources.join(" + ")}</dd></div>
              <div><dt>First observed</dt><dd>{formatDate(customer.createdAt)}</dd></div>
              <div><dt>Last sign-in</dt><dd>{customer.lastActiveAt ? formatDate(customer.lastActiveAt, true) : "Never"}</dd></div>
              <div><dt>Relationship stage</dt><dd>{customer.lifecycle}</dd></div>
            </dl>
          </section>
          <section className="panel">
            <header className="panel-header"><div><h2>Product activity</h2><p>Current connector capability</p></div></header>
            <div className={styles.notice}><CircleAlert aria-hidden size={18} /><span>GMC and VCS currently verify service access only. They do not yet provide an Operations endpoint that lists usage or entitlements for every customer, so this page does not guess those values.</span></div>
          </section>
          <Link className="button button-secondary" href="/crm">Back to CRM</Link>
        </div>
      </div>
    </>
  );
}

/** Purpose: Renders the real subscription list and clearly scopes current reconciliation capability. */
export function LiveSubscriptions({ snapshot }: WorkspaceProps) {
  return (
    <>
      <PageHeading title="Subscriptions" description="Stripe recurring billing and current reconciliation coverage" actions={<Freshness checkedAt={snapshot.checkedAt} />} />
      <div className={styles.notice}><CircleAlert aria-hidden size={18} /><span><strong>What is reconciled today:</strong> Stripe subscriptions are matched to Clerk identities by email. GMC and VCS availability checks do not yet supply per-customer entitlement lists, so product-access conflicts remain unavailable rather than being reported as zero.</span></div>
      <section className={styles.metricGrid}>
        <div className={styles.metric}><span>Active subscribers</span><strong>{snapshot.totals.activeSubscribers}</strong><small>Active, trialing, or past-due Stripe customers</small></div>
        <div className={styles.metric}><span>MRR</span><strong>{formatMoney(snapshot.totals.monthlyRecurringCents, snapshot.totals.currency)}</strong><small>Normalized active recurring prices</small></div>
        <div className={styles.metric}><span>Revenue at risk</span><strong>{formatMoney(snapshot.totals.revenueAtRiskCents, snapshot.totals.currency)}</strong><small>Past due, unpaid, or canceling subscriptions</small></div>
        <div className={styles.metric}><span>Product entitlement conflicts</span><strong>Unavailable</strong><small>Needs a per-customer product access feed</small></div>
      </section>
      <section className="panel">
        <header className="panel-header"><div><h2>{snapshot.subscriptions.length} Stripe subscription{snapshot.subscriptions.length === 1 ? "" : "s"}</h2><p>All current statuses</p></div></header>
        {snapshot.subscriptions.length === 0 ? <HonestEmpty title={sourceReadFailed(snapshot, "stripe") ? "Stripe subscriptions could not be read" : "No subscriptions in Stripe"} detail={sourceReadFailed(snapshot, "stripe") ? "The Stripe read failed for this request. Check Settings and retry before treating subscriptions as empty." : "The connected Stripe account currently has no subscription records. This is a verified zero-result, not a connector failure."} /> : (
          <div className="table-scroll"><table className="data-table"><thead><tr><th>Customer</th><th>Plan</th><th>Status</th><th>MRR</th><th>Current period end</th></tr></thead><tbody>{snapshot.subscriptions.map((subscription) => <tr key={subscription.id}><td><Link className={styles.recordLink} href={`/crm/${encodeURIComponent(subscription.customerId)}`}>{subscription.customerName}</Link><small className={styles.subtle}>{subscription.customerEmail}</small></td><td>{subscription.planNames.join(", ") || "Price only"}</td><td><StatusBadge tone={["active", "trialing"].includes(subscription.status) ? "green" : "orange"}>{subscription.status}{subscription.cancelAtPeriodEnd ? " · canceling" : ""}</StatusBadge></td><td>{formatMoney(subscription.mrrCents, subscription.currency)}</td><td>{subscription.currentPeriodEnd ? formatDate(subscription.currentPeriodEnd) : "Unavailable"}</td></tr>)}</tbody></table></div>
        )}
      </section>
    </>
  );
}

/** Purpose: Renders a reusable source-backed Stripe payment table. */
function PaymentTable({ payments }: { payments: LiveOperationsSnapshot["payments"] }) {
  return (
    <div className="table-scroll"><table className="data-table"><thead><tr><th>Payment</th><th>Customer</th><th>Gross</th><th>Refunded</th><th>Fee</th><th>Status</th><th>Date</th></tr></thead><tbody>{payments.map((payment) => <tr key={payment.id}><td><a className={styles.recordLink} href={`https://dashboard.stripe.com/payments/${payment.id}`} rel="noreferrer" target="_blank">{payment.description}<ExternalLink aria-hidden size={12} /></a><small className={styles.subtle}>{payment.id}</small></td><td>{payment.customerName}<small className={styles.subtle}>{payment.customerEmail}</small></td><td>{formatMoney(payment.grossCents, payment.currency)}</td><td>{formatMoney(payment.refundedCents, payment.currency)}</td><td>{payment.feeCents === null ? "Unavailable" : formatMoney(payment.feeCents, payment.currency)}</td><td><StatusBadge tone={payment.status === "succeeded" ? "green" : "red"}>{payment.status}</StatusBadge></td><td>{formatDate(payment.createdAt)}</td></tr>)}</tbody></table></div>
  );
}

/** Purpose: Renders current Stripe financial facts without inventing unconnected costs or margins. */
export function LiveAccounting({ snapshot, title = "Accounting" }: WorkspaceProps & { title?: string }) {
  const currency = snapshot.totals.currency;
  const feesLabel = snapshot.totals.feesCents === null ? "Unavailable" : formatMoney(snapshot.totals.feesCents, currency);
  return (
    <>
      <PageHeading title={title} description="Stripe collections, refunds, and processing fees" actions={<Freshness checkedAt={snapshot.checkedAt} />} />
      <div className={styles.notice}><CircleDollarSign aria-hidden size={18} /><span><strong>Financial scope:</strong> revenue and Stripe fees are live. Direct product costs, marketing spend, bank reconciliation, taxes, and accounting-ledger data are not connected, so profit and contribution margin are not calculated.</span></div>
      <section className={styles.metricGrid}>
        <div className={styles.metric}><span>Net collected</span><strong>{formatMoney(snapshot.totals.collectedCents, currency)}</strong><small>Successful charges less refunds</small></div>
        <div className={styles.metric}><span>Refunded</span><strong>{formatMoney(snapshot.totals.refundedCents, currency)}</strong><small>Amount returned on Stripe charges</small></div>
        <div className={styles.metric}><span>Stripe fees</span><strong>{feesLabel}</strong><small>Expanded balance-transaction fees</small></div>
        <div className={styles.metric}><span>Profit</span><strong>Unavailable</strong><small>Costs are not connected</small></div>
      </section>
      <section className="panel"><header className="panel-header"><div><h2>Payment activity</h2><p>{snapshot.payments.length} Stripe charge{snapshot.payments.length === 1 ? "" : "s"} returned</p></div></header>{snapshot.payments.length === 0 ? <HonestEmpty title={sourceReadFailed(snapshot, "stripe") ? "Stripe payments could not be read" : "No Stripe payments"} detail={sourceReadFailed(snapshot, "stripe") ? "The Stripe read failed for this request. Check Settings and retry before treating payment activity as empty." : "The connected Stripe account currently has no charge records."} /> : <PaymentTable payments={snapshot.payments} />}</section>
    </>
  );
}

/** Purpose: Renders active subscription products and the approved merch collection. */
function ProductWorkspace({ snapshot }: WorkspaceProps) {
  return (
    <>
      <PageHeading title="Products" description="Subscriptions, pricing, merchandise, and verified customer counts" actions={<Freshness checkedAt={snapshot.checkedAt} />} />
      <div className={styles.notice}><Database aria-hidden size={18} /><span><strong>What the counts mean:</strong> subscribers are distinct customers with active, trialing, or past-due Stripe subscriptions. Merch units include paid Fourthwall orders recorded by the signed webhook; orders from before that ledger are not inferred.</span></div>
      <div className={styles.stack}>
        <section className="panel"><header className="panel-header"><div><h2>Subscriptions & digital products</h2><p>{snapshot.products.length} active Stripe product{snapshot.products.length === 1 ? "" : "s"}</p></div><a href="https://dashboard.stripe.com/products" rel="noreferrer" target="_blank">Open Stripe catalog</a></header>{snapshot.products.length === 0 ? <HonestEmpty title={sourceReadFailed(snapshot, "stripe") ? "Stripe products could not be read" : "No active Stripe products"} detail={sourceReadFailed(snapshot, "stripe") ? "The Stripe read failed for this request. Check Settings and retry before treating the catalog as empty." : "The connected Stripe account returned no active products."} /> : <div className="table-scroll"><table className="data-table"><thead><tr><th>Product</th><th>Recurring prices</th><th>One-time prices</th><th>Active subscribers</th><th>Created</th></tr></thead><tbody>{snapshot.products.map((product) => <tr key={product.id}><td><a className={styles.recordLink} href={`https://dashboard.stripe.com/products/${product.id}`} rel="noreferrer" target="_blank">{product.name}<ExternalLink aria-hidden size={12} /></a><small className={styles.subtle}>{product.description}</small></td><td><div className={styles.priceList}>{product.recurringPrices.length > 0 ? product.recurringPrices.map((price) => <span key={price}>{price}</span>) : "None"}</div></td><td><div className={styles.priceList}>{product.oneTimePrices.length > 0 ? product.oneTimePrices.map((price) => <span key={price}>{price}</span>) : "None"}</div></td><td><strong>{product.subscriberCount}</strong></td><td>{formatDate(product.createdAt)}</td></tr>)}</tbody></table></div>}</section>
        <section className="panel"><header className="panel-header"><div><h2>Merchandise</h2><p>Current approved Fourthwall collection</p></div><a href="https://sixsmith-games-shop.fourthwall.com" rel="noreferrer" target="_blank">Open merch store</a></header>{snapshot.merchProducts.length === 0 ? <HonestEmpty title={sourceReadFailed(snapshot, "merch-catalog") ? "Merchandise could not be read" : "No approved merchandise"} detail={sourceReadFailed(snapshot, "merch-catalog") ? "The public Sixsmith Games merch catalog did not answer this request. Retry before treating the collection as empty." : "No products with verified Fourthwall listings are currently published."} /> : <div className="table-scroll"><table className="data-table"><thead><tr><th>Merch item</th><th>Category</th><th>Current listing price</th><th>Studio bonus</th><th>Tracked units sold</th><th>Store</th></tr></thead><tbody>{snapshot.merchProducts.map((product) => <tr key={product.slug}><td><strong>{product.name}</strong></td><td>{product.category}</td><td>{product.price}</td><td>{product.freeStudioMonths} {product.freeStudioMonths === 1 ? "month" : "months"}</td><td><strong>{product.unitsSold ?? "Unavailable"}</strong></td><td><a className={styles.recordLink} href={product.shopUrl} rel="noreferrer" target="_blank">View listing<ExternalLink aria-hidden size={12} /></a></td></tr>)}</tbody></table></div>}</section>
      </div>
    </>
  );
}

/** Purpose: Renders connected data or an actionable honest zero state for compact sidebar domains. */
export function LiveSectionWorkspace({ section, snapshot }: WorkspaceProps & { section: string }) {
  if (section === "orders") {
    return <><PageHeading title="Orders & Payments" description="One-time and recurring Stripe charge activity" actions={<Freshness checkedAt={snapshot.checkedAt} />} /><section className="panel"><header className="panel-header"><div><h2>Payments</h2><p>Source: Stripe charges</p></div></header>{snapshot.payments.length === 0 ? <HonestEmpty title={sourceReadFailed(snapshot, "stripe") ? "Stripe payments could not be read" : "No orders or payments yet"} detail={sourceReadFailed(snapshot, "stripe") ? "The Stripe read failed for this request. Check Settings and retry before treating payment activity as empty." : "Stripe returned zero charge records. When the first checkout succeeds, it will appear here automatically."} /> : <PaymentTable payments={snapshot.payments} />}</section></>;
  }

  if (section === "products") return <ProductWorkspace snapshot={snapshot} />;
  if (section === "accounting") return <LiveAccounting snapshot={snapshot} />;

  if (section === "approvals") {
    return <><PageHeading title="Tasks & Approvals" description="Internal decisions, exceptions, and audit-backed work" actions={<Freshness checkedAt={snapshot.checkedAt} />} /><section className={styles.metricGrid}><div className={styles.metric}><span>Pending approvals</span><strong>{snapshot.internal.pendingApprovals}</strong><small>Exact proposals awaiting a decision</small></div><div className={styles.metric}><span>Open exceptions</span><strong>{snapshot.internal.openExceptions}</strong><small>Unresolved internal exceptions</small></div><div className={styles.metric}><span>Critical / high</span><strong>{snapshot.internal.criticalExceptions}</strong><small>Highest-severity open items</small></div><div className={styles.metric}><span>Audit events</span><strong>{snapshot.internal.auditEvents}</strong><small>Recorded internal history</small></div></section><section className="panel"><HonestEmpty title="No work is waiting for approval" detail="The Operations database is connected and currently contains no pending approvals or open exceptions." /></section></>;
  }

  if (section === "marketing") {
    return <><PageHeading title="Marketing" description="Campaign planning and performance owned by Operations" actions={<Freshness checkedAt={snapshot.checkedAt} />} /><section className="panel"><HonestEmpty title="No campaigns have been created" detail="The Operations database is connected and contains no campaign records. Product-app availability does not create marketing campaigns or performance data." /></section></>;
  }

  if (section === "support") {
    return <><PageHeading title="Support" description="Customer cases, product issues, and resolution evidence" actions={<Freshness checkedAt={snapshot.checkedAt} />} /><div className={styles.notice}><CircleAlert aria-hidden size={18} /><span>No support inbox or case system is connected to Operations. If customer support is currently handled in Gmail, those messages will not appear here until an approved mailbox integration is added.</span></div><section className="panel"><HonestEmpty title="No support cases in Operations" detail="This is an empty internal queue. It does not claim that the business inbox has no customer messages." /></section></>;
  }

  if (section === "reports") {
    return <><PageHeading title="Reports" description="Reproducible views generated from the current live snapshot" actions={<Freshness checkedAt={snapshot.checkedAt} />} /><div className={styles.reportGrid}><Link className={styles.reportCard} href="/dashboard"><span>Current</span><strong>Executive operating snapshot</strong><p>Subscribers, MRR, collected revenue, attention queue, catalog, and source health.</p></Link><Link className={styles.reportCard} href="/crm"><span>Current</span><strong>CRM and identity report</strong><p>{snapshot.customers.length} normalized Clerk and Stripe customer records.</p></Link><Link className={styles.reportCard} href="/subscriptions/reconciliation"><span>Current</span><strong>Subscription report</strong><p>{snapshot.subscriptions.length} Stripe subscriptions with normalized MRR and risk status.</p></Link><Link className={styles.reportCard} href="/orders"><span>Current</span><strong>Payments report</strong><p>{snapshot.payments.length} Stripe charge records with refunds and available fees.</p></Link><Link className={styles.reportCard} href="/products"><span>Current</span><strong>Product and pricing report</strong><p>{snapshot.products.length} active Stripe products plus {snapshot.merchProducts.length} current merch listings.</p></Link><Link className={styles.reportCard} href="/accounting"><span>Current</span><strong>Financial operations report</strong><p>Collected revenue, refunds, fees, and clearly unavailable cost fields.</p></Link></div></>;
  }

  return <><PageHeading title="Workspace" description="This operations route is not implemented" /><section className="panel"><HonestEmpty title="Unknown workspace" detail="Use the primary navigation to open a supported operations view." /></section></>;
}
