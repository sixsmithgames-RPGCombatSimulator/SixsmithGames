import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';
import { canCurrentUserSeeSagaCraft } from '@/lib/productVisibility.server';
import { sagaCraftProductDefinition } from './marketing';

const product = sagaCraftProductDefinition;

/**
 * Keep the private product name out of anonymous 404 metadata.
 *
 * The route body already fails closed, but static product metadata would still
 * reveal SagaCraft in the browser title to anyone who guessed the URL.
 */
export async function generateMetadata(): Promise<Metadata> {
  if (!(await canCurrentUserSeeSagaCraft())) {
    return buildPageMetadata({
      title: 'Page not found | Sixsmith Games',
      description: 'The requested page is not available.',
      path: '/',
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: product.title,
    description: product.metaDescription,
    path: product.officialPath,
    noIndex: true,
  });
}

export default function SagaCraftLayout({ children }: { children: ReactNode }) {
  return children;
}
