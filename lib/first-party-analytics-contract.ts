import {
  isPublicAnalyticsPath,
  sanitizeAnalyticsEventName,
  sanitizeAnalyticsProperties,
} from '@/lib/analytics-policy';

export const FIRST_PARTY_ANALYTICS_CONTRACT_VERSION = 1;

export type AnalyticsConsentState = 'accepted' | 'declined' | 'unset';

export interface FirstPartyAnalyticsClientEvent {
  contract_version: number;
  event_id: string;
  event_name: string;
  occurred_at: string;
  path: string;
  source_type: string;
  source_detail: string;
  landing_path: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  consent_state: AnalyticsConsentState;
  session_id?: string;
  properties?: Record<string, string | number | boolean | null>;
}

export interface FirstPartyAnalyticsForwardEvent extends FirstPartyAnalyticsClientEvent {
  country_code: string;
  device_type: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  environment: 'production' | 'preview' | 'development';
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SAFE_DIMENSION_PATTERN = /^[a-z0-9._:/-]{0,120}$/;
const COUNTRY_PATTERN = /^[A-Z]{2}$/;
const MAX_EVENT_AGE_MS = 10 * 60 * 1000;
const MAX_FUTURE_SKEW_MS = 60 * 1000;

function readSafeDimension(value: unknown, fallback = ''): string {
  if (typeof value !== 'string') return fallback;
  const normalized = value.trim().toLowerCase().slice(0, 120);
  return SAFE_DIMENSION_PATTERN.test(normalized) ? normalized : fallback;
}

function readSafePath(value: unknown): string | null {
  if (typeof value !== 'string' || !value.startsWith('/')) return null;

  try {
    const path = new URL(value, 'https://www.sixsmithgames.com').pathname;
    return path.length <= 240 && isPublicAnalyticsPath(path) ? path : null;
  } catch {
    return null;
  }
}

function readConsentState(value: unknown): AnalyticsConsentState | null {
  return value === 'accepted' || value === 'declined' || value === 'unset'
    ? value
    : null;
}

function readOccurredAt(value: unknown, now: number): string | null {
  if (typeof value !== 'string') return null;
  const occurredAt = new Date(value);
  const timestamp = occurredAt.getTime();
  if (!Number.isFinite(timestamp)) return null;
  if (timestamp < now - MAX_EVENT_AGE_MS || timestamp > now + MAX_FUTURE_SKEW_MS) return null;
  return occurredAt.toISOString();
}

/**
 * Validates and minimizes a same-origin browser event before it crosses the
 * server-to-server Operations boundary. The returned record cannot contain a
 * query string, IP address, raw user agent, email address, or free-form text.
 */
export function normalizeFirstPartyAnalyticsEvent(
  input: unknown,
  context: {
    countryCode?: string | null;
    deviceType: FirstPartyAnalyticsForwardEvent['device_type'];
    environment: FirstPartyAnalyticsForwardEvent['environment'];
    now?: number;
  },
): FirstPartyAnalyticsForwardEvent | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const record = input as Record<string, unknown>;
  if (record.contract_version !== FIRST_PARTY_ANALYTICS_CONTRACT_VERSION) return null;

  const eventName = typeof record.event_name === 'string'
    ? sanitizeAnalyticsEventName(record.event_name)
    : null;
  const eventId = typeof record.event_id === 'string' && UUID_PATTERN.test(record.event_id)
    ? record.event_id.toLowerCase()
    : null;
  const path = readSafePath(record.path);
  const landingPath = readSafePath(record.landing_path);
  const consentState = readConsentState(record.consent_state);
  const occurredAt = readOccurredAt(record.occurred_at, context.now ?? Date.now());
  const rawProperties = record.properties && typeof record.properties === 'object' && !Array.isArray(record.properties)
    ? record.properties as Record<string, string | number | boolean | null | undefined>
    : {};
  const properties = eventName ? sanitizeAnalyticsProperties(eventName, rawProperties) : null;

  if (!eventName || !eventId || !path || !landingPath || !consentState || !occurredAt || !properties) {
    return null;
  }

  const sessionId = consentState === 'accepted'
    && typeof record.session_id === 'string'
    && UUID_PATTERN.test(record.session_id)
      ? record.session_id.toLowerCase()
      : undefined;
  const countryCode = typeof context.countryCode === 'string'
    && COUNTRY_PATTERN.test(context.countryCode.toUpperCase())
      ? context.countryCode.toUpperCase()
      : 'ZZ';

  return {
    contract_version: FIRST_PARTY_ANALYTICS_CONTRACT_VERSION,
    event_id: eventId,
    event_name: eventName,
    occurred_at: occurredAt,
    path,
    source_type: readSafeDimension(record.source_type, 'unknown'),
    source_detail: readSafeDimension(record.source_detail, 'unknown'),
    landing_path: landingPath,
    utm_source: readSafeDimension(record.utm_source),
    utm_medium: readSafeDimension(record.utm_medium),
    utm_campaign: readSafeDimension(record.utm_campaign),
    consent_state: consentState,
    ...(sessionId ? { session_id: sessionId } : {}),
    properties,
    country_code: countryCode,
    device_type: context.deviceType,
    environment: context.environment,
  };
}

/** Reduces a raw user-agent header to a non-identifying device category. */
export function classifyAnalyticsDevice(userAgent: string | null): FirstPartyAnalyticsForwardEvent['device_type'] {
  if (!userAgent) return 'unknown';
  if (/ipad|tablet|kindle|silk/i.test(userAgent)) return 'tablet';
  if (/mobi|iphone|android/i.test(userAgent)) return 'mobile';
  return 'desktop';
}

/** Blocks known automated traffic before it can inflate the owner report. */
export function isAnalyticsBot(userAgent: string | null): boolean {
  return Boolean(userAgent && /bot|crawler|spider|slurp|headless|lighthouse|preview/i.test(userAgent));
}
