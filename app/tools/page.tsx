import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tools | Sixsmith Games',
  description:
    'Explore the Sixsmith Games tools lineup: Virtual Combat Simulator for encounter control and ContentCraft for bigger creative projects.',
};

const tools = [
  {
    name: 'Virtual Combat Simulator',
    href: '/apps/virtual-combat-simulator',
    eyebrow: 'Free to start',
    title: 'Run encounters without wrestling with your notes',
    description:
      'Virtual Combat Simulator is the accessible, free-to-start tool in the lineup. It gives GMs and tactical players a useful combat space right away, then opens up more features, more storage, and deeper campaign support when you want it.',
    bullets: [
      'Free to start with useful encounter tools immediately',
      'Built for GMs and tactical players who want cleaner combat flow',
      'Upgrade path adds more features, more storage, and deeper use',
    ],
    accent: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    button: 'Start free',
  },
  {
    name: 'ContentCraft',
    href: '/apps/contentcraft',
    eyebrow: 'Premium subscription',
    title: 'A deeper creative platform for bigger projects',
    description:
      'ContentCraft is the premium creative platform in the Sixsmith Games lineup. It is built for larger writing, worldbuilding, and campaign-creation work, includes AI usage, and supports additional credits for heavier use.',
    bullets: [
      'Premium subscription product for writers, worldbuilders, and campaign creators',
      'Includes built-in AI usage for real project work',
      'Additional credits available when you need more capacity',
    ],
    accent: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
    button: 'Explore ContentCraft',
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
              Tools
            </div>
            <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', lineHeight: 1.1, fontWeight: 900, margin: '0 0 1rem' }}>
              Two tools. Two different ways to go deeper.
            </h1>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.86)', margin: 0 }}>
              Virtual Combat Simulator and ContentCraft belong together, but they do not monetize the same way. One is free to start and useful immediately. The other is the premium platform for larger creative work.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {tools.map((tool) => (
              <article
                key={tool.name}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
                }}
              >
                <div style={{ background: tool.accent, padding: '1.5rem 2rem', color: 'white' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.9 }}>
                    {tool.eyebrow}
                  </div>
                  <h2 style={{ fontSize: '1.85rem', lineHeight: 1.2, fontWeight: 800, margin: '0.6rem 0 0' }}>{tool.name}</h2>
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 0.9rem' }}>{tool.title}</h3>
                  <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4b5563', margin: '0 0 1.5rem' }}>{tool.description}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'grid', gap: '0.75rem' }}>
                    {tool.bullets.map((bullet) => (
                      <li key={bullet} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#374151' }}>
                        <svg style={{ width: '18px', height: '18px', color: '#4f46e5', flexShrink: 0, marginTop: '3px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tool.href}
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
                    {tool.button}
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
