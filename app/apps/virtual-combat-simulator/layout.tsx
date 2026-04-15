import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Virtual Combat Simulator — D&D Combat Control Room | Sixsmith Games',
  description:
    'Virtual Combat Simulator is a map-first battle control room for D&D with initiative, tokens, combat flow, and shared table state.',
  path: '/apps/virtual-combat-simulator',
});

export default function VirtualCombatSimulatorLayout({ children }: { children: ReactNode }) {
  return children;
}
