import type { MetadataRoute } from 'next';
import {
  getAllArticles,
  getAllArticleTags,
  getAllNewsPosts,
  getAllNewsTags,
} from '@/lib/blog';
import { slugifyTag } from '@/lib/blogTags';
import { HELP_TOPIC_ORDER, PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { SITE_URL } from '@/lib/site';

/**
 * Purpose: Generate sitemap entries for core pages, apps, blog posts, and tag hubs.
 * Change reason: Provide search engines with a complete, canonical URL inventory for faster discovery and indexation.
 * Parameters: None.
 * Returns: Array of sitemap entries consumed by Next.js route handler.
 * Side effects: None.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/about/facts',
    '/help',
    '/pricing',
    '/support',
    '/tools',
    '/start-here',
    '/blog',
    '/articles',
    '/privacy',
    '/terms',
    '/apps/gamemastercraft',
    '/apps/sagacraft',
    '/apps/virtual-combat-simulator',
    '/apps/virtual-combat-simulator/character-sheet',
    '/apps/fourstargeneral',
    '/apps/mastertyping',
    '/apps/gravity',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changefreq: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  const helpPages: MetadataRoute.Sitemap = PRODUCT_DEFINITIONS.flatMap((product) => [
    {
      url: `${SITE_URL}${product.helpPath}`,
      changefreq: 'weekly',
      priority: 0.7,
    },
    ...HELP_TOPIC_ORDER.map((topic) => ({
      url: `${SITE_URL}/help/${product.slug}/${topic}`,
      changefreq: 'weekly' as const,
      priority: 0.6,
    })),
  ]);

  const articlePosts = await getAllArticles();
  const articleEntries: MetadataRoute.Sitemap = articlePosts.map((post) => ({
    url: `${SITE_URL}/articles/${post.slug}`,
    lastmod: post.date,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const newsPosts = await getAllNewsPosts();
  const newsEntries: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const articleTags = await getAllArticleTags();
  const articleTagEntries: MetadataRoute.Sitemap = articleTags.map((tag) => ({
    url: `${SITE_URL}/articles/tag/${slugifyTag(tag)}`,
    changefreq: 'weekly',
    priority: 0.5,
  }));

  const newsTags = await getAllNewsTags();
  const newsTagEntries: MetadataRoute.Sitemap = newsTags.map((tag) => ({
    url: `${SITE_URL}/blog/tag/${slugifyTag(tag)}`,
    changefreq: 'weekly',
    priority: 0.5,
  }));

  return [...staticPages, ...helpPages, ...articleEntries, ...newsEntries, ...articleTagEntries, ...newsTagEntries];
}
