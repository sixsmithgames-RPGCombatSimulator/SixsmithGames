import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import StructuredDataScript from '@/components/StructuredDataScript';
import { buildPageMetadata } from '@/lib/metadata';
import { PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { fluidGrid, pageGutter } from '@/lib/responsive';
import { createOrganizationSchema } from '@/lib/schema';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Sixsmith Games | Browser-Based Games and Tools for Real Audiences',
  description:
    'Learn what Sixsmith Games builds, who the products serve, and where to find the official facts, pricing, help, and support pages.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <StructuredDataScript data={createOrganizationSchema()} />

      <section style={{ background: '#0f172a', color: 'white', padding: '78px 0 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${pageGutter}` }}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
            ]}
            tone="dark"
          />
          <div style={{ maxWidth: '860px' }}>
            <h1 style={{ margin: '0 0 1rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08 }}>
              Sixsmith Games is a small independent studio making browser-based games and tools for game masters, writers, strategy players, and typists.
            </h1>
            <p style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.86)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              The lineup includes a D&amp;D combat simulator, a worldbuilding and writing workspace, a WWII tactical strategy game, a typing practice game, and a simultaneous-turn strategy game. Each one is built for people who want a clear tool or game that does its job well.
            </p>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `2.5rem ${pageGutter} 4rem` }}>
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>What Sixsmith Games is</h2>
          <p style={{ margin: '0 0 0.9rem', color: '#334155', lineHeight: 1.85 }}>
            Sixsmith Games builds for players, writers, game masters, and learners who want tools and games that are easy to understand and worth sticking with. Each product page is written to help you tell quickly whether it fits what you need.
          </p>
          <p style={{ margin: 0, color: '#334155', lineHeight: 1.85 }}>
            Some of these help game masters run encounters. One helps worldbuilders and writers keep a growing project straight. Two are strategy games built around meaningful decisions and clear rules. One is for adults who want practical typing improvement. Different audiences, same standard: clear design and useful results.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Products and audiences</h2>
          <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('240px'), gap: '1rem' }}>
            {PRODUCT_DEFINITIONS.map((product) => (
              <article key={product.slug} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.1rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  <Link href={product.officialPath} style={{ color: '#0f172a', textDecoration: 'none' }}>
                    {product.name}
                  </Link>
                </h3>
                <p style={{ margin: '0 0 0.45rem', color: '#475569', lineHeight: 1.8 }}>{product.oneSentence}</p>
                <p style={{ margin: 0, color: '#334155', lineHeight: 1.8 }}>
                  {product.primaryAudience}.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Official links</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            <Link href="/about/facts" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              Sixsmith Games facts
            </Link>
            <Link href="/pricing" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              Pricing
            </Link>
            <Link href="/help" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              Help
            </Link>
            <Link href="/support" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              Support
            </Link>
            <Link href="/blog" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              Blog
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
