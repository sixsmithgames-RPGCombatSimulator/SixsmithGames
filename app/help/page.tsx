import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import { buildPageMetadata } from '@/lib/metadata';
import { HELP_TOPIC_ORDER, HELP_TOPIC_TITLES, PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { fluidGrid, pageGutter } from '@/lib/responsive';

export const metadata: Metadata = buildPageMetadata({
  title: 'Help | Sixsmith Games Product Help and Getting Started Pages',
  description:
    'Browse help pages for Virtual Combat Simulator, ContentCraft, Four Star General, MasterTyping, and Gravity.',
  path: '/help',
});

export default function HelpIndexPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <section style={{ background: '#0f172a', color: 'white', padding: '78px 0 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${pageGutter}` }}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Help', href: '/help' },
            ]}
            tone="dark"
          />
          <div style={{ maxWidth: '820px' }}>
            <h1 style={{ margin: '0 0 1rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08 }}>
              Help for every Sixsmith Games product
            </h1>
            <p style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.86)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              Find the product you are using, then choose the topic. Getting started, features, common questions, scope, and pricing are all covered.
            </p>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `2.5rem ${pageGutter} 4rem` }}>
        <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('260px'), gap: '1rem' }}>
          {PRODUCT_DEFINITIONS.map((product) => (
            <article key={product.slug} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.1rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h2 style={{ margin: '0 0 0.45rem', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                <Link href={product.helpPath} style={{ color: '#0f172a', textDecoration: 'none' }}>
                  {product.name} help
                </Link>
              </h2>
              <p style={{ margin: '0 0 0.8rem', color: '#475569', lineHeight: 1.8 }}>{product.oneSentence}</p>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#334155', lineHeight: 1.75 }}>
                {HELP_TOPIC_ORDER.map((topic) => (
                  <li key={topic}>
                    <Link href={`/help/${product.slug}/${topic}`} style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none' }}>
                      {HELP_TOPIC_TITLES[topic]}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
