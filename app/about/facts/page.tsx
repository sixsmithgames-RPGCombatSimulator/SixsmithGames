import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import StructuredDataScript from '@/components/StructuredDataScript';
import { buildPageMetadata } from '@/lib/metadata';
import { PUBLIC_PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { formatMonthlyPrice, pricingCatalog } from '@/lib/pricingCatalog';
import { pageGutter } from '@/lib/responsive';
import { createOrganizationSchema } from '@/lib/schema';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const FACTS_LAST_REVIEWED = 'August 10, 2026';
const PUBLIC_PRODUCT_NAMES = PUBLIC_PRODUCT_DEFINITIONS.map((product) => product.name).join(', ');

export const metadata: Metadata = buildPageMetadata({
  title: 'Sixsmith Games Facts | Public Products, URLs, Platforms, and Access',
  description:
    'Read verified Sixsmith Games facts, including current public product names, URLs, audiences, platforms, access, and pricing status.',
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
              Official names, URLs, platforms, audiences, access, and pricing status for the products Sixsmith Games currently presents publicly. Facts and prices on this page were reviewed on {FACTS_LAST_REVIEWED}.
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
              <strong>Business:</strong> Sixsmith Games is an independent software studio operated by an independent developer.
            </p>
            <p style={{ margin: '0 0 0.75rem', color: '#334155', lineHeight: 1.8 }}>
              <strong>Current public products:</strong> {PUBLIC_PRODUCT_NAMES}.
            </p>
            <p style={{ margin: '0 0 0.75rem', color: '#334155', lineHeight: 1.8 }}>
              <strong>GameMaster Studio:</strong> A monthly subscription bundle that includes GameMasterCraft AI, Virtual Combat Simulator paid Game Master tools, and GameMaster Assistant orchestration. Its current founding price is {formatMonthlyPrice(pricingCatalog.bundle.monthlyPrice)}; the stated post-offer price is {formatMonthlyPrice(pricingCatalog.bundle.standardMonthlyPrice!)}.
            </p>
            <p style={{ margin: '0 0 0.75rem', color: '#334155', lineHeight: 1.8 }}>
              <strong>Support:</strong> <Link href="/support" style={{ color: '#1d4ed8', fontWeight: 700 }}>{`${SITE_URL}/support`}</Link>
            </p>
            <p style={{ margin: '0 0 0.75rem', color: '#334155', lineHeight: 1.8 }}>
              <strong>Support email:</strong>{' '}
              <a href="mailto:info@sixsmithgames.com" style={{ color: '#1d4ed8', fontWeight: 700 }}>info@sixsmithgames.com</a>
            </p>
            <p style={{ margin: 0, color: '#334155', lineHeight: 1.8 }}>
              <strong>Current pricing:</strong> <Link href="/pricing" style={{ color: '#1d4ed8', fontWeight: 700 }}>{`${SITE_URL}/pricing`}</Link>. Prices shown are in U.S. dollars and exclude applicable taxes.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Product list</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {PUBLIC_PRODUCT_DEFINITIONS.map((product) => (
              <article key={product.slug} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.15rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
                <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{product.name}</h3>
                <p style={{ margin: '0 0 0.75rem', color: '#475569', lineHeight: 1.8 }}>{product.oneSentence}</p>
                <p style={{ margin: '0 0 0.35rem', color: '#334155', lineHeight: 1.8 }}>
                  <strong>Primary audience:</strong> {product.primaryAudience}.
                </p>
                <p style={{ margin: '0 0 0.35rem', color: '#334155', lineHeight: 1.8 }}>
                  <strong>Platform:</strong> {product.platform}.
                </p>
                <p style={{ margin: '0 0 0.35rem', color: '#334155', lineHeight: 1.8 }}>
                  <strong>Access and pricing:</strong> {product.pricingModel}.
                </p>
                <p style={{ margin: '0 0 0.35rem', color: '#334155', lineHeight: 1.8 }}>
                  <strong>Availability:</strong> {product.availability}.
                </p>
                <p style={{ margin: '0 0 0.35rem', color: '#334155', lineHeight: 1.8 }}>
                  <strong>Official page:</strong>{' '}
                  <Link
                    href={product.officialPath}
                    style={{ color: '#1d4ed8', fontWeight: 700, overflowWrap: 'anywhere' }}
                  >
                    {`${SITE_URL}${product.officialPath}`}
                  </Link>
                </p>
                <p style={{ margin: 0, color: '#334155', lineHeight: 1.8 }}>
                  <strong>Official app URL:</strong>{' '}
                  <a
                    href={product.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1d4ed8', fontWeight: 700, overflowWrap: 'anywhere' }}
                  >
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
              <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>What games and tools does Sixsmith Games make?</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                The current public product list is {PUBLIC_PRODUCT_NAMES}. GameMaster Studio is a paid bundle for GameMasterCraft and Virtual Combat Simulator features; it is not a separate application.
              </p>
            </div>
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.15rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Are all public products generally available?</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                Virtual Combat Simulator, GameMasterCraft, Four Star General, and MasterTyping offer browser access with a free starting path. Gravity is in early beta; its product page is public, but its browser build is limited to the studio team and testers. Paid options and access conditions are listed with each product above.
              </p>
            </div>
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.15rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>What is Virtual Combat Simulator?</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                Virtual Combat Simulator is a browser-based combat management tool for tabletop roleplaying games. It focuses on battle maps, tokens, initiative, hit points, and encounter flow.
              </p>
            </div>
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.15rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>What is GameMasterCraft?</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                GameMasterCraft is a browser-based campaign planning workspace for tabletop RPG game masters. It organizes campaigns, NPCs, factions, locations, lore, and session continuity. Its core campaign tools are free; AI assistance is optional and paid.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
