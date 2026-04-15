import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Checkout | Sixsmith Games',
  description: 'Complete your Sixsmith Games subscription checkout.',
  path: '/checkout',
  noIndex: true,
});

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return children;
}
