import { defineConfig } from "drizzle-kit";

/**
 * Purpose: Configures Drizzle migrations for the connected Neon environment.
 * Parameters: Drizzle reads this module without parameters.
 * Returns: A PostgreSQL migration configuration using the required DATABASE_URL.
 * Side effects: Fails before any migration is attempted when the database URL is absent.
 */
function requireDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is required for Drizzle commands. Root cause: the Neon connection string is not present in the current environment. Fix: link the Vercel project, provision the free Neon integration, pull the environment variables, and rerun the command.",
    );
  }

  return databaseUrl;
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: requireDatabaseUrl(),
  },
  strict: true,
  verbose: true,
});
