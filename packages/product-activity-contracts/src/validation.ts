import {
  ACTIVITY_AUTHORITY_CLASSES,
  ACTIVITY_OUTCOMES,
  PRODUCT_ACTIVITY_CONTRACT_VERSION,
  PRODUCT_ENVIRONMENTS,
  USAGE_CONTEXTS,
  type ContractValidationError,
  type ContractValidationResult,
  type ProductActivityEvent,
  type ProductActivityFeed,
  type ProductActivitySourceHealth,
  type ProductEntityFeed,
  type ProductEntitySnapshot,
} from "./contracts";
import {
  PRODUCT_SLUGS,
  getActivityEventDefinition,
  getProductEntityDefinition,
} from "./catalog";

const IDENTIFIER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,191}$/;
const EVENT_PATTERN = /^[a-z][a-z0-9_]{1,95}$/;
const EMAIL_LIKE_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const FORBIDDEN_KEY_PARTS = [
  "email",
  "campaigntext",
  "note",
  "chat",
  "prompt",
  "charactersheet",
  "typedtext",
  "keystroke",
  "mapcontent",
  "rawpayload",
  "unrestrictedjson",
] as const;

const EVENT_KEYS = new Set([
  "contractVersion", "eventId", "eventVersion", "eventType", "productSlug",
  "environment", "occurredAt", "sourceApplication", "sourceApplicationVersion",
  "sourceIdentity", "authorityClass", "usageContext", "aggregate",
  "activitySessionId", "correlationId", "outcome", "dimensions",
  "privacyClassification",
]);
const ENTITY_KEYS = new Set([
  "contractVersion", "productSlug", "environment", "sourceApplication",
  "sourceApplicationVersion", "sourceIdentity", "authorityClass", "usageContext",
  "aggregate", "displayLabel", "status", "createdAt", "lastMeaningfulActivityAt",
  "counters", "sourceUrl", "privacyClassification",
]);
const IDENTITY_KEYS = new Set(["provider", "userId"]);
const AGGREGATE_KEYS = new Set(["type", "id", "revision"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function pushError(
  errors: ContractValidationError[],
  code: ContractValidationError["code"],
  path: string,
  message: string,
): void {
  errors.push({ code, path, message });
}

function validateExactKeys(
  value: Record<string, unknown>,
  allowed: ReadonlySet<string>,
  path: string,
  errors: ContractValidationError[],
): void {
  for (const key of Object.keys(value)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (FORBIDDEN_KEY_PARTS.some((part) => normalizedKey.includes(part))) {
      pushError(errors, "forbidden_field", `${path}.${key}`, `Field ${key} is forbidden by the operational activity privacy contract.`);
    } else if (!allowed.has(key)) {
      pushError(errors, "invalid_shape", `${path}.${key}`, `Field ${key} is not part of the versioned contract.`);
    }
  }
}

function validateSafeString(
  value: unknown,
  path: string,
  errors: ContractValidationError[],
  options: { identifier?: boolean; nullable?: boolean } = {},
): value is string {
  if (options.nullable && value === null) return false;
  if (typeof value !== "string" || value.length === 0 || value.length > 512) {
    pushError(errors, "invalid_shape", path, "Expected a non-empty bounded string.");
    return false;
  }
  if (EMAIL_LIKE_PATTERN.test(value)) {
    pushError(errors, "forbidden_value", path, "Email-like values are forbidden in product activity records.");
  }
  if (options.identifier && !IDENTIFIER_PATTERN.test(value)) {
    pushError(errors, "invalid_shape", path, "Expected a stable identifier containing only safe identifier characters.");
  }
  return true;
}

function validateTimestamp(
  value: unknown,
  path: string,
  errors: ContractValidationError[],
  nullable = false,
): void {
  if (nullable && value === null) return;
  if (typeof value !== "string" || !Number.isFinite(Date.parse(value))) {
    pushError(errors, "invalid_shape", path, "Expected an ISO-compatible timestamp.");
  }
}

function validateIdentity(
  value: unknown,
  path: string,
  errors: ContractValidationError[],
): void {
  if (!isRecord(value)) {
    pushError(errors, "invalid_shape", path, "Expected a source identity object.");
    return;
  }
  validateExactKeys(value, IDENTITY_KEYS, path, errors);
  validateSafeString(value.provider, `${path}.provider`, errors, { identifier: true });
  validateSafeString(value.userId, `${path}.userId`, errors, { identifier: true });
}

function validateAggregate(
  value: unknown,
  path: string,
  errors: ContractValidationError[],
): void {
  if (!isRecord(value)) {
    pushError(errors, "invalid_shape", path, "Expected an aggregate identity object.");
    return;
  }
  validateExactKeys(value, AGGREGATE_KEYS, path, errors);
  validateSafeString(value.type, `${path}.type`, errors, { identifier: true });
  validateSafeString(value.id, `${path}.id`, errors, { identifier: true });
  if (!Number.isSafeInteger(value.revision) || Number(value.revision) < 0) {
    pushError(errors, "invalid_shape", `${path}.revision`, "Expected a non-negative safe integer revision.");
  }
}

function validateSharedRecord(
  value: Record<string, unknown>,
  errors: ContractValidationError[],
): void {
  if (value.contractVersion !== PRODUCT_ACTIVITY_CONTRACT_VERSION) {
    pushError(errors, "unsupported_contract_version", "$.contractVersion", `Only contract version ${PRODUCT_ACTIVITY_CONTRACT_VERSION} is supported.`);
  }
  if (!PRODUCT_SLUGS.includes(value.productSlug as never)) {
    pushError(errors, "invalid_shape", "$.productSlug", "Unknown product slug.");
  }
  if (!PRODUCT_ENVIRONMENTS.includes(value.environment as never)) {
    pushError(errors, "invalid_shape", "$.environment", "Unknown product environment.");
  }
  validateSafeString(value.sourceApplication, "$.sourceApplication", errors, { identifier: true });
  validateSafeString(value.sourceApplicationVersion, "$.sourceApplicationVersion", errors, { identifier: true });
  validateIdentity(value.sourceIdentity, "$.sourceIdentity", errors);
  if (!ACTIVITY_AUTHORITY_CLASSES.includes(value.authorityClass as never)) {
    pushError(errors, "invalid_shape", "$.authorityClass", "Unknown authority class.");
  }
  if (!USAGE_CONTEXTS.includes(value.usageContext as never)) {
    pushError(errors, "invalid_shape", "$.usageContext", "Unknown usage context.");
  }
  validateAggregate(value.aggregate, "$.aggregate", errors);
}

/**
 * Purpose: Validates one source event before it crosses the Operations persistence boundary.
 * Safety: Strict keys, catalog dimensions, product/event compatibility, and email-like values are rejected.
 */
export function validateProductActivityEvent(
  input: unknown,
): ContractValidationResult<ProductActivityEvent> {
  const errors: ContractValidationError[] = [];
  if (!isRecord(input)) {
    return { ok: false, errors: [{ code: "invalid_shape", path: "$", message: "Expected an event object." }] };
  }

  validateExactKeys(input, EVENT_KEYS, "$", errors);
  validateSharedRecord(input, errors);
  validateSafeString(input.eventId, "$.eventId", errors, { identifier: true });
  if (!Number.isSafeInteger(input.eventVersion) || Number(input.eventVersion) < 1) {
    pushError(errors, "invalid_shape", "$.eventVersion", "Expected a positive safe integer event version.");
  }
  if (typeof input.eventType !== "string" || !EVENT_PATTERN.test(input.eventType)) {
    pushError(errors, "invalid_shape", "$.eventType", "Event names must use lowercase snake_case.");
  }
  validateTimestamp(input.occurredAt, "$.occurredAt", errors);
  if (!ACTIVITY_OUTCOMES.includes(input.outcome as never)) {
    pushError(errors, "invalid_shape", "$.outcome", "Unknown activity outcome.");
  }
  if (input.privacyClassification !== "identified_operational") {
    pushError(errors, "invalid_shape", "$.privacyClassification", "Events must use identified_operational privacy classification.");
  }
  if (input.activitySessionId !== undefined) {
    validateSafeString(input.activitySessionId, "$.activitySessionId", errors, { identifier: true });
  }
  if (input.correlationId !== undefined) {
    validateSafeString(input.correlationId, "$.correlationId", errors, { identifier: true });
  }

  const definition = typeof input.eventType === "string"
    ? getActivityEventDefinition(input.eventType)
    : undefined;
  if (!definition) {
    pushError(errors, "unsupported_event", "$.eventType", "Event type is not registered in the shared catalog.");
  } else if (!definition.productSlugs.some((slug) => slug === input.productSlug)) {
    pushError(errors, "unsupported_product_event", "$.productSlug", "The event is not registered for this product.");
  }

  if (!isRecord(input.dimensions)) {
    pushError(errors, "invalid_shape", "$.dimensions", "Dimensions must be a scalar-only object.");
  } else {
    const allowedDimensions = new Set(definition?.allowedDimensions ?? []);
    for (const [key, dimension] of Object.entries(input.dimensions)) {
      if (!allowedDimensions.has(key)) {
        pushError(errors, "unsupported_dimension", `$.dimensions.${key}`, "Dimension is not allowlisted for this event.");
      }
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (FORBIDDEN_KEY_PARTS.some((part) => normalizedKey.includes(part))) {
        pushError(errors, "forbidden_field", `$.dimensions.${key}`, "Dimension name is forbidden by the privacy contract.");
      }
      if (!["string", "number", "boolean"].includes(typeof dimension) && dimension !== null) {
        pushError(errors, "invalid_shape", `$.dimensions.${key}`, "Dimensions must contain scalar values only.");
      }
      if (typeof dimension === "string") {
        validateSafeString(dimension, `$.dimensions.${key}`, errors);
      }
      if (typeof dimension === "number" && !Number.isFinite(dimension)) {
        pushError(errors, "invalid_shape", `$.dimensions.${key}`, "Numeric dimensions must be finite.");
      }
    }
  }

  return errors.length > 0
    ? { ok: false, errors }
    : { ok: true, value: input as unknown as ProductActivityEvent };
}

/**
 * Purpose: Validates a current product-owned entity summary without accepting gameplay content.
 * Safety: Only registered counters and a bounded optional owner-visible label are accepted.
 */
export function validateProductEntitySnapshot(
  input: unknown,
): ContractValidationResult<ProductEntitySnapshot> {
  const errors: ContractValidationError[] = [];
  if (!isRecord(input)) {
    return { ok: false, errors: [{ code: "invalid_shape", path: "$", message: "Expected an entity snapshot object." }] };
  }

  validateExactKeys(input, ENTITY_KEYS, "$", errors);
  validateSharedRecord(input, errors);
  validateTimestamp(input.createdAt, "$.createdAt", errors);
  validateTimestamp(input.lastMeaningfulActivityAt, "$.lastMeaningfulActivityAt", errors, true);
  validateSafeString(input.status, "$.status", errors, { identifier: true });
  if (input.displayLabel !== undefined) {
    validateSafeString(input.displayLabel, "$.displayLabel", errors);
  }
  if (input.sourceUrl !== undefined) {
    validateSafeString(input.sourceUrl, "$.sourceUrl", errors);
    if (typeof input.sourceUrl === "string" && !/^https:\/\//.test(input.sourceUrl)) {
      pushError(errors, "invalid_shape", "$.sourceUrl", "Source links must use HTTPS.");
    }
  }
  if (input.privacyClassification !== "identified_private_summary") {
    pushError(errors, "invalid_shape", "$.privacyClassification", "Entity summaries must use identified_private_summary privacy classification.");
  }

  const aggregate = isRecord(input.aggregate) ? input.aggregate : undefined;
  const definition = aggregate && typeof aggregate.type === "string" && typeof input.productSlug === "string"
    ? getProductEntityDefinition(aggregate.type, input.productSlug)
    : undefined;
  if (!definition) {
    pushError(errors, "unsupported_entity", "$.aggregate.type", "Aggregate type is not registered for this product.");
  }
  if (!isRecord(input.counters)) {
    pushError(errors, "invalid_shape", "$.counters", "Counters must be a numeric object.");
  } else {
    const allowedCounters = new Set<string>(definition?.allowedCounters ?? []);
    for (const [key, counter] of Object.entries(input.counters)) {
      if (!allowedCounters.has(key)) {
        pushError(errors, "unsupported_dimension", `$.counters.${key}`, "Counter is not allowlisted for this entity type.");
      }
      if (typeof counter !== "number" || !Number.isFinite(counter) || counter < 0) {
        pushError(errors, "invalid_shape", `$.counters.${key}`, "Counters must be finite non-negative numbers.");
      }
    }
  }

  return errors.length > 0
    ? { ok: false, errors }
    : { ok: true, value: input as unknown as ProductEntitySnapshot };
}

/** Purpose: Validates a paginated activity feed and every contained event. */
export function validateProductActivityFeed(
  input: unknown,
): ContractValidationResult<ProductActivityFeed> {
  if (!isRecord(input) || input.contractVersion !== PRODUCT_ACTIVITY_CONTRACT_VERSION || !Array.isArray(input.events) || typeof input.hasMore !== "boolean" || (input.nextCursor !== null && typeof input.nextCursor !== "string")) {
    return { ok: false, errors: [{ code: "invalid_shape", path: "$", message: "Invalid product activity feed envelope." }] };
  }
  const errors = input.events.flatMap((event, index) => {
    const result = validateProductActivityEvent(event);
    return result.ok ? [] : result.errors.map((error) => ({ ...error, path: `$[${index}]${error.path.slice(1)}` }));
  });
  return errors.length > 0 ? { ok: false, errors } : { ok: true, value: input as unknown as ProductActivityFeed };
}

/** Purpose: Validates a paginated entity feed and every contained summary. */
export function validateProductEntityFeed(
  input: unknown,
): ContractValidationResult<ProductEntityFeed> {
  if (!isRecord(input) || input.contractVersion !== PRODUCT_ACTIVITY_CONTRACT_VERSION || !Array.isArray(input.entities) || typeof input.hasMore !== "boolean" || (input.nextCursor !== null && typeof input.nextCursor !== "string")) {
    return { ok: false, errors: [{ code: "invalid_shape", path: "$", message: "Invalid product entity feed envelope." }] };
  }
  const errors = input.entities.flatMap((entity, index) => {
    const result = validateProductEntitySnapshot(entity);
    return result.ok ? [] : result.errors.map((error) => ({ ...error, path: `$[${index}]${error.path.slice(1)}` }));
  });
  return errors.length > 0 ? { ok: false, errors } : { ok: true, value: input as unknown as ProductEntityFeed };
}

/** Purpose: Validates the bounded source-health document used to distinguish outages from zero activity. */
export function validateProductActivitySourceHealth(
  input: unknown,
): ContractValidationResult<ProductActivitySourceHealth> {
  if (!isRecord(input)) {
    return { ok: false, errors: [{ code: "invalid_shape", path: "$", message: "Expected a source-health object." }] };
  }
  const allowedKeys = new Set(["contractVersion", "source", "environment", "status", "latestSequence", "generatedAt"]);
  const errors: ContractValidationError[] = [];
  validateExactKeys(input, allowedKeys, "$", errors);
  if (input.contractVersion !== PRODUCT_ACTIVITY_CONTRACT_VERSION) pushError(errors, "unsupported_contract_version", "$.contractVersion", "Unsupported health contract version.");
  validateSafeString(input.source, "$.source", errors, { identifier: true });
  if (!PRODUCT_ENVIRONMENTS.includes(input.environment as never)) pushError(errors, "invalid_shape", "$.environment", "Unknown environment.");
  if (!["healthy", "degraded", "unavailable"].includes(String(input.status))) pushError(errors, "invalid_shape", "$.status", "Unknown source-health status.");
  if (input.latestSequence !== null) validateSafeString(input.latestSequence, "$.latestSequence", errors, { identifier: true });
  validateTimestamp(input.generatedAt, "$.generatedAt", errors);
  return errors.length > 0 ? { ok: false, errors } : { ok: true, value: input as unknown as ProductActivitySourceHealth };
}
