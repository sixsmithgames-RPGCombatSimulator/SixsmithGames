import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'MasterTyping — Typing Training That Feels Like a Game | Sixsmith Games',
  description:
    'MasterTyping combines assessments, drills, and arcade-style game play to help you build typing speed and accuracy.',
  path: '/apps/mastertyping',
});

export default function MasterTypingLayout({ children }: { children: ReactNode }) {
  return children;
}
