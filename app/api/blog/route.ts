/**
 * Blog API — for AI agent to publish new posts
 * POST /api/blog  — create a new post
 * GET  /api/blog  — list all posts (seed + dynamic)
 *
 * Requires header:  Authorization: Bearer <BLOG_API_SECRET>
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAllPosts, BlogPost } from '@/lib/blog';

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json');
const SECRET = process.env.BLOG_API_SECRET;

function readDynamicPosts(): BlogPost[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return [];
  }
}

function writeDynamicPosts(posts: BlogPost[]): void {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
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
  const seed = getAllPosts();
  const dynamic = readDynamicPosts();
  const all = [...dynamic, ...seed].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return NextResponse.json(all);
}

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Partial<BlogPost>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { title, content, excerpt, author, category, tags, featured, date } = body;

  if (!title || !content) {
    return NextResponse.json({ error: 'title and content are required' }, { status: 400 });
  }

  const existing = readDynamicPosts();
  const slug = slugify(title as string);

  if (existing.find(p => p.slug === slug)) {
    return NextResponse.json({ error: `Post with slug "${slug}" already exists` }, { status: 409 });
  }

  const post: BlogPost = {
    slug,
    title: title as string,
    excerpt: (excerpt as string) || (content as string).split('\n').find(l => l.trim() && !l.startsWith('#')) || '',
    content: content as string,
    author: (author as string) || 'Sixsmith Games',
    date: (date as string) || new Date().toISOString().split('T')[0],
    readTime: estimateReadTime(content as string),
    category: (category as string) || 'Gaming',
    tags: (tags as string[]) || [],
    featured: (featured as boolean) || false,
  };

  writeDynamicPosts([post, ...existing]);

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

  const existing = readDynamicPosts();
  const filtered = existing.filter(p => p.slug !== slug);
  if (filtered.length === existing.length) {
    return NextResponse.json({ error: 'Post not found in dynamic posts' }, { status: 404 });
  }

  writeDynamicPosts(filtered);
  return NextResponse.json({ success: true, deleted: slug });
}
