import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import BlogComments from '@/components/BlogComments';
import PostBody from '@/components/PostBody';
import StructuredDataScript from '@/components/StructuredDataScript';
import {
  getAllNewsPosts,
  getArticleBySlug,
  getNewsPostBySlug,
  getRecentNewsPosts,
} from '@/lib/blog';
import { toBlogTagRoute } from '@/lib/blogTags';
import { buildPageMetadata } from '@/lib/metadata';
import { PRODUCT_DEFINITIONS_BY_SLUG } from '@/lib/productContent';
import { cardPadding, fluidGrid, pageGutter, touchTargetClassName } from '@/lib/responsive';
import { createArticleSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

export async function generateStaticParams() {
  const posts = await getAllNewsPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Keep direct private-news links owner-aware instead of emitting a public
// static page that could reveal a hidden product name in its metadata.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) {
    const article = await getArticleBySlug(slug);
    if (article) {
      return buildPageMetadata({
        title: `${article.title} | Sixsmith Games Articles`,
        description: article.excerpt,
        path: `/articles/${article.slug}`,
        type: 'article',
      });
    }

    return { title: 'Not Found' };
  }

  return buildPageMetadata({
    title: `${post.title} | Sixsmith Games Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    const article = await getArticleBySlug(slug);
    if (article) {
      redirect(`/articles/${article.slug}`);
    }

    notFound();
  }

  const tags = post.tags ?? [];
  const primaryRelatedProductSlug = post.relatedProducts?.[0];
  const primaryRelatedProduct = primaryRelatedProductSlug
    ? PRODUCT_DEFINITIONS_BY_SLUG[primaryRelatedProductSlug]
    : null;
  const related = (await getRecentNewsPosts(3)).filter((candidate) => candidate.slug !== post.slug).slice(0, 2);

  const categoryColors: Record<string, { bg: string; text: string }> = {
    'Tabletop RPG': { bg: '#fef2f2', text: '#dc2626' },
    'Writing & Worldbuilding': { bg: '#f5f3ff', text: '#7c3aed' },
    'WWII Strategy': { bg: '#fff7ed', text: '#b45309' },
    'Typing Practice': { bg: '#ecfdf5', text: '#059669' },
  };

  const cat = categoryColors[post.category] || { bg: '#f3f4f6', text: '#374151' };

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      <StructuredDataScript
        data={createArticleSchema({
          title: post.title,
          description: post.excerpt,
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.date,
          authorName: post.author,
        })}
      />

      <section
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          padding: `80px ${pageGutter} 50px`,
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Link
            href="/blog"
            style={{
              color: '#818cf8',
              fontSize: '0.875rem',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              marginBottom: '1.5rem',
            }}
          >
            ← Back to Blog
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ background: cat.bg, color: cat.text, padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700' }}>
              {post.category}
            </span>
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

      <article style={{ maxWidth: '760px', margin: '0 auto', padding: `3rem ${pageGutter} 4rem` }}>
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: cardPadding,
            boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.03)',
            border: '1px solid #f0f0f0',
          }}
        >
          <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', margin: 0 }} />
          <PostBody content={post.content} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={toBlogTagRoute(tag)}
              style={{
                background: '#f3f4f6',
                color: '#6b7280',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              #{tag}
            </Link>
          ))}
        </div>

        <BlogComments postSlug={post.slug} />

        {related.length > 0 ? (
          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
              More from the Blog
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('250px'), gap: '1rem' }}>
              {related.map((candidate) => (
                <Link
                  key={candidate.slug}
                  href={`/blog/${candidate.slug}`}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: cardPadding,
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    border: '1px solid #f0f0f0',
                    transition: 'transform 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{candidate.readTime}</span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', margin: 0, lineHeight: 1.4 }}>{candidate.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div
          style={{
            marginTop: '4rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '16px',
            padding: cardPadding,
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.75rem' }}>Ready to create something?</h3>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', margin: '0 0 1.5rem', lineHeight: 1.7 }}>
            Subscribe to an individual app or get the full GameMaster Studio.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <Link
              href="/pricing"
              className={touchTargetClassName}
              style={{
                background: 'white',
                color: '#4c1d95',
                padding: '0.875rem 2.5rem',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: '800',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              }}
            >
              View Pricing
            </Link>
            {primaryRelatedProduct ? (
              <Link
                href={primaryRelatedProduct.officialPath}
                className={touchTargetClassName}
                style={{
                  background: 'rgba(255,255,255,0.14)',
                  color: 'white',
                  padding: '0.875rem 2rem',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: '800',
                  textDecoration: 'none',
                  display: 'inline-block',
                  border: '1px solid rgba(255,255,255,0.24)',
                }}
              >
                Visit {primaryRelatedProduct.name}
              </Link>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}
