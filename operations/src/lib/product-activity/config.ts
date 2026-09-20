import "server-only";

import {
  PRODUCT_ENVIRONMENTS,
  PRODUCT_SLUGS,
  type ProductEnvironment,
  type ProductSlug,
} from "@sixsmith-games/product-activity-contracts";

export interface ProductActivitySourceConfig {
  key: string;
  label: string;
  baseUrl: string;
  environment: ProductEnvironment;
  productSlugs: ProductSlug[];
  tokenEnvironmentVariable: string;
  enabled: boolean;
}

export interface ProductActivityRuntimeConfig {
  ledgerEnabled: boolean;
  autoSyncEnabled: boolean;
  staleAfterMinutes: number;
  sourceConfigurationError: string | null;
  sources: ProductActivitySourceConfig[];
}

const SOURCE_KEY_PATTERN = /^[a-z][a-z0-9_-]{1,63}$/;
const ENVIRONMENT_KEY_PATTERN = /^[A-Z][A-Z0-9_]{2,127}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * Purpose: Parses one source feed descriptor without exposing its credential value.
 * Parameters: A JSON object from PRODUCT_ACTIVITY_SOURCES_JSON and its index.
 * Returns: A validated source descriptor whose token is resolved only during synchronization.
 * Side effects: Throws an actionable configuration error for malformed or unsafe source settings.
 */
function parseSource(
  value: unknown,
  index: number,
): ProductActivitySourceConfig {
  if (!isRecord(value)) {
    throw new Error(`Product activity source ${index + 1} must be an object.`);
  }

  const { key, label, baseUrl, environment, productSlugs, tokenEnvironmentVariable, enabled } = value;
  if (typeof key !== "string" || !SOURCE_KEY_PATTERN.test(key)) {
    throw new Error(`Product activity source ${index + 1} has an invalid key.`);
  }
  if (typeof label !== "string" || label.trim().length < 2 || label.length > 96) {
    throw new Error(`Product activity source ${key} requires a bounded display label.`);
  }
  if (typeof baseUrl !== "string") {
    throw new Error(`Product activity source ${key} requires a baseUrl.`);
  }
  const parsedUrl = new URL(baseUrl);
  const localDevelopmentUrl = parsedUrl.protocol === "http:" && ["127.0.0.1", "localhost"].includes(parsedUrl.hostname);
  if (parsedUrl.protocol !== "https:" && !localDevelopmentUrl) {
    throw new Error(`Product activity source ${key} must use HTTPS outside local development.`);
  }
  if (!PRODUCT_ENVIRONMENTS.includes(environment as never)) {
    throw new Error(`Product activity source ${key} has an unsupported environment.`);
  }
  if (!Array.isArray(productSlugs) || productSlugs.length === 0 || productSlugs.some((slug) => !PRODUCT_SLUGS.includes(slug as never))) {
    throw new Error(`Product activity source ${key} must list registered product slugs.`);
  }
  if (typeof tokenEnvironmentVariable !== "string" || !ENVIRONMENT_KEY_PATTERN.test(tokenEnvironmentVariable)) {
    throw new Error(`Product activity source ${key} has an invalid token environment variable name.`);
  }
  if (typeof enabled !== "boolean") {
    throw new Error(`Product activity source ${key} must explicitly set enabled.`);
  }

  return {
    key,
    label: label.trim(),
    baseUrl: parsedUrl.toString().replace(/\/$/, ""),
    environment: environment as ProductEnvironment,
    productSlugs: productSlugs as ProductSlug[],
    tokenEnvironmentVariable,
    enabled,
  };
}

/**
 * Purpose: Resolves the feature-gated product activity runtime without silently enabling ingestion.
 * Parameters: None; only server environment variables are read.
 * Returns: Ledger flags, source descriptors, freshness policy, and any visible configuration error.
 * Side effects: None; source credentials are never returned by this function.
 */
export function getProductActivityRuntimeConfig(): ProductActivityRuntimeConfig {
  const ledgerEnabled = process.env.PRODUCT_ACTIVITY_LEDGER_ENABLED === "true";
  const autoSyncEnabled = process.env.PRODUCT_ACTIVITY_AUTO_SYNC_ENABLED === "true";
  const staleAfterRaw = Number(process.env.PRODUCT_ACTIVITY_STALE_AFTER_MINUTES ?? "60");
  const staleAfterIsValid = Number.isInteger(staleAfterRaw) && staleAfterRaw >= 5 && staleAfterRaw <= 10_080;
  const staleAfterMinutes = staleAfterIsValid
    ? staleAfterRaw
    : 60;
  const rawSources = process.env.PRODUCT_ACTIVITY_SOURCES_JSON?.trim();

  if (!rawSources) {
    return {
      ledgerEnabled,
      autoSyncEnabled,
      staleAfterMinutes,
      sourceConfigurationError: ledgerEnabled
        ? staleAfterIsValid
          ? "PRODUCT_ACTIVITY_SOURCES_JSON is required when the ledger is enabled."
          : "PRODUCT_ACTIVITY_STALE_AFTER_MINUTES must be a whole number from 5 through 10080."
        : null,
      sources: [],
    };
  }

  try {
    const parsed = JSON.parse(rawSources) as unknown;
    if (!Array.isArray(parsed)) {
      throw new Error("PRODUCT_ACTIVITY_SOURCES_JSON must be an array.");
    }
    const sources = parsed.map(parseSource);
    if (new Set(sources.map((source) => `${source.key}:${source.environment}`)).size !== sources.length) {
      throw new Error("Product activity source keys must be unique within each environment.");
    }
    const sourceConfigurationError = !staleAfterIsValid
      ? "PRODUCT_ACTIVITY_STALE_AFTER_MINUTES must be a whole number from 5 through 10080."
      : ledgerEnabled && sources.length === 0
        ? "At least one product activity source is required when the ledger is enabled."
        : null;
    return {
      ledgerEnabled,
      autoSyncEnabled,
      staleAfterMinutes,
      sourceConfigurationError,
      sources,
    };
  } catch (error) {
    return {
      ledgerEnabled,
      autoSyncEnabled,
      staleAfterMinutes,
      sourceConfigurationError: error instanceof Error ? error.message : "Product activity source configuration is invalid.",
      sources: [],
    };
  }
}

/**
 * Purpose: Resolves a least-privilege read token at the last responsible moment.
 * Parameters: A validated source descriptor containing only the environment variable name.
 * Returns: The non-empty server-only credential.
 * Side effects: Throws without performing a request when the credential is absent.
 */
export function requireProductActivitySourceToken(
  source: ProductActivitySourceConfig,
): string {
  const token = process.env[source.tokenEnvironmentVariable]?.trim();
  if (!token) {
    throw new Error(`${source.tokenEnvironmentVariable} is missing for ${source.label}.`);
  }
  return token;
}
