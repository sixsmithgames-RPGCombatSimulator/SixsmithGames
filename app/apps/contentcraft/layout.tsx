import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';
import { canCurrentUserSeeContentCraft } from '@/lib/productVisibility.server';
import { contentCraftProductDefinition } from './marketing';

const product = contentCraftProductDefinition;

/** Keep the private product name out of anonymous 404 metadata. */
export async function generateMetadata() {
  if (!(await canCurrentUserSeeContentCraft())) {
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

export default function ContentCraftLayout({ children }: { children: ReactNode }) {
  return children;
}
