import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Gravity — Fleet Tactics and Ship Systems Command | Sixsmith Games',
  description:
    'Gravity is a tactical space command game focused on simultaneous turns, ship systems management, and high-pressure battlefield decisions.',
  path: '/apps/gravity',
});

export default function GravityLayout({ children }: { children: ReactNode }) {
  return children;
}
