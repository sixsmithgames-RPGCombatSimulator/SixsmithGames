import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'SmartPaste Character Import and Character Sheet | VCS',
  description:
    'Paste permitted character text, review what SmartPaste recognizes, and use the approved VCS character sheet with its token in the battle room.',
  path: '/apps/virtual-combat-simulator/character-sheet',
});

/** Supplies route metadata while leaving the static character-sheet page unchanged. */
export default function VcsCharacterSheetLayout({ children }: { children: ReactNode }) {
  return children;
}
