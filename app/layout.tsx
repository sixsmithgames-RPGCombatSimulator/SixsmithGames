import { ClerkProvider } from '@clerk/nextjs';
import Script from 'next/script';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SITE_NAME, SITE_URL } from '@/lib/site';
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
          <Script id="org-ld-json" type="application/ld+json" strategy="afterInteractive">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/apple-icon.png`,
              sameAs: [
                SITE_URL,
              ],
            })}
          </Script>
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
            `}
          </Script>
          <Navigation />
          <main style={{ minHeight: '100vh', paddingTop: '68px', overflowX: 'clip' }}>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
