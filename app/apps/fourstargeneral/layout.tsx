import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Four Star General — Sixsmith Games',
  icons: { icon: '/icons/fourstargeneral.png', apple: '/icons/fourstargeneral.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
