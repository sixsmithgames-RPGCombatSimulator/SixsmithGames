import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VirtualCombatSimulator — Sixsmith Games',
  icons: { icon: '/icons/vcs.png', apple: '/icons/vcs.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
