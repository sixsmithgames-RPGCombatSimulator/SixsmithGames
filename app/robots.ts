import type { MetadataRoute } from 'next';

/**
 * Purpose: Define robots.txt rules and sitemap location for search engines.
 * Change reason: Ensure crawl guidance and advertise sitemap for faster discovery.
 * Parameters: None.
 * Returns: Robots configuration consumed by Next.js route handler.
 * Side effects: None.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account', '/api'],
    },
    sitemap: 'https://www.sixsmithgames.com/sitemap.xml',
    host: 'https://www.sixsmithgames.com',
  };
}
