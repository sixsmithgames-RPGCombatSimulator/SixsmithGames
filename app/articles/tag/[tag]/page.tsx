import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import {
  getAllArticleTags,
  getAllNewsTags,
  getArticlesByTag,
  getNewsPostsByTag,
} from '@/lib/blog';
import { findTagBySlug, slugifyTag } from '@/lib/blogTags';
import { buildPageMetadata } from '@/lib/metadata';
import { pageGutter } from '@/lib/responsive';

export async function generateStaticParams() {
  const tags = await getAllArticleTags();
  return tags.map((tag) => ({ tag: slugifyTag(tag) }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const tags = await getAllArticleTags();
  const prettyTag = findTagBySlug(tag, tags);

  if (!prettyTag) {
    return buildPageMetadata({
      title: 'Articles Tags | Sixsmith Games',
      description: 'Browse Sixsmith Games article tags.',
      path: '/articles',
    });
  }

  return buildPageMetadata({
    title: `${prettyTag} Articles | Sixsmith Games`,
    description: `Read Sixsmith Games articles tagged with ${prettyTag}.`,
    path: `/articles/tag/${slugifyTag(prettyTag)}`,
  });
}

export default async function ArticleTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const articleTags = await getAllArticleTags();
  const newsTags = await getAllNewsTags();
  const resolvedArticleTag = findTagBySlug(tag, articleTags);
  const resolvedNewsTag = findTagBySlug(tag, newsTags);

  if (!resolvedArticleTag) {
    if (resolvedNewsTag) {
      redirect(`/blog/tag/${slugifyTag(resolvedNewsTag)}`);
    }

    notFound();
  }

  const posts = await getArticlesByTag(resolvedArticleTag);
  if (posts.length === 0) {
    const newsPosts = resolvedNewsTag ? await getNewsPostsByTag(resolvedNewsTag) : [];
    if (newsPosts.length > 0 && resolvedNewsTag) {
      redirect(`/blog/tag/${slugifyTag(resolvedNewsTag)}`);
    }

    notFound();
  }

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      <section
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #334155 100%)',
          padding: `80px ${pageGutter} 50px`,
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#c4b5fd', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1rem' }}>
          Article Tag
        </p>
        <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', margin: '0 0 0.75rem', lineHeight: 1.2 }}>
          #{resolvedArticleTag}
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '1.0625rem', margin: 0 }}>Evergreen articles related to {resolvedArticleTag}</p>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: `3rem ${pageGutter} 4rem` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/articles/${post.slug}`}
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
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{post.excerpt}</p>
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
