import "server-only";

export type OperationsRuntimeMode = "preview" | "connected";

export interface OperationsRuntimeConfig {
  mode: OperationsRuntimeMode;
  allowedEmail: string;
  isVercelProduction: boolean;
}

/**
 * Purpose: Reads and validates the server-only runtime contract used by auth and data access.
 * Parameters: None; values are read from the process environment.
 * Returns: A validated runtime mode, normalized owner email, and deployment context.
 * Side effects: Throws an actionable configuration error instead of silently selecting a mode.
 */
export function getOperationsRuntimeConfig(): OperationsRuntimeConfig {
  const rawMode = process.env.OPERATIONS_RUNTIME_MODE;
  const rawAllowedEmail = process.env.OPERATIONS_ALLOWED_EMAIL;
  const isVercelProduction = process.env.VERCEL_ENV === "production";

  if (rawMode !== "preview" && rawMode !== "connected") {
    throw new Error(
      'OPERATIONS_RUNTIME_MODE must be either "preview" or "connected". Root cause: the runtime mode is missing or invalid. Fix: copy .env.example to .env.local for local review, or set OPERATIONS_RUNTIME_MODE=connected in Vercel.',
    );
  }

  if (!rawAllowedEmail) {
    throw new Error(
      "OPERATIONS_ALLOWED_EMAIL is required. Root cause: the owner allowlist has not been configured. Fix: set OPERATIONS_ALLOWED_EMAIL=sexsmith2005@gmail.com in the local and Vercel environments.",
    );
  }

  if (rawMode === "preview" && isVercelProduction) {
    throw new Error(
      "Preview mode is blocked in Vercel production. Root cause: a sample-data build would be deployed without Clerk authentication. Fix: configure Clerk and Neon, then set OPERATIONS_RUNTIME_MODE=connected before deploying.",
    );
  }

  if (rawMode === "connected") {
    const missingKeys = [
      "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
      "CLERK_SECRET_KEY",
      "DATABASE_URL",
    ].filter((key) => !process.env[key]);

    if (missingKeys.length > 0) {
      throw new Error(
        `Connected mode is missing required environment keys: ${missingKeys.join(", ")}. Root cause: Clerk and Neon are not fully provisioned for this environment. Fix: add the missing keys in Vercel and pull them locally before starting the app.`,
      );
    }
  }

  return {
    mode: rawMode,
    allowedEmail: rawAllowedEmail.trim().toLowerCase(),
    isVercelProduction,
  };
}
