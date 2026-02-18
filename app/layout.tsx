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
        <body className="antialiased">
          <Navigation />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
