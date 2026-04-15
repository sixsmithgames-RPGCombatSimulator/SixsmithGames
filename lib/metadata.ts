import type { Metadata } from 'next';

import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/site';

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  path,
  type = 'website',
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
