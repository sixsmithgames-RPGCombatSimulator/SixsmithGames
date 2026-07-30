CREATE TYPE "public"."approval_status" AS ENUM('draft', 'pending', 'approved', 'changes_requested', 'rejected', 'expired', 'superseded', 'executed', 'execution_failed', 'revoked');--> statement-breakpoint
CREATE TYPE "public"."customer_lifecycle" AS ENUM('lead', 'registered', 'free_user', 'activated', 'engaged', 'upgrade_candidate', 'subscriber', 'multi_product_subscriber', 'at_risk', 'payment_failed', 'canceling', 'churned', 'win_back', 'reactivated', 'archived');--> statement-breakpoint
CREATE TYPE "public"."integration_status" AS ENUM('healthy', 'stale', 'degraded', 'failing', 'unconfigured');--> statement-breakpoint
CREATE TYPE "public"."severity" AS ENUM('critical', 'high', 'medium', 'low');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('pending', 'trialing', 'active', 'past_due', 'payment_failed', 'paused', 'canceling_at_period_end', 'canceled', 'unpaid', 'refunded', 'disputed', 'entitlement_conflict', 'reconciliation_required');--> statement-breakpoint
CREATE TABLE "approvals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"proposal_version_id" uuid NOT NULL,
	"approval_class" text NOT NULL,
	"status" "approval_status" NOT NULL,
	"assigned_to_actor_id" text NOT NULL,
	"decision_reason" text,
	"decided_at" timestamp with time zone,
	"expires_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "audit_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" text NOT NULL,
	"action" text NOT NULL,
	"object_type" text NOT NULL,
	"object_id" text NOT NULL,
	"object_version" integer,
	"approval_id" uuid,
	"correlation_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"before" jsonb,
	"after" jsonb,
	"source" text NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_code" text NOT NULL,
	"name" text NOT NULL,
	"status" text NOT NULL,
	"objective" text NOT NULL,
	"audience" text NOT NULL,
	"offer" text NOT NULL,
	"owner_name" text NOT NULL,
	"currency" text NOT NULL,
	"budget" numeric(12, 2) NOT NULL,
	"spend" numeric(12, 2) DEFAULT '0' NOT NULL,
	"starts_at" timestamp with time zone NOT NULL,
	"ends_at" timestamp with time zone NOT NULL,
	"attribution_model" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"display_name" text NOT NULL,
	"primary_email" text NOT NULL,
	"company" text,
	"lifecycle" "customer_lifecycle" NOT NULL,
	"health_score" integer,
	"next_action" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "economic_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source" text NOT NULL,
	"external_id" text NOT NULL,
	"event_type" text NOT NULL,
	"product_id" uuid,
	"campaign_id" uuid,
	"currency" text NOT NULL,
	"amount" numeric(14, 2) NOT NULL,
	"occurred_at" timestamp with time zone NOT NULL,
	"reconciliation_status" text NOT NULL,
	"allocation_rule_version" integer
);
--> statement-breakpoint
CREATE TABLE "entitlements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL,
	"subscription_id" uuid,
	"product_id" uuid NOT NULL,
	"source" text NOT NULL,
	"expected_active" boolean NOT NULL,
	"actual_active" boolean NOT NULL,
	"access_level" text NOT NULL,
	"last_observed_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exceptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exception_code" text NOT NULL,
	"type" text NOT NULL,
	"severity" "severity" NOT NULL,
	"title" text NOT NULL,
	"effect" text NOT NULL,
	"owner_actor_id" text NOT NULL,
	"status" text NOT NULL,
	"evidence" jsonb NOT NULL,
	"opened_at" timestamp with time zone DEFAULT now() NOT NULL,
	"due_at" timestamp with time zone NOT NULL,
	"resolved_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "integration_sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"display_name" text NOT NULL,
	"status" "integration_status" NOT NULL,
	"health_percent" numeric(5, 2),
	"last_sync_at" timestamp with time zone,
	"target_freshness_seconds" integer NOT NULL,
	"error_summary" text
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"family" text NOT NULL,
	"public_positioning" text NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"is_owner_only" boolean DEFAULT false NOT NULL,
	"positioning_effective_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposal_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"object_type" text NOT NULL,
	"object_id" uuid NOT NULL,
	"version" integer NOT NULL,
	"payload" jsonb NOT NULL,
	"evidence" jsonb NOT NULL,
	"confidence" numeric(5, 2),
	"created_by_actor_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "source_identities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL,
	"source" text NOT NULL,
	"external_id" text NOT NULL,
	"source_url" text,
	"is_verified" boolean DEFAULT false NOT NULL,
	"last_observed_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL,
	"stripe_subscription_id" text NOT NULL,
	"plan_name" text NOT NULL,
	"status" "subscription_status" NOT NULL,
	"currency" text NOT NULL,
	"recurring_amount" numeric(12, 2) NOT NULL,
	"interval" text NOT NULL,
	"current_period_start" timestamp with time zone NOT NULL,
	"current_period_end" timestamp with time zone NOT NULL,
	"last_stripe_sync_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_proposal_version_id_proposal_versions_id_fk" FOREIGN KEY ("proposal_version_id") REFERENCES "public"."proposal_versions"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_approval_id_approvals_id_fk" FOREIGN KEY ("approval_id") REFERENCES "public"."approvals"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "economic_events" ADD CONSTRAINT "economic_events_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "economic_events" ADD CONSTRAINT "economic_events_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entitlements" ADD CONSTRAINT "entitlements_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entitlements" ADD CONSTRAINT "entitlements_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entitlements" ADD CONSTRAINT "entitlements_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_identities" ADD CONSTRAINT "source_identities_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "approvals_status_index" ON "approvals" USING btree ("status");--> statement-breakpoint
CREATE INDEX "approvals_assignee_index" ON "approvals" USING btree ("assigned_to_actor_id");--> statement-breakpoint
CREATE INDEX "audit_object_index" ON "audit_events" USING btree ("object_type","object_id");--> statement-breakpoint
CREATE INDEX "audit_correlation_index" ON "audit_events" USING btree ("correlation_id");--> statement-breakpoint
CREATE UNIQUE INDEX "campaigns_code_unique" ON "campaigns" USING btree ("campaign_code");--> statement-breakpoint
CREATE INDEX "campaigns_status_index" ON "campaigns" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "customers_primary_email_unique" ON "customers" USING btree ("primary_email");--> statement-breakpoint
CREATE INDEX "customers_lifecycle_index" ON "customers" USING btree ("lifecycle");--> statement-breakpoint
CREATE UNIQUE INDEX "economic_event_source_external_unique" ON "economic_events" USING btree ("source","external_id");--> statement-breakpoint
CREATE INDEX "economic_event_occurred_index" ON "economic_events" USING btree ("occurred_at");--> statement-breakpoint
CREATE INDEX "entitlements_customer_index" ON "entitlements" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "entitlements_subscription_index" ON "entitlements" USING btree ("subscription_id");--> statement-breakpoint
CREATE UNIQUE INDEX "exceptions_code_unique" ON "exceptions" USING btree ("exception_code");--> statement-breakpoint
CREATE INDEX "exceptions_severity_status_index" ON "exceptions" USING btree ("severity","status");--> statement-breakpoint
CREATE UNIQUE INDEX "integration_sources_key_unique" ON "integration_sources" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX "products_slug_unique" ON "products" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "proposal_object_version_unique" ON "proposal_versions" USING btree ("object_type","object_id","version");--> statement-breakpoint
CREATE UNIQUE INDEX "source_identity_external_unique" ON "source_identities" USING btree ("source","external_id");--> statement-breakpoint
CREATE INDEX "source_identity_customer_index" ON "source_identities" USING btree ("customer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "subscriptions_stripe_unique" ON "subscriptions" USING btree ("stripe_subscription_id");--> statement-breakpoint
CREATE INDEX "subscriptions_customer_index" ON "subscriptions" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "subscriptions_status_index" ON "subscriptions" USING btree ("status");