import type { Metadata } from 'next';

/**
 * Purpose: Provide SEO and social metadata for the Four Star General product page.
 * Change reason: Improve search visibility and link previews for the app detail route.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata: Metadata = {
  title: 'Four Star General — WWII Strategy Game | Sixsmith Games',
  description:
    'Command WWII forces in Four Star General. Plan operations, manage resources, and outmaneuver opponents in strategic turn-based gameplay.',
  keywords: [
    'Four Star General',
    'WWII strategy game',
    'turn-based war game',
    'military strategy',
    'Sixsmith Games',
  ],
  openGraph: {
    title: 'Four Star General — WWII Strategy Game | Sixsmith Games',
    description:
      'Strategic and tactical turn-based WWII gameplay. Command your forces, manage operations, and compete asynchronously.',
    url: '/apps/fourstargeneral',
    type: 'website',
    siteName: 'Sixsmith Games',
    images: [
      {
        url: '/icons/fourstargeneral.png',
        width: 512,
        height: 512,
        alt: 'Four Star General icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Four Star General — WWII Strategy Game | Sixsmith Games',
    description: 'Turn-based WWII strategy with asynchronous play and deep tactical decisions.',
    images: ['/icons/fourstargeneral.png'],
  },
  alternates: {
    canonical: '/apps/fourstargeneral',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: { icon: '/icons/fourstargeneral.png', apple: '/icons/fourstargeneral.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
