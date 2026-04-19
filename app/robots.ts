import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Purpose: Define robots.txt rules and sitemap location for search engines.
 * Change reason: Ensure crawl guidance and advertise sitemap for faster discovery.
 * Parameters: None.
 * Returns: Robots configuration consumed by Next.js route handler.
 * Side effects: None.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account', '/api', '/checkout', '/sign-in', '/sign-up'],
      },
      {
        userAgent: ['OAI-SearchBot', 'GPTBot', 'ClaudeBot', 'Claude-User'],
        allow: ['/', '/blog', '/help', '/about', '/support', '/apps', '/pricing', '/privacy', '/terms'],
        disallow: ['/account', '/api', '/checkout', '/sign-in', '/sign-up'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
