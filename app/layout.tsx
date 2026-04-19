import { ClerkProvider } from '@clerk/nextjs';
import Script from 'next/script';
import './globals.css';
import StructuredDataScript from '@/components/StructuredDataScript';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/lib/site';
import { createOrganizationSchema } from '@/lib/schema';
import { rootMetadata, rootViewport } from '@/lib/siteMetadata';

/**
 * Purpose: Define sitewide SEO metadata to strengthen search visibility and social previews.
 * Change reason: Improve clickthrough and sharing quality across home and app pages for marketing.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          <StructuredDataScript data={createOrganizationSchema()} />
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-QWPPFGCSHD"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QWPPFGCSHD');
              (function() {
                var aiSources = ['chatgpt.com', 'chat.openai.com', 'openai', 'claude.ai', 'anthropic', 'perplexity.ai'];
                var searchSources = ['google.', 'bing.', 'yahoo.', 'duckduckgo.', 'search.brave.', 'ecosia.'];
                var params = new URLSearchParams(window.location.search);
                var utmSource = (params.get('utm_source') || '').toLowerCase();
                var context = {
                  sourceType: 'direct',
                  sourceDetail: 'direct',
                  landingPath: window.location.pathname,
                  utmSource: params.get('utm_source') || '',
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
                    if (includesAny(refHost, aiSources)) {
                      context.sourceType = 'ai_referral';
                      context.sourceDetail = refHost;
                    } else if (includesAny(refHost, searchSources)) {
                      context.sourceType = 'organic_search';
                      context.sourceDetail = refHost;
                    } else {
                      context.sourceType = 'referral';
                      context.sourceDetail = refHost;
                    }
                  } catch (error) {
                    context.sourceType = 'referral';
                    context.sourceDetail = document.referrer;
                  }
                }

                window.__sixsmithTrafficContext = context;
                try {
                  sessionStorage.setItem('sixsmith_traffic_context', JSON.stringify(context));
                } catch (error) {}

                gtag('event', 'traffic_source_context', {
                  traffic_origin_type: context.sourceType,
                  traffic_origin_detail: context.sourceDetail,
                  landing_page: context.landingPath,
                  utm_source: context.utmSource,
                });
              })();
            `}
          </Script>
          {/* Meta Pixel Code */}
          <Script id="meta-pixel" strategy="afterInteractive">
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
          <noscript>
            <img height="1" width="1" style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=1669983767681426&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>
          {/* End Meta Pixel Code */}
          <Navigation />
          <main style={{ minHeight: '100vh', paddingTop: '68px', overflowX: 'clip' }}>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
