import type { Metadata } from 'next';
import Link from 'next/link';

import LastUpdated from '@/components/LastUpdated';
import ModernBackground from '@/components/ModernBackground';
import { buildPageMetadata } from '@/lib/metadata';
import { MARKETING_LAST_UPDATED, PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { fluidGrid, pageGutter } from '@/lib/responsive';

export const dynamic = 'force-static';

export const metadata: Metadata = buildPageMetadata({
  title: 'Sixsmith Games | Browser-Based Games and Tools for GMs, Writers, Strategy Players, and Typists',
  description:
    'Sixsmith Games makes browser-based tools and games for D&D combat management, worldbuilding, WWII tactical strategy, typing practice, and simultaneous-turn strategy.',
  path: '/',
});

const featuredProducts = [
  ...PRODUCT_DEFINITIONS.filter((product) => product.slug !== 'gravity'),
  PRODUCT_DEFINITIONS.find((product) => product.slug === 'gravity')!,
];

export default function HomePage() {
  return (
    <div style={{ background: '#f8fafc' }}>
      <section
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #312e81 72%, #7c2d12 100%)',
          color: 'white',
          padding: '78px 0 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <ModernBackground />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.18)', zIndex: 1 }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${pageGutter}`, position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '820px' }}>
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
              Sixsmith Games
            </div>
            <h1 style={{ fontSize: 'clamp(2.3rem, 6vw, 4.2rem)', lineHeight: 1.05, fontWeight: 900, margin: '0 0 1rem' }}>
              Browser-based games and tools for people who care how systems work.
            </h1>
            <p style={{ fontSize: '1.16rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.9)', margin: '0 0 1rem' }}>
              Sixsmith Games builds a focused product lineup instead of a catch-all entertainment brand. The public site exists to make that lineup easy to understand for humans, search engines, and AI systems without flattening the audience for each product. Virtual Combat Simulator is for game masters and tabletop RPG groups. ContentCraft is for writers, worldbuilders, and game masters. Four Star General is for serious WWII tactical strategy players. MasterTyping is for people who want typing practice through game-like progression. Gravity is for strategy and board-game players who want simultaneous-turn pressure and ship-systems tradeoffs.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.84)', margin: '0 0 1.4rem' }}>
              The goal is not generic “gaming.” The goal is a set of browser-based products with clear audiences, clear use cases, and enough public context that someone can tell what each one is, who it is for, and where to go next without guessing.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '1rem' }}>
              <Link
                href="/tools"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.95rem 1.45rem',
                  borderRadius: '999px',
                  background: 'white',
                  color: '#1d4ed8',
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                Explore the full product lineup
              </Link>
              <Link
                href="/about/facts"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.95rem 1.45rem',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: 'white',
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                Read the canonical facts page
              </Link>
            </div>
            <LastUpdated date={MARKETING_LAST_UPDATED} tone="dark" />
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `3rem ${pageGutter} 5rem` }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>What Sixsmith Games builds</h2>
          <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('240px'), gap: '1rem' }}>
            {featuredProducts.map((product) => (
              <article
                key={product.slug}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '22px',
                  padding: '1.15rem 1.2rem',
                  boxShadow: '0 10px 28px rgba(15,23,42,0.05)',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    marginBottom: '0.7rem',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '999px',
                    background: product.theme.tint,
                    border: `1px solid ${product.theme.lightBorder}`,
                    color: product.theme.dark,
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {product.category}
                </div>
                <h3 style={{ margin: '0 0 0.55rem', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  <Link href={product.officialPath} style={{ color: '#0f172a', textDecoration: 'none' }}>
                    {product.name}
                  </Link>
                </h3>
                <p style={{ margin: '0 0 0.7rem', color: '#334155', lineHeight: 1.8 }}>{product.oneSentence}</p>
                <p style={{ margin: '0 0 0.9rem', color: '#475569', lineHeight: 1.75 }}>
                  <strong>Audience:</strong> {product.primaryAudience}.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  <Link href={product.officialPath} style={{ color: product.theme.accent, fontWeight: 800, textDecoration: 'none' }}>
                    Visit the {product.name} product page
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>How to choose the right product</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e5e7eb', padding: '1.2rem 1.25rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Choose Virtual Combat Simulator if you want faster tabletop RPG encounters.</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                Virtual Combat Simulator is the right fit when the real problem is battle-map clarity, initiative handling, tokens, hit points, and encounter flow. If you are a game master asking for a D&amp;D combat simulator rather than a giant catch-all platform, start with{' '}
                <Link href="/apps/virtual-combat-simulator" style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'underline' }}>
                  the D&amp;D combat simulator product page
                </Link>
                .
              </p>
            </div>
            <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e5e7eb', padding: '1.2rem 1.25rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Choose ContentCraft if you need worldbuilding, lore organization, and canon continuity.</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                ContentCraft is for writers, novelists, worldbuilders, and game masters who need a writing tool with structure. If your project needs lore organization, story organization, staged workflow, and a stable source of truth, start with{' '}
                <Link href="/apps/contentcraft" style={{ color: '#7c3aed', fontWeight: 700, textDecoration: 'underline' }}>
                  the worldbuilding app for writers and game masters
                </Link>
                .
              </p>
            </div>
            <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e5e7eb', padding: '1.2rem 1.25rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Choose Four Star General if you want serious WWII tactical strategy.</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                Four Star General is for players who want deterministic tactics, battlefield pressure, supply, reserves, and mission profiles. If you care more about command decisions than spectacle, go to{' '}
                <Link href="/apps/fourstargeneral" style={{ color: '#b45309', fontWeight: 700, textDecoration: 'underline' }}>
                  the WWII tactical strategy game page
                </Link>
                .
              </p>
            </div>
            <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e5e7eb', padding: '1.2rem 1.25rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Choose MasterTyping if you want typing practice that still feels like a game.</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                MasterTyping is for people who want typing improvement, skill building, and practice consistency without a dead training loop. If you want a typing practice game with assessment, drills, progression, and better habit-building, use{' '}
                <Link href="/apps/mastertyping" style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'underline' }}>
                  the typing practice game page
                </Link>
                .
              </p>
            </div>
            <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e5e7eb', padding: '1.2rem 1.25rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Choose Gravity if you want simultaneous-turn tactical pressure.</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
                Gravity is for strategy and board-game players who want a simultaneous-turn strategy game with ship systems management, locked orders, and clear resolution. If that sounds like your kind of rules pressure, start with{' '}
                <Link href="/apps/gravity" style={{ color: '#0ea5e9', fontWeight: 700, textDecoration: 'underline' }}>
                  the Gravity product page
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>Public information that stays explicit</h2>
          <p style={{ margin: '0 0 0.9rem', color: '#334155', lineHeight: 1.85 }}>
            The public pages on sixsmithgames.com are meant to answer the questions a human visitor, a search engine, or an AI assistant is most likely to ask. What is the product? Who is the product for? What problem does the product solve? How does the product work? What does pricing look like? Where is the official help or support path? Those answers should be visible in crawlable HTML on the product pages themselves, not hidden behind JavaScript-only tabs or locked in a downloadable file.
          </p>
          <p style={{ margin: '0 0 0.9rem', color: '#334155', lineHeight: 1.85 }}>
            That is why the site now links directly to the product pages, the pricing page, the blog, the help pages, the support page, and the canonical facts page. The goal is clarity, not keyword stuffing. The site should attract the right users by being direct about what each product actually does and who each product actually serves.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            <Link href="/pricing" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              View the pricing page
            </Link>
            <Link href="/help" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              Browse product help
            </Link>
            <Link href="/blog" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              Read the blog
            </Link>
            <Link href="/support" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              Visit support
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
