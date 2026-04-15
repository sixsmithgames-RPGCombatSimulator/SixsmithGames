import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'ContentCraft — AI-Assisted Creative Workspace | Sixsmith Games',
  description:
    'ContentCraft keeps campaigns, novels, and connected settings coherent with structured canon tracking, staged AI workflows, and reviewable revisions.',
  path: '/apps/contentcraft',
});

export default function ContentCraftLayout({ children }: { children: ReactNode }) {
  return children;
}
