import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Products | Sixsmith Games',
  description:
    'Explore the Sixsmith Games lineup: Virtual Combat Simulator, ContentCraft, Four Star General, and MasterTyping.',
};

const products = [
  {
    name: 'Virtual Combat Simulator',
    href: '/apps/virtual-combat-simulator',
    eyebrow: 'Play now',
    title: 'Keep the fight moving when the map hits the table',
    description:
      'Virtual Combat Simulator is your combat control room for D&D and other tactical encounters: maps, initiative, tokens, and the shared table all in one place so the battle stays exciting instead of getting bogged down.',
    bullets: [
      'Grid-snapped maps, tokens, and initiative built for live encounters',
      'Easy to jump into with your group when you want cleaner combat flow',
      'Upgrade when you want more storage and bigger Game Master capability',
    ],
    accent: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    button: 'Play now',
  },
  {
    name: 'ContentCraft',
    href: '/apps/contentcraft',
    eyebrow: 'Create bigger worlds',
    title: 'Build the people, places, and lore behind the adventure',
    description:
      'ContentCraft is the writer’s room for your campaign, setting, or story. Build NPCs, locations, factions, lore, and scenes that actually fit together so your world feels deeper every time your players step into it.',
    bullets: [
      'Generate characters, locations, encounters, and lore that connect cleanly',
      'Track canon so your world keeps making sense as it grows',
      'Great for game masters, worldbuilders, and writers building something big',
    ],
    accent: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
    button: 'Explore ContentCraft',
  },
  {
    name: 'Four Star General',
    href: '/apps/fourstargeneral',
    eyebrow: 'Play now',
    title: 'Fight sharp WWII battles where positioning matters',
    description:
      'Four Star General is for players who love tense tactical decisions, tough missions, and the feeling that one smart move can turn the whole battle. Hold key ground, manage pressure, and outplay the enemy one decision at a time.',
    bullets: [
      'Tactical WWII battles with authored scenarios and clear objectives',
      'Terrain, positioning, and timing matter every turn',
      'Optional content expands the battlefield without changing the heart of the game',
    ],
    accent: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    button: 'Play now',
  },
  {
    name: 'MasterTyping',
    href: '/apps/mastertyping',
    eyebrow: 'Play now',
    title: 'Turn typing practice into a game you actually want to play',
    description:
      'MasterTyping takes the part that usually feels like homework and turns it into an arcade-style challenge with characters, powers, combos, and words flying at you fast enough to keep things fun.',
    bullets: [
      'Practice speed and accuracy without the usual boring drill feeling',
      'Game mode lets you blast words, collect rewards, and keep improving',
      'Great for anyone who wants better typing and a more fun way to get there',
    ],
    accent: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
    button: 'Start Playing',
  },
];

export default function ToolsPage() {
  return (
    <div style={{ background: '#f8fafc' }}>
      <section
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #312e81 100%)',
          padding: '84px 0 72px',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ maxWidth: '760px' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '0.4rem 0.9rem',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Products
            </div>
            <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', lineHeight: 1.1, fontWeight: 900, margin: '0 0 1rem' }}>
              Four products. Four different kinds of fun.
            </h1>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.86)', margin: 0 }}>
              Whether you want faster encounters, sharper tactics, bigger worlds, or a typing game that does not feel like homework, this is the full Sixsmith Games lineup.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {products.map((product) => (
              <article
                key={product.name}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
                }}
              >
                <div style={{ background: product.accent, padding: '1.5rem 2rem', color: 'white' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.9 }}>
                    {product.eyebrow}
                  </div>
                  <h2 style={{ fontSize: '1.85rem', lineHeight: 1.2, fontWeight: 800, margin: '0.6rem 0 0' }}>{product.name}</h2>
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 0.9rem' }}>{product.title}</h3>
                  <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4b5563', margin: '0 0 1.5rem' }}>{product.description}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'grid', gap: '0.75rem' }}>
                    {product.bullets.map((bullet) => (
                      <li key={bullet} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#374151' }}>
                        <svg style={{ width: '18px', height: '18px', color: '#4f46e5', flexShrink: 0, marginTop: '3px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={product.href}
                    style={{
                      display: 'inline-block',
                      padding: '0.95rem 1.5rem',
                      borderRadius: '999px',
                      background: '#111827',
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: 700,
                    }}
                  >
                    {product.button}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
