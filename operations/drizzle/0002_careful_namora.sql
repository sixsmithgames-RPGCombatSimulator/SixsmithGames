CREATE TABLE "web_analytics_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" text NOT NULL,
	"contract_version" integer NOT NULL,
	"event_name" text NOT NULL,
	"environment" "product_environment" NOT NULL,
	"occurred_at" timestamp with time zone NOT NULL,
	"received_at" timestamp with time zone DEFAULT now() NOT NULL,
	"path" text NOT NULL,
	"landing_path" text NOT NULL,
	"source_type" text NOT NULL,
	"source_detail" text NOT NULL,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"consent_state" text NOT NULL,
	"session_id" text,
	"country_code" text NOT NULL,
	"device_type" text NOT NULL,
	"product_slug" text,
	"destination_type" text,
	"surface" text,
	"engagement_seconds" integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX "web_analytics_event_id_unique" ON "web_analytics_events" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "web_analytics_occurred_index" ON "web_analytics_events" USING btree ("occurred_at");--> statement-breakpoint
CREATE INDEX "web_analytics_event_occurred_index" ON "web_analytics_events" USING btree ("event_name","occurred_at");--> statement-breakpoint
CREATE INDEX "web_analytics_source_occurred_index" ON "web_analytics_events" USING btree ("source_detail","occurred_at");--> statement-breakpoint
CREATE INDEX "web_analytics_product_occurred_index" ON "web_analytics_events" USING btree ("product_slug","occurred_at");