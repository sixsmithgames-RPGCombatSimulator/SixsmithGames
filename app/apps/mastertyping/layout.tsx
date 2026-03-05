import type { Metadata } from 'next';

/**
 * Purpose: Provide SEO and social metadata for the MasterTyping product page.
 * Change reason: Improve search visibility and link previews for the app detail route.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata: Metadata = {
  title: 'MasterTyping — Game-Based Typing Lessons | Sixsmith Games',
  description:
    'MasterTyping turns typing practice into an adventure with characters, abilities, and real K-12 vocabulary. Ideal for students, parents, and educators.',
  keywords: [
    'MasterTyping',
    'typing game',
    'typing practice for kids',
    'educational game',
    'K-12 typing lessons',
    'Sixsmith Games',
  ],
  openGraph: {
    title: 'MasterTyping — Game-Based Typing Lessons | Sixsmith Games',
    description:
      'Typing practice that feels like a game. Characters, abilities, and vocabulary-driven lessons for K-12 students, parents, and educators.',
    url: '/apps/mastertyping',
    type: 'website',
    siteName: 'Sixsmith Games',
    images: [
      {
        url: '/icons/mastertyping.png',
        width: 512,
        height: 512,
        alt: 'MasterTyping icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MasterTyping — Game-Based Typing Lessons | Sixsmith Games',
    description: 'Playful typing practice with characters, abilities, and K-12 vocabulary.',
    images: ['/icons/mastertyping.png'],
  },
  alternates: {
    canonical: '/apps/mastertyping',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: { icon: '/icons/mastertyping.png', apple: '/icons/mastertyping.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
