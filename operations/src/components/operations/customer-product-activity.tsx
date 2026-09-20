import Link from "next/link";
import { Activity, Clock3, ExternalLink, ShieldCheck, Trash2 } from "lucide-react";
import { deleteCustomerProductActivityAction } from "@/app/(operations)/product-activity/actions";
import type { CustomerProductActivitySnapshot, ProductActivityDisplayState } from "@/lib/product-activity/types";
import styles from "./product-activity-workspace.module.css";

function displayDate(value: string | null): string {
  if (!value) return "No meaningful use yet";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function displayDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function displayEvent(value: string): string {
  return value.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function stateText(state: ProductActivityDisplayState): string {
  return state.charAt(0).toUpperCase() + state.slice(1);
}

/**
 * Purpose: Adds source-authoritative product cards, owned objects, and activity evidence to Customer 360.
 * Parameters: snapshot is explicitly identity-linked; returnPath anchors the support deletion workflow.
 * Returns: Owner-only customer product activity with source, authority, freshness, and privacy labels.
 * Side effects: The deletion form can invoke a separately authorized destructive Server Action after exact confirmation.
 */
export function CustomerProductActivity({ snapshot, returnPath }: { snapshot: CustomerProductActivitySnapshot; returnPath: string }) {
  return (
    <section className={styles.customerSection} id="product-activity">
      <header className={styles.customerHeading}><div><span className={styles.sectionIcon}><Activity aria-hidden size={19} /></span><div><h2>Product activity ledger</h2><p>Source-authoritative use and owned objects</p></div></div><Link href="/product-activity">Open portfolio report</Link></header>
      {snapshot.message ? <div className={styles.message}>{snapshot.message}</div> : null}
      {snapshot.products.length > 0 ? <div className={styles.customerProductGrid}>{snapshot.products.map((product) => <article key={product.slug} className={styles.customerProductCard}>
        <header><div><strong>{product.name}</strong><small>{product.sourceKey} · {product.authorityClasses.join(" + ")}</small></div><span className={`${styles.state} ${styles[`state${stateText(product.sourceState)}`]}`}>{stateText(product.sourceState)}</span></header>
        <dl><div><dt>First use</dt><dd>{displayDate(product.firstUsedAt)}</dd></div><div><dt>Last meaningful use</dt><dd>{displayDate(product.lastUsedAt)}</dd></div><div><dt>Active days</dt><dd>{product.activeDays7} / {product.activeDays30} / {product.activeDays90}<small>7 / 30 / 90 days</small></dd></div><div><dt>30-day outcomes</dt><dd>{product.completions30}<small>{product.sessions30} usage sessions · {displayDuration(product.activeSeconds30)}</small></dd></div></dl>
        <div className={styles.entities}><strong>Owned objects</strong>{product.entities.length > 0 ? product.entities.map((entity) => <div key={entity.id}><span><b>{entity.displayLabel}</b><small>{entity.aggregateType} · {entity.status} · {entity.authorityClass}</small></span><span>{Object.entries(entity.counters).slice(0, 3).map(([key, value]) => <em key={key}>{key.replaceAll("_", " ")}: {value}</em>)}</span>{entity.sourceUrl ? <a aria-label={`Open ${entity.displayLabel} in ${product.name}`} href={entity.sourceUrl} rel="noreferrer" target="_blank"><ExternalLink aria-hidden size={15} /></a> : null}</div>) : <p>No current entity summaries.</p>}</div>
      </article>)}</div> : <div className={styles.empty}><Clock3 aria-hidden size={26} /><strong>No linked product activity</strong><p>{snapshot.state === "empty" ? "A missing explicit identity link or genuine zero is shown separately from source failure." : "The current state is not represented as zero activity."}</p></div>}

      {snapshot.timeline.length > 0 ? <div className={styles.customerTimeline}><h3>Product timeline</h3>{snapshot.timeline.slice(0, 12).map((event) => <div key={event.id}><time>{displayDate(event.occurredAt)}</time><span><strong>{displayEvent(event.eventType)}</strong><small>{event.productName} · {event.authorityClass} · {event.usageContext} · {event.outcome}</small></span></div>)}</div> : null}

      <div className={styles.customerPrivacy}><ShieldCheck aria-hidden size={19} /><p>Owner-visible labels are private customer data. They stay inside Operations and are not forwarded to optional analytics.</p></div>

      {snapshot.mode === "connected" && snapshot.databaseCustomerId ? <details className={styles.deletionWorkflow}><summary><Trash2 aria-hidden size={16} />Support deletion workflow</summary><p>This permanently removes this customer&apos;s detailed events, daily rollups, owned-object summaries, and product-account links from Operations. The source application remains authoritative.</p><form action={deleteCustomerProductActivityAction}><input name="customerId" type="hidden" value={snapshot.databaseCustomerId} /><input name="returnPath" type="hidden" value={returnPath} /><label htmlFor="activity-deletion-confirmation">Type <code>DELETE PRODUCT ACTIVITY</code> to confirm</label><input autoComplete="off" id="activity-deletion-confirmation" name="confirmation" required /><button className={styles.deleteButton} type="submit"><Trash2 aria-hidden size={15} />Delete activity ledger data</button></form></details> : null}
    </section>
  );
}
