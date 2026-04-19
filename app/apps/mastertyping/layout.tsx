import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';
import { masterTypingProductDefinition } from './marketing';

const product = masterTypingProductDefinition;

export const metadata = buildPageMetadata({
  title: product.title,
  description: product.metaDescription,
  path: product.officialPath,
});

export default function MasterTypingLayout({ children }: { children: ReactNode }) {
  return children;
}
