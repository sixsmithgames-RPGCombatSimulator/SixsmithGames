import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppProviders } from "@/app/providers";
import { getOperationsRuntimeConfig } from "@/lib/runtime-config";
import "./globals.css";

const GEIST_SANS = Geist({
  variable: "--font-app-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://operations.sixsmithgames.com"),
  title: {
    default: "Sixsmith Games Operations",
    template: "%s | Sixsmith Games Operations",
  },
  description:
    "Private control plane for Sixsmith Games customers, products, campaigns, approvals, and finances.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

/**
 * Purpose: Establishes global metadata, typography, and the conditional Clerk provider.
 * Parameters: The route tree rendered by Next.js.
 * Returns: The application document.
 * Side effects: Reads validated runtime configuration on the server.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getOperationsRuntimeConfig();

  return (
    <html lang="en" className={`${GEIST_SANS.variable} h-full antialiased`}>
      <body>
        <AppProviders useClerk={config.mode === "connected"}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
