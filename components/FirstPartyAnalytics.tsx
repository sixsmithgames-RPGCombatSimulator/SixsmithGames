'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { trackFirstPartyPageEngagement, trackFirstPartyPageView, trackMarketingEvent } from '@/lib/analytics';

const FLUSH_INTERVAL_MS = 1_000;

/**
 * Records one anonymous page view and an active-time observation per public
 * page without cookies. Consented browsers also supply a session-scoped random
 * ID so Operations can calculate sessions without learning a user identity.
 */
export default function FirstPartyAnalytics() {
  const pathname = usePathname();
  const currentPath = useRef<string | null>(null);
  const activeMilliseconds = useRef(0);
  const visibleSince = useRef<number | null>(null);

  useEffect(() => {
    const captureVisibleTime = () => {
      if (visibleSince.current === null) return;
      activeMilliseconds.current += performance.now() - visibleSince.current;
      visibleSince.current = null;
    };

    const beginVisibleTime = () => {
      if (document.visibilityState === 'visible' && visibleSince.current === null) {
        visibleSince.current = performance.now();
      }
    };

    const flushCurrentPage = () => {
      captureVisibleTime();
      if (currentPath.current && activeMilliseconds.current >= FLUSH_INTERVAL_MS) {
        trackFirstPartyPageEngagement(
          currentPath.current,
          Math.min(3_600, Math.round(activeMilliseconds.current / 1_000)),
        );
      }
      activeMilliseconds.current = 0;
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') beginVisibleTime();
      else captureVisibleTime();
    };

    const handleTrackedClick = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>('[data-analytics-event]')
        : null;
      if (!target?.dataset.analyticsEvent) return;

      trackMarketingEvent(target.dataset.analyticsEvent, {
        product_slug: target.dataset.productSlug,
        destination_type: target.dataset.destinationType,
        surface: target.dataset.analyticsSurface,
      });
    };

    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('click', handleTrackedClick);
    window.addEventListener('pagehide', flushCurrentPage);
    beginVisibleTime();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('click', handleTrackedClick);
      window.removeEventListener('pagehide', flushCurrentPage);
    };
  }, []);

  useEffect(() => {
    if (currentPath.current === pathname) return;

    if (currentPath.current) {
      if (visibleSince.current !== null) {
        activeMilliseconds.current += performance.now() - visibleSince.current;
      }
      if (activeMilliseconds.current >= FLUSH_INTERVAL_MS) {
        trackFirstPartyPageEngagement(
          currentPath.current,
          Math.min(3_600, Math.round(activeMilliseconds.current / 1_000)),
        );
      }
    }

    currentPath.current = pathname;
    activeMilliseconds.current = 0;
    visibleSince.current = document.visibilityState === 'visible' ? performance.now() : null;
    trackFirstPartyPageView(pathname);
  }, [pathname]);

  return null;
}
