import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

type OperationsDatabase = ReturnType<typeof createDatabase>;

let cachedDatabase: OperationsDatabase | undefined;

/**
 * Purpose: Determines whether the connected Neon database has been configured.
 * Parameters: None; the connection string is read from the server environment.
 * Returns: True when DATABASE_URL contains a non-empty value.
 * Side effects: None.
 */
export function databaseIsConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

/**
 * Purpose: Resolves the required Neon connection string without allowing an implicit database fallback.
 * Parameters: None; the connection string is read from the server environment.
 * Returns: The configured DATABASE_URL.
 * Side effects: Throws an actionable configuration error when DATABASE_URL is absent.
 */
function requireDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is required for connected operations storage. Root cause: the Neon connection string is missing. Fix: provision the Sixsmith Games Operations Neon project and add its pooled connection string to this environment.",
    );
  }

  return databaseUrl;
}

/**
 * Purpose: Creates the typed Drizzle client for the dedicated operations database.
 * Parameters: None; configuration is resolved from DATABASE_URL.
 * Returns: A Drizzle client backed by Neon's serverless HTTP driver.
 * Side effects: Initializes a Neon SQL client but does not issue a query.
 */
function createDatabase() {
  return drizzle(neon(requireDatabaseUrl()), { schema });
}

/**
 * Purpose: Provides one cached database client per server runtime.
 * Parameters: None.
 * Returns: The typed operations database client.
 * Side effects: Creates and caches the client on first use.
 */
export function getDatabase(): OperationsDatabase {
  cachedDatabase ??= createDatabase();
  return cachedDatabase;
}

/**
 * Purpose: Confirms that the configured Neon database accepts queries.
 * Parameters: None.
 * Returns: A promise that resolves after a successful lightweight query.
 * Side effects: Sends `select 1` to the configured Neon database and throws if it is unavailable.
 */
export async function verifyDatabaseConnection(): Promise<void> {
  const sql = neon(requireDatabaseUrl());
  await sql`select 1 as healthy`;
}
