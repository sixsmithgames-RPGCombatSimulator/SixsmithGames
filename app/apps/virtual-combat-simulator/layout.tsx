import type { Metadata } from 'next';

/**
 * Purpose: Provide SEO and social metadata for the VirtualCombatSimulator product page.
 * Change reason: Improve search visibility and link previews for the app detail route.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata: Metadata = {
  title: 'Virtual Combat Simulator — D&D Combat Control Room | Sixsmith Games',
  description:
    'Virtual Combat Simulator is a map-first battle control room for D&D 5e with initiative, action economy, rules checks, imports, and shared table state.',
  keywords: [
    'Virtual Combat Simulator',
    'D&D virtual tabletop',
    'initiative tracker',
    'battle manager',
    'VTT for D&D',
    'Sixsmith Games',
  ],
  openGraph: {
    title: 'Virtual Combat Simulator — D&D Combat Control Room | Sixsmith Games',
    description:
      'Run D&D combats with a map-first control room built around initiative, rules fidelity, combat logs, imports, and live table sync.',
    url: '/apps/virtual-combat-simulator',
    type: 'website',
    siteName: 'Sixsmith Games',
    images: [
      {
        url: '/icons/vcs-optimized.png',
        width: 512,
        height: 512,
        alt: 'Virtual Combat Simulator icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Combat Simulator — D&D Combat Control Room | Sixsmith Games',
    description: 'Map-first D&D combat control with initiative, rules checks, imports, and live table sync.',
    images: ['/icons/vcs-optimized.png'],
  },
  alternates: {
    canonical: '/apps/virtual-combat-simulator',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: { icon: '/icons/vcs-optimized.png', apple: '/icons/vcs-optimized.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
