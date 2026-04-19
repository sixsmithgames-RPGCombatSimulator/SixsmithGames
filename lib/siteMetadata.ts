import type { Metadata, Viewport } from 'next';

import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export const rootViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Sixsmith Games - Browser-Based Games and Tools',
  description: SITE_DESCRIPTION,
  keywords: [
    'Sixsmith Games',
    'Virtual Combat Simulator',
    'ContentCraft',
    'MasterTyping',
    'Four Star General',
    'tactical combat simulator',
    'worldbuilding and writing tools',
    'WWII tactical strategy game',
    'typing training for creators and gamers',
  ],
  openGraph: {
    title: 'Sixsmith Games - Browser-Based Games and Tools',
    description:
      'Explore Virtual Combat Simulator, ContentCraft, Four Star General, MasterTyping, and Gravity on the official Sixsmith Games site.',
    url: '/',
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sixsmith Games - Browser-Based Games and Tools',
    description:
      'Official product pages, pricing, help, and blog content for the Sixsmith Games lineup.',
    images: ['/apple-icon.png'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};
