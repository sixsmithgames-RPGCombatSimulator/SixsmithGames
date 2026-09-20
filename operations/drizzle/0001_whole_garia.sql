CREATE TYPE "public"."product_activity_authority" AS ENUM('server_confirmed', 'client_observed');--> statement-breakpoint
CREATE TYPE "public"."product_activity_privacy" AS ENUM('identified_operational', 'identified_private_summary');--> statement-breakpoint
CREATE TYPE "public"."product_environment" AS ENUM('production', 'preview', 'development', 'test');--> statement-breakpoint
CREATE TYPE "public"."product_ingestion_status" AS ENUM('fresh', 'stale', 'unavailable', 'rejected', 'unconfigured', 'disabled');--> statement-breakpoint
CREATE TYPE "public"."product_usage_context" AS ENUM('customer', 'owner', 'internal_test', 'automation');--> statement-breakpoint
CREATE TABLE "product_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"source_identity_id" uuid NOT NULL,
	"source_key" text NOT NULL,
	"first_seen_at" timestamp with time zone NOT NULL,
	"last_seen_at" timestamp with time zone NOT NULL,
	"last_meaningful_activity_at" timestamp with time zone,
	"synchronization_status" "product_ingestion_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_activity_daily" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"product_account_id" uuid NOT NULL,
	"activity_date" date NOT NULL,
	"environment" "product_environment" NOT NULL,
	"usage_context" "product_usage_context" NOT NULL,
	"event_count" integer DEFAULT 0 NOT NULL,
	"meaningful_event_count" integer DEFAULT 0 NOT NULL,
	"session_count" integer DEFAULT 0 NOT NULL,
	"completion_count" integer DEFAULT 0 NOT NULL,
	"active_seconds" integer DEFAULT 0 NOT NULL,
	"selected_counters" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"metric_version" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_activity_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_account_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"source_identity_id" uuid NOT NULL,
	"source_key" text NOT NULL,
	"source_event_id" text NOT NULL,
	"contract_version" integer NOT NULL,
	"event_version" integer NOT NULL,
	"event_type" text NOT NULL,
	"environment" "product_environment" NOT NULL,
	"occurred_at" timestamp with time zone NOT NULL,
	"received_at" timestamp with time zone DEFAULT now() NOT NULL,
	"source_application" text NOT NULL,
	"source_application_version" text NOT NULL,
	"authority_class" "product_activity_authority" NOT NULL,
	"usage_context" "product_usage_context" NOT NULL,
	"aggregate_type" text NOT NULL,
	"source_aggregate_id" text NOT NULL,
	"source_revision" integer NOT NULL,
	"activity_session_id" text,
	"correlation_id" text,
	"outcome" text NOT NULL,
	"dimensions" jsonb NOT NULL,
	"privacy_classification" "product_activity_privacy" NOT NULL,
	"metric_version" integer NOT NULL,
	"is_meaningful" boolean NOT NULL,
	"active_seconds" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_entity_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_account_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"source_key" text NOT NULL,
	"environment" "product_environment" NOT NULL,
	"authority_class" "product_activity_authority" NOT NULL,
	"usage_context" "product_usage_context" NOT NULL,
	"aggregate_type" text NOT NULL,
	"source_aggregate_id" text NOT NULL,
	"source_revision" integer NOT NULL,
	"display_label" text,
	"status" text NOT NULL,
	"source_created_at" timestamp with time zone NOT NULL,
	"last_meaningful_activity_at" timestamp with time zone,
	"counters" jsonb NOT NULL,
	"source_url" text,
	"privacy_classification" "product_activity_privacy" NOT NULL,
	"synchronized_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_event_rejections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_key" text NOT NULL,
	"environment" "product_environment" NOT NULL,
	"source_event_id" text,
	"contract_version" integer,
	"event_version" integer,
	"rejection_code" text NOT NULL,
	"rejection_summary" text NOT NULL,
	"payload_fingerprint" text NOT NULL,
	"occurred_at" timestamp with time zone,
	"rejected_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_ingestion_cursors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_key" text NOT NULL,
	"environment" "product_environment" NOT NULL,
	"event_cursor" text,
	"entity_cursor" text,
	"status" "product_ingestion_status" NOT NULL,
	"source_generated_at" timestamp with time zone,
	"last_attempt_at" timestamp with time zone,
	"last_successful_sync_at" timestamp with time zone,
	"last_error_code" text,
	"last_error_summary" text,
	"accepted_event_count" integer DEFAULT 0 NOT NULL,
	"rejected_event_count" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_accounts" ADD CONSTRAINT "product_accounts_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_accounts" ADD CONSTRAINT "product_accounts_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_accounts" ADD CONSTRAINT "product_accounts_source_identity_id_source_identities_id_fk" FOREIGN KEY ("source_identity_id") REFERENCES "public"."source_identities"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_activity_daily" ADD CONSTRAINT "product_activity_daily_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_activity_daily" ADD CONSTRAINT "product_activity_daily_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_activity_daily" ADD CONSTRAINT "product_activity_daily_product_account_id_product_accounts_id_fk" FOREIGN KEY ("product_account_id") REFERENCES "public"."product_accounts"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_activity_events" ADD CONSTRAINT "product_activity_events_product_account_id_product_accounts_id_fk" FOREIGN KEY ("product_account_id") REFERENCES "public"."product_accounts"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_activity_events" ADD CONSTRAINT "product_activity_events_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_activity_events" ADD CONSTRAINT "product_activity_events_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_activity_events" ADD CONSTRAINT "product_activity_events_source_identity_id_source_identities_id_fk" FOREIGN KEY ("source_identity_id") REFERENCES "public"."source_identities"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_entity_snapshots" ADD CONSTRAINT "product_entity_snapshots_product_account_id_product_accounts_id_fk" FOREIGN KEY ("product_account_id") REFERENCES "public"."product_accounts"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_entity_snapshots" ADD CONSTRAINT "product_entity_snapshots_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_entity_snapshots" ADD CONSTRAINT "product_entity_snapshots_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "product_accounts_source_product_unique" ON "product_accounts" USING btree ("source_key","source_identity_id","product_id");--> statement-breakpoint
CREATE INDEX "product_accounts_customer_index" ON "product_accounts" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "product_accounts_product_activity_index" ON "product_accounts" USING btree ("product_id","last_meaningful_activity_at");--> statement-breakpoint
CREATE UNIQUE INDEX "product_activity_daily_unique" ON "product_activity_daily" USING btree ("product_account_id","activity_date","environment","usage_context");--> statement-breakpoint
CREATE INDEX "product_activity_daily_customer_date_index" ON "product_activity_daily" USING btree ("customer_id","activity_date");--> statement-breakpoint
CREATE INDEX "product_activity_daily_product_date_index" ON "product_activity_daily" USING btree ("product_id","activity_date");--> statement-breakpoint
CREATE UNIQUE INDEX "product_activity_source_event_unique" ON "product_activity_events" USING btree ("source_key","source_event_id");--> statement-breakpoint
CREATE INDEX "product_activity_customer_occurred_index" ON "product_activity_events" USING btree ("customer_id","occurred_at");--> statement-breakpoint
CREATE INDEX "product_activity_product_occurred_index" ON "product_activity_events" USING btree ("product_id","occurred_at");--> statement-breakpoint
CREATE INDEX "product_activity_session_index" ON "product_activity_events" USING btree ("activity_session_id");--> statement-breakpoint
CREATE UNIQUE INDEX "product_entity_source_aggregate_unique" ON "product_entity_snapshots" USING btree ("source_key","product_id","aggregate_type","source_aggregate_id");--> statement-breakpoint
CREATE INDEX "product_entity_customer_product_index" ON "product_entity_snapshots" USING btree ("customer_id","product_id");--> statement-breakpoint
CREATE INDEX "product_entity_activity_index" ON "product_entity_snapshots" USING btree ("last_meaningful_activity_at");--> statement-breakpoint
CREATE INDEX "product_rejections_source_time_index" ON "product_event_rejections" USING btree ("source_key","rejected_at");--> statement-breakpoint
CREATE INDEX "product_rejections_code_index" ON "product_event_rejections" USING btree ("rejection_code");--> statement-breakpoint
CREATE UNIQUE INDEX "product_ingestion_source_environment_unique" ON "product_ingestion_cursors" USING btree ("source_key","environment");--> statement-breakpoint
CREATE INDEX "product_ingestion_status_index" ON "product_ingestion_cursors" USING btree ("status");