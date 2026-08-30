import type { ProductSlug } from "./catalog";

export const PRODUCT_ACTIVITY_CONTRACT_VERSION = 1 as const;

export const PRODUCT_ENVIRONMENTS = [
  "production",
  "preview",
  "development",
  "test",
] as const;
export type ProductEnvironment = (typeof PRODUCT_ENVIRONMENTS)[number];

export const ACTIVITY_AUTHORITY_CLASSES = [
  "server_confirmed",
  "client_observed",
] as const;
export type ActivityAuthorityClass =
  (typeof ACTIVITY_AUTHORITY_CLASSES)[number];

export const USAGE_CONTEXTS = [
  "customer",
  "owner",
  "internal_test",
  "automation",
] as const;
export type UsageContext = (typeof USAGE_CONTEXTS)[number];

export const ACTIVITY_OUTCOMES = [
  "succeeded",
  "failed",
  "abandoned",
  "expired",
  "deleted",
] as const;
export type ActivityOutcome = (typeof ACTIVITY_OUTCOMES)[number];

export const ACTIVITY_PRIVACY_CLASSIFICATIONS = [
  "identified_operational",
  "identified_private_summary",
] as const;
export type ActivityPrivacyClassification =
  (typeof ACTIVITY_PRIVACY_CLASSIFICATIONS)[number];

export type ActivityScalar = string | number | boolean | null;

export interface ProductSourceIdentity {
  provider: string;
  userId: string;
}

export interface ProductActivityAggregate {
  type: string;
  id: string;
  revision: number;
}

export interface ProductActivityEvent {
  contractVersion: typeof PRODUCT_ACTIVITY_CONTRACT_VERSION;
  eventId: string;
  eventVersion: number;
  eventType: string;
  productSlug: ProductSlug;
  environment: ProductEnvironment;
  occurredAt: string;
  sourceApplication: string;
  sourceApplicationVersion: string;
  sourceIdentity: ProductSourceIdentity;
  authorityClass: ActivityAuthorityClass;
  usageContext: UsageContext;
  aggregate: ProductActivityAggregate;
  activitySessionId?: string;
  correlationId?: string;
  outcome: ActivityOutcome;
  dimensions: Record<string, ActivityScalar>;
  privacyClassification: "identified_operational";
}

export interface ProductEntitySnapshot {
  contractVersion: typeof PRODUCT_ACTIVITY_CONTRACT_VERSION;
  productSlug: ProductSlug;
  environment: ProductEnvironment;
  sourceApplication: string;
  sourceApplicationVersion: string;
  sourceIdentity: ProductSourceIdentity;
  authorityClass: ActivityAuthorityClass;
  usageContext: UsageContext;
  aggregate: ProductActivityAggregate;
  displayLabel?: string;
  status: string;
  createdAt: string;
  lastMeaningfulActivityAt: string | null;
  counters: Record<string, number>;
  sourceUrl?: string;
  privacyClassification: "identified_private_summary";
}

export interface ProductActivityFeed {
  contractVersion: typeof PRODUCT_ACTIVITY_CONTRACT_VERSION;
  events: ProductActivityEvent[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface ProductEntityFeed {
  contractVersion: typeof PRODUCT_ACTIVITY_CONTRACT_VERSION;
  entities: ProductEntitySnapshot[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface ProductActivitySourceHealth {
  contractVersion: typeof PRODUCT_ACTIVITY_CONTRACT_VERSION;
  source: string;
  environment: ProductEnvironment;
  status: "healthy" | "degraded" | "unavailable";
  latestSequence: string | null;
  generatedAt: string;
}

export type ContractValidationErrorCode =
  | "forbidden_field"
  | "forbidden_value"
  | "invalid_shape"
  | "unsupported_contract_version"
  | "unsupported_event"
  | "unsupported_product_event"
  | "unsupported_entity"
  | "unsupported_dimension";

export interface ContractValidationError {
  code: ContractValidationErrorCode;
  path: string;
  message: string;
}

export type ContractValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: ContractValidationError[] };
