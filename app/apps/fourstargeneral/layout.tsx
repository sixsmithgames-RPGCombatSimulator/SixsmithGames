import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Four Star General — WWII Tactical Command | Sixsmith Games',
  description:
    'Four Star General is a WWII tactical strategy game built around battlefield pressure, positioning, supply, and mission objectives.',
  path: '/apps/fourstargeneral',
});

export default function FourStarGeneralLayout({ children }: { children: ReactNode }) {
  return children;
}
