import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gravity — Sixsmith Games',
  icons: { icon: '/icons/gravity.png', apple: '/icons/gravity.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
