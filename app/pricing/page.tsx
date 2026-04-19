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
  title: 'Pricing | Sixsmith Games Products, Plans, and Access',
  description:
    'Compare pricing and access across Virtual Combat Simulator, ContentCraft, Four Star General, MasterTyping, and Gravity.',
  path: '/pricing',
});

const pricingFaq = [
  {
    question: 'Can I try the products before paying?',
    answer:
      'Virtual Combat Simulator, Four Star General, and MasterTyping are all free to start. You can open them in your browser and use the core features without a subscription. Paid upgrades add more storage, more content, or expanded tracking when you decide you want them.',
  },
  {
    question: 'Which product requires a subscription up front?',
    answer:
      'ContentCraft is the one product that requires a subscription to access. It is $9.99 per month or $99 per year. The subscription covers the full workspace, built-in AI usage, and the canon and organization tools.',
  },
  {
    question: 'Is there a deal for Game Masters who want both ContentCraft and Virtual Combat Simulator?',
    answer:
      'Yes. There is a bundle that combines ContentCraft and Virtual Combat Simulator for Game Masters who want the campaign-building workspace and the encounter management tool together.',
  },
  {
    question: 'What is Gravity and why does it not have a price yet?',
    answer:
      'Gravity is a simultaneous-turn strategy game currently in early beta. The browser build is still limited to the studio team and testers, so there is no open signup or paid plan listed yet. The product page has the details.',
  },
  {
    question: 'Which product is right for me?',
    answer:
      'Use Virtual Combat Simulator if you run tabletop RPG encounters and want faster, cleaner combat management. Use ContentCraft if you build stories, campaigns, or settings and need lore organization and canon continuity. Use Four Star General if you want serious WWII tactical strategy. Use MasterTyping if you want to improve your typing speed and accuracy. Use Gravity if simultaneous-turn strategy with ship systems sounds like your game.',
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
              Most products are free to start. One requires a subscription. Here is what you get either way.
            </h1>
            <p style={{ fontSize: '1.12rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.9)', margin: '0 0 1rem' }}>
              Virtual Combat Simulator, Four Star General, and MasterTyping are free to open and play. ContentCraft is a subscription workspace at $9.99 per month. Gravity is in early beta with no paid plan listed yet.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.84)', margin: '0 0 1.4rem' }}>
              For the games and tools, paid upgrades add something specific — more storage, more scenarios, expanded history — but you can start without paying. ContentCraft is the exception: it is a subscription workspace with no free tier.
            </p>
            <LastUpdated date={MARKETING_LAST_UPDATED} tone="dark" />
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `3rem ${pageGutter} 5rem` }}>
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>Free to start or subscription — here is the difference</h2>
          <p style={{ margin: '0 0 0.9rem', color: '#334155', lineHeight: 1.85 }}>
            Three products — Virtual Combat Simulator, Four Star General, and MasterTyping — let you open the browser app and use the core features without paying. The paid upgrade for each one adds something specific: more storage and GM features for VCS, more scenarios and units for Four Star General, deeper tracking for MasterTyping. Try it first, upgrade if it fits.
          </p>
          <p style={{ margin: 0, color: '#334155', lineHeight: 1.85 }}>
            ContentCraft is different. It is a full subscription workspace because the value is in the whole tool — lore organization, canon tracking, AI-assisted drafting, review workflow — not just one feature. $9.99 a month or $99 a year.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>What each product costs</h2>
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
                    {product.offerPrice ? formatPrice(product.offerPrice) : 'Price not listed yet'}
                  </p>
                  <p style={{ margin: '0 0 0.8rem', color: '#334155', lineHeight: 1.8 }}>
                    {product.pricingModel}.
                  </p>
                  <p style={{ margin: '0 0 1rem', color: '#475569', lineHeight: 1.8 }}>
                    {product.availability}.
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
                      Help and docs
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
