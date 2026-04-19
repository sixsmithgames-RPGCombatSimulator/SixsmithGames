import type { Metadata } from 'next';
import Link from 'next/link';

import LastUpdated from '@/components/LastUpdated';
import { getAllArticles, getFeaturedArticles } from '@/lib/blog';
import { buildPageMetadata } from '@/lib/metadata';
import { MARKETING_LAST_UPDATED, PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { pageGutter } from '@/lib/responsive';

export const metadata: Metadata = buildPageMetadata({
  title: 'Articles | Sixsmith Games Product Guides and Evergreen Explainers',
  description:
    'Read Sixsmith Games articles about D&D combat management, worldbuilding workflow, WWII tactical strategy, and typing practice.',
  path: '/articles',
});

export default async function ArticlesPage() {
  const allPosts = await getAllArticles();
  const featured = await getFeaturedArticles();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <section style={{ background: '#0f172a', color: 'white', padding: `78px ${pageGutter} 56px` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ maxWidth: '820px' }}>
            <h1 style={{ margin: '0 0 1rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08 }}>
              Guides and explainers for every Sixsmith Games product
            </h1>
            <p style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.86)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              Product explainers, how-to guides, and answers to common questions — written to stay useful over time. For releases and studio updates, check the{' '}
              <Link href="/blog" style={{ color: '#bfdbfe', fontWeight: 800 }}>
                Blog
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
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Featured articles</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {featured.map((post) => (
                <Link
                  key={post.slug}
                  href={`/articles/${post.slug}`}
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
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Browse by product</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {PRODUCT_DEFINITIONS.filter((product) => allPosts.some((post) => post.relatedProducts.includes(product.slug))).map((product) => {
              const productPosts = allPosts.filter((post) => post.relatedProducts.includes(product.slug));
              return (
                <section
                  key={product.slug}
                  style={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '22px',
                    padding: '1.1rem 1.2rem',
                    boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                  }}
                >
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    <Link href={product.officialPath} style={{ color: '#0f172a', textDecoration: 'none' }}>
                      {product.name}
                    </Link>
                  </h3>
                  <p style={{ margin: '0 0 0.75rem', color: '#475569', lineHeight: 1.8 }}>
                    {product.oneSentence} Start with the{' '}
                    <Link href={product.officialPath} style={{ color: '#1d4ed8', fontWeight: 700 }}>
                      {product.name} product page
                    </Link>{' '}
                    or the{' '}
                    <Link href={product.helpPath} style={{ color: '#1d4ed8', fontWeight: 700 }}>
                      {product.name} help pages
                    </Link>
                    .
                  </p>
                  <div style={{ display: 'grid', gap: '0.7rem' }}>
                    {productPosts.map((post) => (
                      <Link key={post.slug} href={`/articles/${post.slug}`} style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none' }}>
                        {post.title}
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>All articles</h2>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/articles/${post.slug}`}
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
        </section>
      </main>
    </div>
  );
}
