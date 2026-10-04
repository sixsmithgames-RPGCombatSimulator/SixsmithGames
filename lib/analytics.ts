'use client';

import {
  isPublicAnalyticsPath,
  sanitizeAnalyticsEventName,
  sanitizeAnalyticsProperties,
  type AnalyticsParameterValue,
} from '@/lib/analytics-policy';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    va?: (...args: unknown[]) => void;
    vaq?: unknown[][];
    __sixsmithTrafficContext?: {
      sourceType: string;
      sourceDetail: string;
      landingPath: string;
      utmSource: string;
      utmMedium: string;
      utmCampaign: string;
    };
  }
}

const AI_SOURCES = ['chatgpt.com', 'chat.openai.com', 'openai', 'claude.ai', 'anthropic', 'perplexity.ai'];
const SEARCH_SOURCES = ['google.', 'bing.', 'yahoo.', 'duckduckgo.', 'search.brave.', 'ecosia.'];
const CONSENT_STORAGE_KEY = 'sixsmith_analytics_consent';
const CONSENTED_SESSION_STORAGE_KEY = 'sixsmith_analytics_session_id';
const VERCEL_CUSTOM_EVENTS_ENABLED =
  process.env.NEXT_PUBLIC_VERCEL_WEB_ANALYTICS_CUSTOM_EVENTS === 'true';

function optionalAnalyticsConsentState(): 'accepted' | 'declined' | 'unset' {
  if (typeof window === 'undefined') return 'unset';
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === 'accepted' || value === 'declined' ? value : 'unset';
}

function consentedSessionId(): string | undefined {
  if (optionalAnalyticsConsentState() !== 'accepted') return undefined;

  const existing = window.sessionStorage.getItem(CONSENTED_SESSION_STORAGE_KEY);
  if (existing) return existing;

  const sessionId = window.crypto.randomUUID();
  window.sessionStorage.setItem(CONSENTED_SESSION_STORAGE_KEY, sessionId);
  return sessionId;
}

function sendFirstPartyEvent(
  eventName: string,
  parameters: Record<string, AnalyticsParameterValue>,
  pathOverride?: string,
) {
  if (typeof window === 'undefined') return;
  const path = pathOverride ?? window.location.pathname;
  if (!isPublicAnalyticsPath(path)) return;

  const safeEventName = sanitizeAnalyticsEventName(eventName);
  const safeParameters = sanitizeAnalyticsProperties(safeEventName ?? '', parameters);
  if (!safeEventName || !safeParameters) return;

  const context = window.__sixsmithTrafficContext ?? inferTrafficContext(
    document.referrer,
    window.location.search,
    path,
  );
  const consentState = optionalAnalyticsConsentState();
  const sessionId = consentedSessionId();
  const payload = JSON.stringify({
    contract_version: 1,
    event_id: window.crypto.randomUUID(),
    event_name: safeEventName,
    occurred_at: new Date().toISOString(),
    path,
    source_type: context.sourceType,
    source_detail: context.sourceDetail,
    landing_path: context.landingPath,
    utm_source: context.utmSource,
    utm_medium: context.utmMedium,
    utm_campaign: context.utmCampaign,
    consent_state: consentState,
    ...(sessionId ? { session_id: sessionId } : {}),
    properties: safeParameters,
  });
  const body = new Blob([payload], { type: 'application/json' });

  if (navigator.sendBeacon('/api/analytics/events', body)) return;

  void fetch('/api/analytics/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  });
}

/** Returns whether this browser has explicitly allowed optional analytics. */
export function hasOptionalAnalyticsConsent(): boolean {
  return optionalAnalyticsConsentState() === 'accepted';
}

/** Records a redacted public page view in the first-party aggregate ledger. */
export function trackFirstPartyPageView(pathname: string) {
  sendFirstPartyEvent('page_view', {}, pathname);
}

/** Records visible active time for one public page without persistent identity. */
export function trackFirstPartyPageEngagement(pathname: string, activeSeconds: number) {
  sendFirstPartyEvent('page_engaged', { engagement_seconds: activeSeconds }, pathname);
}

/**
 * Records a cataloged marketing behavior through the providers currently
 * permitted for this browser. Anonymous Vercel custom events are separately
 * cost-gated; GA4 remains gated by explicit optional-analytics consent.
 */
export function trackMarketingEvent(
  eventName: string,
  parameters: Record<string, AnalyticsParameterValue> = {},
) {
  if (typeof window === 'undefined') return;
  if (!isPublicAnalyticsPath(window.location.pathname)) return;

  const safeEventName = sanitizeAnalyticsEventName(eventName);
  const safeParameters = sanitizeAnalyticsProperties(safeEventName ?? '', parameters);
  if (!safeEventName || !safeParameters) return;

  sendFirstPartyEvent(safeEventName, safeParameters);

  if (VERCEL_CUSTOM_EVENTS_ENABLED) {
    if (!window.va) {
      window.va = (...args: unknown[]) => {
        window.vaq = window.vaq ?? [];
        window.vaq.push(args);
      };
    }
    window.va('event', { name: safeEventName, data: safeParameters });
  }

  if (!hasOptionalAnalyticsConsent() || typeof window.gtag !== 'function') return;

  const context = window.__sixsmithTrafficContext;

  window.gtag('event', safeEventName, {
    traffic_origin_type: context?.sourceType ?? 'unknown',
    traffic_origin_detail: context?.sourceDetail ?? 'unknown',
    landing_page: context?.landingPath ?? window.location.pathname,
    utm_source: context?.utmSource ?? '',
    ...safeParameters,
  });
}

/**
 * Revokes loaded optional providers and removes their known first-party
 * cookies before the page reloads without those scripts.
 */
export function revokeOptionalAnalytics() {
  if (typeof window === 'undefined') return;

  window.gtag?.('consent', 'update', {
    ad_personalization: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    analytics_storage: 'denied',
  });
  window.fbq?.('consent', 'revoke');

  const analyticsCookieNames = document.cookie
    .split(';')
    .map((entry) => entry.split('=')[0]?.trim())
    .filter((name): name is string => Boolean(name) && /^(_ga|_gid|_gat|_fbp|_fbc)/.test(name));

  for (const name of analyticsCookieNames) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.sixsmithgames.com; SameSite=Lax`;
  }
}

export function inferTrafficContext(referrer: string, search: string, pathname: string) {
  const params = new URLSearchParams(search);
  const rawUtmSource = params.get('utm_source') ?? '';
  const normalizedUtmSource = rawUtmSource.trim().toLowerCase();
  const utmSource = /^[a-z0-9._-]{1,80}$/.test(normalizedUtmSource)
    ? normalizedUtmSource
    : normalizedUtmSource
      ? 'other'
      : '';
  const normalizeCampaignDimension = (value: string | null) => {
    const normalized = (value ?? '').trim().toLowerCase();
    return /^[a-z0-9._-]{1,80}$/.test(normalized) ? normalized : normalized ? 'other' : '';
  };
  const utmMedium = normalizeCampaignDimension(params.get('utm_medium'));
  const utmCampaign = normalizeCampaignDimension(params.get('utm_campaign'));

  if (['itch', 'itchio', 'itch.io'].includes(utmSource)) {
    return {
      sourceType: 'game_marketplace',
      sourceDetail: 'itch.io',
      landingPath: pathname,
      utmSource: 'itchio',
      utmMedium,
      utmCampaign,
    };
  }

  if (AI_SOURCES.some((source) => utmSource.includes(source))) {
    return {
      sourceType: 'ai_referral',
      sourceDetail: utmSource,
      landingPath: pathname,
      utmSource,
      utmMedium,
      utmCampaign,
    };
  }

  if (SEARCH_SOURCES.some((source) => utmSource.includes(source))) {
    return {
      sourceType: 'organic_search',
      sourceDetail: utmSource,
      landingPath: pathname,
      utmSource,
      utmMedium,
      utmCampaign,
    };
  }

  if (!referrer) {
    return {
      sourceType: 'direct',
      sourceDetail: 'direct',
      landingPath: pathname,
      utmSource,
      utmMedium,
      utmCampaign,
    };
  }

  try {
    const hostname = new URL(referrer).hostname.toLowerCase();

    if (hostname === 'itch.io' || hostname.endsWith('.itch.io')) {
      return {
        sourceType: 'game_marketplace',
        sourceDetail: 'itch.io',
        landingPath: pathname,
        utmSource: utmSource || 'itchio',
        utmMedium,
        utmCampaign,
      };
    }

    if (AI_SOURCES.some((source) => hostname.includes(source))) {
      return {
        sourceType: 'ai_referral',
        sourceDetail: hostname,
        landingPath: pathname,
        utmSource,
        utmMedium,
        utmCampaign,
      };
    }

    if (SEARCH_SOURCES.some((source) => hostname.includes(source))) {
      return {
        sourceType: 'organic_search',
        sourceDetail: hostname,
        landingPath: pathname,
        utmSource,
        utmMedium,
        utmCampaign,
      };
    }

    return {
      sourceType: 'referral',
      sourceDetail: hostname,
      landingPath: pathname,
      utmSource,
      utmMedium,
      utmCampaign,
    };
  } catch {
    return {
      sourceType: 'referral',
      sourceDetail: 'invalid_referrer',
      landingPath: pathname,
      utmSource,
      utmMedium,
      utmCampaign,
    };
  }
}
