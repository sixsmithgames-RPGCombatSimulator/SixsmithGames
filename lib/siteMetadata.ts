import type { Metadata, Viewport } from 'next';

import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export const rootViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'GameMaster Studio | Campaign Prep and VTT Combat',
  description: SITE_DESCRIPTION,
  keywords: [
    'Sixsmith Games',
    'Virtual Combat Simulator',
    'GameMasterCraft',
    'MasterTyping',
    'Four Star General',
    'tactical combat simulator',
    'campaign planning for game masters',
    'VTT for game masters',
    'RPG campaign management',
    'tabletop RPG merchandise',
    'Game Master gifts',
    'WWII tactical strategy game',
    'typing training for creators and gamers',
  ],
  openGraph: {
    title: 'GameMaster Studio | Campaign Prep and VTT Combat',
    description:
      'Prepare the campaign in GameMasterCraft and run the encounter in Virtual Combat Simulator.',
    url: '/',
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GameMaster Studio | Campaign Prep and VTT Combat',
    description:
      'Campaign memory and VTT encounter control for tabletop game masters.',
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
