/**
 * Consent-gated analytics loader.
 *
 * Google Analytics and Meta Pixel are not requested until the visitor chooses
 * "Allow analytics." The preference is stored only in this browser. Declining
 * leaves the site fully usable and does not load either tracking service.
 */

'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

import styles from './AnalyticsConsent.module.css';

type ConsentChoice = 'accepted' | 'declined' | null;

const CONSENT_STORAGE_KEY = 'sixsmith_analytics_consent';

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<ConsentChoice>(null);
  const [choiceLoaded, setChoiceLoaded] = useState(false);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    setConsent(savedChoice === 'accepted' || savedChoice === 'declined' ? savedChoice : null);
    setChoiceLoaded(true);
  }, []);

  function saveChoice(choice: Exclude<ConsentChoice, null>) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    setConsent(choice);
  }

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-QWPPFGCSHD"
            strategy="afterInteractive"
          />
          <Script id="sixsmith-google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'G-QWPPFGCSHD');

              var aiSources = ['chatgpt.com', 'chat.openai.com', 'openai', 'claude.ai', 'anthropic', 'perplexity.ai'];
              var searchSources = ['google.', 'bing.', 'yahoo.', 'duckduckgo.', 'search.brave.', 'ecosia.'];
              var params = new URLSearchParams(window.location.search);
              var utmSource = (params.get('utm_source') || '').toLowerCase();
              var context = {
                sourceType: 'direct',
                sourceDetail: 'direct',
                landingPath: window.location.pathname,
                utmSource: params.get('utm_source') || ''
              };

              function includesAny(value, patterns) {
                return patterns.some(function(pattern) { return value.indexOf(pattern) !== -1; });
              }

              if (utmSource && includesAny(utmSource, aiSources)) {
                context.sourceType = 'ai_referral';
                context.sourceDetail = utmSource;
              } else if (utmSource && includesAny(utmSource, searchSources)) {
                context.sourceType = 'organic_search';
                context.sourceDetail = utmSource;
              } else if (document.referrer) {
                try {
                  var refHost = new URL(document.referrer).hostname.toLowerCase();
                  context.sourceType = includesAny(refHost, aiSources)
                    ? 'ai_referral'
                    : includesAny(refHost, searchSources)
                      ? 'organic_search'
                      : 'referral';
                  context.sourceDetail = refHost;
                } catch (error) {
                  context.sourceType = 'referral';
                  context.sourceDetail = document.referrer;
                }
              }

              window.__sixsmithTrafficContext = context;
              sessionStorage.setItem('sixsmith_traffic_context', JSON.stringify(context));
              gtag('event', 'traffic_source_context', {
                traffic_origin_type: context.sourceType,
                traffic_origin_detail: context.sourceDetail,
                landing_page: context.landingPath,
                utm_source: context.utmSource
              });
            `}
          </Script>
          <Script id="sixsmith-meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1669983767681426');
              fbq('track', 'PageView');
            `}
          </Script>
        </>
      )}

      {choiceLoaded && consent === null && (
        <aside
          className={styles.banner}
          aria-label="Analytics preference"
          aria-live="polite"
        >
          <div>
            <strong>Your table, your call.</strong>
            <p>
              We use optional analytics to learn which pages help GMs. The site
              works the same if you say no. Read our <a href="/privacy">privacy policy</a>.
            </p>
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={() => saveChoice('declined')}>
              No thanks
            </button>
            <button
              type="button"
              className={styles.accept}
              onClick={() => saveChoice('accepted')}
            >
              Allow analytics
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
