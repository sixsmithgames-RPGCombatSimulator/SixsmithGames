/**
 * Blog Index Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import Link from 'next/link';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog — Sixsmith Games',
  description: 'Tips, guides, and insights for game masters, fantasy writers, strategy gamers, and educators.',
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featured = getFeaturedPosts();
  const rest = allPosts.filter(p => !p.featured);

  const categoryColors: Record<string, { bg: string; text: string }> = {
    'D&D': { bg: '#fef2f2', text: '#dc2626' },
    'Writing': { bg: '#f5f3ff', text: '#7c3aed' },
    'Gaming': { bg: '#eff6ff', text: '#2563eb' },
    'Education': { bg: '#ecfdf5', text: '#059669' },
  };

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        padding: '80px 2rem 60px',
        textAlign: 'center',
      }}>
        <p style={{ color: '#818cf8', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1rem' }}>
          THE SIXSMITH GAMES BLOG
        </p>
        <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: '900', margin: '0 0 1rem', lineHeight: 1.2 }}>
          Guides, Tips & Inspiration
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
          For dungeon masters, fantasy writers, strategy gamers, and educators.
        </p>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>

        {/* Featured posts */}
        {featured.length > 0 && (
          <>
            <h2 style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
              Featured Articles
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3.5rem',
            }}>
              {featured.map(post => {
                const cat = categoryColors[post.category] || { bg: '#f3f4f6', text: '#374151' };
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      padding: '2.25rem',
                      textDecoration: 'none',
                      color: 'inherit',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
                      border: '1px solid #f0f0f0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '2rem' }}>{post.heroEmoji}</span>
                      <span style={{
                        background: cat.bg, color: cat.text,
                        padding: '0.25rem 0.75rem', borderRadius: '999px',
                        fontSize: '0.75rem', fontWeight: '700',
                      }}>{post.category}</span>
                      <span style={{ color: '#9ca3af', fontSize: '0.8125rem' }}>{post.readTime}</span>
                    </div>
                    <h3 style={{ fontSize: '1.375rem', fontWeight: '800', color: '#111827', lineHeight: 1.3, margin: 0 }}>
                      {post.title}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0, flex: 1 }}>
                      {post.excerpt}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      <span style={{ color: '#9ca3af', fontSize: '0.8125rem' }}>
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span style={{ color: '#6366f1', fontWeight: '700', fontSize: '0.875rem' }}>Read article →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* All posts */}
        <h2 style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
          All Articles
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {rest.map(post => {
            const cat = categoryColors[post.category] || { bg: '#f3f4f6', text: '#374151' };
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem 2rem',
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
                <span style={{ fontSize: '1.75rem', flex: '0 0 auto' }}>{post.heroEmoji}</span>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', margin: '0 0 0.25rem', lineHeight: 1.3 }}>
                    {post.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    {post.excerpt}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '0 0 auto' }}>
                  <span style={{
                    background: cat.bg, color: cat.text,
                    padding: '0.2rem 0.625rem', borderRadius: '999px',
                    fontSize: '0.6875rem', fontWeight: '700',
                  }}>{post.category}</span>
                  <span style={{ color: '#9ca3af', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{post.readTime}</span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
