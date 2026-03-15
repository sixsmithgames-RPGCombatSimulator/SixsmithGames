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
    'MasterTyping turns typing practice into a light adventure with game mode, pro mode, a six-step assessment, exercise drills, and progress tracking for students, families, and educators.',
  keywords: [
    'MasterTyping',
    'typing game',
    'typing practice for kids',
    'educational game',
    'typing assessments',
    'typing exercises',
    'Sixsmith Games',
  ],
  openGraph: {
    title: 'MasterTyping — Game-Based Typing Lessons | Sixsmith Games',
    description:
      'Typing practice that feels like play, with game mode, pro mode, a six-step assessment, targeted exercises, and optional deeper analytics for home or classroom use.',
    url: '/apps/mastertyping',
    type: 'website',
    siteName: 'Sixsmith Games',
    images: [
      {
        url: '/icons/mastertyping-optimized.png',
        width: 512,
        height: 512,
        alt: 'MasterTyping icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MasterTyping — Game-Based Typing Lessons | Sixsmith Games',
    description: 'Game-based typing practice with lessons, a six-step assessment, exercises, and optional deeper analytics.',
    images: ['/icons/mastertyping-optimized.png'],
  },
  alternates: {
    canonical: '/apps/mastertyping',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: { icon: '/icons/mastertyping-optimized.png', apple: '/icons/mastertyping-optimized.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
