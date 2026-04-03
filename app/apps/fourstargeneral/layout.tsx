import type { Metadata } from 'next';

/**
 * Purpose: Provide SEO and social metadata for the Four Star General product page.
 * Change reason: Improve search visibility and link previews for the app detail route.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata: Metadata = {
  title: 'Four Star General — WWII Tactical Command | Sixsmith Games',
  description:
    'Four Star General is a turn-based WWII strategy game currently centered on a tactical battle prototype with deterministic resolution, deployment choices, and supply tempo.',
  keywords: [
    'Four Star General',
    'WWII strategy game',
    'turn-based war game',
    'real tactics',
    'military strategy',
    'Sixsmith Games',
  ],
  openGraph: {
    title: 'Four Star General — WWII Tactical Command | Sixsmith Games',
    description:
      'Deploy forces, manage reserves, hold of the enemy, and fight through WWII scenarios with physics based engine-driven outcomes.',
    url: '/apps/fourstargeneral',
    type: 'website',
    siteName: 'Sixsmith Games',
    images: [
      {
        url: '/icons/fourstargeneral-optimized.png',
        width: 512,
        height: 512,
        alt: 'Four Star General icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Four Star General — WWII Tactical Command | Sixsmith Games',
    description: 'A WWII tactical battle game built around realistic resolution, logistics pressure, and scenario-driven command problems.',
    images: ['/icons/fourstargeneral-optimized.png'],
  },
  alternates: {
    canonical: '/apps/fourstargeneral',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: { icon: '/icons/fourstargeneral-optimized.png', apple: '/icons/fourstargeneral-optimized.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
