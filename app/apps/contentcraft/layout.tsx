import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';
import { contentCraftProductDefinition } from './marketing';

const product = contentCraftProductDefinition;

export const metadata = buildPageMetadata({
  title: product.title,
  description: product.metaDescription,
  path: product.officialPath,
});

export default function ContentCraftLayout({ children }: { children: ReactNode }) {
  return children;
}
