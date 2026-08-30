import {
  databaseIsConfigured,
  getDatabase,
  verifyDatabaseConnection,
} from "@/db/client";
import { PRODUCT_INGESTION_CURSORS } from "@/db/schema";
import { getProductActivityRuntimeConfig } from "@/lib/product-activity/config";

export const dynamic = "force-dynamic";

type DatabaseHealth = "connected" | "not_configured" | "unavailable";
type ProductActivityHealth = "disabled" | "configured" | "misconfigured" | "unavailable";

/**
 * Purpose: Normalizes the current deployment environment for operational diagnostics.
 * Parameters: None; Vercel and Node environment variables are inspected.
 * Returns: The Vercel environment when present, otherwise development or production.
 * Side effects: None.
 */
function getDeploymentEnvironment(): string {
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV;
  }

  return process.env.NODE_ENV === "production" ? "production" : "development";
}

/**
 * Purpose: Verifies that both Clerk keys required by connected mode are present.
 * Parameters: None; the server environment is inspected.
 * Returns: True only when the publishable and secret keys are non-empty.
 * Side effects: None.
 */
function clerkIsConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() &&
      process.env.CLERK_SECRET_KEY?.trim(),
  );
}

/**
 * Purpose: Resolves database availability without exposing credentials or provider details.
 * Parameters: None.
 * Returns: The database health category used by the public health response.
 * Side effects: Issues a lightweight database query and logs a sanitized failure message.
 */
async function getDatabaseHealth(): Promise<DatabaseHealth> {
  if (!databaseIsConfigured()) {
    return "not_configured";
  }

  try {
    await verifyDatabaseConnection();
    return "connected";
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Operations database health check failed: ${message}`);
    return "unavailable";
  }
}

/**
 * Purpose: Verifies that an enabled product activity ledger is configured and its migrated table can be read.
 * Parameters: None; feature flags and the connected database provide the current state.
 * Returns: Disabled, configured, misconfigured, or unavailable without exposing source URLs or credentials.
 * Side effects: Issues one bounded table query only when the ledger feature is enabled.
 */
async function getProductActivityHealth(): Promise<ProductActivityHealth> {
  const config = getProductActivityRuntimeConfig();
  if (!config.ledgerEnabled) return "disabled";
  if (config.sourceConfigurationError) return "misconfigured";
  try {
    await getDatabase().select({ id: PRODUCT_INGESTION_CURSORS.id }).from(PRODUCT_INGESTION_CURSORS).limit(1);
    return "configured";
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Product activity health check failed: ${message}`);
    return "unavailable";
  }
}

/**
 * Purpose: Reports whether the production runtime, Clerk boundary, and Neon database are ready.
 * Parameters: None.
 * Returns: A JSON health response with HTTP 200 when connected or HTTP 503 when misconfigured.
 * Side effects: Checks the Neon connection and creates a request identifier.
 */
export async function GET(): Promise<Response> {
  const runtimeMode = process.env.OPERATIONS_RUNTIME_MODE;
  const allowedEmailConfigured = Boolean(
    process.env.OPERATIONS_ALLOWED_EMAIL?.trim(),
  );
  const clerkConfigured = clerkIsConfigured();
  const [database, productActivity] = await Promise.all([
    getDatabaseHealth(),
    getProductActivityHealth(),
  ]);
  const isHealthy =
    runtimeMode === "connected" &&
    allowedEmailConfigured &&
    clerkConfigured &&
    database === "connected" &&
    !["misconfigured", "unavailable"].includes(productActivity);

  return Response.json(
    {
      data: {
        status: isHealthy ? "ok" : "misconfigured",
        environment: getDeploymentEnvironment(),
        runtimeMode: runtimeMode ?? "missing",
        checks: {
          ownerAllowlist: allowedEmailConfigured ? "configured" : "missing",
          clerk: clerkConfigured ? "configured" : "missing",
          database,
          productActivity,
        },
      },
      meta: {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
    },
    { status: isHealthy ? 200 : 503 },
  );
}
