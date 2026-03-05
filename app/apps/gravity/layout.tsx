import type { Metadata } from 'next';

/**
 * Purpose: Provide SEO and social metadata for the Gravity product page.
 * Change reason: Improve search visibility and link previews for the app detail route.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata: Metadata = {
  title: 'Gravity — Async Sci-Fi Strategy Board Game | Sixsmith Games',
  description:
    'Gravity is a deep, asynchronous sci-fi strategy board game. Command fleets, manage resources, and play on your schedule with friends.',
  keywords: [
    'Gravity board game',
    'sci-fi strategy game',
    'asynchronous multiplayer',
    'turn-based strategy',
    'Sixsmith Games',
  ],
  openGraph: {
    title: 'Gravity — Async Sci-Fi Strategy Board Game | Sixsmith Games',
    description:
      'Tactical turn-based sci-fi strategy with asynchronous multiplayer. Command fleets and outmaneuver opponents on your schedule.',
    url: '/apps/gravity',
    type: 'website',
    siteName: 'Sixsmith Games',
    images: [
      {
        url: '/icons/gravity.png',
        width: 512,
        height: 512,
        alt: 'Gravity icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gravity — Async Sci-Fi Strategy Board Game | Sixsmith Games',
    description: 'Asynchronous sci-fi strategy board game with deep tactics and flexible playtimes.',
    images: ['/icons/gravity.png'],
  },
  alternates: {
    canonical: '/apps/gravity',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: { icon: '/icons/gravity.png', apple: '/icons/gravity.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
