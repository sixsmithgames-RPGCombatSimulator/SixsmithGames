import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Start Here | Sixsmith Games',
  description:
    'Choose the Sixsmith Games starting point that fits what you want to do: run encounters, build creative projects, play a strategy game, or type faster and better.',
};

const paths = [
  {
    title: 'I want to run encounters',
    href: '/apps/virtual-combat-simulator',
    description: 'Use Virtual Combat Simulator for map-first encounter control and free-to-start GM support.',
    button: 'Go to Virtual Combat Simulator',
    accent: '#ef4444',
  },
  {
    title: 'I want a premium creative platform',
    href: '/apps/contentcraft',
    description: 'Use ContentCraft for bigger writing, worldbuilding, and campaign-creation work.',
    button: 'Go to ContentCraft',
    accent: '#7c3aed',
  },
  {
    title: 'I want a strategy game',
    href: '/apps/fourstargeneral',
    description: 'Use Four Star General for deterministic WWII tactical command and scenario-driven play.',
    button: 'Go to Four Star General',
    accent: '#d97706',
  },
  {
    title: 'I want to type faster and better',
    href: '/apps/mastertyping',
    description: 'Use MasterTyping for guided typing practice, assessment, drills, and game-supported repetition.',
    button: 'Go to MasterTyping',
    accent: '#16a34a',
  },
];

export default function StartHerePage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <section style={{ padding: '84px 0 28px', background: 'white' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 2rem' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              background: '#eef2ff',
              color: '#4f46e5',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Start Here
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.6rem)', lineHeight: 1.1, fontWeight: 900, color: '#111827', margin: '0 0 1rem' }}>
            Pick the product that fits what you actually want to do.
          </h1>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.8, color: '#4b5563', maxWidth: '760px', margin: 0 }}>
            Sixsmith Games makes tools and games for people who run campaigns, build creative projects, care about strategy, or spend real time at a keyboard. Start with the practical path that matches your use case.
          </p>
        </div>
      </section>

      <section style={{ padding: '36px 0 72px' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {paths.map((path) => (
              <article
                key={path.title}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '22px',
                  padding: '1.75rem',
                  boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
                }}
              >
                <div style={{ width: '56px', height: '4px', borderRadius: '999px', background: path.accent, marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#111827', margin: '0 0 0.6rem' }}>{path.title}</h2>
                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4b5563', margin: '0 0 1.2rem' }}>{path.description}</p>
                <Link
                  href={path.href}
                  style={{
                    display: 'inline-block',
                    padding: '0.9rem 1.35rem',
                    borderRadius: '999px',
                    background: '#111827',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 700,
                  }}
                >
                  {path.button}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
