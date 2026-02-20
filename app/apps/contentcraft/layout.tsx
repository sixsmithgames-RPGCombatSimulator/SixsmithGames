import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ContentCraft — Sixsmith Games',
  icons: { icon: '/icons/contentcraft.png', apple: '/icons/contentcraft.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
