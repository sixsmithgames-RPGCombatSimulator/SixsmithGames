import type { Metadata } from 'next';

/**
 * Purpose: Provide SEO and social metadata for the Gravity product page.
 * Change reason: Improve search visibility and link previews for the app detail route.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata: Metadata = {
  title: 'Gravity — Simultaneous-Turn Sci-Fi Strategy | Sixsmith Games',
  description:
    'Gravity is a simultaneous-turn sci-fi strategy game where captains route power, lock orders, and resolve the whole turn at once under tabletop-parity rules.',
  keywords: [
    'Gravity board game',
    'sci-fi strategy game',
    'simultaneous-turn multiplayer',
    'turn-based strategy',
    'Sixsmith Games',
  ],
  openGraph: {
    title: 'Gravity — Simultaneous-Turn Sci-Fi Strategy | Sixsmith Games',
    description:
      'Route power, assign crew actions, and lock orders before the whole turn resolves at once in this tactical sci-fi strategy game.',
    url: '/apps/gravity',
    type: 'website',
    siteName: 'Sixsmith Games',
    images: [
      {
        url: '/icons/gravity-optimized.png',
        width: 512,
        height: 512,
        alt: 'Gravity icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gravity — Simultaneous-Turn Sci-Fi Strategy | Sixsmith Games',
    description: 'Tactical sci-fi strategy built around locked simultaneous turns, power routing, and escape pressure.',
    images: ['/icons/gravity-optimized.png'],
  },
  alternates: {
    canonical: '/apps/gravity',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: { icon: '/icons/gravity-optimized.png', apple: '/icons/gravity-optimized.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
