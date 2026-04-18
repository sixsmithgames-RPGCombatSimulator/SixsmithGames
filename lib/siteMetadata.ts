import type { Metadata, Viewport } from 'next';

import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export const rootViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Sixsmith Games - Games and Tools for GMs, Creators, and Players',
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
    title: 'Sixsmith Games - Games and Tools for GMs, Creators, and Players',
    description:
      'Start playing now with Virtual Combat Simulator, Four Star General, and MasterTyping. Check out ContentCraft for an awesome creative platform.',
    url: '/',
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sixsmith Games - Games and Tools for Game Masters, Creators, Writers, and Players',
    description:
      'Fun games and easy tools for Game Masters, creators and writers, strategy game players, and anyone who wants to improve their typing.',
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
