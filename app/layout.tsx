import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import AnalyticsConsent from '@/components/AnalyticsConsent';
import StructuredDataScript from '@/components/StructuredDataScript';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { createOrganizationSchema } from '@/lib/schema';
import { rootMetadata, rootViewport } from '@/lib/siteMetadata';

/**
 * Purpose: Define sitewide SEO metadata to strengthen search visibility and social previews.
 * Change reason: Improve clickthrough and sharing quality across home and app pages for marketing.
 * Parameters: None.
 * Returns: Metadata consumed by Next.js for document head.
 * Side effects: None.
 */
export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <StructuredDataScript data={createOrganizationSchema()} />
          <Navigation />
          <main className="site-main">{children}</main>
          <Footer />
          <AnalyticsConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}
