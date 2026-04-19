import type { Metadata } from 'next';
import Link from 'next/link';

import LastUpdated from '@/components/LastUpdated';
import LaunchAppButton from '@/components/LaunchAppButton';
import ModernBackground from '@/components/ModernBackground';
import StructuredDataScript from '@/components/StructuredDataScript';
import SubscribeButton from '@/components/SubscribeButton';
import { buildPageMetadata } from '@/lib/metadata';
import { MARKETING_LAST_UPDATED, PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { fluidGrid, pageGutter } from '@/lib/responsive';
import { createFaqSchema } from '@/lib/schema';

export const metadata: Metadata = buildPageMetadata({
  title: 'Pricing | Sixsmith Games Products, Access Models, and Plans',
  description:
    'Compare pricing and access across Virtual Combat Simulator, ContentCraft, Four Star General, MasterTyping, and Gravity.',
  path: '/pricing',
});

const pricingFaq = [
  {
    question: 'Which Sixsmith Games product requires a subscription from the start?',
    answer:
      'ContentCraft is the product positioned as a subscription-first creative workspace. The public pricing page lists ContentCraft at $9.99 per month or $99 per year.',
  },
  {
    question: 'Which Sixsmith Games products are free to start?',
    answer:
      'Virtual Combat Simulator, Four Star General, and MasterTyping are all described as free to start, with optional paid layers or unlocks for people who want more capability, more content, or more retained history.',
  },
  {
    question: 'Does Gravity have a public price listed right now?',
    answer:
      'No. Gravity has a public marketing page and an official app link, but the pricing page does not currently list a separate paid plan for Gravity.',
  },
  {
    question: 'Is there a bundle for Game Masters who want both writing and encounter tools?',
    answer:
      'Yes. The pricing model includes a bundle that combines ContentCraft and Virtual Combat Simulator for Game Masters who want both campaign-building and encounter-running tools.',
  },
  {
    question: 'How should I choose the right Sixsmith Games product?',
    answer:
      'Choose the product by the problem you need solved. Use Virtual Combat Simulator for D&D combat management, ContentCraft for canon continuity and worldbuilding, Four Star General for WWII tactical strategy, MasterTyping for typing improvement, and Gravity for simultaneous-turn strategy.',
  },
];

function formatPrice(value?: number) {
  return typeof value === 'number' ? `$${value.toFixed(2)}/month` : 'See page for details';
}

export default function PricingPage() {
  return (
    <div style={{ background: '#f8fafc' }}>
      <StructuredDataScript data={createFaqSchema(pricingFaq)} />

      <section
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 45%, #7c3aed 100%)',
          color: 'white',
          padding: '78px 0 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <ModernBackground />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.14)', zIndex: 1 }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${pageGutter}`, position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '860px' }}>
            <div
              style={{
                display: 'inline-block',
                marginBottom: '1rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.16)',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Pricing and access
            </div>
            <h1 style={{ fontSize: 'clamp(2.3rem, 6vw, 4rem)', lineHeight: 1.06, fontWeight: 900, margin: '0 0 1rem' }}>
              Clear access models for each Sixsmith Games product.
            </h1>
            <p style={{ fontSize: '1.12rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.9)', margin: '0 0 1rem' }}>
              The pricing page is here to answer the practical questions quickly: which products are free to start, which products have optional paid layers, which product is subscription-first, and what path makes sense for a user who already knows what kind of work or play they want to do.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.84)', margin: '0 0 1.4rem' }}>
              Pricing should reinforce audience fit rather than blur it. Virtual Combat Simulator is a D&amp;D combat simulator. ContentCraft is a premium writing and worldbuilding workspace. Four Star General is a serious WWII tactical strategy game. MasterTyping is a typing practice game with a practical improvement loop. Gravity is a simultaneous-turn strategy game whose public access note is visible even though it does not currently list a separate paid tier.
            </p>
            <LastUpdated date={MARKETING_LAST_UPDATED} tone="dark" />
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `3rem ${pageGutter} 5rem` }}>
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>How the lineup is priced</h2>
          <p style={{ margin: '0 0 0.9rem', color: '#334155', lineHeight: 1.85 }}>
            Sixsmith Games does not use one access model for everything. ContentCraft is premium because it is the subscription-first creative workspace. Virtual Combat Simulator, Four Star General, and MasterTyping are intentionally easier to start because the public pitch is “learn the workflow first, then decide whether the paid layer matters for how often you use it.” Gravity is currently an access-note case rather than a listed standalone plan.
          </p>
          <p style={{ margin: 0, color: '#334155', lineHeight: 1.85 }}>
            That means the right first click is usually the product page. The pricing page is here to compare those models cleanly, not to replace the audience-focused explanation on the product pages themselves.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>Plans and access by product</h2>
          <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('260px'), gap: '1rem' }}>
            {PRODUCT_DEFINITIONS.map((product) => (
              <article
                key={product.slug}
                id={product.slug}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(15,23,42,0.05)',
                }}
              >
                <div style={{ background: product.theme.gradient, color: 'white', padding: '1rem 1.1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.9 }}>
                    {product.category}
                  </div>
                  <h3 style={{ margin: '0.45rem 0 0.3rem', fontSize: '1.3rem', fontWeight: 800 }}>{product.name}</h3>
                  <p style={{ margin: 0, lineHeight: 1.7, color: 'rgba(255,255,255,0.88)' }}>{product.primaryAudience}</p>
                </div>
                <div style={{ padding: '1.1rem 1.15rem' }}>
                  <p style={{ margin: '0 0 0.7rem', color: '#0f172a', fontSize: '1.2rem', fontWeight: 900 }}>
                    {product.offerPrice ? formatPrice(product.offerPrice) : 'Public price not listed'}
                  </p>
                  <p style={{ margin: '0 0 0.8rem', color: '#334155', lineHeight: 1.8 }}>
                    <strong>Pricing model:</strong> {product.pricingModel}.
                  </p>
                  <p style={{ margin: '0 0 1rem', color: '#475569', lineHeight: 1.8 }}>
                    <strong>Availability:</strong> {product.availability}.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Link
                      href={product.officialPath}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.82rem 1.1rem',
                        borderRadius: '999px',
                        background: '#0f172a',
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 800,
                      }}
                    >
                      Visit {product.name}
                    </Link>
                    <Link
                      href={product.helpPath}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.82rem 1.1rem',
                        borderRadius: '999px',
                        background: product.theme.tint,
                        border: `1px solid ${product.theme.lightBorder}`,
                        color: product.theme.dark,
                        textDecoration: 'none',
                        fontWeight: 800,
                      }}
                    >
                      Read help
                    </Link>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {product.slug === 'contentcraft' ? (
                      <SubscribeButton
                        planId="contentcraft"
                        allowAccessRedirect
                        style={{
                          background: product.theme.dark,
                          color: 'white',
                          padding: '0.82rem 1.1rem',
                          borderRadius: '999px',
                          fontWeight: 800,
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Subscribe to ContentCraft
                      </SubscribeButton>
                    ) : (
                      <LaunchAppButton
                        appSlug={product.slug}
                        style={{
                          background: product.theme.dark,
                          color: 'white',
                          padding: '0.82rem 1.1rem',
                          borderRadius: '999px',
                          fontWeight: 800,
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {product.slug === 'gravity' ? 'Open Gravity' : `Try ${product.name}`}
                      </LaunchAppButton>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>Frequently asked questions</h2>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {pricingFaq.map((entry) => (
              <details
                key={entry.question}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '18px',
                  padding: '0.95rem 1rem',
                  boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 800, color: '#0f172a' }}>{entry.question}</summary>
                <p style={{ margin: '0.9rem 0 0', color: '#475569', lineHeight: 1.8 }}>{entry.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
