/**
 * Blog API — for AI agent to publish new posts
 * POST   /api/blog          — create a new post
 * GET    /api/blog          — list all posts (seed + dynamic)
 * DELETE /api/blog?slug=... — remove a dynamic post
 *
 * Requires header:  Authorization: Bearer <BLOG_API_SECRET>
 *
 * Posts are stored in a GitHub Gist (BLOG_GIST_ID) so they persist
 * across Vercel deployments. The Gist contains a single file: posts.json
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, BlogPost } from '@/lib/blog';

const SECRET   = process.env.BLOG_API_SECRET;
const GIST_ID  = process.env.BLOG_GIST_ID;
const GH_TOKEN = process.env.BLOG_GITHUB_TOKEN;
const GIST_FILENAME = 'posts.json';

const GIST_HEADERS = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${GH_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
};

async function readDynamicPosts(): Promise<BlogPost[]> {
  if (!GIST_ID || !GH_TOKEN) return [];
  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: GIST_HEADERS,
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    const raw = data.files?.[GIST_FILENAME]?.content ?? '[]';
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return [];
  }
}

async function writeDynamicPosts(posts: BlogPost[]): Promise<void> {
  if (!GIST_ID || !GH_TOKEN) throw new Error('BLOG_GIST_ID or BLOG_GITHUB_TOKEN not configured');
  await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: 'PATCH',
    headers: GIST_HEADERS,
    body: JSON.stringify({
      files: {
        [GIST_FILENAME]: { content: JSON.stringify(posts, null, 2) },
      },
    }),
  });
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function authorize(req: NextRequest): boolean {
  if (!SECRET) return false;
  const auth = req.headers.get('authorization') ?? '';
  return auth === `Bearer ${SECRET}`;
}

export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const dynamic = await readDynamicPosts();
  const seed = await getAllPosts();
  const dynamicSlugs = new Set(dynamic.map((p: BlogPost) => p.slug));
  const all = [...dynamic, ...seed.filter((p: BlogPost) => !dynamicSlugs.has(p.slug))].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return NextResponse.json(all);
}

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!GIST_ID || !GH_TOKEN) {
    return NextResponse.json(
      { error: 'Server not configured: BLOG_GIST_ID and BLOG_GITHUB_TOKEN must be set in Vercel env vars' },
      { status: 503 }
    );
  }

  let body: Partial<BlogPost>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { title, content, excerpt, author, category, tags, featured, date, relatedProducts } = body;

  if (!title || !content) {
    return NextResponse.json({ error: 'title and content are required' }, { status: 400 });
  }

  const existing = await readDynamicPosts();
  const slug = slugify(title as string);

  if (existing.find(p => p.slug === slug)) {
    return NextResponse.json({ error: `Post with slug "${slug}" already exists` }, { status: 409 });
  }

  const post: BlogPost = {
    slug,
    title: title as string,
    excerpt: (excerpt as string) || (content as string).split('\n').find(l => l.trim() && !l.startsWith('#')) || '',
    content: content as string,
    contentType: body.contentType === 'article' ? 'article' : 'news',
    author: (author as string) || 'Sixsmith Games',
    date: (date as string) || new Date().toISOString().split('T')[0],
    readTime: estimateReadTime(content as string),
    category: (category as string) || 'Writing & Worldbuilding',
    tags: (tags as string[]) || [],
    featured: (featured as boolean) || false,
    relatedProducts: (relatedProducts as BlogPost['relatedProducts']) || [],
  };

  await writeDynamicPosts([post, ...existing]);

  return NextResponse.json({ success: true, slug: post.slug, post }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'slug query param required' }, { status: 400 });
  }

  const existing = await readDynamicPosts();
  const filtered = existing.filter(p => p.slug !== slug);
  if (filtered.length === existing.length) {
    return NextResponse.json({ error: 'Post not found in dynamic posts' }, { status: 404 });
  }

  await writeDynamicPosts(filtered);
  return NextResponse.json({ success: true, deleted: slug });
}
