import { BLOG_POSTS } from '../lib/blogPosts';
import { toTagRoute } from '../lib/blogTags';
import { HELP_TOPIC_ORDER, PUBLIC_PRODUCT_DEFINITIONS } from '../lib/productContent';

const blogTagRoutes = Array.from(
  new Set(BLOG_POSTS.flatMap((post) => post.tags.map((tag) => toTagRoute(tag)))),
).sort();

const blogPostRoutes = BLOG_POSTS.map((post) => `/blog/${post.slug}`);
const productRoutes = PUBLIC_PRODUCT_DEFINITIONS.map((product) => `/apps/${product.slug}`);
const helpRoutes = PUBLIC_PRODUCT_DEFINITIONS.flatMap((product) => [
  `/help/${product.slug}`,
  ...HELP_TOPIC_ORDER.map((topic) => `/help/${product.slug}/${topic}`),
]);

export const publicRoutes = [
  '/',
  '/about',
  '/about/facts',
  ...productRoutes,
  '/apps/virtual-combat-simulator/character-sheet',
  '/account',
  '/articles',
  '/blog',
  ...blogPostRoutes,
  ...blogTagRoutes,
  '/checkout?planId=contentcraft',
  '/help',
  ...helpRoutes,
  '/merch',
  '/merch/claim',
  '/pricing',
  '/privacy',
  '/sign-in',
  '/sign-up',
  '/start-here',
  '/support',
  '/terms',
  '/tools',
];

export function screenshotSlug(route: string) {
  return route
    .replace(/^\//, '')
    .replace(/[/?=&%]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'home';
}
