import "server-only";

import { createHash } from "node:crypto";
import {
  eventCountsAsMeaningfulUse,
  getProductActivityMetricContribution,
  validateProductActivityEvent,
  validateProductActivitySourceHealth,
  validateProductEntitySnapshot,
  type ProductActivityEvent,
  type ProductEntitySnapshot,
} from "@sixsmith-games/product-activity-contracts";
import { and, eq, sql } from "drizzle-orm";
import { getDatabase } from "@/db/client";
import {
  AUDIT_EVENTS,
  PRODUCTS,
  PRODUCT_ACCOUNTS,
  PRODUCT_ACTIVITY_DAILY,
  PRODUCT_ACTIVITY_EVENTS,
  PRODUCT_ENTITY_SNAPSHOTS,
  PRODUCT_EVENT_REJECTIONS,
  PRODUCT_INGESTION_CURSORS,
  SOURCE_IDENTITIES,
} from "@/db/schema";
import {
  getProductActivityRuntimeConfig,
  requireProductActivitySourceToken,
  type ProductActivitySourceConfig,
} from "@/lib/product-activity/config";
import {
  PRODUCT_ACTIVITY_PAGE_SIZE,
  ProductActivitySourceProtocolError,
  classifyEventDelivery,
  consumeCursorPages,
  parseSourceFeedEnvelope,
  recordMatchesSourceScope,
  shouldProjectEntityRevision,
  type SourceFeedEnvelope,
} from "@/lib/product-activity/ingestion-core";

const REQUEST_TIMEOUT_MS = 10_000;
const FUTURE_CLOCK_TOLERANCE_MS = 5 * 60 * 1000;
const SAFE_IDENTIFIER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,191}$/;

export interface ProductActivitySourceSyncResult {
  sourceKey: string;
  state: "fresh" | "stale" | "rejected" | "unavailable" | "disabled";
  acceptedEvents: number;
  duplicateEvents: number;
  rejectedRecords: number;
  projectedEntities: number;
  detail: string;
}

interface LinkedActivityOwner {
  customerId: string;
  productId: string;
  sourceIdentityId: string;
  productAccountId: string;
}

const PRODUCT_CATALOG = [
  { slug: "virtual-combat-simulator", name: "Virtual Combat Simulator", family: "GameMaster Studio", isPublic: true, isOwnerOnly: false },
  { slug: "gamemastercraft", name: "GameMasterCraft", family: "GameMaster Studio", isPublic: true, isOwnerOnly: false },
  { slug: "contentcraft", name: "ContentCraft", family: "Creator tools", isPublic: true, isOwnerOnly: false },
  { slug: "sagacraft", name: "SagaCraft", family: "Creator tools", isPublic: false, isOwnerOnly: true },
  { slug: "four-star-general", name: "Four Star General", family: "Strategy games", isPublic: true, isOwnerOnly: false },
  { slug: "gravity", name: "Gravity", family: "Strategy games", isPublic: true, isOwnerOnly: false },
  { slug: "mastertyping", name: "MasterTyping", family: "Learning games", isPublic: true, isOwnerOnly: false },
  { slug: "gamemaster-studio", name: "GameMaster Studio", family: "GameMaster Studio", isPublic: true, isOwnerOnly: false },
  { slug: "game-master-assistant", name: "Game Master Assistant", family: "GameMaster Studio", isPublic: false, isOwnerOnly: false },
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function sanitizeError(error: unknown): string {
  const message = error instanceof Error ? error.message : "Unknown source failure";
  return message.replace(/https?:\/\/[^\s]+/g, "configured source").slice(0, 320);
}

function fingerprint(value: unknown): string {
  let serialized = "unserializable";
  try {
    serialized = JSON.stringify(value);
  } catch {
    // The fingerprint intentionally records no source payload when serialization fails.
  }
  return createHash("sha256").update(serialized).digest("hex");
}

function safeOptionalIdentifier(value: unknown): string | null {
  return typeof value === "string" && SAFE_IDENTIFIER_PATTERN.test(value)
    ? value
    : null;
}

function safeOptionalInteger(value: unknown): number | null {
  return Number.isSafeInteger(value) ? Number(value) : null;
}

function safeOptionalTimestamp(value: unknown): Date | null {
  if (typeof value !== "string" || !Number.isFinite(Date.parse(value))) return null;
  return new Date(value);
}

async function fetchSourceJson(
  source: ProductActivitySourceConfig,
  endpoint: "activity-events" | "entities" | "health",
  cursor?: string | null,
): Promise<unknown> {
  const url = new URL(`${source.baseUrl}/api/service/operations/v1/${endpoint}`);
  if (endpoint !== "health") {
    url.searchParams.set("limit", String(PRODUCT_ACTIVITY_PAGE_SIZE));
    if (cursor) url.searchParams.set("cursor", cursor);
  }
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${requireProductActivitySourceToken(source)}`,
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new ProductActivitySourceProtocolError(`Source returned HTTP ${response.status}.`, `source_http_${response.status}`);
  }
  return response.json() as Promise<unknown>;
}

async function ensureProductCatalog(): Promise<void> {
  const database = getDatabase();
  await database.insert(PRODUCTS).values(PRODUCT_CATALOG.map((product) => ({
    ...product,
    publicPositioning: `${product.name} operational activity projection`,
    positioningEffectiveAt: new Date("2026-08-22T00:00:00.000Z"),
  }))).onConflictDoNothing({ target: PRODUCTS.slug });
}

async function recordRejection(
  source: ProductActivitySourceConfig,
  rawRecord: unknown,
  rejectionCode: string,
  rejectionSummary: string,
): Promise<void> {
  const record = isRecord(rawRecord) ? rawRecord : {};
  await getDatabase().insert(PRODUCT_EVENT_REJECTIONS).values({
    sourceKey: source.key,
    environment: source.environment,
    sourceEventId: safeOptionalIdentifier(record.eventId),
    contractVersion: safeOptionalInteger(record.contractVersion),
    eventVersion: safeOptionalInteger(record.eventVersion),
    rejectionCode: rejectionCode.slice(0, 96),
    rejectionSummary: rejectionSummary.slice(0, 480),
    payloadFingerprint: fingerprint(rawRecord),
    occurredAt: safeOptionalTimestamp(record.occurredAt),
  });
}

async function upsertCursorState(
  source: ProductActivitySourceConfig,
  values: Partial<typeof PRODUCT_INGESTION_CURSORS.$inferInsert>,
): Promise<void> {
  const now = new Date();
  await getDatabase().insert(PRODUCT_INGESTION_CURSORS).values({
    sourceKey: source.key,
    environment: source.environment,
    status: values.status ?? "unconfigured",
    eventCursor: values.eventCursor ?? null,
    entityCursor: values.entityCursor ?? null,
    sourceGeneratedAt: values.sourceGeneratedAt ?? null,
    lastAttemptAt: values.lastAttemptAt ?? now,
    lastSuccessfulSyncAt: values.lastSuccessfulSyncAt ?? null,
    lastErrorCode: values.lastErrorCode ?? null,
    lastErrorSummary: values.lastErrorSummary ?? null,
    acceptedEventCount: values.acceptedEventCount ?? 0,
    rejectedEventCount: values.rejectedEventCount ?? 0,
    updatedAt: now,
  }).onConflictDoUpdate({
    target: [PRODUCT_INGESTION_CURSORS.sourceKey, PRODUCT_INGESTION_CURSORS.environment],
    set: { ...values, updatedAt: now },
  });
}

async function loadCursor(source: ProductActivitySourceConfig): Promise<{
  eventCursor: string | null;
  entityCursor: string | null;
  acceptedEventCount: number;
  rejectedEventCount: number;
}> {
  const [cursor] = await getDatabase().select({
    eventCursor: PRODUCT_INGESTION_CURSORS.eventCursor,
    entityCursor: PRODUCT_INGESTION_CURSORS.entityCursor,
    acceptedEventCount: PRODUCT_INGESTION_CURSORS.acceptedEventCount,
    rejectedEventCount: PRODUCT_INGESTION_CURSORS.rejectedEventCount,
  }).from(PRODUCT_INGESTION_CURSORS).where(and(
    eq(PRODUCT_INGESTION_CURSORS.sourceKey, source.key),
    eq(PRODUCT_INGESTION_CURSORS.environment, source.environment),
  )).limit(1);
  return cursor ?? { eventCursor: null, entityCursor: null, acceptedEventCount: 0, rejectedEventCount: 0 };
}

async function resolveLinkedOwner(
  source: ProductActivitySourceConfig,
  record: ProductActivityEvent | ProductEntitySnapshot,
): Promise<LinkedActivityOwner | null> {
  const database = getDatabase();
  const [[identity], [product]] = await Promise.all([
    database.select({
      id: SOURCE_IDENTITIES.id,
      customerId: SOURCE_IDENTITIES.customerId,
    }).from(SOURCE_IDENTITIES).where(and(
      eq(SOURCE_IDENTITIES.source, record.sourceIdentity.provider),
      eq(SOURCE_IDENTITIES.externalId, record.sourceIdentity.userId),
    )).limit(1),
    database.select({ id: PRODUCTS.id }).from(PRODUCTS).where(
      eq(PRODUCTS.slug, record.productSlug),
    ).limit(1),
  ]);

  if (!identity || !product) return null;
  const occurredAt = "occurredAt" in record ? new Date(record.occurredAt) : new Date(record.createdAt);
  const lastMeaningfulActivityAt = "occurredAt" in record
    ? eventCountsAsMeaningfulUse(record)
      ? new Date(record.occurredAt)
      : null
    : record.lastMeaningfulActivityAt
      ? new Date(record.lastMeaningfulActivityAt)
      : null;
  const [account] = await database.insert(PRODUCT_ACCOUNTS).values({
    customerId: identity.customerId,
    productId: product.id,
    sourceIdentityId: identity.id,
    sourceKey: source.key,
    firstSeenAt: occurredAt,
    lastSeenAt: occurredAt,
    lastMeaningfulActivityAt,
    synchronizationStatus: "fresh",
  }).onConflictDoUpdate({
    target: [PRODUCT_ACCOUNTS.sourceKey, PRODUCT_ACCOUNTS.sourceIdentityId, PRODUCT_ACCOUNTS.productId],
    set: {
      firstSeenAt: sql`least(${PRODUCT_ACCOUNTS.firstSeenAt}, ${occurredAt})`,
      lastSeenAt: sql`greatest(${PRODUCT_ACCOUNTS.lastSeenAt}, ${occurredAt})`,
      lastMeaningfulActivityAt: lastMeaningfulActivityAt
        ? sql`greatest(coalesce(${PRODUCT_ACCOUNTS.lastMeaningfulActivityAt}, ${lastMeaningfulActivityAt}), ${lastMeaningfulActivityAt})`
        : PRODUCT_ACCOUNTS.lastMeaningfulActivityAt,
      synchronizationStatus: "fresh",
      updatedAt: new Date(),
    },
  }).returning({ id: PRODUCT_ACCOUNTS.id });

  return {
    customerId: identity.customerId,
    productId: product.id,
    sourceIdentityId: identity.id,
    productAccountId: account.id,
  };
}

async function purgeLinkedAccount(
  source: ProductActivitySourceConfig,
  owner: LinkedActivityOwner,
  sourceEventId: string,
): Promise<void> {
  const database = getDatabase();
  await database.batch([
    database.delete(PRODUCT_ACTIVITY_DAILY).where(eq(PRODUCT_ACTIVITY_DAILY.productAccountId, owner.productAccountId)),
    database.delete(PRODUCT_ACTIVITY_EVENTS).where(eq(PRODUCT_ACTIVITY_EVENTS.productAccountId, owner.productAccountId)),
    database.delete(PRODUCT_ENTITY_SNAPSHOTS).where(eq(PRODUCT_ENTITY_SNAPSHOTS.productAccountId, owner.productAccountId)),
    database.delete(PRODUCT_ACCOUNTS).where(eq(PRODUCT_ACCOUNTS.id, owner.productAccountId)),
    database.insert(AUDIT_EVENTS).values({
      actorId: `source:${source.key}`,
      action: "product_activity_account_deleted",
      objectType: "product_activity_deletion_event",
      objectId: sourceEventId,
      source: source.key,
      after: { customerId: owner.customerId, productId: owner.productId, environment: source.environment },
    }),
  ]);
}

async function accountDeletionWasProcessed(
  sourceKey: string,
  sourceEventId: string,
): Promise<boolean> {
  const [existingDeletion] = await getDatabase().select({ id: AUDIT_EVENTS.id }).from(AUDIT_EVENTS).where(and(
    eq(AUDIT_EVENTS.source, sourceKey),
    eq(AUDIT_EVENTS.action, "product_activity_account_deleted"),
    eq(AUDIT_EVENTS.objectType, "product_activity_deletion_event"),
    eq(AUDIT_EVENTS.objectId, sourceEventId),
  )).limit(1);
  return Boolean(existingDeletion);
}

async function projectEvent(
  source: ProductActivitySourceConfig,
  event: ProductActivityEvent,
  owner: LinkedActivityOwner,
): Promise<"accepted" | "duplicate" | "version_conflict"> {
  const [existing] = await getDatabase().select({
    eventVersion: PRODUCT_ACTIVITY_EVENTS.eventVersion,
  }).from(PRODUCT_ACTIVITY_EVENTS).where(and(
    eq(PRODUCT_ACTIVITY_EVENTS.sourceKey, source.key),
    eq(PRODUCT_ACTIVITY_EVENTS.sourceEventId, event.eventId),
  )).limit(1);
  const delivery = classifyEventDelivery(event.eventVersion, existing?.eventVersion ?? null);
  if (delivery !== "new") return delivery;

  if (event.eventType === "account_deletion_confirmed") {
    if (await accountDeletionWasProcessed(source.key, event.eventId)) return "duplicate";
    await purgeLinkedAccount(source, owner, event.eventId);
    return "accepted";
  }
  if (event.eventType === "entity_deletion_confirmed") {
    await getDatabase().delete(PRODUCT_ENTITY_SNAPSHOTS).where(and(
      eq(PRODUCT_ENTITY_SNAPSHOTS.sourceKey, source.key),
      eq(PRODUCT_ENTITY_SNAPSHOTS.productId, owner.productId),
      eq(PRODUCT_ENTITY_SNAPSHOTS.aggregateType, event.aggregate.type),
      eq(PRODUCT_ENTITY_SNAPSHOTS.sourceAggregateId, event.aggregate.id),
    ));
  }

  const metric = getProductActivityMetricContribution(event);
  const occurredAt = new Date(event.occurredAt);
  const activityDate = event.occurredAt.slice(0, 10);
  const result = await getDatabase().execute(sql`
    with inserted_event as (
      insert into product_activity_events (
        product_account_id, customer_id, product_id, source_identity_id,
        source_key, source_event_id, contract_version, event_version, event_type,
        environment, occurred_at, source_application, source_application_version,
        authority_class, usage_context, aggregate_type, source_aggregate_id,
        source_revision, activity_session_id, correlation_id, outcome, dimensions,
        privacy_classification, metric_version, is_meaningful, active_seconds
      ) values (
        ${owner.productAccountId}, ${owner.customerId}, ${owner.productId}, ${owner.sourceIdentityId},
        ${source.key}, ${event.eventId}, ${event.contractVersion}, ${event.eventVersion}, ${event.eventType},
        ${event.environment}, ${occurredAt}, ${event.sourceApplication}, ${event.sourceApplicationVersion},
        ${event.authorityClass}, ${event.usageContext}, ${event.aggregate.type}, ${event.aggregate.id},
        ${event.aggregate.revision}, ${event.activitySessionId ?? null}, ${event.correlationId ?? null},
        ${event.outcome}, ${JSON.stringify(event.dimensions)}::jsonb,
        ${event.privacyClassification}, ${metric.metricVersion}, ${metric.meaningfulEvents === 1}, ${metric.activeSeconds}
      )
      on conflict (source_key, source_event_id) do nothing
      returning id
    ), daily_projection as (
      insert into product_activity_daily (
        customer_id, product_id, product_account_id, activity_date, environment,
        usage_context, event_count, meaningful_event_count, session_count,
        completion_count, active_seconds, selected_counters, metric_version
      )
      select
        ${owner.customerId}, ${owner.productId}, ${owner.productAccountId}, ${activityDate}::date,
        ${event.environment}, ${event.usageContext}, 1, ${metric.meaningfulEvents},
        ${metric.sessions}, ${metric.completions}, ${metric.activeSeconds}, '{}'::jsonb,
        ${metric.metricVersion}
      from inserted_event
      on conflict (product_account_id, activity_date, environment, usage_context)
      do update set
        event_count = product_activity_daily.event_count + excluded.event_count,
        meaningful_event_count = product_activity_daily.meaningful_event_count + excluded.meaningful_event_count,
        session_count = product_activity_daily.session_count + excluded.session_count,
        completion_count = product_activity_daily.completion_count + excluded.completion_count,
        active_seconds = product_activity_daily.active_seconds + excluded.active_seconds,
        metric_version = excluded.metric_version,
        updated_at = now()
      returning id
    ), account_projection as (
      update product_accounts set
        last_seen_at = greatest(last_seen_at, ${occurredAt}),
        last_meaningful_activity_at = case when ${metric.meaningfulEvents === 1}
          then greatest(coalesce(last_meaningful_activity_at, ${occurredAt}), ${occurredAt})
          else last_meaningful_activity_at end,
        synchronization_status = 'fresh',
        updated_at = now()
      where id = ${owner.productAccountId} and exists (select 1 from inserted_event)
      returning id
    )
    select exists(select 1 from inserted_event) as inserted
  `) as unknown as { rows?: Array<{ inserted?: boolean }> };

  return result.rows?.[0]?.inserted ? "accepted" : "duplicate";
}

async function projectEntity(
  source: ProductActivitySourceConfig,
  entity: ProductEntitySnapshot,
  owner: LinkedActivityOwner,
): Promise<boolean> {
  const [current] = await getDatabase().select({
    sourceRevision: PRODUCT_ENTITY_SNAPSHOTS.sourceRevision,
  }).from(PRODUCT_ENTITY_SNAPSHOTS).where(and(
    eq(PRODUCT_ENTITY_SNAPSHOTS.sourceKey, source.key),
    eq(PRODUCT_ENTITY_SNAPSHOTS.productId, owner.productId),
    eq(PRODUCT_ENTITY_SNAPSHOTS.aggregateType, entity.aggregate.type),
    eq(PRODUCT_ENTITY_SNAPSHOTS.sourceAggregateId, entity.aggregate.id),
  )).limit(1);
  if (!shouldProjectEntityRevision(entity.aggregate.revision, current?.sourceRevision ?? null)) {
    return false;
  }

  const result = await getDatabase().execute(sql`
    insert into product_entity_snapshots (
      product_account_id, customer_id, product_id, source_key, environment,
      authority_class, usage_context, aggregate_type, source_aggregate_id,
      source_revision, display_label, status, source_created_at,
      last_meaningful_activity_at, counters, source_url, privacy_classification,
      synchronized_at
    ) values (
      ${owner.productAccountId}, ${owner.customerId}, ${owner.productId}, ${source.key},
      ${entity.environment}, ${entity.authorityClass}, ${entity.usageContext},
      ${entity.aggregate.type}, ${entity.aggregate.id}, ${entity.aggregate.revision},
      ${entity.displayLabel ?? null}, ${entity.status}, ${new Date(entity.createdAt)},
      ${entity.lastMeaningfulActivityAt ? new Date(entity.lastMeaningfulActivityAt) : null},
      ${JSON.stringify(entity.counters)}::jsonb, ${entity.sourceUrl ?? null},
      ${entity.privacyClassification}, now()
    )
    on conflict (source_key, product_id, aggregate_type, source_aggregate_id)
    do update set
      product_account_id = excluded.product_account_id,
      customer_id = excluded.customer_id,
      environment = excluded.environment,
      authority_class = excluded.authority_class,
      usage_context = excluded.usage_context,
      source_revision = excluded.source_revision,
      display_label = excluded.display_label,
      status = excluded.status,
      source_created_at = excluded.source_created_at,
      last_meaningful_activity_at = excluded.last_meaningful_activity_at,
      counters = excluded.counters,
      source_url = excluded.source_url,
      privacy_classification = excluded.privacy_classification,
      synchronized_at = now()
    where excluded.source_revision > product_entity_snapshots.source_revision
    returning id
  `) as unknown as { rows?: unknown[] };
  return Boolean(result.rows?.length);
}

async function processEventPage(
  source: ProductActivitySourceConfig,
  page: SourceFeedEnvelope,
): Promise<{ accepted: number; duplicates: number; rejected: number }> {
  let accepted = 0;
  let duplicates = 0;
  let rejected = 0;

  for (const rawEvent of page.items) {
    const validation = validateProductActivityEvent(rawEvent);
    if (!validation.ok) {
      await recordRejection(source, rawEvent, validation.errors[0]?.code ?? "schema_failure", validation.errors.map((error) => `${error.path}: ${error.message}`).join(" | "));
      rejected += 1;
      continue;
    }
    const event = validation.value;
    if (!recordMatchesSourceScope(source, event)) {
      await recordRejection(source, rawEvent, "source_scope_mismatch", "Event environment or product is outside the configured source scope.");
      rejected += 1;
      continue;
    }
    if (new Date(event.occurredAt).getTime() > Date.now() + FUTURE_CLOCK_TOLERANCE_MS) {
      await recordRejection(source, rawEvent, "clock_anomaly", "Event occurredAt is more than five minutes in the future.");
      rejected += 1;
      continue;
    }
    if (event.eventType === "account_deletion_confirmed" && await accountDeletionWasProcessed(source.key, event.eventId)) {
      duplicates += 1;
      continue;
    }
    const owner = await resolveLinkedOwner(source, event);
    if (!owner) {
      await recordRejection(source, rawEvent, "identity_link_failure", "Stable source identity or registered product could not be linked.");
      rejected += 1;
      continue;
    }
    const outcome = await projectEvent(source, event, owner);
    if (outcome === "accepted") accepted += 1;
    else if (outcome === "duplicate") duplicates += 1;
    else {
      await recordRejection(source, rawEvent, "duplicate_version_conflict", "A repeated event ID used a different immutable event version.");
      rejected += 1;
    }
  }
  return { accepted, duplicates, rejected };
}

async function processEntityPage(
  source: ProductActivitySourceConfig,
  page: SourceFeedEnvelope,
): Promise<{ projected: number; rejected: number }> {
  let projected = 0;
  let rejected = 0;
  for (const rawEntity of page.items) {
    const validation = validateProductEntitySnapshot(rawEntity);
    if (!validation.ok) {
      await recordRejection(source, rawEntity, validation.errors[0]?.code ?? "schema_failure", validation.errors.map((error) => `${error.path}: ${error.message}`).join(" | "));
      rejected += 1;
      continue;
    }
    const entity = validation.value;
    if (!recordMatchesSourceScope(source, entity)) {
      await recordRejection(source, rawEntity, "source_scope_mismatch", "Entity environment or product is outside the configured source scope.");
      rejected += 1;
      continue;
    }
    const owner = await resolveLinkedOwner(source, entity);
    if (!owner) {
      await recordRejection(source, rawEntity, "identity_link_failure", "Stable source identity or registered product could not be linked.");
      rejected += 1;
      continue;
    }
    if (await projectEntity(source, entity, owner)) projected += 1;
  }
  return { projected, rejected };
}

/**
 * Purpose: Pulls and projects one configured source with at-least-once delivery and cursor recovery.
 * Parameters: A validated source descriptor; callers must already enforce Operations authorization.
 * Returns: Accepted, duplicate, rejected, and entity counts with a truthful source state.
 * Side effects: Performs scoped GET requests and writes only normalized ledger projections, cursors, rejections, and deletion audit records.
 */
export async function synchronizeProductActivitySource(
  source: ProductActivitySourceConfig,
): Promise<ProductActivitySourceSyncResult> {
  if (!source.enabled) {
    return { sourceKey: source.key, state: "disabled", acceptedEvents: 0, duplicateEvents: 0, rejectedRecords: 0, projectedEntities: 0, detail: "Source is explicitly disabled." };
  }

  await ensureProductCatalog();
  await upsertCursorState(source, { status: "stale", lastAttemptAt: new Date(), lastErrorCode: null, lastErrorSummary: null });
  let acceptedEvents = 0;
  let duplicateEvents = 0;
  let rejectedRecords = 0;
  let projectedEntities = 0;

  try {
    const healthRaw = await fetchSourceJson(source, "health");
    const health = validateProductActivitySourceHealth(healthRaw);
    if (!health.ok || health.value.source !== source.key || health.value.environment !== source.environment) {
      throw new ProductActivitySourceProtocolError("Source health contract does not match the configured source.", "invalid_source_health");
    }
    if (health.value.status === "unavailable") {
      throw new ProductActivitySourceProtocolError("Source reports itself unavailable.", "source_unavailable");
    }

    const cursorState = await loadCursor(source);
    let acceptedEventCount = cursorState.acceptedEventCount;
    let rejectedEventCount = cursorState.rejectedEventCount;
    const eventConsumption = await consumeCursorPages({
      initialCursor: cursorState.eventCursor,
      fetchPage: async (cursor) => parseSourceFeedEnvelope(await fetchSourceJson(source, "activity-events", cursor), "events"),
      processPage: (page) => processEventPage(source, page),
      commitCursor: async (cursor, pageResult) => {
        acceptedEventCount += pageResult.accepted;
        rejectedEventCount += pageResult.rejected;
        await upsertCursorState(source, { eventCursor: cursor, acceptedEventCount, rejectedEventCount });
      },
    });
    for (const pageResult of eventConsumption.results) {
      acceptedEvents += pageResult.accepted;
      duplicateEvents += pageResult.duplicates;
      rejectedRecords += pageResult.rejected;
    }

    const entityConsumption = await consumeCursorPages({
      initialCursor: cursorState.entityCursor,
      fetchPage: async (cursor) => parseSourceFeedEnvelope(await fetchSourceJson(source, "entities", cursor), "entities"),
      processPage: (page) => processEntityPage(source, page),
      commitCursor: async (cursor, pageResult) => {
        rejectedEventCount += pageResult.rejected;
        await upsertCursorState(source, { entityCursor: cursor, rejectedEventCount });
      },
    });
    for (const pageResult of entityConsumption.results) {
      projectedEntities += pageResult.projected;
      rejectedRecords += pageResult.rejected;
    }

    const finalState = rejectedRecords > 0
      ? "rejected"
      : health.value.status === "degraded"
        ? "stale"
        : "fresh";
    await upsertCursorState(source, {
      status: finalState,
      sourceGeneratedAt: new Date(health.value.generatedAt),
      lastSuccessfulSyncAt: new Date(),
      lastErrorCode: rejectedRecords > 0 ? "records_rejected" : health.value.status === "degraded" ? "source_degraded" : null,
      lastErrorSummary: rejectedRecords > 0 ? `${rejectedRecords} records require review.` : health.value.status === "degraded" ? "The source reports degraded health." : null,
    });
    return {
      sourceKey: source.key,
      state: finalState,
      acceptedEvents,
      duplicateEvents,
      rejectedRecords,
      projectedEntities,
      detail: acceptedEvents + duplicateEvents + rejectedRecords + projectedEntities === 0
        ? "Source is healthy and returned genuine zero activity."
        : "Source synchronization completed.",
    };
  } catch (error) {
    const code = error instanceof ProductActivitySourceProtocolError ? error.code : "source_unavailable";
    const detail = sanitizeError(error);
    await upsertCursorState(source, { status: "unavailable", lastErrorCode: code, lastErrorSummary: detail });
    return { sourceKey: source.key, state: "unavailable", acceptedEvents, duplicateEvents, rejectedRecords, projectedEntities, detail };
  }
}

/**
 * Purpose: Serializes synchronization across every enabled source to protect source and deployment allowances.
 * Parameters: None; feature flags and sources are resolved from the server environment.
 * Returns: One explicit result per configured source.
 * Side effects: Performs source reads and normalized Operations writes when the ledger is enabled.
 */
export async function synchronizeAllProductActivitySources(): Promise<ProductActivitySourceSyncResult[]> {
  const config = getProductActivityRuntimeConfig();
  if (!config.ledgerEnabled || config.sourceConfigurationError) return [];
  const results: ProductActivitySourceSyncResult[] = [];
  for (const source of config.sources) {
    results.push(await synchronizeProductActivitySource(source));
  }
  return results;
}

/**
 * Purpose: Executes the minimum support-driven deletion workflow for one normalized customer.
 * Parameters: customerId is the Operations UUID; actorId identifies the authorized owner request.
 * Returns: Nothing after the transactional projection deletion and immutable audit record complete.
 * Side effects: Permanently deletes detailed product events, daily rollups, entity summaries, and product account links for the customer.
 */
export async function deleteCustomerProductActivity(
  customerId: string,
  actorId: string,
): Promise<void> {
  const database = getDatabase();
  await database.batch([
    database.delete(PRODUCT_ACTIVITY_DAILY).where(eq(PRODUCT_ACTIVITY_DAILY.customerId, customerId)),
    database.delete(PRODUCT_ACTIVITY_EVENTS).where(eq(PRODUCT_ACTIVITY_EVENTS.customerId, customerId)),
    database.delete(PRODUCT_ENTITY_SNAPSHOTS).where(eq(PRODUCT_ENTITY_SNAPSHOTS.customerId, customerId)),
    database.delete(PRODUCT_ACCOUNTS).where(eq(PRODUCT_ACCOUNTS.customerId, customerId)),
    database.insert(AUDIT_EVENTS).values({
      actorId,
      action: "product_activity_customer_deleted",
      objectType: "customer",
      objectId: customerId,
      source: "operations_support_workflow",
      after: { retained: "audit_only", deletedDataClasses: ["events", "daily", "entities", "product_accounts"] },
    }),
  ]);
}
