import type { ReactNode } from 'react';

import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Sign Up | Sixsmith Games',
  description: 'Create your Sixsmith Games account.',
  path: '/sign-up',
  noIndex: true,
});

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return children;
}
