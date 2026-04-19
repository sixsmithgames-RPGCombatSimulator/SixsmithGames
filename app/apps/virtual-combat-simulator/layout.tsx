import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';
import { virtualCombatSimulatorProductDefinition } from './marketing';

const product = virtualCombatSimulatorProductDefinition;

export const metadata = buildPageMetadata({
  title: product.title,
  description: product.metaDescription,
  path: product.officialPath,
});

export default function VirtualCombatSimulatorLayout({ children }: { children: ReactNode }) {
  return children;
}
