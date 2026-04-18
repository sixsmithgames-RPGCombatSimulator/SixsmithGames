import { BLOG_POSTS } from '../lib/blog';

const blogTagRoutes = Array.from(
  new Set(BLOG_POSTS.flatMap((post) => post.tags.map((tag) => `/blog/tag/${encodeURIComponent(tag)}`))),
).sort();

const blogPostRoutes = BLOG_POSTS.map((post) => `/blog/${post.slug}`);

export const publicRoutes = [
  '/',
  '/about',
  '/apps/contentcraft',
  '/apps/fourstargeneral',
  '/apps/gravity',
  '/apps/mastertyping',
  '/apps/virtual-combat-simulator',
  '/account',
  '/blog',
  ...blogPostRoutes,
  ...blogTagRoutes,
  '/checkout?planId=contentcraft',
  '/pricing',
  '/privacy',
  '/sign-in',
  '/sign-up',
  '/start-here',
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
