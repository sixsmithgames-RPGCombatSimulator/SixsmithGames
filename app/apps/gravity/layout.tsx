import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';
import { gravityProductDefinition } from './marketing';

const product = gravityProductDefinition;

export const metadata = buildPageMetadata({
  title: product.title,
  description: product.metaDescription,
  path: product.officialPath,
});

export default function GravityLayout({ children }: { children: ReactNode }) {
  return children;
}
