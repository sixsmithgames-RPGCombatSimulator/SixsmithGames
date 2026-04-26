import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';
import { sagaCraftProductDefinition } from './marketing';

const product = sagaCraftProductDefinition;

export const metadata = buildPageMetadata({
  title: product.title,
  description: product.metaDescription,
  path: product.officialPath,
});

export default function SagaCraftLayout({ children }: { children: ReactNode }) {
  return children;
}
