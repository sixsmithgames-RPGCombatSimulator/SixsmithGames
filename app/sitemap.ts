import type { MetadataRoute } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog';

/**
 * Purpose: Generate sitemap entries for core pages, apps, blog posts, and tag hubs.
 * Change reason: Provide search engines with a complete, canonical URL inventory for faster discovery and indexation.
 * Parameters: None.
 * Returns: Array of sitemap entries consumed by Next.js route handler.
 * Side effects: None.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.sixsmithgames.com';

  const staticPages: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/pricing',
    '/tools',
    '/start-here',
    '/blog',
    '/apps/contentcraft',
    '/apps/virtual-combat-simulator',
    '/apps/fourstargeneral',
    '/apps/mastertyping',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    changefreq: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  const posts = await getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const tags = await getAllTags();
  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`,
    changefreq: 'weekly',
    priority: 0.5,
  }));

  return [...staticPages, ...postEntries, ...tagEntries];
}
