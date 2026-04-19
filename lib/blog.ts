import { BLOG_POSTS } from '@/lib/blogPosts';
import type { BlogPost, PostContentType } from '@/lib/blogTypes';
import { isAppSlug } from '@/lib/subscription';

export type { BlogPost } from '@/lib/blogTypes';

function isContentType(value: unknown): value is PostContentType {
  return value === 'article' || value === 'news';
}

function normalizeBlogPost(rawPost: unknown, fallbackContentType: PostContentType): BlogPost | null {
  if (!rawPost || typeof rawPost !== 'object') return null;

  const post = rawPost as Record<string, unknown>;
  const slug = typeof post.slug === 'string' ? post.slug : null;
  const title = typeof post.title === 'string' ? post.title : null;
  const excerpt = typeof post.excerpt === 'string' ? post.excerpt : null;
  const content = typeof post.content === 'string' ? post.content : null;
  const author = typeof post.author === 'string' ? post.author : 'Sixsmith Games';
  const date = typeof post.date === 'string' ? post.date : null;
  const readTime = typeof post.readTime === 'string' ? post.readTime : '3 min read';
  const category = typeof post.category === 'string' ? post.category : 'General';

  if (!slug || !title || !excerpt || !content || !date) {
    return null;
  }

  const tags = Array.isArray(post.tags)
    ? post.tags.filter((tag): tag is string => typeof tag === 'string')
    : [];

  const relatedProducts = Array.isArray(post.relatedProducts)
    ? post.relatedProducts.filter((value): value is BlogPost['relatedProducts'][number] =>
        typeof value === 'string' && isAppSlug(value),
      )
    : [];

  return {
    slug,
    title,
    excerpt,
    content,
    author,
    date,
    readTime,
    category,
    tags,
    relatedProducts,
    featured: post.featured === true,
    contentType: isContentType(post.contentType) ? post.contentType : fallbackContentType,
  };
}

async function loadDynamicPosts(): Promise<BlogPost[]> {
  const gistId = process.env.BLOG_GIST_ID;
  const token = process.env.BLOG_GITHUB_TOKEN;

  if (!gistId || !token) return [];

  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const raw = data.files?.['posts.json']?.content ?? '[]';
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((post) => normalizeBlogPost(post, 'news'))
      .filter((post): post is BlogPost => post !== null);
  } catch {
    return [];
  }
}

async function allPosts(): Promise<BlogPost[]> {
  const dynamicPosts = await loadDynamicPosts();
  const dynamicSlugs = new Set(dynamicPosts.map((post) => post.slug));
  const seededPosts = BLOG_POSTS
    .filter((post) => !dynamicSlugs.has(post.slug))
    .map((post) => ({
      ...post,
      contentType: post.contentType ?? 'article',
    }));

  return [...dynamicPosts, ...seededPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

async function postsByType(contentType: PostContentType): Promise<BlogPost[]> {
  return (await allPosts()).filter((post) => (post.contentType ?? 'article') === contentType);
}

async function featuredPostsByType(contentType: PostContentType): Promise<BlogPost[]> {
  return (await postsByType(contentType)).filter((post) => post.featured);
}

async function getPostBySlugAndType(slug: string, contentType: PostContentType): Promise<BlogPost | undefined> {
  return (await postsByType(contentType)).find((post) => post.slug === slug);
}

async function getRecentPostsByType(contentType: PostContentType, count: number): Promise<BlogPost[]> {
  return (await postsByType(contentType)).slice(0, count);
}

async function getTagsByType(contentType: PostContentType): Promise<string[]> {
  const tags = new Set<string>();
  (await postsByType(contentType)).forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

async function getPostsByTagAndType(tag: string, contentType: PostContentType): Promise<BlogPost[]> {
  return (await postsByType(contentType)).filter((post) => post.tags.includes(tag));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return allPosts();
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return (await allPosts()).filter((post) => post.featured);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return (await allPosts()).find((post) => post.slug === slug);
}

export async function getRecentPosts(count: number): Promise<BlogPost[]> {
  return (await allPosts()).slice(0, count);
}

export async function getAllTags(): Promise<string[]> {
  const tags = new Set<string>();
  (await allPosts()).forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  return (await allPosts()).filter((post) => post.tags.includes(tag));
}

export async function getAllArticles(): Promise<BlogPost[]> {
  return postsByType('article');
}

export async function getFeaturedArticles(): Promise<BlogPost[]> {
  return featuredPostsByType('article');
}

export async function getArticleBySlug(slug: string): Promise<BlogPost | undefined> {
  return getPostBySlugAndType(slug, 'article');
}

export async function getRecentArticles(count: number): Promise<BlogPost[]> {
  return getRecentPostsByType('article', count);
}

export async function getAllArticleTags(): Promise<string[]> {
  return getTagsByType('article');
}

export async function getArticlesByTag(tag: string): Promise<BlogPost[]> {
  return getPostsByTagAndType(tag, 'article');
}

export async function getAllNewsPosts(): Promise<BlogPost[]> {
  return postsByType('news');
}

export async function getFeaturedNewsPosts(): Promise<BlogPost[]> {
  return featuredPostsByType('news');
}

export async function getNewsPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return getPostBySlugAndType(slug, 'news');
}

export async function getRecentNewsPosts(count: number): Promise<BlogPost[]> {
  return getRecentPostsByType('news', count);
}

export async function getAllNewsTags(): Promise<string[]> {
  return getTagsByType('news');
}

export async function getNewsPostsByTag(tag: string): Promise<BlogPost[]> {
  return getPostsByTagAndType(tag, 'news');
}
