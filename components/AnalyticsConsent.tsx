/**
 * Consent-gated optional analytics loader and preference control.
 *
 * Anonymous, cookieless aggregate page views are handled separately. Google
 * Analytics and Meta Pixel are not requested until the visitor opts in. The
 * visitor can reopen this control and withdraw that choice at any time.
 */

'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import styles from './AnalyticsConsent.module.css';
import {
  inferTrafficContext,
  revokeOptionalAnalytics,
  trackMarketingEvent,
} from '@/lib/analytics';
import { isPublicAnalyticsPath } from '@/lib/analytics-policy';

type ConsentChoice = 'accepted' | 'declined' | null;

const CONSENT_STORAGE_KEY = 'sixsmith_analytics_consent';
const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || 'G-QWPPFGCSHD';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || '1669983767681426';

export default function AnalyticsConsent() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentChoice>(null);
  const [choiceLoaded, setChoiceLoaded] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [metaReady, setMetaReady] = useState(false);
  const googleInitialized = useRef(false);
  const lastGooglePage = useRef<string | null>(null);
  const lastMetaPage = useRef<string | null>(null);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    setConsent(savedChoice === 'accepted' || savedChoice === 'declined' ? savedChoice : null);
    setChoiceLoaded(true);
  }, []);

  function saveChoice(choice: Exclude<ConsentChoice, null>) {
    const previousChoice = consent;
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    setConsent(choice);
    setPreferencesOpen(false);
    trackMarketingEvent('analytics_consent_updated', { choice });

    if (choice === 'declined' && previousChoice === 'accepted') {
      revokeOptionalAnalytics();
      window.location.reload();
    }
  }

  const showPrompt = choiceLoaded && (consent === null || preferencesOpen);
  const optionalTrackingAllowedOnRoute = isPublicAnalyticsPath(pathname);

  useEffect(() => {
    if (optionalTrackingAllowedOnRoute) return;
    lastGooglePage.current = null;
    lastMetaPage.current = null;
  }, [optionalTrackingAllowedOnRoute]);

  useEffect(() => {
    if (
      consent !== 'accepted'
      || !optionalTrackingAllowedOnRoute
      || !googleReady
      || typeof window.gtag !== 'function'
    ) {
      return;
    }

    if (!googleInitialized.current) {
      const context = inferTrafficContext(
        document.referrer,
        window.location.search,
        window.location.pathname,
      );

      window.__sixsmithTrafficContext = context;
      window.sessionStorage.setItem('sixsmith_traffic_context', JSON.stringify(context));
      window.gtag('js', new Date());
      window.gtag('consent', 'default', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
      window.gtag('config', GOOGLE_ANALYTICS_ID, { send_page_view: false });
      window.gtag('event', 'traffic_source_context', {
        traffic_origin_type: context.sourceType,
        traffic_origin_detail: context.sourceDetail,
        landing_page: context.landingPath,
        utm_source: context.utmSource,
      });
      googleInitialized.current = true;
    }

    if (lastGooglePage.current !== pathname) {
      window.gtag('event', 'page_view', {
        page_location: `${window.location.origin}${pathname}`,
        page_title: document.title,
      });
      lastGooglePage.current = pathname;
    }
  }, [consent, googleReady, optionalTrackingAllowedOnRoute, pathname]);

  useEffect(() => {
    if (
      consent !== 'accepted'
      || !optionalTrackingAllowedOnRoute
      || !metaReady
      || typeof window.fbq !== 'function'
      || lastMetaPage.current === pathname
    ) {
      return;
    }

    window.fbq('track', 'PageView');
    lastMetaPage.current = pathname;
  }, [consent, metaReady, optionalTrackingAllowedOnRoute, pathname]);

  return (
    <>
      {consent === 'accepted' && optionalTrackingAllowedOnRoute && (
        <>
          <Script id="sixsmith-google-bootstrap" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
              });
            `}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
            strategy="afterInteractive"
            onReady={() => setGoogleReady(true)}
          />
          <Script
            id="sixsmith-meta-pixel"
            strategy="afterInteractive"
            onReady={() => setMetaReady(true)}
          >
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
            `}
          </Script>
        </>
      )}

      {showPrompt && (
        <aside
          className={styles.banner}
          aria-label="Analytics preference"
          aria-live="polite"
        >
          <div>
            <strong>Your table, your call.</strong>
            <p>
              We collect anonymous, cookieless page counts. With your permission,
              optional analytics and marketing tools can measure more detailed visits
              and actions. The site works the same if you say no. Read our{' '}
              <a href="/privacy">privacy policy</a>.
            </p>
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={() => saveChoice('declined')}>
              Keep optional tracking off
            </button>
            <button
              type="button"
              className={styles.accept}
              onClick={() => saveChoice('accepted')}
            >
              Allow optional tracking
            </button>
          </div>
        </aside>
      )}

      {choiceLoaded && consent !== null && !preferencesOpen && (
        <button
          className={styles.settingsButton}
          type="button"
          onClick={() => setPreferencesOpen(true)}
        >
          Privacy settings
        </button>
      )}
    </>
  );
}
