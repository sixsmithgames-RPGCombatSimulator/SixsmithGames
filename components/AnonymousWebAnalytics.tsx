/**
 * Privacy-preserving aggregate web analytics.
 *
 * Vercel Web Analytics uses no cookie and rotates its request-derived visitor
 * hash daily. It runs before an optional analytics choice, but this wrapper
 * strips query strings and blocks private product routes before transmission.
 */

'use client';

import { Analytics, type BeforeSendEvent } from '@vercel/analytics/next';

import { redactAnalyticsUrl } from '@/lib/analytics-policy';

/** Renders the anonymous page-view collector with the shared URL redaction policy. */
export default function AnonymousWebAnalytics() {
  return (
    <Analytics
      debug={false}
      beforeSend={(event: BeforeSendEvent) => {
        const url = redactAnalyticsUrl(event.url);
        return url ? { ...event, url } : null;
      }}
    />
  );
}
