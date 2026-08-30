import type { ProductActivityEvent } from "./contracts";
import { getActivityEventDefinition } from "./catalog";

export const PRODUCT_ACTIVITY_METRIC_VERSION = 1 as const;

export interface ProductActivityMetricContribution {
  metricVersion: typeof PRODUCT_ACTIVITY_METRIC_VERSION;
  meaningfulEvents: number;
  sessions: number;
  completions: number;
  activeSeconds: number;
}

/**
 * Purpose: Applies the versioned Operations definitions for meaningful use, sessions, completions, and active time.
 * Safety: Page views never enter this function; active time is accepted only from an event-specific allowlisted scalar.
 */
export function getProductActivityMetricContribution(
  event: ProductActivityEvent,
): ProductActivityMetricContribution {
  const definition = getActivityEventDefinition(event.eventType);
  if (!definition || !definition.productSlugs.some((slug) => slug === event.productSlug)) {
    throw new Error(`Metric semantics are unavailable for ${event.productSlug}:${event.eventType}.`);
  }
  const activeSeconds = typeof event.dimensions.active_seconds === "number"
    ? Math.max(0, Math.round(event.dimensions.active_seconds))
    : 0;

  return {
    metricVersion: PRODUCT_ACTIVITY_METRIC_VERSION,
    meaningfulEvents: definition.meaningful ? 1 : 0,
    sessions: definition.sessionContribution === "none" ? 0 : 1,
    completions: definition.completion ? 1 : 0,
    activeSeconds,
  };
}

/** Purpose: Identifies the latest user-driven committed event eligible for last_used_at. */
export function eventCountsAsMeaningfulUse(event: ProductActivityEvent): boolean {
  return Boolean(getActivityEventDefinition(event.eventType)?.meaningful);
}
