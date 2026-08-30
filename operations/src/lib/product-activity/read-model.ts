import "server-only";

import { PRODUCT_ACTIVITY_METRIC_VERSION } from "@sixsmith-games/product-activity-contracts";
import { and, count, desc, eq, gte, max, min } from "drizzle-orm";
import { getDatabase } from "@/db/client";
import {
  PRODUCTS,
  PRODUCT_ACCOUNTS,
  PRODUCT_ACTIVITY_DAILY,
  PRODUCT_ACTIVITY_EVENTS,
  PRODUCT_ENTITY_SNAPSHOTS,
  PRODUCT_EVENT_REJECTIONS,
  PRODUCT_INGESTION_CURSORS,
  SOURCE_IDENTITIES,
} from "@/db/schema";
import { requireAuthorizedOperationsUser } from "@/lib/auth/authorized-user";
import {
  getProductActivityRuntimeConfig,
  type ProductActivityRuntimeConfig,
} from "@/lib/product-activity/config";
import { synchronizeAllProductActivitySources } from "@/lib/product-activity/ingestion";
import {
  PREVIEW_CUSTOMER_PRODUCT_ACTIVITY,
  PREVIEW_PRODUCT_ACTIVITY_PORTFOLIO,
} from "@/lib/product-activity/preview";
import type {
  CustomerProductActivityCard,
  CustomerProductActivitySnapshot,
  ProductActivityDisplayState,
  ProductActivityPortfolioProduct,
  ProductActivityPortfolioSnapshot,
  ProductActivitySourceView,
  ProductActivityTimelineItem,
} from "@/lib/product-activity/types";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function utcDateOffset(days: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatFreshness(value: Date | null): string {
  if (!value) return "Never synchronized";
  const minutes = Math.max(0, Math.round((Date.now() - value.getTime()) / 60_000));
  if (minutes < 2) return "Just now";
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} hours ago`;
  return `${Math.round(hours / 24)} days ago`;
}

const STATE_PRIORITY: Record<ProductActivityDisplayState, number> = {
  unavailable: 6,
  rejected: 5,
  stale: 4,
  unconfigured: 3,
  disabled: 2,
  fresh: 1,
};

function worstState(states: ProductActivityDisplayState[]): ProductActivityDisplayState {
  return states.sort((a, b) => STATE_PRIORITY[b] - STATE_PRIORITY[a])[0] ?? "unconfigured";
}

function buildSourceViews(
  config: ProductActivityRuntimeConfig,
  cursors: Array<typeof PRODUCT_INGESTION_CURSORS.$inferSelect>,
): ProductActivitySourceView[] {
  return config.sources.map((source) => {
    const cursor = cursors.find((record) => record.sourceKey === source.key && record.environment === source.environment);
    let state: ProductActivityDisplayState = source.enabled ? cursor?.status ?? "unconfigured" : "disabled";
    const freshnessTimestamp = cursor?.sourceGeneratedAt ?? cursor?.lastSuccessfulSyncAt ?? null;
    if (state === "fresh" && freshnessTimestamp && Date.now() - freshnessTimestamp.getTime() > config.staleAfterMinutes * 60_000) {
      state = "stale";
    }
    const genuineZeroActivity = state === "fresh" && Boolean(cursor?.lastSuccessfulSyncAt) && (cursor?.acceptedEventCount ?? 0) === 0;
    const detail = state === "unavailable"
      ? cursor?.lastErrorSummary ?? "The source is unavailable; activity is not treated as zero."
      : state === "rejected"
        ? cursor?.lastErrorSummary ?? "One or more source records require review."
        : state === "stale"
          ? "The last successful projection is retained and labeled stale."
          : state === "disabled"
            ? "This source is explicitly feature-gated."
            : state === "unconfigured"
              ? "The source has not completed its first synchronization."
              : genuineZeroActivity
                ? "Source is healthy and returned genuine zero activity."
                : "Source cursor and projection are current.";
    return {
      key: source.key,
      label: source.label,
      state,
      environment: source.environment,
      lastSuccessfulSyncAt: cursor?.lastSuccessfulSyncAt?.toISOString() ?? null,
      freshnessLabel: state === "disabled" ? "Disabled" : formatFreshness(freshnessTimestamp),
      acceptedEvents: cursor?.acceptedEventCount ?? 0,
      rejectedRecords: cursor?.rejectedEventCount ?? 0,
      genuineZeroActivity,
      detail,
    };
  });
}

function buildDisabledPortfolio(
  state: "disabled" | "unconfigured" | "unavailable",
  message: string,
  autoSyncEnabled = false,
): ProductActivityPortfolioSnapshot {
  return {
    mode: "connected",
    ledgerState: state,
    checkedAt: new Date().toISOString(),
    metricVersion: PRODUCT_ACTIVITY_METRIC_VERSION,
    autoSyncEnabled,
    summary: { dau: 0, wau: 0, mau: 0, activeSeconds30: 0, sessions30: 0, completions30: 0, internalEvents30: 0 },
    products: [],
    sources: [],
    recentEvents: [],
    rejections: [],
    message,
  };
}

function activeCustomers(
  rows: Array<{ customerId: string; activityDate: string; meaningfulEventCount: number }>,
  startDate: string,
  exactDate = false,
): Set<string> {
  return new Set(rows.filter((row) => row.meaningfulEventCount > 0 && (exactDate ? row.activityDate === startDate : row.activityDate >= startDate)).map((row) => row.customerId));
}

function sourceStateForProduct(
  slug: string,
  config: ProductActivityRuntimeConfig,
  sources: ProductActivitySourceView[],
): ProductActivityDisplayState {
  const sourceKeys = config.sources.filter((source) => source.productSlugs.includes(slug as never)).map((source) => source.key);
  return worstState(sources.filter((source) => sourceKeys.includes(source.key)).map((source) => source.state));
}

/**
 * Purpose: Builds the authorized portfolio projection from daily rollups, immutable events, and source cursors.
 * Parameters: None; runtime flags select synthetic preview or the connected Neon ledger.
 * Returns: DAU/WAU/MAU, completion, activity, product, source-health, timeline, and rejection views.
 * Side effects: Enforces owner access, optionally synchronizes enabled sources, and otherwise performs read-only database queries.
 */
export async function getProductActivityPortfolioSnapshot(): Promise<ProductActivityPortfolioSnapshot> {
  const user = await requireAuthorizedOperationsUser();
  if (user.isPreview) return PREVIEW_PRODUCT_ACTIVITY_PORTFOLIO;

  const config = getProductActivityRuntimeConfig();
  if (!config.ledgerEnabled) {
    return buildDisabledPortfolio("disabled", "The product activity ledger is feature-gated. Web analytics remains available as a separate consent-controlled data class.");
  }
  if (config.sourceConfigurationError) {
    return buildDisabledPortfolio("unconfigured", config.sourceConfigurationError, config.autoSyncEnabled);
  }
  if (config.autoSyncEnabled) await synchronizeAllProductActivitySources();

  try {
    const database = getDatabase();
    const cutoff90 = utcDateOffset(-89);
    const cutoff30 = utcDateOffset(-29);
    const cutoff7 = utcDateOffset(-6);
    const today = utcDateOffset(0);
    const [dailyRows, eventBounds, eventGroups, recentEvents, cursors, rejections, internalCount] = await Promise.all([
      database.select({
        customerId: PRODUCT_ACTIVITY_DAILY.customerId,
        productId: PRODUCT_ACTIVITY_DAILY.productId,
        productSlug: PRODUCTS.slug,
        productName: PRODUCTS.name,
        activityDate: PRODUCT_ACTIVITY_DAILY.activityDate,
        usageContext: PRODUCT_ACTIVITY_DAILY.usageContext,
        environment: PRODUCT_ACTIVITY_DAILY.environment,
        meaningfulEventCount: PRODUCT_ACTIVITY_DAILY.meaningfulEventCount,
        sessionCount: PRODUCT_ACTIVITY_DAILY.sessionCount,
        completionCount: PRODUCT_ACTIVITY_DAILY.completionCount,
        activeSeconds: PRODUCT_ACTIVITY_DAILY.activeSeconds,
      }).from(PRODUCT_ACTIVITY_DAILY).innerJoin(PRODUCTS, eq(PRODUCT_ACTIVITY_DAILY.productId, PRODUCTS.id)).where(gte(PRODUCT_ACTIVITY_DAILY.activityDate, cutoff90)),
      database.select({
        productId: PRODUCT_ACTIVITY_EVENTS.productId,
        productSlug: PRODUCTS.slug,
        productName: PRODUCTS.name,
        firstUsedAt: min(PRODUCT_ACTIVITY_EVENTS.occurredAt),
        lastUsedAt: max(PRODUCT_ACTIVITY_EVENTS.occurredAt),
      }).from(PRODUCT_ACTIVITY_EVENTS).innerJoin(PRODUCTS, eq(PRODUCT_ACTIVITY_EVENTS.productId, PRODUCTS.id)).where(and(
        eq(PRODUCT_ACTIVITY_EVENTS.environment, "production"),
        eq(PRODUCT_ACTIVITY_EVENTS.usageContext, "customer"),
        eq(PRODUCT_ACTIVITY_EVENTS.isMeaningful, true),
      )).groupBy(PRODUCT_ACTIVITY_EVENTS.productId, PRODUCTS.slug, PRODUCTS.name),
      database.select({
        productId: PRODUCT_ACTIVITY_EVENTS.productId,
        eventType: PRODUCT_ACTIVITY_EVENTS.eventType,
        value: count(PRODUCT_ACTIVITY_EVENTS.id),
      }).from(PRODUCT_ACTIVITY_EVENTS).where(and(
        eq(PRODUCT_ACTIVITY_EVENTS.environment, "production"),
        eq(PRODUCT_ACTIVITY_EVENTS.usageContext, "customer"),
        gte(PRODUCT_ACTIVITY_EVENTS.occurredAt, new Date(`${cutoff30}T00:00:00.000Z`)),
      )).groupBy(PRODUCT_ACTIVITY_EVENTS.productId, PRODUCT_ACTIVITY_EVENTS.eventType),
      database.select({
        id: PRODUCT_ACTIVITY_EVENTS.id,
        productSlug: PRODUCTS.slug,
        productName: PRODUCTS.name,
        eventType: PRODUCT_ACTIVITY_EVENTS.eventType,
        occurredAt: PRODUCT_ACTIVITY_EVENTS.occurredAt,
        authorityClass: PRODUCT_ACTIVITY_EVENTS.authorityClass,
        usageContext: PRODUCT_ACTIVITY_EVENTS.usageContext,
        environment: PRODUCT_ACTIVITY_EVENTS.environment,
        outcome: PRODUCT_ACTIVITY_EVENTS.outcome,
        aggregateType: PRODUCT_ACTIVITY_EVENTS.aggregateType,
        sourceAggregateId: PRODUCT_ACTIVITY_EVENTS.sourceAggregateId,
        sourceKey: PRODUCT_ACTIVITY_EVENTS.sourceKey,
      }).from(PRODUCT_ACTIVITY_EVENTS).innerJoin(PRODUCTS, eq(PRODUCT_ACTIVITY_EVENTS.productId, PRODUCTS.id)).orderBy(desc(PRODUCT_ACTIVITY_EVENTS.occurredAt)).limit(50),
      database.select().from(PRODUCT_INGESTION_CURSORS),
      database.select().from(PRODUCT_EVENT_REJECTIONS).orderBy(desc(PRODUCT_EVENT_REJECTIONS.rejectedAt)).limit(25),
      database.select({ value: count(PRODUCT_ACTIVITY_EVENTS.id) }).from(PRODUCT_ACTIVITY_EVENTS).where(and(
        gte(PRODUCT_ACTIVITY_EVENTS.occurredAt, new Date(`${cutoff30}T00:00:00.000Z`)),
        eq(PRODUCT_ACTIVITY_EVENTS.environment, "production"),
        eq(PRODUCT_ACTIVITY_EVENTS.usageContext, "internal_test"),
      )),
    ]);

    const productionCustomerRows = dailyRows.filter((row) => row.environment === "production" && row.usageContext === "customer");
    const sources = buildSourceViews(config, cursors);
    const products: ProductActivityPortfolioProduct[] = eventBounds.map((bounds) => {
      const rows = productionCustomerRows.filter((row) => row.productId === bounds.productId);
      const rows30 = rows.filter((row) => row.activityDate >= cutoff30);
      const customerDays = new Map<string, Set<string>>();
      for (const row of rows30.filter((value) => value.meaningfulEventCount > 0)) {
        const days = customerDays.get(row.customerId) ?? new Set<string>();
        days.add(row.activityDate);
        customerDays.set(row.customerId, days);
      }
      const returningCustomers = [...customerDays.values()].filter((days) => days.size >= 2).length;
      const topEvents = eventGroups.filter((group) => group.productId === bounds.productId).map((group) => ({ eventType: group.eventType, count: Number(group.value) })).sort((a, b) => b.count - a.count).slice(0, 5);
      return {
        slug: bounds.productSlug,
        name: bounds.productName,
        firstUsedAt: bounds.firstUsedAt ? new Date(bounds.firstUsedAt).toISOString() : null,
        lastUsedAt: bounds.lastUsedAt ? new Date(bounds.lastUsedAt).toISOString() : null,
        dau: activeCustomers(rows, today, true).size,
        wau: activeCustomers(rows, cutoff7).size,
        mau: activeCustomers(rows, cutoff30).size,
        activeDays30: new Set(rows30.filter((row) => row.meaningfulEventCount > 0).map((row) => row.activityDate)).size,
        sessions30: rows30.reduce((sum, row) => sum + row.sessionCount, 0),
        completions30: rows30.reduce((sum, row) => sum + row.completionCount, 0),
        activeSeconds30: rows30.reduce((sum, row) => sum + row.activeSeconds, 0),
        returnRate30: customerDays.size > 0 ? Math.round((returningCustomers / customerDays.size) * 100) : 0,
        sourceState: sourceStateForProduct(bounds.productSlug, config, sources),
        topEvents,
      };
    }).sort((a, b) => b.mau - a.mau || a.name.localeCompare(b.name));

    const recentTimeline: ProductActivityTimelineItem[] = recentEvents.map((event) => ({
      ...event,
      occurredAt: event.occurredAt.toISOString(),
    }));
    const enabledSourceStates = sources.filter((source) => source.state !== "disabled").map((source) => source.state);
    const ledgerState = enabledSourceStates.length > 0 ? worstState(enabledSourceStates) : "disabled";
    const rows30 = productionCustomerRows.filter((row) => row.activityDate >= cutoff30);
    return {
      mode: "connected",
      ledgerState,
      checkedAt: new Date().toISOString(),
      metricVersion: PRODUCT_ACTIVITY_METRIC_VERSION,
      autoSyncEnabled: config.autoSyncEnabled,
      summary: {
        dau: activeCustomers(productionCustomerRows, today, true).size,
        wau: activeCustomers(productionCustomerRows, cutoff7).size,
        mau: activeCustomers(productionCustomerRows, cutoff30).size,
        activeSeconds30: rows30.reduce((sum, row) => sum + row.activeSeconds, 0),
        sessions30: rows30.reduce((sum, row) => sum + row.sessionCount, 0),
        completions30: rows30.reduce((sum, row) => sum + row.completionCount, 0),
        internalEvents30: Number(internalCount[0]?.value ?? 0),
      },
      products,
      sources,
      recentEvents: recentTimeline,
      rejections: rejections.map((rejection) => ({
        id: rejection.id,
        sourceKey: rejection.sourceKey,
        code: rejection.rejectionCode,
        summary: rejection.rejectionSummary,
        rejectedAt: rejection.rejectedAt.toISOString(),
        fingerprint: rejection.payloadFingerprint.slice(0, 12),
      })),
      message: products.length === 0 && sources.some((source) => source.genuineZeroActivity)
        ? "Configured sources are healthy and currently report genuine zero customer activity."
        : null,
    };
  } catch (error) {
    console.error(`Product activity projection read failed: ${error instanceof Error ? error.message : "unknown error"}`);
    return buildDisabledPortfolio("unavailable", "The product activity database projection is unavailable. Existing source state is not represented as zero activity.", config.autoSyncEnabled);
  }
}

async function resolveDatabaseCustomerId(routeCustomerId: string): Promise<string | null> {
  if (UUID_PATTERN.test(routeCustomerId)) return routeCustomerId;
  const separator = routeCustomerId.indexOf(":");
  if (separator < 1) return null;
  const provider = routeCustomerId.slice(0, separator);
  const externalId = routeCustomerId.slice(separator + 1);
  if (!provider || !externalId) return null;
  const [identity] = await getDatabase().select({ customerId: SOURCE_IDENTITIES.customerId }).from(SOURCE_IDENTITIES).where(and(
    eq(SOURCE_IDENTITIES.source, provider),
    eq(SOURCE_IDENTITIES.externalId, externalId),
  )).limit(1);
  return identity?.customerId ?? null;
}

/**
 * Purpose: Loads the owner-only product cards, owned-object summaries, and activity timeline for Customer 360.
 * Parameters: routeCustomerId may be an Operations UUID or a stable `provider:externalId` route identity.
 * Returns: A source-labeled customer projection without joining by display name or unverified email.
 * Side effects: Enforces owner authorization and performs read-only connected database queries.
 */
export async function getCustomerProductActivitySnapshot(
  routeCustomerId: string,
): Promise<CustomerProductActivitySnapshot> {
  const user = await requireAuthorizedOperationsUser();
  if (user.isPreview) return PREVIEW_CUSTOMER_PRODUCT_ACTIVITY;
  const config = getProductActivityRuntimeConfig();
  if (!config.ledgerEnabled) return { mode: "connected", state: "disabled", databaseCustomerId: null, products: [], timeline: [], message: "Product activity is feature-gated." };
  if (config.sourceConfigurationError) return { mode: "connected", state: "unconfigured", databaseCustomerId: null, products: [], timeline: [], message: config.sourceConfigurationError };

  try {
    const databaseCustomerId = await resolveDatabaseCustomerId(routeCustomerId);
    if (!databaseCustomerId) return { mode: "connected", state: "empty", databaseCustomerId: null, products: [], timeline: [], message: "No explicit stable source-identity link connects this customer to the product ledger." };
    const cutoff90 = utcDateOffset(-89);
    const cutoff30 = utcDateOffset(-29);
    const cutoff7 = utcDateOffset(-6);
    const [accounts, daily, entities, events, cursors] = await Promise.all([
      getDatabase().select({
        id: PRODUCT_ACCOUNTS.id,
        productId: PRODUCT_ACCOUNTS.productId,
        productSlug: PRODUCTS.slug,
        productName: PRODUCTS.name,
        sourceKey: PRODUCT_ACCOUNTS.sourceKey,
        firstSeenAt: PRODUCT_ACCOUNTS.firstSeenAt,
        lastMeaningfulActivityAt: PRODUCT_ACCOUNTS.lastMeaningfulActivityAt,
      }).from(PRODUCT_ACCOUNTS).innerJoin(PRODUCTS, eq(PRODUCT_ACCOUNTS.productId, PRODUCTS.id)).where(eq(PRODUCT_ACCOUNTS.customerId, databaseCustomerId)),
      getDatabase().select().from(PRODUCT_ACTIVITY_DAILY).where(and(
        eq(PRODUCT_ACTIVITY_DAILY.customerId, databaseCustomerId),
        gte(PRODUCT_ACTIVITY_DAILY.activityDate, cutoff90),
      )),
      getDatabase().select().from(PRODUCT_ENTITY_SNAPSHOTS).where(eq(PRODUCT_ENTITY_SNAPSHOTS.customerId, databaseCustomerId)).orderBy(desc(PRODUCT_ENTITY_SNAPSHOTS.lastMeaningfulActivityAt)),
      getDatabase().select({
        id: PRODUCT_ACTIVITY_EVENTS.id,
        productId: PRODUCT_ACTIVITY_EVENTS.productId,
        productSlug: PRODUCTS.slug,
        productName: PRODUCTS.name,
        eventType: PRODUCT_ACTIVITY_EVENTS.eventType,
        occurredAt: PRODUCT_ACTIVITY_EVENTS.occurredAt,
        authorityClass: PRODUCT_ACTIVITY_EVENTS.authorityClass,
        usageContext: PRODUCT_ACTIVITY_EVENTS.usageContext,
        environment: PRODUCT_ACTIVITY_EVENTS.environment,
        outcome: PRODUCT_ACTIVITY_EVENTS.outcome,
        aggregateType: PRODUCT_ACTIVITY_EVENTS.aggregateType,
        sourceAggregateId: PRODUCT_ACTIVITY_EVENTS.sourceAggregateId,
        sourceKey: PRODUCT_ACTIVITY_EVENTS.sourceKey,
      }).from(PRODUCT_ACTIVITY_EVENTS).innerJoin(PRODUCTS, eq(PRODUCT_ACTIVITY_EVENTS.productId, PRODUCTS.id)).where(eq(PRODUCT_ACTIVITY_EVENTS.customerId, databaseCustomerId)).orderBy(desc(PRODUCT_ACTIVITY_EVENTS.occurredAt)).limit(100),
      getDatabase().select().from(PRODUCT_INGESTION_CURSORS),
    ]);
    const sources = buildSourceViews(config, cursors);
    const cards: CustomerProductActivityCard[] = accounts.map((account) => {
      const productDaily = daily.filter((row) => row.productId === account.productId && row.environment === "production" && row.usageContext === "customer");
      const rows30 = productDaily.filter((row) => row.activityDate >= cutoff30);
      const productEvents = events.filter((event) => event.productId === account.productId);
      return {
        slug: account.productSlug,
        name: account.productName,
        firstUsedAt: account.firstSeenAt.toISOString(),
        lastUsedAt: account.lastMeaningfulActivityAt?.toISOString() ?? null,
        activeDays7: new Set(productDaily.filter((row) => row.activityDate >= cutoff7 && row.meaningfulEventCount > 0).map((row) => row.activityDate)).size,
        activeDays30: new Set(rows30.filter((row) => row.meaningfulEventCount > 0).map((row) => row.activityDate)).size,
        activeDays90: new Set(productDaily.filter((row) => row.meaningfulEventCount > 0).map((row) => row.activityDate)).size,
        sessions30: rows30.reduce((sum, row) => sum + row.sessionCount, 0),
        completions30: rows30.reduce((sum, row) => sum + row.completionCount, 0),
        activeSeconds30: rows30.reduce((sum, row) => sum + row.activeSeconds, 0),
        sourceState: sources.find((source) => source.key === account.sourceKey)?.state ?? "unconfigured",
        sourceKey: account.sourceKey,
        authorityClasses: [...new Set(productEvents.map((event) => event.authorityClass))],
        entities: entities.filter((entity) => entity.productAccountId === account.id).map((entity) => ({
          id: entity.id,
          aggregateType: entity.aggregateType,
          displayLabel: entity.displayLabel ?? `${entity.aggregateType} ${entity.sourceAggregateId}`,
          status: entity.status,
          createdAt: entity.sourceCreatedAt.toISOString(),
          lastMeaningfulActivityAt: entity.lastMeaningfulActivityAt?.toISOString() ?? null,
          counters: entity.counters,
          sourceUrl: entity.sourceUrl,
          authorityClass: entity.authorityClass,
        })),
      };
    }).sort((a, b) => (b.lastUsedAt ?? "").localeCompare(a.lastUsedAt ?? ""));
    return {
      mode: "connected",
      state: cards.length > 0 ? worstState(cards.map((card) => card.sourceState)) : "empty",
      databaseCustomerId,
      products: cards,
      timeline: events.map((event) => ({ ...event, occurredAt: event.occurredAt.toISOString() })),
      message: cards.length > 0 ? null : "The customer has an explicit identity link but no product activity records yet.",
    };
  } catch (error) {
    console.error(`Customer product activity read failed: ${error instanceof Error ? error.message : "unknown error"}`);
    return { mode: "connected", state: "unavailable", databaseCustomerId: null, products: [], timeline: [], message: "Customer product activity is unavailable; it is not represented as zero usage." };
  }
}
