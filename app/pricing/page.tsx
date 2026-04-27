import type { Metadata } from 'next';
import Link from 'next/link';

import FacebookViewContent from '@/components/FacebookViewContent';
import LaunchAppButton from '@/components/LaunchAppButton';
import ModernBackground from '@/components/ModernBackground';
import StructuredDataScript from '@/components/StructuredDataScript';
import SubscribeButton from '@/components/SubscribeButton';
import { buildPageMetadata } from '@/lib/metadata';
import { PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { fluidGrid, pageGutter } from '@/lib/responsive';
import { createFaqSchema } from '@/lib/schema';

export const metadata: Metadata = buildPageMetadata({
  title: 'Pricing | Sixsmith Games Products, Plans, and Access',
  description:
    'Compare pricing and access across Virtual Combat Simulator, GameMasterCraft, SagaCraft, Four Star General, MasterTyping, and Gravity.',
  path: '/pricing',
});

const pricingFaq = [
  {
    question: 'Can I try the products before paying?',
    answer:
      'All our products are free to start. Virtual Combat Simulator, GameMasterCraft, SagaCraft, Four Star General, and MasterTyping are all free to open and use. You only need a subscription when you want AI-assisted features — the core tools work without paying.',
  },
  {
    question: 'When do I need a subscription?',
    answer:
      'The $9.99/month subscription unlocks AI assistance across GameMasterCraft and SagaCraft. This includes AI brainstorming, drafting help, outlining support, and revision suggestions. The core organizational features — character tracking, plot management, timelines, lore — are free.',
  },
  {
    question: 'Is there a deal for Game Masters who want AI in both tools?',
    answer:
      'Yes. There is a bundle that combines AI access for GameMasterCraft and Virtual Combat Simulator for Game Masters who want the campaign workspace and the combat tool together with full AI features.',
  },
  {
    question: 'What is Gravity and why does it not have a price yet?',
    answer:
      'Gravity is a simultaneous-turn strategy game currently in early beta. The browser build is still limited to the studio team and testers, so there is no open signup or paid plan listed yet. The product page has the details.',
  },
  {
    question: 'Which product is right for me?',
    answer:
      'Use Virtual Combat Simulator if you run tabletop RPG encounters and want faster, cleaner combat management. Use GameMasterCraft if you are a game master who needs to organize campaigns, NPCs, factions, and session continuity. Use SagaCraft if you are writing fiction and need to track characters, plots, chapters, and story canon. Use Four Star General if you want serious WWII tactical strategy. Use MasterTyping if you want to improve your typing speed and accuracy. Use Gravity if simultaneous-turn strategy with ship systems sounds like your game.',
  },
];

function formatPrice(value?: number) {
  return typeof value === 'number' ? `$${value.toFixed(2)}/month` : 'See page for details';
}

export default function PricingPage() {
  return (
    <div style={{ background: '#f8fafc' }}>
      <FacebookViewContent
        contentId="pricing_page"
        contentName="Pricing Page"
        contentType="page"
      />
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
              All products are free to open and use. Virtual Combat Simulator, GameMasterCraft, SagaCraft, Four Star General, and MasterTyping are free to start. The $9.99/month subscription unlocks AI features across GameMasterCraft and SagaCraft. Gravity is in early beta with no paid plan listed yet.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.84)', margin: '0 0 1.4rem' }}>
              For the games and tools, paid upgrades add something specific — more storage, more scenarios, expanded history — but you can start without paying. For GameMasterCraft and SagaCraft, the core workspace is free. AI assistance requires a subscription, handled inside the apps.
            </p>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `3rem ${pageGutter} 5rem` }}>
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>Free to start — AI features are the upgrade</h2>
          <p style={{ margin: '0 0 0.9rem', color: '#334155', lineHeight: 1.85 }}>
            All products are free to open and use. Virtual Combat Simulator, GameMasterCraft, SagaCraft, Four Star General, and MasterTyping all let you start without paying. The paid upgrades add specific features: more storage and GM tools for VCS, more scenarios for Four Star General, deeper history for MasterTyping, and AI assistance for GameMasterCraft and SagaCraft.
          </p>
          <p style={{ margin: 0, color: '#334155', lineHeight: 1.85 }}>
            GameMasterCraft and SagaCraft give you the full organizational workspace for free — NPCs, factions, characters, plots, timelines, lore. When you want AI brainstorming, drafting help, or revision suggestions, the app will prompt you to subscribe. $9.99 a month or $99 a year.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>What each product costs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('260px'), gap: '1rem' }}>
            {PRODUCT_DEFINITIONS.filter(p => p.slug !== 'contentcraft').map((product) => (
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
                    {product.offerPrice ? formatPrice(product.offerPrice) : (product.slug === 'gamemastercraft' || product.slug === 'sagacraft') ? 'Free (AI features $9.99/mo)' : 'Free to start'}
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
