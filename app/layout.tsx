import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import Script from 'next/script';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

/**
 * Purpose: Define sitewide SEO metadata to strengthen search visibility and social previews.
 * Change reason: Improve clickthrough and sharing quality across home and app pages for marketing.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Sixsmith Games - Games and Tools for GMs, Creators, and Players',
  description: SITE_DESCRIPTION,
  keywords: [
    'Sixsmith Games',
    'Virtual Combat Simulator',
    'ContentCraft',
    'MasterTyping',
    'Four Star General',
    'tactical combat simulator',
    'worldbuilding and writing tools',
    'WWII tactical strategy game',
    'typing training for creators and gamers',
  ],
  openGraph: {
    title: 'Sixsmith Games - Games and Tools for GMs, Creators, and Players',
    description:
      'Start playing now with Virtual Combat Simulator, Four Star General, and MasterTyping. Check out ContentCraft for an awesome creative platform.',
    url: '/',
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sixsmith Games - Games and Tools for Game Masters, Creators, Writers, and Players',
    description:
      'Fun games and easy tools for Game Masters, creators and writers, strategy game players, and anyone who wants to improve their typing.',
    images: ['/apple-icon.png'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
          <main style={{ minHeight: '100vh', paddingTop: '68px' }}>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
