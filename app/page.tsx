/**
 * Sixsmith Games - Home Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 *
 * This source code is licensed under the terms found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from 'next/link';
import Image from 'next/image';
import ModernBackground from '@/components/ModernBackground';

export default function Home() {
  const freeProducts = [
    {
      name: 'Virtual Combat Simulator',
      href: '/apps/virtual-combat-simulator',
      icon: '/icons/vcs-optimized.png',
      audience: 'For GMs and tactical players',
      message: 'Start running encounters for free, then upgrade for more depth, more campaign support, and more storage when you need it.',
      button: 'Start free',
      accent: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    },
    {
      name: 'Four Star General',
      href: '/apps/fourstargeneral',
      icon: '/icons/fourstargeneral-optimized.png',
      audience: 'For strategy players',
      message: 'Free-to-start deterministic tactical play, with optional content upgrades that add more to explore without changing core fairness.',
      button: 'Play free',
      accent: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    },
    {
      name: 'MasterTyping',
      href: '/apps/mastertyping',
      icon: '/icons/mastertyping-optimized.png',
      audience: 'For creators, gamers, students, and hobbyists',
      message: 'Free typing practice for real digital life, with guided training, useful assessment, and a game mode that keeps practice interesting.',
      button: 'Try free',
      accent: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 35%, #312e81 70%, #7c2d12 100%)',
        padding: '60px 0 70px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <ModernBackground />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(100px)',
          zIndex: 2
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{position: 'relative', zIndex: 3}}>
          <div className="text-center max-w-4xl mx-auto">
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: '900',
              marginBottom: '1.5rem',
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              lineHeight: '1.2'
            }}>
              Games and tools for people who care about systems, craft, and play
            </h1>
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '2rem',
              fontWeight: '500',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              Start free with Virtual Combat Simulator, Four Star General, and MasterTyping. Go deeper with ContentCraft if you want the premium platform for bigger creative work.
            </p>
            <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center'}}>
              <Link href="/start-here" className="hero-btn-primary">
                Start free
              </Link>
              <Link href="/apps/contentcraft" className="hero-btn-secondary">
                Explore ContentCraft
              </Link>
            </div>
            <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'center'}}>
              <Image
                src="/icons/sixsmith-logo-optimized.png"
                alt="Sixsmith Games"
                width={200}
                height={200}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product model strip */}
      <section style={{ padding: '28px 0', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '18px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Free to start
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Virtual Combat Simulator', 'Four Star General', 'MasterTyping'].map((item) => (
                  <span key={item} style={{ background: 'white', border: '1px solid #dbeafe', color: '#1d4ed8', borderRadius: '999px', padding: '0.35rem 0.8rem', fontSize: '0.875rem', fontWeight: 700 }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '18px', padding: '1.5rem', color: 'white' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c4b5fd', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Premium subscription
              </div>
              <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', padding: '0.35rem 0.8rem', fontSize: '0.875rem', fontWeight: 700 }}>
                ContentCraft
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose your path */}
      <section id="apps" style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Choose your path
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#4a5568',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Start with the product that fits what you actually want to do. The free products get you in quickly. ContentCraft is the premium platform for larger creative work.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {freeProducts.map((product) => (
              <article key={product.name} style={{ background: 'white', borderRadius: '24px', border: '1px solid #e5e7eb', boxShadow: '0 10px 24px rgba(15,23,42,0.05)', overflow: 'hidden' }}>
                <div style={{ background: product.accent, padding: '1.5rem 1.75rem', color: 'white' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '18px', marginBottom: '1rem', overflow: 'hidden', background: 'rgba(255,255,255,0.16)' }}>
                    <Image src={product.icon} alt={product.name} width={72} height={72} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                  <h3 style={{ fontSize: '1.55rem', fontWeight: '800', margin: '0 0 0.35rem' }}>{product.name}</h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: 'rgba(255,255,255,0.88)' }}>{product.audience}</p>
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: '1.8', margin: '0 0 1.25rem' }}>{product.message}</p>
                  <Link href={product.href} style={{ display: 'inline-block', padding: '0.9rem 1.35rem', borderRadius: '999px', background: '#111827', color: 'white', textDecoration: 'none', fontWeight: 700 }}>
                    {product.button}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #1f1147 0%, #4c1d95 100%)', borderRadius: '28px', color: 'white', padding: '2.5rem', boxShadow: '0 20px 50px rgba(76,29,149,0.22)' }}>
            <div style={{ maxWidth: '860px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ddd6fe', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Premium creative platform
              </div>
              <h3 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 900, margin: '0 0 0.9rem' }}>ContentCraft</h3>
              <p style={{ fontSize: '1.08rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.88)', margin: '0 0 1.25rem' }}>
                For writers, worldbuilders, and campaign creators who need more than a blank document. ContentCraft is the premium subscription platform for bigger creative projects, includes AI usage, and supports additional credits when you need more capacity.
              </p>
              <Link href="/apps/contentcraft" style={{ display: 'inline-block', padding: '0.95rem 1.5rem', borderRadius: '999px', background: 'white', color: '#4c1d95', textDecoration: 'none', fontWeight: 800 }}>
                Explore ContentCraft
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Creator tools section */}
      <section style={{ padding: '96px 0', background: 'white' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#4f46e5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Creator tools
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: '#111827', margin: '0 0 1rem', lineHeight: 1.15 }}>
              Virtual Combat Simulator and ContentCraft belong together, but they are not the same kind of product
            </h2>
            <p style={{ fontSize: '1.06rem', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
              Virtual Combat Simulator is the accessible, free-to-start utility. ContentCraft is the premium creative environment for larger projects. One gets you in quickly. The other gives you a deeper workspace when your writing, worldbuilding, or campaign creation needs more structure.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            <div style={{ background: 'linear-gradient(160deg, #1f2937, #111827)', borderRadius: '24px', padding: '2rem', color: 'white' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fca5a5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Free to start
              </div>
              <h3 style={{ fontSize: '1.7rem', fontWeight: '800', margin: '0 0 0.9rem' }}>Virtual Combat Simulator</h3>
              <p style={{ color: '#d1d5db', lineHeight: 1.8, margin: '0 0 1rem' }}>
                Run encounters without wrestling with your notes. Start free, get useful combat tools immediately, and upgrade later if you want more features, more storage, and deeper campaign support.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem', display: 'grid', gap: '0.55rem' }}>
                {['Useful right away for running encounters', 'Map, initiative, and table state in one place', 'Paid upgrades add capability, not access to the basic tool'].map((item) => (
                  <li key={item} style={{ color: '#e5e7eb', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: '#f87171' }}>●</span>{item}
                  </li>
                ))}
              </ul>
              <Link href="/apps/virtual-combat-simulator" style={{ color: '#fca5a5', fontWeight: 700, textDecoration: 'none' }}>Start free →</Link>
            </div>

            <div style={{ background: 'linear-gradient(160deg, #312e81, #4c1d95)', borderRadius: '24px', padding: '2rem', color: 'white' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ddd6fe', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Premium subscription
              </div>
              <h3 style={{ fontSize: '1.7rem', fontWeight: '800', margin: '0 0 0.9rem' }}>ContentCraft</h3>
              <p style={{ color: '#ddd6fe', lineHeight: 1.8, margin: '0 0 1rem' }}>
                A premium creative platform for writers, worldbuilders, and campaign creators who need a more connected place to work. It includes AI usage and supports additional credits when heavier use makes sense.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem', display: 'grid', gap: '0.55rem' }}>
                {['Subscription product for bigger creative work', 'Built for long-form projects, lore, and continuity', 'Additional credits available for heavier AI usage'].map((item) => (
                  <li key={item} style={{ color: '#f5f3ff', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: '#c4b5fd' }}>●</span>{item}
                  </li>
                ))}
              </ul>
              <Link href="/apps/contentcraft" style={{ color: '#ddd6fe', fontWeight: 700, textDecoration: 'none' }}>Explore ContentCraft →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Four Star General feature section */}
      <section style={{ padding: '96px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#b45309', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Strategy flagship
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: '#111827', margin: '0 0 1rem', lineHeight: 1.15 }}>
                Four Star General is about deterministic tactics, not noise
              </h2>
              <p style={{ fontSize: '1.06rem', color: '#4b5563', lineHeight: 1.8, margin: '0 0 1rem' }}>
                Deploy your forces, manage reserves, handle pressure, and solve scenario problems with clear rules and meaningful tradeoffs. The appeal is not spectacle. It is readable battlefield pressure and decisions that matter.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                Paid upgrades expand content and options, but the free-to-start core is designed to stay tactically honest. The goal is deeper variety, not pay-to-win advantages.
              </p>
            </div>

            <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e5e7eb', padding: '2rem', boxShadow: '0 10px 24px rgba(15,23,42,0.05)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', margin: '0 0 1rem' }}>What a battle asks from you</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.85rem' }}>
                {[
                  'Deploy cleanly and commit to a plan before pressure builds',
                  'Use reserves at the right moment instead of spending them reflexively',
                  'Protect supply and tempo while solving the scenario in front of you',
                  'Work inside clear rules so decisions stay readable and fair',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#374151' }}>
                    <span style={{ color: '#d97706' }}>●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/apps/fourstargeneral" style={{ display: 'inline-block', marginTop: '1.4rem', color: '#b45309', fontWeight: 700, textDecoration: 'none' }}>
                See Four Star General →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MasterTyping feature section */}
      <section style={{ padding: '96px 0', background: 'white' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Typing for real digital life
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: '#111827', margin: '0 0 1rem', lineHeight: 1.15 }}>
                MasterTyping is for people who actually use keyboards a lot
              </h2>
              <p style={{ fontSize: '1.06rem', color: '#4b5563', lineHeight: 1.8, margin: '0 0 1rem' }}>
                Writing, note-taking, chat, research, campaign prep, streaming, modding, and general digital fluency all get easier when typing is more comfortable. MasterTyping is built around useful practice, not just novelty.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                The game mode is there to make practice less tedious. It is not the whole identity of the product.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {[
                'Assessment mode spots weak patterns before you guess at what to practice',
                'Exercise mode gives you targeted drills for the exact things slowing you down',
                'Pro mode supports stricter, more focused training',
                'Game mode keeps repetition from feeling dead',
              ].map((item) => (
                <div key={item} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '18px', padding: '1.2rem 1.25rem', color: '#166534' }}>
                  {item}
                </div>
              ))}
              <Link href="/apps/mastertyping" style={{ display: 'inline-block', marginTop: '0.4rem', color: '#059669', fontWeight: 700, textDecoration: 'none' }}>
                Try MasterTyping →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '120px 0',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.15), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(168,85,247,0.1), transparent 60%)',
        }} />
        <div style={{
          maxWidth: '800px', margin: '0 auto', padding: '0 2rem',
          textAlign: 'center', position: 'relative', zIndex: 1,
        }}>
          <p style={{ color: '#818cf8', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            How it works
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: '900',
            color: 'white', marginBottom: '1.25rem', lineHeight: 1.2,
          }}>
            Start free. Upgrade where it makes sense. Subscribe to ContentCraft if you want the deeper creative platform.
          </h2>
          <p style={{
            fontSize: '1.125rem', color: '#94a3b8',
            marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 2.5rem',
          }}>
            That is the ecosystem. Useful free starts, honest upgrade paths, and one premium platform for bigger creative work.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/start-here" className="cta-primary">
              Start free
            </Link>
            <Link href="/pricing" className="cta-secondary">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
