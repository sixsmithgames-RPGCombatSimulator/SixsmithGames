import type { Metadata } from 'next';

/**
 * Purpose: Provide SEO and social metadata for the VirtualCombatSimulator product page.
 * Change reason: Improve search visibility and link previews for the app detail route.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata: Metadata = {
  title: 'VirtualCombatSimulator — D&D Combat Control Room | Sixsmith Games',
  description:
    'VirtualCombatSimulator is a modern battle management system for D&D. Run combats faster with real-time tabletop, initiative tracking, and multiplayer rooms.',
  keywords: [
    'VirtualCombatSimulator',
    'D&D virtual tabletop',
    'initiative tracker',
    'battle manager',
    'VTT for D&D',
    'Sixsmith Games',
  ],
  openGraph: {
    title: 'VirtualCombatSimulator — D&D Combat Control Room | Sixsmith Games',
    description:
      'Run D&D combats with real-time virtual tabletop, drag-and-drop initiative, and multiplayer battle rooms.',
    url: '/apps/virtual-combat-simulator',
    type: 'website',
    siteName: 'Sixsmith Games',
    images: [
      {
        url: '/icons/vcs.png',
        width: 512,
        height: 512,
        alt: 'VirtualCombatSimulator icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VirtualCombatSimulator — D&D Combat Control Room | Sixsmith Games',
    description: 'Responsive VTT with drag-and-drop initiative and real-time multiplayer rooms.',
    images: ['/icons/vcs.png'],
  },
  alternates: {
    canonical: '/apps/virtual-combat-simulator',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: { icon: '/icons/vcs.png', apple: '/icons/vcs.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
