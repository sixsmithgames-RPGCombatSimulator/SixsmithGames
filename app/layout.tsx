import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sixsmith Games - Professional Tools for Game Masters & Creators',
  description: 'Discover our suite of innovative applications including VirtualCombatSimulator, ContentCraft, MasterTyping, Gravity, and FourStarGeneral.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          <Navigation />
          <main style={{ minHeight: '100vh', paddingTop: '68px' }}>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
