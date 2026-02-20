/**
 * Blog Post Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, getRecentPosts } from '@/lib/blog';

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: `${post.title} — Sixsmith Games`,
    description: post.excerpt,
  };
}

function renderMarkdown(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} style={{
          fontSize: '1.5rem', fontWeight: '800', color: '#111827',
          margin: '2.5rem 0 1rem', lineHeight: 1.3,
        }}>
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('---')) {
      elements.push(
        <hr key={key++} style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2.5rem 0' }} />
      );
    } else if (line.startsWith('- **')) {
      const match = line.match(/^- \*\*(.+?)\*\*\s*(.*)$/);
      if (match) {
        elements.push(
          <li key={key++} style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem' }}>
            <strong style={{ color: '#111827' }}>{match[1]}</strong> {match[2]}
          </li>
        );
      } else {
        elements.push(
          <li key={key++} style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem' }}>
            {renderInline(line.slice(2))}
          </li>
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem' }}>
          {renderInline(line.slice(2))}
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      const text = line.replace(/^\d+\.\s*/, '');
      elements.push(
        <li key={key++} style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem', listStyleType: 'decimal' }}>
          {renderInline(text)}
        </li>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} style={{ height: '0.5rem' }} />);
    } else {
      elements.push(
        <p key={key++} style={{ color: '#374151', fontSize: '1.0625rem', lineHeight: 1.8, margin: '0 0 1rem' }}>
          {renderInline(line)}
        </p>
      );
    }
  }

  return elements;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let k = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

    const candidates: { index: number; length: number; node: React.ReactNode }[] = [];

    if (boldMatch && boldMatch.index !== undefined) {
      candidates.push({ index: boldMatch.index, length: boldMatch[0].length, node: <strong key={`b${k++}`} style={{ color: '#111827' }}>{boldMatch[1]}</strong> });
    }
    if (linkMatch && linkMatch.index !== undefined) {
      candidates.push({
        index: linkMatch.index,
        length: linkMatch[0].length,
        node: <Link key={`l${k++}`} href={linkMatch[2]} style={{ color: '#6366f1', fontWeight: '600', textDecoration: 'underline', textUnderlineOffset: '2px' }}>{linkMatch[1]}</Link>,
      });
    }

    candidates.sort((a, b) => a.index - b.index);
    const firstMatch = candidates[0] ?? null;

    if (firstMatch) {
      if (firstMatch.index > 0) {
        parts.push(remaining.slice(0, firstMatch.index));
      }
      parts.push(firstMatch.node);
      remaining = remaining.slice(firstMatch.index + firstMatch.length);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRecentPosts(3).filter(p => p.slug !== post.slug).slice(0, 2);

  const categoryColors: Record<string, { bg: string; text: string }> = {
    'D&D': { bg: '#fef2f2', text: '#dc2626' },
    'Writing': { bg: '#f5f3ff', text: '#7c3aed' },
    'Gaming': { bg: '#eff6ff', text: '#2563eb' },
    'Education': { bg: '#ecfdf5', text: '#059669' },
  };

  const cat = categoryColors[post.category] || { bg: '#f3f4f6', text: '#374151' };

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        padding: '80px 2rem 50px',
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Link href="/blog" style={{ color: '#818cf8', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1.5rem' }}>
            ← Back to Blog
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '2.5rem' }}>{post.heroEmoji}</span>
            <span style={{ background: cat.bg, color: cat.text, padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700' }}>{post.category}</span>
            <span style={{ color: '#64748b', fontSize: '0.8125rem' }}>{post.readTime}</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '900', lineHeight: 1.2, margin: '0 0 1rem' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
            <span>{post.author}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article style={{
        maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem 4rem',
      }}>
        <div style={{
          background: 'white', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 3rem)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.03)',
          border: '1px solid #f0f0f0',
        }}>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', margin: 0 }}>
            {/* Rendered inline — wraps list items automatically */}
          </ul>
          {renderMarkdown(post.content)}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
          {post.tags.map(tag => (
            <span key={tag} style={{
              background: '#f3f4f6', color: '#6b7280',
              padding: '0.3rem 0.75rem', borderRadius: '999px',
              fontSize: '0.75rem', fontWeight: '600',
            }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
              More from the Blog
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} style={{
                  background: 'white', borderRadius: '12px', padding: '1.5rem',
                  textDecoration: 'none', color: 'inherit',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  border: '1px solid #f0f0f0',
                  transition: 'transform 0.15s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{r.heroEmoji}</span>
                    <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{r.readTime}</span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', margin: 0, lineHeight: 1.4 }}>
                    {r.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{
          marginTop: '4rem', background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '16px', padding: '2.5rem', textAlign: 'center',
        }}>
          <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.75rem' }}>
            Ready to try Sixsmith Games?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', margin: '0 0 1.5rem', lineHeight: 1.7 }}>
            Subscribe to individual apps or get the all-access bundle.
          </p>
          <Link href="/pricing" style={{
            background: 'white', color: '#4c1d95',
            padding: '0.875rem 2.5rem', borderRadius: '50px',
            fontSize: '1rem', fontWeight: '800', textDecoration: 'none',
            display: 'inline-block', boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
          }}>
            View Pricing
          </Link>
        </div>
      </article>
    </div>
  );
}
