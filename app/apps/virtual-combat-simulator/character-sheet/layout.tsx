import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Character Sheet | Virtual Combat Simulator',
  description:
    'Tour the Virtual Combat Simulator character sheet: ability scores, combat stats, spells, actions, features, equipment, biography, SmartPaste import, and the link to tokens in the battle room.',
  path: '/apps/virtual-combat-simulator/character-sheet',
});

export default function VcsCharacterSheetLayout({ children }: { children: ReactNode }) {
  return children;
}
