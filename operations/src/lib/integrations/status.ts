import "server-only";

import type { Tone } from "@/data/operations-types";
import {
  databaseIsConfigured,
  verifyDatabaseConnection,
} from "@/db/client";

export type IntegrationState =
  | "connected"
  | "configured"
  | "identified_not_connected"
  | "deferred"
  | "error"
  | "not_configured";

export interface IntegrationRequirement {
  label: string;
  state: "complete" | "missing" | "warning";
  detail: string;
}

export interface IntegrationSnapshot {
  id: string;
  name: string;
  category: "Core platform" | "Commerce" | "Product application" | "Planned source";
  description: string;
  state: IntegrationState;
  statusLabel: string;
  tone: Tone;
  summary: string;
  sourceOfTruth: string;
  requirements: IntegrationRequirement[];
  capabilities: string[];
  nextStep: string;
  manageUrl?: string;
}

export interface IntegrationOverview {
  checkedAt: string;
  connectedCount: number;
  actionableCount: number;
  integrations: IntegrationSnapshot[];
}

interface IntegrationCheckContext {
  allowedEmail: string;
  clerkSessionToken: string | null;
  clerkSessionVerified: boolean;
  isPreview: boolean;
}

const CONNECTION_TIMEOUT_MS = 7_000;

/**
 * Purpose: Normalizes a configured service origin before appending health or capability paths.
 * Parameters: value is an optional environment value containing an absolute HTTP(S) URL.
 * Returns: The origin without trailing slashes, or null when it is absent or invalid.
 * Side effects: None.
 */
function normalizeServiceOrigin(value: string | undefined): string | null {
  const candidate = value?.trim();

  if (!candidate) {
    return null;
  }

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

/**
 * Purpose: Performs a bounded provider request without exposing upstream response bodies or credentials.
 * Parameters: url and init describe the read-only capability probe.
 * Returns: The HTTP response when the provider answers before the timeout.
 * Side effects: Sends a network request and throws a sanitized error on timeout or network failure.
 */
async function probe(url: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(url, {
      ...init,
      cache: "no-store",
      signal: AbortSignal.timeout(CONNECTION_TIMEOUT_MS),
    });
  } catch {
    throw new Error("The provider did not answer the connection check.");
  }
}

/**
 * Purpose: Describes the Clerk boundary already proven by the protected request.
 * Parameters: context records whether a real Clerk session passed the owner allowlist.
 * Returns: A truthful Clerk integration snapshot for the Settings workspace.
 * Side effects: None.
 */
function getClerkSnapshot(context: IntegrationCheckContext): IntegrationSnapshot {
  const keysConfigured = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() &&
      process.env.CLERK_SECRET_KEY?.trim(),
  );

  if (context.isPreview) {
    return {
      id: "clerk",
      name: "Clerk authentication",
      category: "Core platform",
      description: "Owner identity, protected routes, and the exact email allowlist.",
      state: "configured",
      statusLabel: "Preview mode",
      tone: "purple",
      summary: "Local preview bypass is active. Production still requires a verified Clerk session.",
      sourceOfTruth: "Shared Sixsmith Games Clerk production instance",
      requirements: [
        {
          label: "Clerk environment keys",
          state: keysConfigured ? "complete" : "missing",
          detail: keysConfigured ? "Present in this environment" : "Required for connected mode",
        },
        {
          label: "Owner allowlist",
          state: "complete",
          detail: "Exact server-side email check is configured",
        },
      ],
      capabilities: ["Protected routes", "Owner-only authorization"],
      nextStep: "Use the production custom domain to validate a real Clerk session.",
      manageUrl: "https://dashboard.clerk.com/apps",
    };
  }

  const connected = keysConfigured && context.clerkSessionVerified;
  return {
    id: "clerk",
    name: "Clerk authentication",
    category: "Core platform",
    description: "Owner identity, protected routes, and the exact email allowlist.",
    state: connected ? "connected" : "error",
    statusLabel: connected ? "Connected" : "Needs attention",
    tone: connected ? "green" : "red",
    summary: connected
      ? "The current request passed Clerk authentication and the owner email allowlist."
      : "Clerk keys or the authenticated owner session could not be verified.",
    sourceOfTruth: "Shared Sixsmith Games Clerk production instance",
    requirements: [
      {
        label: "Clerk environment keys",
        state: keysConfigured ? "complete" : "missing",
        detail: keysConfigured ? "Present" : "Missing",
      },
      {
        label: "Authenticated owner session",
        state: context.clerkSessionVerified ? "complete" : "missing",
        detail: context.clerkSessionVerified ? "Verified for this request" : "Not verified",
      },
      {
        label: "Server-side owner allowlist",
        state: "complete",
        detail: context.allowedEmail,
      },
    ],
    capabilities: connected
      ? ["Protected routes", "Owner-only authorization", "Cross-subdomain session"]
      : [],
    nextStep: connected
      ? "No action is required. Manage identities and sign-in methods in Clerk."
      : "Restore the Clerk environment keys or sign in with the authorized owner account.",
    manageUrl: "https://dashboard.clerk.com/apps",
  };
}

/**
 * Purpose: Verifies that Neon is more than an environment variable by issuing a lightweight query.
 * Parameters: None; the database client reads the server-only connection string.
 * Returns: A connected, missing, or error snapshot.
 * Side effects: Sends `select 1` to Neon when DATABASE_URL is configured.
 */
async function getNeonSnapshot(): Promise<IntegrationSnapshot> {
  if (!databaseIsConfigured()) {
    return {
      id: "neon",
      name: "Neon Postgres",
      category: "Core platform",
      description: "Dedicated operational records, approvals, integration state, and audit history.",
      state: "not_configured",
      statusLabel: "Not configured",
      tone: "slate",
      summary: "DATABASE_URL is not present in this environment.",
      sourceOfTruth: "Sixsmith Games Operations Neon project",
      requirements: [
        { label: "DATABASE_URL", state: "missing", detail: "Add the pooled Neon connection string" },
        { label: "Connection query", state: "missing", detail: "Cannot run until DATABASE_URL is present" },
      ],
      capabilities: [],
      nextStep: "Connect the existing Neon project through Vercel environment variables.",
      manageUrl: "https://console.neon.tech/app/projects",
    };
  }

  try {
    await verifyDatabaseConnection();
    return {
      id: "neon",
      name: "Neon Postgres",
      category: "Core platform",
      description: "Dedicated operational records, approvals, integration state, and audit history.",
      state: "connected",
      statusLabel: "Connected",
      tone: "green",
      summary: "The production database accepted a live read query.",
      sourceOfTruth: "Sixsmith Games Operations Neon project",
      requirements: [
        { label: "DATABASE_URL", state: "complete", detail: "Present in this environment" },
        { label: "Connection query", state: "complete", detail: "Live query succeeded" },
        { label: "Schema migrations", state: "complete", detail: "Applied during the Vercel build" },
      ],
      capabilities: ["Operational storage", "Audit-ready schema", "Serverless reads and writes"],
      nextStep: "No infrastructure action is required. Operations reads and writes its own workflow records here.",
      manageUrl: "https://console.neon.tech/app/projects",
    };
  } catch {
    return {
      id: "neon",
      name: "Neon Postgres",
      category: "Core platform",
      description: "Dedicated operational records, approvals, integration state, and audit history.",
      state: "error",
      statusLabel: "Connection error",
      tone: "red",
      summary: "DATABASE_URL is present, but the live connection query failed.",
      sourceOfTruth: "Sixsmith Games Operations Neon project",
      requirements: [
        { label: "DATABASE_URL", state: "complete", detail: "Present in this environment" },
        { label: "Connection query", state: "missing", detail: "Live query failed" },
      ],
      capabilities: [],
      nextStep: "Review the Neon project state and the Vercel DATABASE_URL value.",
      manageUrl: "https://console.neon.tech/app/projects",
    };
  }
}

/**
 * Purpose: Validates read access to the existing Stripe account without creating or changing Stripe data.
 * Parameters: None; STRIPE_SECRET_KEY is read only on the server.
 * Returns: A Stripe capability snapshot that distinguishes missing, connected, and failed credentials.
 * Side effects: Calls Stripe's account and subscription list endpoints with a limit of one.
 */
async function getStripeSnapshot(): Promise<IntegrationSnapshot> {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  const webhookConfigured = Boolean(process.env.STRIPE_WEBHOOK_SECRET?.trim());

  if (!secretKey) {
    return {
      id: "stripe",
      name: "Stripe billing",
      category: "Commerce",
      description: "Customers, subscriptions, invoices, payments, refunds, disputes, and fees.",
      state: "identified_not_connected",
      statusLabel: "Ready to configure",
      tone: "gold",
      summary: "Stripe is the approved billing source, but this app has no server credential yet.",
      sourceOfTruth: "Existing Sixsmith Games Stripe account",
      requirements: [
        { label: "STRIPE_SECRET_KEY", state: "missing", detail: "Required for read-only billing access" },
        { label: "Read capability", state: "missing", detail: "Not tested" },
        { label: "Operations webhook", state: "warning", detail: "Deferred until the ingestion route is implemented" },
      ],
      capabilities: [],
      nextStep: "Add the existing Stripe secret key in Vercel, then recheck this page.",
      manageUrl: "https://dashboard.stripe.com/apikeys",
    };
  }

  try {
    const headers = { Authorization: `Bearer ${secretKey}` };
    const [accountResponse, subscriptionResponse] = await Promise.all([
      probe("https://api.stripe.com/v1/account", { headers }),
      probe("https://api.stripe.com/v1/subscriptions?limit=1&status=all", { headers }),
    ]);

    if (!accountResponse.ok || !subscriptionResponse.ok) {
      throw new Error("Stripe rejected the read capability check.");
    }

    await Promise.all([
      accountResponse.body?.cancel(),
      subscriptionResponse.body?.cancel(),
    ]);

    return {
      id: "stripe",
      name: "Stripe billing",
      category: "Commerce",
      description: "Customers, subscriptions, invoices, payments, refunds, disputes, and fees.",
      state: "connected",
      statusLabel: "Read access verified",
      tone: "green",
      summary: "Stripe authenticated the account and subscription read probes. No Stripe data was changed.",
      sourceOfTruth: "Existing Sixsmith Games Stripe account",
      requirements: [
        { label: "STRIPE_SECRET_KEY", state: "complete", detail: "Present and accepted" },
        { label: "Subscription read", state: "complete", detail: "Read-only probe succeeded" },
        {
          label: "Operations webhook",
          state: webhookConfigured ? "complete" : "warning",
          detail: webhookConfigured ? "Secret is configured" : "Deferred; manual reconciliation only",
        },
      ],
      capabilities: ["Read customers", "Read subscriptions", "Read payments", "Read products and prices"],
      nextStep: webhookConfigured
        ? "No action is required. Live Operations pages read Stripe directly; the webhook can support later automation."
        : "No action is required for live views. Add a webhook only when automated event processing is needed.",
      manageUrl: "https://dashboard.stripe.com/settings/user",
    };
  } catch {
    return {
      id: "stripe",
      name: "Stripe billing",
      category: "Commerce",
      description: "Customers, subscriptions, invoices, payments, refunds, disputes, and fees.",
      state: "error",
      statusLabel: "Connection error",
      tone: "red",
      summary: "The Stripe credential is present, but Stripe rejected or did not answer the read probe.",
      sourceOfTruth: "Existing Sixsmith Games Stripe account",
      requirements: [
        { label: "STRIPE_SECRET_KEY", state: "complete", detail: "Present" },
        { label: "Read capability", state: "missing", detail: "Provider validation failed" },
      ],
      capabilities: [],
      nextStep: "Confirm the key is active and can read account and subscription data.",
      manageUrl: "https://dashboard.stripe.com/apikeys",
    };
  }
}

/**
 * Purpose: Checks GameMasterCraft through the current owner's delegated Clerk token.
 * Parameters: context supplies the signed-in token and configured service origin.
 * Returns: A product-connector snapshot without persisting or changing campaign data.
 * Side effects: Sends a read-only request to GameMasterCraft's health endpoint.
 */
async function getGameMasterCraftSnapshot(
  context: IntegrationCheckContext,
): Promise<IntegrationSnapshot> {
  const origin = normalizeServiceOrigin(process.env.GMC_BASE_URL);

  if (!origin) {
    return {
      id: "gamemastercraft",
      name: "GameMasterCraft",
      category: "Product application",
      description: "Owner sign-in and application availability; not customer usage data.",
      state: "identified_not_connected",
      statusLabel: "Ready to configure",
      tone: "gold",
      summary: "The product is identified, but GMC_BASE_URL has not been configured.",
      sourceOfTruth: "GameMasterCraft production application",
      requirements: [
        { label: "GMC_BASE_URL", state: "missing", detail: "Production application origin" },
        { label: "Delegated Clerk token", state: "warning", detail: "Validated only in connected mode" },
      ],
      capabilities: [],
      nextStep: "Add the production GMC origin, then recheck with the signed-in owner session.",
      manageUrl: "https://gmcraft.sixsmithgames.com",
    };
  }

  if (!context.clerkSessionToken) {
    return {
      id: "gamemastercraft",
      name: "GameMasterCraft",
      category: "Product application",
      description: "Owner sign-in and application availability; not customer usage data.",
      state: "configured",
      statusLabel: "Configured for production",
      tone: "purple",
      summary: "The GMC origin is configured. A production Clerk session is required to validate access.",
      sourceOfTruth: "GameMasterCraft production application",
      requirements: [
        { label: "GMC_BASE_URL", state: "complete", detail: origin },
        { label: "Delegated Clerk token", state: "warning", detail: "Unavailable in local preview" },
      ],
      capabilities: ["Health endpoint identified"],
      nextStep: "Recheck this connector on the production custom domain.",
      manageUrl: "https://gmcraft.sixsmithgames.com",
    };
  }

  try {
    const response = await probe(`${origin}/api/health`, {
      headers: { Authorization: `Bearer ${context.clerkSessionToken}` },
    });

    if (!response.ok) {
      throw new Error("GameMasterCraft rejected the delegated token.");
    }

    await response.body?.cancel();
    return {
      id: "gamemastercraft",
      name: "GameMasterCraft",
      category: "Product application",
      description: "Owner sign-in and application availability; not customer usage data.",
      state: "connected",
      statusLabel: "Owner access verified",
      tone: "green",
      summary: "GameMasterCraft accepted the current owner's sign-in. This proves the app is reachable for the owner; it does not import customers, usage, campaigns, or entitlements.",
      sourceOfTruth: "GameMasterCraft production application",
      requirements: [
        { label: "GMC_BASE_URL", state: "complete", detail: origin },
        { label: "Owner sign-in", state: "complete", detail: "Authenticated availability check succeeded" },
        { label: "Customer usage endpoint", state: "warning", detail: "Not provided to Operations" },
      ],
      capabilities: ["Application availability", "Shared owner sign-in"],
      nextStep: "No action is required. Add a customer-data connection only if GameMasterCraft later exposes an approved read endpoint.",
      manageUrl: "https://gmcraft.sixsmithgames.com",
    };
  } catch {
    return {
      id: "gamemastercraft",
      name: "GameMasterCraft",
      category: "Product application",
      description: "Owner sign-in and application availability; not customer usage data.",
      state: "error",
      statusLabel: "Authentication error",
      tone: "red",
      summary: "The GMC origin is configured, but it did not accept the delegated production session.",
      sourceOfTruth: "GameMasterCraft production application",
      requirements: [
        { label: "GMC_BASE_URL", state: "complete", detail: origin },
        { label: "Delegated Clerk token", state: "missing", detail: "Provider validation failed" },
      ],
      capabilities: [],
      nextStep: "Review GMC's Clerk audience and authorized-party settings, then recheck owner access.",
      manageUrl: "https://gmcraft.sixsmithgames.com",
    };
  }
}

/**
 * Purpose: Verifies VCS process health and its server-to-server read credential separately.
 * Parameters: context supplies the owner identifier used by the authenticated content probe.
 * Returns: A VCS snapshot that never treats an unverified key as connected.
 * Side effects: Calls the VCS health route and, when configured, a read-only owner content route.
 */
async function getVcsSnapshot(
  context: IntegrationCheckContext,
): Promise<IntegrationSnapshot> {
  const origin = normalizeServiceOrigin(process.env.VCS_SERVICE_BASE_URL);
  const serviceKey = process.env.VCS_SERVICE_API_KEY?.trim();
  const ownerIdentifier = process.env.VCS_SERVICE_OWNER_ID?.trim() || context.allowedEmail;

  if (!origin) {
    return {
      id: "vcs",
      name: "Virtual Combat Simulator",
      category: "Product application",
      description: "Service availability and one owner-scoped read; not customer usage data.",
      state: "identified_not_connected",
      statusLabel: "Ready to configure",
      tone: "gold",
      summary: "The product is identified, but VCS_SERVICE_BASE_URL has not been configured.",
      sourceOfTruth: "Virtual Combat Simulator production service",
      requirements: [
        { label: "VCS_SERVICE_BASE_URL", state: "missing", detail: "Production service origin" },
        { label: "VCS_SERVICE_API_KEY", state: "missing", detail: "Server-to-server read credential" },
        { label: "VCS_SERVICE_OWNER_ID", state: "warning", detail: "Optional; defaults to the owner email" },
      ],
      capabilities: [],
      nextStep: "Add the production service origin and the existing service credential in Vercel.",
      manageUrl: "https://vcs.sixsmithgames.com",
    };
  }

  try {
    const healthResponse = await probe(`${origin}/health`);
    if (!healthResponse.ok) {
      throw new Error("VCS health check failed.");
    }
    await healthResponse.body?.cancel();

    if (!serviceKey) {
      return {
        id: "vcs",
        name: "Virtual Combat Simulator",
        category: "Product application",
        description: "Service availability and one owner-scoped read; not customer usage data.",
        state: "identified_not_connected",
        statusLabel: "Service online",
        tone: "gold",
        summary: "VCS is healthy, but no server-to-server read credential is configured.",
        sourceOfTruth: "Virtual Combat Simulator production service",
        requirements: [
          { label: "VCS service health", state: "complete", detail: "Live health probe succeeded" },
          { label: "VCS_SERVICE_API_KEY", state: "missing", detail: "Required for private product evidence" },
        ],
        capabilities: ["Public service health"],
        nextStep: "Add the existing VCS service credential in Vercel, then recheck.",
        manageUrl: "https://vcs.sixsmithgames.com",
      };
    }

    const capabilityResponse = await probe(
      `${origin}/api/service/content/${encodeURIComponent(ownerIdentifier)}`,
      { headers: { Authorization: `Bearer ${serviceKey}` } },
    );
    if (!capabilityResponse.ok) {
      throw new Error("VCS rejected the service credential.");
    }
    await capabilityResponse.body?.cancel();

    return {
      id: "vcs",
      name: "Virtual Combat Simulator",
      category: "Product application",
      description: "Service availability and one owner-scoped read; not customer usage data.",
      state: "connected",
      statusLabel: "Owner read verified",
      tone: "green",
      summary: "VCS is online and accepted one read for the owner account. This does not provide Operations with a list of customers, usage, or entitlements.",
      sourceOfTruth: "Virtual Combat Simulator production service",
      requirements: [
        { label: "VCS service health", state: "complete", detail: "Live health probe succeeded" },
        { label: "VCS_SERVICE_API_KEY", state: "complete", detail: "Authenticated read succeeded" },
        {
          label: "VCS_SERVICE_OWNER_ID",
          state: "complete",
          detail: process.env.VCS_SERVICE_OWNER_ID?.trim()
            ? "Dedicated VCS owner identifier is configured"
            : "Using the authorized owner email",
        },
        { label: "Customer usage endpoint", state: "warning", detail: "Not provided to Operations" },
      ],
      capabilities: ["Service availability", "Owner-scoped content read"],
      nextStep: "No action is required. Add a customer-data connection only if VCS later exposes an approved read endpoint.",
      manageUrl: "https://vcs.sixsmithgames.com",
    };
  } catch {
    return {
      id: "vcs",
      name: "Virtual Combat Simulator",
      category: "Product application",
      description: "Service availability and one owner-scoped read; not customer usage data.",
      state: "error",
      statusLabel: "Connection error",
      tone: "red",
      summary: "The configured VCS service or credential failed its live read check.",
      sourceOfTruth: "Virtual Combat Simulator production service",
      requirements: [
        { label: "VCS_SERVICE_BASE_URL", state: "complete", detail: origin },
        {
          label: "VCS_SERVICE_API_KEY",
          state: serviceKey ? "warning" : "missing",
          detail: serviceKey ? "Present, but validation failed" : "Missing",
        },
        {
          label: "VCS_SERVICE_OWNER_ID",
          state: ownerIdentifier ? "complete" : "missing",
          detail: ownerIdentifier ? "Owner scope is configured" : "Missing",
        },
      ],
      capabilities: [],
      nextStep: "Confirm the production service origin, TLS certificate, and service credential.",
      manageUrl: "https://vcs.sixsmithgames.com",
    };
  }
}

/**
 * Purpose: Keeps currently unused product applications visible without implying that setup is required.
 * Parameters: None.
 * Returns: A neutral snapshot for product applications Operations does not currently read.
 * Side effects: None.
 */
function getDeferredSourcesSnapshot(): IntegrationSnapshot {
  return {
    id: "remaining-products",
    name: "Other product applications",
    category: "Planned source",
    description: "ContentCraft, Four Star General, MasterTyping, Gravity, SagaCraft, and the public website.",
    state: "deferred",
    statusLabel: "Not used by Operations",
    tone: "slate",
    summary: "Operations is not reading these applications. Nothing is broken and there is nothing to configure unless a future workspace needs their data.",
    sourceOfTruth: "Each application remains responsible for its own data",
    requirements: [
      { label: "Current action", state: "complete", detail: "None required" },
      { label: "Customer data", state: "warning", detail: "Not requested from these applications" },
      { label: "Future connection", state: "warning", detail: "Add only when a specific Operations feature needs it" },
    ],
    capabilities: [],
    nextStep: "No action is required now.",
  };
}

/**
 * Purpose: Builds the complete Settings view model from live, read-only provider capability checks.
 * Parameters: context contains the verified owner identity and optional delegated Clerk token.
 * Returns: Serializable integration cards and summary counts for the Settings page.
 * Side effects: Runs Neon, Stripe, GMC, and VCS read-only probes in parallel.
 */
export async function getIntegrationOverview(
  context: IntegrationCheckContext,
): Promise<IntegrationOverview> {
  const [neon, stripe, gamemastercraft, vcs] = await Promise.all([
    getNeonSnapshot(),
    getStripeSnapshot(),
    getGameMasterCraftSnapshot(context),
    getVcsSnapshot(context),
  ]);
  const integrations = [
    getClerkSnapshot(context),
    neon,
    stripe,
    gamemastercraft,
    vcs,
    getDeferredSourcesSnapshot(),
  ];

  return {
    checkedAt: new Date().toISOString(),
    connectedCount: integrations.filter((integration) => integration.state === "connected").length,
    actionableCount: integrations.filter((integration) =>
      ["error", "identified_not_connected", "not_configured"].includes(integration.state),
    ).length,
    integrations,
  };
}
