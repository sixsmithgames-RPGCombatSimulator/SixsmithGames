import React from 'react';

export const metadata = {
  title: 'About Sixsmith Games',
  description: 'Learn about Sixsmith Games—an independent studio building polished, imaginative experiences for board game fans, TTRPG players, game masters, and storytellers.',
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
            Crafted worlds. Polished play. Built by people who love games.
          </h1>
          <p style={{ maxWidth: '820px', fontSize: '1.2rem', lineHeight: 1.7, color: 'rgba(229,231,235,0.85)', margin: 0 }}>
            Sixsmith Games is an independent game studio dedicated to creating fun, high-quality experiences for board game fans, TTRPG players, game masters, and storytellers. Our work is driven by a love of clever mechanics, immersive worlds, and the kind of design that makes people want to come back for one more session, one more round, or one more adventure.
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px' }}>
              <div style={{ fontSize: '0.95rem', letterSpacing: '0.04em', color: '#c084fc', marginBottom: '0.35rem', fontWeight: 700 }}>Focus</div>
              <div style={{ color: '#e5e7eb', fontWeight: 700, fontSize: '1.05rem' }}>Craft, continuity, and playability</div>
            </div>
            <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px' }}>
              <div style={{ fontSize: '0.95rem', letterSpacing: '0.04em', color: '#c084fc', marginBottom: '0.35rem', fontWeight: 700 }}>Players</div>
              <div style={{ color: '#e5e7eb', fontWeight: 700, fontSize: '1.05rem' }}>Board gamers, TTRPG storytellers, game masters</div>
            </div>
            <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px' }}>
              <div style={{ fontSize: '0.95rem', letterSpacing: '0.04em', color: '#c084fc', marginBottom: '0.35rem', fontWeight: 700 }}>Approach</div>
              <div style={{ color: '#e5e7eb', fontWeight: 700, fontSize: '1.05rem' }}>Imagination plus disciplined systems design</div>
            </div>
          </div>

          <article style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '22px', padding: '2.25rem', boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(229,231,235,0.9)' }}>
              <p>
                At the center of Sixsmith Games is Mike Sixsmith, a lifelong gamer with a deep passion for game design, storytelling, and systems that truly work. His background as a mechanical engineer and programmer shapes the way he approaches every project: with creativity, structure, precision, and a constant focus on how all the pieces fit together. That combination of imagination and technical discipline is a big part of what defines Sixsmith Games.
              </p>
              <p>
                Our goal is to make games and content that are not only imaginative, but genuinely enjoyable to play. We care deeply about fun. We care about quality. We care about the balance between strong mechanics and memorable theme. Whether we are designing tabletop content, developing original board game ideas, or building new game concepts, the aim is always the same: create experiences that feel polished, rewarding, and full of possibility.
              </p>
              <p>
                So far, Sixsmith Games has produced original TTRPG content and developed a growing slate of game ideas rooted in strong flavor and thoughtful design. That includes playable race content inspired by iconic fantasy creatures, along with original concepts for larger game projects. Each piece reflects the studio’s core philosophy: take compelling ideas, build them carefully, and turn them into something people are excited to play.
              </p>
              <p>
                Sixsmith Games is growing as a creative home for game design, worldbuilding, and interactive storytelling. Some projects are built for the tabletop. Some are built for the screen. All of them are built with the same commitment to craftsmanship, imagination, and fun.
              </p>
              <p style={{ fontWeight: 700, color: '#f9fafb' }}>
                If you love tabletop RPGs, engaging board games, smart mechanics, and richly imagined worlds, you are in the right place.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
