'use client';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __sixsmithTrafficContext?: {
      sourceType: string;
      sourceDetail: string;
      landingPath: string;
      utmSource: string;
    };
  }
}

const AI_SOURCES = ['chatgpt.com', 'chat.openai.com', 'openai', 'claude.ai', 'anthropic', 'perplexity.ai'];
const SEARCH_SOURCES = ['google.', 'bing.', 'yahoo.', 'duckduckgo.', 'search.brave.', 'ecosia.'];

export function trackMarketingEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const context = window.__sixsmithTrafficContext;

  window.gtag('event', eventName, {
    traffic_origin_type: context?.sourceType ?? 'unknown',
    traffic_origin_detail: context?.sourceDetail ?? 'unknown',
    landing_page: context?.landingPath ?? window.location.pathname,
    utm_source: context?.utmSource ?? '',
    ...parameters,
  });
}

export function inferTrafficContext(referrer: string, search: string, pathname: string) {
  const params = new URLSearchParams(search);
  const utmSource = params.get('utm_source') ?? '';
  const normalizedUtmSource = utmSource.toLowerCase();

  if (AI_SOURCES.some((source) => normalizedUtmSource.includes(source))) {
    return {
      sourceType: 'ai_referral',
      sourceDetail: normalizedUtmSource,
      landingPath: pathname,
      utmSource,
    };
  }

  if (SEARCH_SOURCES.some((source) => normalizedUtmSource.includes(source))) {
    return {
      sourceType: 'organic_search',
      sourceDetail: normalizedUtmSource,
      landingPath: pathname,
      utmSource,
    };
  }

  if (!referrer) {
    return {
      sourceType: 'direct',
      sourceDetail: 'direct',
      landingPath: pathname,
      utmSource,
    };
  }

  try {
    const hostname = new URL(referrer).hostname.toLowerCase();

    if (AI_SOURCES.some((source) => hostname.includes(source))) {
      return {
        sourceType: 'ai_referral',
        sourceDetail: hostname,
        landingPath: pathname,
        utmSource,
      };
    }

    if (SEARCH_SOURCES.some((source) => hostname.includes(source))) {
      return {
        sourceType: 'organic_search',
        sourceDetail: hostname,
        landingPath: pathname,
        utmSource,
      };
    }

    return {
      sourceType: 'referral',
      sourceDetail: hostname,
      landingPath: pathname,
      utmSource,
    };
  } catch {
    return {
      sourceType: 'referral',
      sourceDetail: referrer,
      landingPath: pathname,
      utmSource,
    };
  }
}
