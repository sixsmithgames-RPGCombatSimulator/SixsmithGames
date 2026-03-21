import React from 'react';

export const metadata = {
  title: 'About Sixsmith Games',
  description: 'Learn about Sixsmith Games—an independent studio building thoughtful tools and games for creators, gamers, and digital hobbyists.',
};

export default function AboutPage() {
  return (
    <div style={{ background: '#0b1021', minHeight: '100vh', color: '#e5e7eb' }}>
      <section
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25), transparent 45%), radial-gradient(circle at 80% 10%, rgba(236,72,153,0.2), transparent 40%), linear-gradient(135deg, #111827 0%, #0b1021 50%, #0f172a 100%)',
          padding: '96px 0 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c084fc', marginBottom: '1.5rem' }}>
            About Sixsmith Games
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.1, margin: '0 0 1rem', fontWeight: 800 }}>
            Built for people who care about how things actually work.
          </h1>
          <p style={{ maxWidth: '820px', fontSize: '1.2rem', lineHeight: 1.7, color: 'rgba(229,231,235,0.85)', margin: 0 }}>
            Sixsmith Games builds thoughtful tools and games for creators, gamers, and digital hobbyists. Some products help people make better worlds, run better sessions, or keep creative work coherent. Some are built for tactical play. Some are built for everyday keyboard skill. All of them are grounded in the same idea: make useful things that feel good to use.
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px' }}>
              <div style={{ fontSize: '0.95rem', letterSpacing: '0.04em', color: '#c084fc', marginBottom: '0.35rem', fontWeight: 700 }}>Focus</div>
              <div style={{ color: '#e5e7eb', fontWeight: 700, fontSize: '1.05rem' }}>Useful software, clear systems, and replayable design</div>
            </div>
            <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px' }}>
              <div style={{ fontSize: '0.95rem', letterSpacing: '0.04em', color: '#c084fc', marginBottom: '0.35rem', fontWeight: 700 }}>Who We Serve</div>
              <div style={{ color: '#e5e7eb', fontWeight: 700, fontSize: '1.05rem' }}>Creators, game masters, strategy players, and people who live on a keyboard</div>
            </div>
            <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px' }}>
              <div style={{ fontSize: '0.95rem', letterSpacing: '0.04em', color: '#c084fc', marginBottom: '0.35rem', fontWeight: 700 }}>Approach</div>
              <div style={{ color: '#e5e7eb', fontWeight: 700, fontSize: '1.05rem' }}>Grounded thinking, disciplined systems design, and respect for the user</div>
            </div>
          </div>

          <article style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '22px', padding: '2.25rem', boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(229,231,235,0.9)' }}>
              <p>
                Sixsmith Games sits at the intersection of game design, software design, and creative tooling. The products are varied, but the standard is the same across all of them: they should solve a real problem, make sense when you use them, and hold up under repeated use instead of falling apart once the novelty wears off.
              </p>
              <p>
                That is why the public product lineup looks the way it does. Virtual Combat Simulator is built for people who want cleaner tactical control at the table. ContentCraft is the premium creative platform for projects that need structure, continuity, and built-in AI help without losing control of the work. Four Star General is for players who want deterministic tactical pressure rather than chaos. MasterTyping is for people who want to get better at a real digital skill in a way that feels usable and engaging.
              </p>
              <p>
                The mix of tools and games is intentional. Creative work, tactical play, and everyday digital skill all reward the same kind of thinking: clear feedback, coherent systems, and good friction instead of pointless friction. Sixsmith Games is interested in products that respect people’s time and attention, whether they are writing lore, running encounters, solving battlefield problems, or simply trying to type better.
              </p>
              <p>
                This is still an independent studio, which matters because independence shapes the way products are built. The goal is not to chase every trend or inflate every idea into a grand promise. The goal is to ship strong work, improve it steadily, and build a lineup that feels distinct, coherent, and worth returning to.
              </p>
              <p style={{ fontWeight: 700, color: '#f9fafb' }}>
                If you like thoughtful tools, grounded systems, and products that take quality seriously, you are in the right place.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
