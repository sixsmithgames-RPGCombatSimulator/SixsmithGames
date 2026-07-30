import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const CUSTOMER_LIFECYCLE_ENUM = pgEnum("customer_lifecycle", [
  "lead",
  "registered",
  "free_user",
  "activated",
  "engaged",
  "upgrade_candidate",
  "subscriber",
  "multi_product_subscriber",
  "at_risk",
  "payment_failed",
  "canceling",
  "churned",
  "win_back",
  "reactivated",
  "archived",
]);

export const SUBSCRIPTION_STATUS_ENUM = pgEnum("subscription_status", [
  "pending",
  "trialing",
  "active",
  "past_due",
  "payment_failed",
  "paused",
  "canceling_at_period_end",
  "canceled",
  "unpaid",
  "refunded",
  "disputed",
  "entitlement_conflict",
  "reconciliation_required",
]);

export const APPROVAL_STATUS_ENUM = pgEnum("approval_status", [
  "draft",
  "pending",
  "approved",
  "changes_requested",
  "rejected",
  "expired",
  "superseded",
  "executed",
  "execution_failed",
  "revoked",
]);

export const SEVERITY_ENUM = pgEnum("severity", [
  "critical",
  "high",
  "medium",
  "low",
]);

export const INTEGRATION_STATUS_ENUM = pgEnum("integration_status", [
  "healthy",
  "stale",
  "degraded",
  "failing",
  "unconfigured",
]);

export const CUSTOMERS = pgTable(
  "customers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    displayName: text("display_name").notNull(),
    primaryEmail: text("primary_email").notNull(),
    company: text("company"),
    lifecycle: CUSTOMER_LIFECYCLE_ENUM("lifecycle").notNull(),
    healthScore: integer("health_score"),
    nextAction: text("next_action"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("customers_primary_email_unique").on(table.primaryEmail),
    index("customers_lifecycle_index").on(table.lifecycle),
  ],
);

export const SOURCE_IDENTITIES = pgTable(
  "source_identities",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    customerId: uuid("customer_id")
      .references(() => CUSTOMERS.id, { onDelete: "restrict" })
      .notNull(),
    source: text("source").notNull(),
    externalId: text("external_id").notNull(),
    sourceUrl: text("source_url"),
    isVerified: boolean("is_verified").default(false).notNull(),
    lastObservedAt: timestamp("last_observed_at", {
      withTimezone: true,
    }).notNull(),
  },
  (table) => [
    uniqueIndex("source_identity_external_unique").on(
      table.source,
      table.externalId,
    ),
    index("source_identity_customer_index").on(table.customerId),
  ],
);

export const PRODUCTS = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    family: text("family").notNull(),
    publicPositioning: text("public_positioning").notNull(),
    isPublic: boolean("is_public").default(true).notNull(),
    isOwnerOnly: boolean("is_owner_only").default(false).notNull(),
    positioningEffectiveAt: timestamp("positioning_effective_at", {
      withTimezone: true,
    }).notNull(),
  },
  (table) => [uniqueIndex("products_slug_unique").on(table.slug)],
);

export const SUBSCRIPTIONS = pgTable(
  "subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    customerId: uuid("customer_id")
      .references(() => CUSTOMERS.id, { onDelete: "restrict" })
      .notNull(),
    stripeSubscriptionId: text("stripe_subscription_id").notNull(),
    planName: text("plan_name").notNull(),
    status: SUBSCRIPTION_STATUS_ENUM("status").notNull(),
    currency: text("currency").notNull(),
    recurringAmount: numeric("recurring_amount", {
      precision: 12,
      scale: 2,
    }).notNull(),
    interval: text("interval").notNull(),
    currentPeriodStart: timestamp("current_period_start", {
      withTimezone: true,
    }).notNull(),
    currentPeriodEnd: timestamp("current_period_end", {
      withTimezone: true,
    }).notNull(),
    lastStripeSyncAt: timestamp("last_stripe_sync_at", {
      withTimezone: true,
    }).notNull(),
  },
  (table) => [
    uniqueIndex("subscriptions_stripe_unique").on(table.stripeSubscriptionId),
    index("subscriptions_customer_index").on(table.customerId),
    index("subscriptions_status_index").on(table.status),
  ],
);

export const ENTITLEMENTS = pgTable(
  "entitlements",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    customerId: uuid("customer_id")
      .references(() => CUSTOMERS.id, { onDelete: "restrict" })
      .notNull(),
    subscriptionId: uuid("subscription_id").references(
      () => SUBSCRIPTIONS.id,
      { onDelete: "restrict" },
    ),
    productId: uuid("product_id")
      .references(() => PRODUCTS.id, { onDelete: "restrict" })
      .notNull(),
    source: text("source").notNull(),
    expectedActive: boolean("expected_active").notNull(),
    actualActive: boolean("actual_active").notNull(),
    accessLevel: text("access_level").notNull(),
    lastObservedAt: timestamp("last_observed_at", {
      withTimezone: true,
    }).notNull(),
  },
  (table) => [
    index("entitlements_customer_index").on(table.customerId),
    index("entitlements_subscription_index").on(table.subscriptionId),
  ],
);

export const CAMPAIGNS = pgTable(
  "campaigns",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    campaignCode: text("campaign_code").notNull(),
    name: text("name").notNull(),
    status: text("status").notNull(),
    objective: text("objective").notNull(),
    audience: text("audience").notNull(),
    offer: text("offer").notNull(),
    ownerName: text("owner_name").notNull(),
    currency: text("currency").notNull(),
    budget: numeric("budget", { precision: 12, scale: 2 }).notNull(),
    spend: numeric("spend", { precision: 12, scale: 2 })
      .default("0")
      .notNull(),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
    attributionModel: text("attribution_model").notNull(),
  },
  (table) => [
    uniqueIndex("campaigns_code_unique").on(table.campaignCode),
    index("campaigns_status_index").on(table.status),
  ],
);

export const PROPOSAL_VERSIONS = pgTable(
  "proposal_versions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    objectType: text("object_type").notNull(),
    objectId: uuid("object_id").notNull(),
    version: integer("version").notNull(),
    payload: jsonb("payload").notNull(),
    evidence: jsonb("evidence").notNull(),
    confidence: numeric("confidence", { precision: 5, scale: 2 }),
    createdByActorId: text("created_by_actor_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("proposal_object_version_unique").on(
      table.objectType,
      table.objectId,
      table.version,
    ),
  ],
);

export const APPROVALS = pgTable(
  "approvals",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    proposalVersionId: uuid("proposal_version_id")
      .references(() => PROPOSAL_VERSIONS.id, { onDelete: "restrict" })
      .notNull(),
    approvalClass: text("approval_class").notNull(),
    status: APPROVAL_STATUS_ENUM("status").notNull(),
    assignedToActorId: text("assigned_to_actor_id").notNull(),
    decisionReason: text("decision_reason"),
    decidedAt: timestamp("decided_at", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
  },
  (table) => [
    index("approvals_status_index").on(table.status),
    index("approvals_assignee_index").on(table.assignedToActorId),
  ],
);

export const EXCEPTIONS = pgTable(
  "exceptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    exceptionCode: text("exception_code").notNull(),
    type: text("type").notNull(),
    severity: SEVERITY_ENUM("severity").notNull(),
    title: text("title").notNull(),
    effect: text("effect").notNull(),
    ownerActorId: text("owner_actor_id").notNull(),
    status: text("status").notNull(),
    evidence: jsonb("evidence").notNull(),
    openedAt: timestamp("opened_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    dueAt: timestamp("due_at", { withTimezone: true }).notNull(),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("exceptions_code_unique").on(table.exceptionCode),
    index("exceptions_severity_status_index").on(
      table.severity,
      table.status,
    ),
  ],
);

export const ECONOMIC_EVENTS = pgTable(
  "economic_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    source: text("source").notNull(),
    externalId: text("external_id").notNull(),
    eventType: text("event_type").notNull(),
    productId: uuid("product_id").references(() => PRODUCTS.id, {
      onDelete: "restrict",
    }),
    campaignId: uuid("campaign_id").references(() => CAMPAIGNS.id, {
      onDelete: "restrict",
    }),
    currency: text("currency").notNull(),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
    reconciliationStatus: text("reconciliation_status").notNull(),
    allocationRuleVersion: integer("allocation_rule_version"),
  },
  (table) => [
    uniqueIndex("economic_event_source_external_unique").on(
      table.source,
      table.externalId,
    ),
    index("economic_event_occurred_index").on(table.occurredAt),
  ],
);

export const INTEGRATION_SOURCES = pgTable(
  "integration_sources",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    key: text("key").notNull(),
    displayName: text("display_name").notNull(),
    status: INTEGRATION_STATUS_ENUM("status").notNull(),
    healthPercent: numeric("health_percent", {
      precision: 5,
      scale: 2,
    }),
    lastSyncAt: timestamp("last_sync_at", { withTimezone: true }),
    targetFreshnessSeconds: integer("target_freshness_seconds").notNull(),
    errorSummary: text("error_summary"),
  },
  (table) => [uniqueIndex("integration_sources_key_unique").on(table.key)],
);

export const AUDIT_EVENTS = pgTable(
  "audit_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    actorId: text("actor_id").notNull(),
    action: text("action").notNull(),
    objectType: text("object_type").notNull(),
    objectId: text("object_id").notNull(),
    objectVersion: integer("object_version"),
    approvalId: uuid("approval_id").references(() => APPROVALS.id, {
      onDelete: "restrict",
    }),
    correlationId: uuid("correlation_id").defaultRandom().notNull(),
    before: jsonb("before"),
    after: jsonb("after"),
    source: text("source").notNull(),
    occurredAt: timestamp("occurred_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("audit_object_index").on(table.objectType, table.objectId),
    index("audit_correlation_index").on(table.correlationId),
  ],
);
