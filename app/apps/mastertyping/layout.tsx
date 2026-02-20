import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MasterTyping — Sixsmith Games',
  icons: { icon: '/icons/mastertyping.png', apple: '/icons/mastertyping.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
