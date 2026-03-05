import type { Metadata } from 'next';

/**
 * Purpose: Provide SEO and social metadata for the ContentCraft product page.
 * Change reason: Improve search visibility and link previews for the app detail route.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata: Metadata = {
  title: 'ContentCraft — AI Worldbuilding & Writing Studio | Sixsmith Games',
  description:
    'ContentCraft is the AI-powered writing platform for novelists and game masters. Keep canon consistent, generate D&D content, and organize complex worlds.',
  keywords: [
    'ContentCraft',
    'AI writing platform',
    'worldbuilding software',
    'D&D content generator',
    'canon tracking',
    'novel writing tool',
    'Sixsmith Games',
  ],
  openGraph: {
    title: 'ContentCraft — AI Worldbuilding & Writing Studio | Sixsmith Games',
    description:
      'AI-powered writing and worldbuilding studio with canon tracking, D&D stat blocks, and consistency checking for authors and game masters.',
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
    title: 'ContentCraft — AI Worldbuilding & Writing Studio | Sixsmith Games',
    description: 'Write smarter and keep canon consistent with ContentCraft by Sixsmith Games.',
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
