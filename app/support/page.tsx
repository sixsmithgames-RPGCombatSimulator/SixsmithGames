import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import { buildPageMetadata } from '@/lib/metadata';
import { MARKETING_LAST_UPDATED, PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { pageGutter } from '@/lib/responsive';

export const metadata: Metadata = buildPageMetadata({
  title: 'Support | Sixsmith Games Contact, Help, and Official Links',
  description:
    'Use the Sixsmith Games support page for contact details, product help links, and policies.',
  path: '/support',
});

export default function SupportPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <section style={{ background: '#0f172a', color: 'white', padding: '78px 0 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: `0 ${pageGutter}` }}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Support', href: '/support' },
            ]}
            tone="dark"
          />
          <div style={{ maxWidth: '760px' }}>
            <h1 style={{ margin: '0 0 1rem', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, lineHeight: 1.08 }}>
              Help and support
            </h1>
            <p style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.86)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              Use this page to reach the studio, find product help, review pricing, check policies, or jump to any product page. One clear place for contact details and official product help links.
            </p>
            <LastUpdated date={MARKETING_LAST_UPDATED} tone="dark" />
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: `2.5rem ${pageGutter} 4rem` }}>
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Contact Sixsmith Games</h2>
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.2rem 1.25rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
            <p style={{ margin: '0 0 0.8rem', color: '#334155', lineHeight: 1.8 }}>
              Email support and general contact requests to <a href="mailto:info@sixsmithgames.com" style={{ color: '#1d4ed8', fontWeight: 700 }}>info@sixsmithgames.com</a>.
            </p>
            <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
              For privacy and policy questions, see the <Link href="/privacy" style={{ color: '#1d4ed8', fontWeight: 700 }}>Privacy Policy</Link> and <Link href="/terms" style={{ color: '#1d4ed8', fontWeight: 700 }}>Terms of Service</Link>.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Product help pages</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {PRODUCT_DEFINITIONS.map((product) => (
              <article key={product.slug} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.1rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{product.name}</h3>
                <p style={{ margin: '0 0 0.75rem', color: '#475569', lineHeight: 1.8 }}>
                  {product.oneSentence} The help landing page covers getting started, core features, common use cases, current scope, and pricing basics.
                </p>
                <Link href={product.helpPath} style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
                  Open {product.name} help
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Other official pages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            <Link href="/pricing" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              Pricing
            </Link>
            <Link href="/about" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              About Sixsmith Games
            </Link>
            <Link href="/about/facts" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              Sixsmith Games facts
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
