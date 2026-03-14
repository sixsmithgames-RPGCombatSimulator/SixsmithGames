import type { Metadata } from 'next';

/**
 * Purpose: Provide SEO and social metadata for the ContentCraft product page.
 * Change reason: Improve search visibility and link previews for the app detail route.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata: Metadata = {
  title: 'ContentCraft — Canon-Safe Creative Workspace | Sixsmith Games',
  description:
    'ContentCraft keeps campaigns, novels, and connected settings coherent with structured canon tracking, staged AI workflows, and reviewable revisions.',
  keywords: [
    'ContentCraft',
    'AI writing platform',
    'worldbuilding software',
    'canon-safe writing tool',
    'canon tracking',
    'novel writing tool',
    'Sixsmith Games',
  ],
  openGraph: {
    title: 'ContentCraft — Canon-Safe Creative Workspace | Sixsmith Games',
    description:
      'A connected creative workspace for writers, worldbuilders, and GMs with canon tracking, staged AI generation, and version history.',
    url: '/apps/contentcraft',
    type: 'website',
    siteName: 'Sixsmith Games',
    images: [
      {
        url: '/icons/contentcraft.png',
        width: 512,
        height: 512,
        alt: 'ContentCraft icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ContentCraft — Canon-Safe Creative Workspace | Sixsmith Games',
    description: 'Build campaigns, novels, and setting work with canon tracking, staged AI workflows, and reviewable revisions.',
    images: ['/icons/contentcraft.png'],
  },
  alternates: {
    canonical: '/apps/contentcraft',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: { icon: '/icons/contentcraft.png', apple: '/icons/contentcraft.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
