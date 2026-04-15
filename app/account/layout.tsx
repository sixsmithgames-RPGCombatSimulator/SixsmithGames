import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Account | Sixsmith Games',
  description: 'Manage your Sixsmith Games account, subscriptions, and product access.',
  path: '/account',
  noIndex: true,
});

export default function AccountLayout({ children }: { children: ReactNode }) {
  return children;
}
