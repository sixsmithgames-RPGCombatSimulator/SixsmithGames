import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';
import { gameMasterCraftProductDefinition } from './marketing';

const product = gameMasterCraftProductDefinition;

export const metadata = buildPageMetadata({
  title: product.title,
  description: product.metaDescription,
  path: product.officialPath,
});

export default function GameMasterCraftLayout({ children }: { children: ReactNode }) {
  return children;
}
