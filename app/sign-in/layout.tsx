import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Sign In | Sixsmith Games',
  description: 'Sign in to your Sixsmith Games account.',
  path: '/sign-in',
  noIndex: true,
});

export default function SignInLayout({ children }: { children: ReactNode }) {
  return children;
}
