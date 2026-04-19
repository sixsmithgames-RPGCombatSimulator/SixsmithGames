import type { Metadata } from 'next';
import Link from 'next/link';

import LastUpdated from '@/components/LastUpdated';
import { getAllNewsPosts, getFeaturedNewsPosts } from '@/lib/blog';
import { buildPageMetadata } from '@/lib/metadata';
import { MARKETING_LAST_UPDATED } from '@/lib/productContent';
import { pageGutter } from '@/lib/responsive';

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog | Sixsmith Games News, Updates, and Release Notes',
  description:
    'Read Sixsmith Games news, release updates, launch notes, and official studio announcements without mixing in evergreen product guides.',
  path: '/blog',
});

export default async function BlogPage() {
  const allPosts = await getAllNewsPosts();
  const featured = await getFeaturedNewsPosts();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <section style={{ background: '#0f172a', color: 'white', padding: `78px ${pageGutter} 56px` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ maxWidth: '820px' }}>
            <h1 style={{ margin: '0 0 1rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08 }}>
              Sixsmith Games news and product updates
            </h1>
            <p style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.86)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              The blog is now reserved for news-style posts: releases, product updates, studio announcements, and other time-sensitive notes.
              Evergreen product guides live on the dedicated{' '}
              <Link href="/articles" style={{ color: '#bfdbfe', fontWeight: 800 }}>
                Articles page
              </Link>
              .
            </p>
            <LastUpdated date={MARKETING_LAST_UPDATED} tone="dark" />
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: `2.5rem ${pageGutter} 4rem` }}>
        {featured.length > 0 ? (
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Featured news</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {featured.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'block',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '22px',
                    padding: '1.2rem 1.25rem',
                    textDecoration: 'none',
                    boxShadow: '0 10px 28px rgba(15,23,42,0.05)',
                  }}
                >
                  <p style={{ margin: '0 0 0.4rem', color: '#475569', fontSize: '0.88rem', fontWeight: 700 }}>{post.category}</p>
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{post.title}</h3>
                  <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>What belongs here</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.1rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>News, not evergreen guides</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                If a post is mostly static and meant to stay useful over time, it belongs in{' '}
                <Link href="/articles" style={{ color: '#1d4ed8', fontWeight: 700 }}>
                  Articles
                </Link>
                . The blog should read like an official news feed.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Latest news</h2>
          {allPosts.length > 0 ? (
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              {allPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'block',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '18px',
                    padding: '1rem 1.1rem',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                  }}
                >
                  <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{post.title}</h3>
                  <p style={{ margin: 0, color: '#475569', lineHeight: 1.75 }}>{post.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '18px', padding: '1.1rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <p style={{ margin: '0 0 0.75rem', color: '#334155', lineHeight: 1.8 }}>
                There are no news posts published yet. For stable guides and product explainers, use the official{' '}
                <Link href="/articles" style={{ color: '#1d4ed8', fontWeight: 700 }}>
                  Articles page
                </Link>
                .
              </p>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                The product pages, help pages, and facts page stay live while the news feed catches up.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
