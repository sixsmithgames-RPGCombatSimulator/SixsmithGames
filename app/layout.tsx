import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import Script from 'next/script';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

/**
 * Purpose: Define sitewide SEO metadata to strengthen search visibility and social previews.
 * Change reason: Improve clickthrough and sharing quality across home and app pages for marketing.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://sixsmithgames.com'),
  title: 'Sixsmith Games - Professional Tools for Game Masters & Creators',
  description:
    'Discover Sixsmith Games applications including VirtualCombatSimulator, ContentCraft, MasterTyping, Gravity, and FourStarGeneral with one flexible subscription.',
  keywords: [
    'Sixsmith Games',
    'VirtualCombatSimulator',
    'ContentCraft',
    'MasterTyping',
    'Gravity board game',
    'Four Star General',
    'tabletop tools',
    'worldbuilding software',
    'typing game',
    'strategy game',
  ],
  openGraph: {
    title: 'Sixsmith Games - Professional Tools for Game Masters & Creators',
    description:
      'One subscription for VirtualCombatSimulator, ContentCraft, MasterTyping, Gravity, and FourStarGeneral. Tools for game masters, writers, strategists, and educators.',
    url: '/',
    siteName: 'Sixsmith Games',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/apple-icon.png',
        width: 512,
        height: 512,
        alt: 'Sixsmith Games logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sixsmith Games - Professional Tools for Game Masters & Creators',
    description:
      'Access VirtualCombatSimulator, ContentCraft, MasterTyping, Gravity, and FourStarGeneral with a single subscription.',
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
