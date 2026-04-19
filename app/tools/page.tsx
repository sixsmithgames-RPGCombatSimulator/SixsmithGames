import type { Metadata } from 'next';
import Link from 'next/link';

import LastUpdated from '@/components/LastUpdated';
import { buildPageMetadata } from '@/lib/metadata';
import { MARKETING_LAST_UPDATED, PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { fluidGrid, pageGutter } from '@/lib/responsive';

export const metadata: Metadata = buildPageMetadata({
  title: 'Products | Sixsmith Games Product Lineup',
  description:
    'Explore the full Sixsmith Games lineup: Virtual Combat Simulator, ContentCraft, Four Star General, MasterTyping, and Gravity.',
  path: '/tools',
});

export default function ToolsPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <section style={{ background: '#0f172a', color: 'white', padding: '78px 0 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${pageGutter}` }}>
          <div style={{ maxWidth: '820px' }}>
            <h1 style={{ margin: '0 0 1rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08 }}>
              The full Sixsmith Games product lineup
            </h1>
            <p style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.86)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              This page exists to show the full public lineup in one place without flattening the products into generic copy. Each card below links to an indexable, audience-focused landing page with product facts, FAQs, pricing notes, and official links.
            </p>
            <LastUpdated date={MARKETING_LAST_UPDATED} tone="dark" />
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `2.5rem ${pageGutter} 4rem` }}>
        <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('260px'), gap: '1rem' }}>
          {PRODUCT_DEFINITIONS.map((product) => (
            <article key={product.slug} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', overflow: 'hidden', boxShadow: '0 10px 28px rgba(15,23,42,0.05)' }}>
              <div style={{ background: product.theme.gradient, color: 'white', padding: '1rem 1.1rem' }}>
                <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.88 }}>
                  {product.category}
                </p>
                <h2 style={{ margin: '0.5rem 0 0', fontSize: '1.2rem', fontWeight: 800 }}>{product.name}</h2>
              </div>
              <div style={{ padding: '1.1rem 1.2rem' }}>
                <p style={{ margin: '0 0 0.75rem', color: '#475569', lineHeight: 1.8 }}>{product.oneSentence}</p>
                <p style={{ margin: '0 0 0.9rem', color: '#334155', lineHeight: 1.8 }}>
                  <strong>Audience:</strong> {product.primaryAudience}.
                </p>
                <Link href={product.officialPath} style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
                  Visit the {product.name} page
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
