import type {
  ActivityAuthorityClass,
  ProductEnvironment,
  UsageContext,
} from "@sixsmith-games/product-activity-contracts";

export type ProductActivityDisplayState =
  | "fresh"
  | "stale"
  | "unavailable"
  | "rejected"
  | "unconfigured"
  | "disabled";

export interface ProductActivitySourceView {
  key: string;
  label: string;
  state: ProductActivityDisplayState;
  environment: ProductEnvironment;
  lastSuccessfulSyncAt: string | null;
  freshnessLabel: string;
  acceptedEvents: number;
  rejectedRecords: number;
  genuineZeroActivity: boolean;
  detail: string;
}

export interface ProductActivityPortfolioProduct {
  slug: string;
  name: string;
  firstUsedAt: string | null;
  lastUsedAt: string | null;
  dau: number;
  wau: number;
  mau: number;
  activeDays30: number;
  sessions30: number;
  completions30: number;
  activeSeconds30: number;
  returnRate30: number;
  sourceState: ProductActivityDisplayState;
  topEvents: Array<{ eventType: string; count: number }>;
}

export interface ProductActivityTimelineItem {
  id: string;
  productSlug: string;
  productName: string;
  eventType: string;
  occurredAt: string;
  authorityClass: ActivityAuthorityClass;
  usageContext: UsageContext;
  environment: ProductEnvironment;
  outcome: string;
  aggregateType: string;
  sourceAggregateId: string;
  sourceKey: string;
}

export interface ProductActivityRejectionView {
  id: string;
  sourceKey: string;
  code: string;
  summary: string;
  rejectedAt: string;
  fingerprint: string;
}

export interface ProductActivityPortfolioSnapshot {
  mode: "preview" | "connected";
  ledgerState: ProductActivityDisplayState;
  checkedAt: string;
  metricVersion: number;
  autoSyncEnabled: boolean;
  summary: {
    dau: number;
    wau: number;
    mau: number;
    activeSeconds30: number;
    sessions30: number;
    completions30: number;
    internalEvents30: number;
  };
  products: ProductActivityPortfolioProduct[];
  sources: ProductActivitySourceView[];
  recentEvents: ProductActivityTimelineItem[];
  rejections: ProductActivityRejectionView[];
  message: string | null;
}

export interface CustomerProductEntityView {
  id: string;
  aggregateType: string;
  displayLabel: string;
  status: string;
  createdAt: string;
  lastMeaningfulActivityAt: string | null;
  counters: Record<string, number>;
  sourceUrl: string | null;
  authorityClass: ActivityAuthorityClass;
}

export interface CustomerProductActivityCard {
  slug: string;
  name: string;
  firstUsedAt: string;
  lastUsedAt: string | null;
  activeDays7: number;
  activeDays30: number;
  activeDays90: number;
  sessions30: number;
  completions30: number;
  activeSeconds30: number;
  sourceState: ProductActivityDisplayState;
  sourceKey: string;
  authorityClasses: ActivityAuthorityClass[];
  entities: CustomerProductEntityView[];
}

export interface CustomerProductActivitySnapshot {
  mode: "preview" | "connected";
  state: ProductActivityDisplayState | "empty";
  databaseCustomerId: string | null;
  products: CustomerProductActivityCard[];
  timeline: ProductActivityTimelineItem[];
  message: string | null;
}
