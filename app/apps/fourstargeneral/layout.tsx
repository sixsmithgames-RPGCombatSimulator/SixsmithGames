import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';
import { fourStarGeneralProductDefinition } from './marketing';

const product = fourStarGeneralProductDefinition;

export const metadata = buildPageMetadata({
  title: product.title,
  description: product.metaDescription,
  path: product.officialPath,
});

export default function FourStarGeneralLayout({ children }: { children: ReactNode }) {
  return children;
}
