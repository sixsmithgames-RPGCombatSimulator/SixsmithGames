import { BLOG_POSTS } from '@/lib/blogPosts';
import type { BlogPost } from '@/lib/blogTypes';

export type { BlogPost } from '@/lib/blogTypes';

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
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return [];
  }
}

async function allPosts(): Promise<BlogPost[]> {
  const dynamicPosts = await loadDynamicPosts();
  const dynamicSlugs = new Set(dynamicPosts.map((post) => post.slug));
  const seededPosts = BLOG_POSTS.filter((post) => !dynamicSlugs.has(post.slug));

  return [...dynamicPosts, ...seededPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
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
