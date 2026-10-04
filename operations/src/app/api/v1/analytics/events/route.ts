import { timingSafeEqual } from "node:crypto";

import { lt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { databaseIsConfigured, getDatabase } from "@/db/client";
import { WEB_ANALYTICS_EVENTS } from "@/db/schema";

export const dynamic = "force-dynamic";

const RETENTION_DAYS = 120;
const ALLOWED_EVENTS = [
  "analytics_consent_updated",
  "merch_checkout_failed",
  "merch_checkout_started",
  "merch_interest_shared",
  "merch_item_added",
  "merch_item_removed",
  "merch_collection_click",
  "merch_shop_opened",
  "page_engaged",
  "page_view",
  "product_launch_click",
  "product_pricing_click",
  "product_sign_in_prompt_click",
  "product_subscribe_click",
  "studio_signup_click",
  "studio_workflow_click",
  "view_item",
] as const;

const scalarSchema = z.union([
  z.string().max(120),
  z.number().finite(),
  z.boolean(),
  z.null(),
]);

const eventSchema = z.object({
  contract_version: z.literal(1),
  event_id: z.uuid(),
  event_name: z.enum(ALLOWED_EVENTS),
  occurred_at: z.iso.datetime(),
  path: z.string().startsWith("/").max(240),
  landing_path: z.string().startsWith("/").max(240),
  source_type: z.string().max(120),
  source_detail: z.string().max(120),
  utm_source: z.string().max(120),
  utm_medium: z.string().max(120),
  utm_campaign: z.string().max(120),
  consent_state: z.enum(["accepted", "declined", "unset"]),
  session_id: z.uuid().optional(),
  properties: z.record(z.string(), scalarSchema),
  country_code: z.string().regex(/^[A-Z]{2}$/),
  device_type: z.enum(["desktop", "mobile", "tablet", "unknown"]),
  environment: z.enum(["production", "preview", "development"]),
}).strict();

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.ANALYTICS_INGEST_SECRET?.trim();
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  if (!secret || !supplied) return false;

  const expectedBytes = Buffer.from(secret);
  const suppliedBytes = Buffer.from(supplied);
  return expectedBytes.length === suppliedBytes.length
    && timingSafeEqual(expectedBytes, suppliedBytes);
}

function propertyString(
  properties: Record<string, string | number | boolean | null>,
  key: string,
): string | null {
  const value = properties[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function propertyInteger(
  properties: Record<string, string | number | boolean | null>,
  key: string,
): number | null {
  const value = properties[key];
  return typeof value === "number" && Number.isInteger(value)
    ? Math.min(Math.max(value, 0), 3_600)
    : null;
}

/**
 * Purpose: Ingests an allowlisted, privacy-minimized event from the public
 * website server into the Operations-owned aggregate ledger.
 * Parameters: request must carry the shared server credential and v1 payload.
 * Returns: 202 for a stored or duplicate event; explicit errors otherwise.
 * Side effects: Inserts one idempotent event and prunes records past retention.
 */
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized analytics source." }, { status: 401 });
  }
  if (!databaseIsConfigured()) {
    return NextResponse.json({ error: "Operations analytics storage is not configured." }, { status: 503 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Analytics event must be valid JSON." }, { status: 400 });
  }

  const parsed = eventSchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json({ error: "Analytics event failed the ingestion contract." }, { status: 400 });
  }

  const event = parsed.data;
  const sessionId = event.consent_state === "accepted" ? event.session_id ?? null : null;
  const database = getDatabase();

  try {
    const inserted = await database
      .insert(WEB_ANALYTICS_EVENTS)
      .values({
        eventId: event.event_id,
        contractVersion: event.contract_version,
        eventName: event.event_name,
        environment: event.environment,
        occurredAt: new Date(event.occurred_at),
        path: event.path,
        landingPath: event.landing_path,
        sourceType: event.source_type,
        sourceDetail: event.source_detail,
        utmSource: event.utm_source || null,
        utmMedium: event.utm_medium || null,
        utmCampaign: event.utm_campaign || null,
        consentState: event.consent_state,
        sessionId,
        countryCode: event.country_code,
        deviceType: event.device_type,
        productSlug: propertyString(event.properties, "product_slug"),
        destinationType: propertyString(event.properties, "destination_type"),
        surface: propertyString(event.properties, "surface"),
        engagementSeconds: propertyInteger(event.properties, "engagement_seconds"),
      })
      .onConflictDoNothing({ target: WEB_ANALYTICS_EVENTS.eventId })
      .returning({ id: WEB_ANALYTICS_EVENTS.id });

    const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);
    await database.delete(WEB_ANALYTICS_EVENTS).where(lt(WEB_ANALYTICS_EVENTS.occurredAt, cutoff));

    return NextResponse.json(
      { accepted: true, duplicate: inserted.length === 0 },
      { status: 202 },
    );
  } catch (error) {
    console.error(JSON.stringify({
      level: "error",
      message: "first_party_analytics_ingestion_failed",
      eventName: event.event_name,
      detail: error instanceof Error ? error.message : "unknown_error",
    }));
    return NextResponse.json({ error: "Operations could not store the event." }, { status: 503 });
  }
}
