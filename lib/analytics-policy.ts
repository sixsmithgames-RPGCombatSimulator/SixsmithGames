/**
 * Shared privacy boundaries for analytics payloads.
 *
 * These helpers deliberately remove query strings, private product routes,
 * identifiers, and free-form content before an event can reach any analytics
 * provider. They contain no browser or provider code so the same rules can be
 * tested and reused by later Operations integrations.
 */

export type AnalyticsParameterValue = string | number | boolean | null | undefined;

const PRIVATE_PATH_PREFIXES = [
  '/apps/contentcraft',
  '/apps/sagacraft',
];

const PRIVATE_PRODUCT_SLUGS = new Set(['contentcraft', 'sagacraft']);

const SENSITIVE_PROPERTY_KEYS = new Set([
  'address',
  'campaign_text',
  'character_data',
  'checkout_url',
  'clerk_user_id',
  'email',
  'name',
  'notes',
  'order_id',
  'phone',
  'prompt',
  'receipt',
  'session_id',
  'token',
  'user_id',
]);

const PROPERTY_KEY_PATTERN = /^[a-z][a-z0-9_]{0,63}$/;

const EVENT_PROPERTY_CATALOG: Record<string, ReadonlySet<string>> = {
  analytics_consent_updated: new Set(['choice']),
  merch_checkout_failed: new Set(['item_count']),
  merch_checkout_started: new Set(['distinct_item_count', 'item_count']),
  merch_interest_shared: new Set(['product']),
  merch_item_added: new Set(['product', 'variant']),
  merch_item_removed: new Set(['product', 'variant']),
  merch_shop_opened: new Set(['product', 'provider']),
  product_launch_click: new Set(['destination_type', 'product_slug', 'surface']),
  product_pricing_click: new Set(['destination_type', 'product_slug', 'surface']),
  product_sign_in_prompt_click: new Set(['destination_type', 'product_slug', 'surface']),
  product_subscribe_click: new Set(['destination_type', 'product_slug', 'surface']),
  studio_signup_click: new Set(['placement', 'plan']),
  studio_workflow_click: new Set(['placement']),
  view_item: new Set(['content_id', 'content_name', 'content_type', 'currency', 'value']),
};

/** Returns true when a route is allowed to appear in aggregate analytics. */
export function isPublicAnalyticsPath(pathname: string): boolean {
  return !PRIVATE_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * Removes query strings and fragments before Vercel receives a page URL.
 * Private owner-only products return null so no page or custom event is sent.
 */
export function redactAnalyticsUrl(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    if (!isPublicAnalyticsPath(url.pathname)) return null;

    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return null;
  }
}

/** Accepts only the stable lowercase snake-case event names in the catalog. */
export function sanitizeAnalyticsEventName(eventName: string): string | null {
  return Object.hasOwn(EVENT_PROPERTY_CATALOG, eventName) ? eventName : null;
}

/**
 * Produces a flat, bounded, non-identifying provider payload.
 * Returning null blocks an entire event tied to a private product.
 */
export function sanitizeAnalyticsProperties(
  eventName: string,
  parameters: Record<string, AnalyticsParameterValue> = {},
): Record<string, string | number | boolean | null> | null {
  const allowedProperties = EVENT_PROPERTY_CATALOG[eventName];
  if (!allowedProperties) return null;

  const productSlug = parameters.product_slug ?? parameters.product ?? parameters.content_id;
  if (typeof productSlug === 'string' && PRIVATE_PRODUCT_SLUGS.has(productSlug.toLowerCase())) {
    return null;
  }

  const sanitized: Record<string, string | number | boolean | null> = {};

  for (const [key, value] of Object.entries(parameters)) {
    const normalizedKey = key.toLowerCase();
    const isSensitiveKey = SENSITIVE_PROPERTY_KEYS.has(normalizedKey)
      || normalizedKey.endsWith('_email')
      || normalizedKey.endsWith('_token');

    if (
      !PROPERTY_KEY_PATTERN.test(normalizedKey)
      || !allowedProperties.has(normalizedKey)
      || isSensitiveKey
      || value === undefined
    ) {
      continue;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed || trimmed.includes('@')) continue;
      sanitized[normalizedKey] = trimmed.slice(0, 120);
      continue;
    }

    if (typeof value === 'number') {
      if (Number.isFinite(value)) sanitized[normalizedKey] = value;
      continue;
    }

    sanitized[normalizedKey] = value;
  }

  return sanitized;
}
