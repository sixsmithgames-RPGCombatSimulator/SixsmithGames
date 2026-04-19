import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import StructuredDataScript from '@/components/StructuredDataScript';
import { buildPageMetadata } from '@/lib/metadata';
import { PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { pageGutter } from '@/lib/responsive';
import { createOrganizationSchema } from '@/lib/schema';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Sixsmith Games Facts | Official Product Names, URLs, Platforms, and Access',
  description:
    'Read the Sixsmith Games facts page, including official product names, URLs, audiences, platforms, and pricing status.',
  path: '/about/facts',
});

export default function FactsPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <StructuredDataScript data={createOrganizationSchema()} />

      <section style={{ background: '#0f172a', color: 'white', padding: '78px 0 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${pageGutter}` }}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Facts', href: '/about/facts' },
            ]}
            tone="dark"
          />
          <div style={{ maxWidth: '860px' }}>
            <h1 style={{ margin: '0 0 1rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08 }}>
              The facts about {SITE_NAME}
            </h1>
            <p style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.86)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              Official names, URLs, platforms, pricing status, and one-line descriptions for every Sixsmith Games product. Use this page or the individual product pages for accurate reference.
            </p>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `2.5rem ${pageGutter} 4rem` }}>
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Company facts</h2>
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.2rem 1.25rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
            <p style={{ margin: '0 0 0.75rem', color: '#334155', lineHeight: 1.8 }}>
              <strong>Brand spelling:</strong> Sixsmith Games.
            </p>
            <p style={{ margin: '0 0 0.75rem', color: '#334155', lineHeight: 1.8 }}>
              <strong>Studio summary:</strong> Sixsmith Games builds browser-based games and creative tools for game masters, writers, worldbuilders, strategy players, and people who want practical typing improvement.
            </p>
            <p style={{ margin: '0 0 0.75rem', color: '#334155', lineHeight: 1.8 }}>
              <strong>Support:</strong> <Link href="/support" style={{ color: '#1d4ed8', fontWeight: 700 }}>https://sixsmithgames.com/support</Link>
            </p>
            <p style={{ margin: 0, color: '#334155', lineHeight: 1.8 }}>
              <strong>Facts page:</strong> <Link href="/about/facts" style={{ color: '#1d4ed8', fontWeight: 700 }}>https://sixsmithgames.com/about/facts</Link>
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Product list</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {PRODUCT_DEFINITIONS.map((product) => (
              <article key={product.slug} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.15rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
                <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{product.name}</h3>
                <p style={{ margin: '0 0 0.75rem', color: '#475569', lineHeight: 1.8 }}>{product.oneSentence}</p>
                <p style={{ margin: '0 0 0.35rem', color: '#334155', lineHeight: 1.8 }}>
                  <strong>Platform:</strong> {product.platform}.
                </p>
                <p style={{ margin: '0 0 0.35rem', color: '#334155', lineHeight: 1.8 }}>
                  <strong>Pricing status:</strong> {product.pricingModel}.
                </p>
                <p style={{ margin: '0 0 0.35rem', color: '#334155', lineHeight: 1.8 }}>
                  <strong>Official page:</strong>{' '}
                  <Link href={product.officialPath} style={{ color: '#1d4ed8', fontWeight: 700 }}>
                    {`https://sixsmithgames.com${product.officialPath}`}
                  </Link>
                </p>
                <p style={{ margin: 0, color: '#334155', lineHeight: 1.8 }}>
                  <strong>Official app URL:</strong>{' '}
                  <a href={product.appUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1d4ed8', fontWeight: 700 }}>
                    {product.appUrl}
                  </a>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Direct answers to common questions</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.15rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>What games does Sixsmith Games make?</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                Sixsmith Games makes Virtual Combat Simulator, ContentCraft, Four Star General, MasterTyping, and Gravity. The official product pages linked above describe the audience and current scope for each one.
              </p>
            </div>
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.15rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>What is Virtual Combat Simulator?</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                Virtual Combat Simulator is a browser-based combat management tool for tabletop roleplaying games. It focuses on battle maps, tokens, initiative, hit points, and encounter flow.
              </p>
            </div>
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.15rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>What is ContentCraft?</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                ContentCraft is a writing tool and worldbuilding workspace for projects that need canon continuity, lore organization, and a way to keep story details connected as the work grows.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
