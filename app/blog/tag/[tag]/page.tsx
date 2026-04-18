/**
 * Blog Tag Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { pageGutter } from '@/lib/responsive';

/**
 * Purpose: Statically generate all tag paths for tag landing pages.
 * Change reason: Enable tag hubs for internal linking and SEO topical clusters.
 * Parameters: None.
 * Returns: Array of tag param objects for Next.js static generation.
 * Side effects: None.
 */
export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(tag => ({ tag }));
}

/**
 * Purpose: Provide per-tag SEO metadata.
 * Change reason: Improve discoverability and preview quality for tag hubs.
 * Parameters: params - route parameters containing the tag slug.
 * Returns: Metadata object with title/description for the tag page.
 * Side effects: None.
 */
export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const prettyTag = tag.replace(/-/g, ' ');
  return {
    title: `${prettyTag} Articles — Sixsmith Games Blog`,
    description: `Articles tagged with ${prettyTag} on the Sixsmith Games blog.`,
  };
}

/**
 * Purpose: Render a tag landing page showing all posts containing the tag.
 * Change reason: Provide crawlable tag hubs and better internal linking.
 * Parameters: params - route parameters containing the tag slug.
 * Returns: JSX for the tag listing page.
 * Side effects: None.
 */
export default async function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);
  if (posts.length === 0) {
    notFound();
  }

  const formattedTag = tag.replace(/-/g, ' ');

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        padding: `80px ${pageGutter} 50px`,
        textAlign: 'center',
      }}>
        <p style={{ color: '#818cf8', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1rem' }}>
          Tag
        </p>
        <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', margin: '0 0 0.75rem', lineHeight: 1.2 }}>
          #{formattedTag}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.0625rem', margin: 0 }}>
          Articles related to {formattedTag}
        </p>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: `3rem ${pageGutter} 4rem` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: `1.5rem ${pageGutter}`,
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                border: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                transition: 'transform 0.15s, box-shadow 0.15s',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', margin: '0 0 0.35rem', lineHeight: 1.3 }}>
                  {post.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                  {post.excerpt}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '0 0 auto' }}>
                <span style={{ color: '#9ca3af', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
