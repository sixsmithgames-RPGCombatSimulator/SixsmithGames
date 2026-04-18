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
import { actionRowClassName, cardPadding, fluidGrid, pageGutter, touchTargetClassName } from '@/lib/responsive';

export default function Home() {
  const freeProducts = [
    {
      name: 'Virtual Combat Simulator',
      href: '/apps/virtual-combat-simulator',
      icon: '/icons/vcs-optimized.png',
      audience: 'Battle maps, initiative, and encounter control',
      message: 'Your D&D combat control room: grid-snapped maps, live initiative, tokens, and sheets in one place so the fight keeps moving.',
      button: 'Play Now',
      accent: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    },
    {
      name: 'Four Star General',
      href: '/apps/fourstargeneral',
      icon: '/icons/fourstargeneral-optimized.png',
      audience: 'WWII battles with tactics with tense missions',
      message: 'Set your line, manage reserves, and fight through tense operational battles where clear rules make every decision hit harder.',
      button: 'Play Now',
      accent: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    },
    {
      name: 'MasterTyping',
      href: '/apps/mastertyping',
      icon: '/icons/mastertyping-optimized.png',
      audience: 'Typing battles with characters and power-ups',
      message: 'Pick a character, blast incoming words, unlock wild abilities, and turn typing practice into something you actually want to play.',
      button: 'Start Playing',
      accent: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 35%, #312e81 70%, #7c2d12 100%)',
        padding: '40px 0 48px',
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
          <div className="text-center max-w-3xl mx-auto">
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.8rem)',
              fontWeight: '900',
              marginBottom: '1rem',
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              lineHeight: '1.1'
            }}>
              Games and tools built for play
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '1.5rem',
              fontWeight: '500',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              lineHeight: 1.5
            }}>
              Run cleaner D&D combats, command sharp battlefield tactics, build bigger worlds, and turn typing practice into an actual game.
            </p>
            <div className={actionRowClassName} style={{ justifyContent: 'center' }}>
              <Link href="/start-here" className="hero-btn-primary">
                Start Playing
              </Link>
              <Link href="/apps/contentcraft" className="hero-btn-secondary">
                See ContentCraft
              </Link>
            </div>
            <div style={{marginTop: '1.5rem', display: 'flex', justifyContent: 'center'}}>
              <Image
                src="/icons/sixsmith-logo-optimized.png"
                alt="Sixsmith Games"
                width={160}
                height={160}
                sizes="(max-width: 640px) 128px, 160px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product model strip */}
      <section style={{ padding: '28px 0', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${pageGutter}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('280px'), gap: '1.25rem' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '18px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Jump into the action
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {[
                  { label: 'Virtual Combat Simulator', href: '/apps/virtual-combat-simulator' },
                  { label: 'Four Star General', href: '/apps/fourstargeneral' },
                  { label: 'MasterTyping', href: '/apps/mastertyping' },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className={touchTargetClassName} style={{ background: 'white', border: '1px solid #dbeafe', color: '#1d4ed8', borderRadius: '999px', padding: '0.5rem 0.9rem', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '18px', padding: '1.5rem', color: 'white' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c4b5fd', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Build the world around the game
              </div>
              <Link href="/apps/contentcraft" className={touchTargetClassName} style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', padding: '0.5rem 0.9rem', fontSize: '0.875rem', fontWeight: 700, color: 'white', textDecoration: 'none' }}>
                ContentCraft
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Choose your path */}
      <section id="apps" style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: `0 ${pageGutter}`}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: '800',
              color: '#1a202c',
              marginBottom: '0.75rem'
            }}>
              Choose your path
            </h2>
            <p style={{
              fontSize: 'clamp(0.98rem, 2vw, 1.1rem)',
              color: '#4a5568',
              maxWidth: '680px',
              margin: '0 auto'
            }}>
              Whether you want cleaner encounters, tense tactics, or word-blasting practice, start with the one that sounds like your kind of fun.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: fluidGrid('320px'),
            gap: '2rem'
          }}>
            {freeProducts.map((product) => (
              <article key={product.name} style={{ background: 'white', borderRadius: '24px', border: '1px solid #e5e7eb', boxShadow: '0 10px 24px rgba(15,23,42,0.05)', overflow: 'hidden' }}>
                <div style={{ background: product.accent, padding: 'var(--card-padding)', color: 'white' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '18px', marginBottom: '1rem', overflow: 'hidden', background: 'rgba(255,255,255,0.16)' }}>
                    <Image src={product.icon} alt={product.name} width={72} height={72} sizes="72px" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                  <h3 style={{ fontSize: '1.55rem', fontWeight: '800', margin: '0 0 0.35rem' }}>
                    <Link href={product.href} style={{ color: 'white', textDecoration: 'none' }}>
                      {product.name}
                    </Link>
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: 'rgba(255,255,255,0.88)' }}>{product.audience}</p>
                </div>
                <div style={{ padding: cardPadding }}>
                  <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: '1.8', margin: '0 0 1.25rem' }}>{product.message}</p>
                  <Link href={product.href} className={touchTargetClassName} style={{ padding: '0.9rem 1.35rem', borderRadius: '999px', background: '#111827', color: 'white', textDecoration: 'none', fontWeight: 700 }}>
                    {product.button}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #1f1147 0%, #4c1d95 100%)', borderRadius: '28px', color: 'white', padding: cardPadding, boxShadow: '0 20px 50px rgba(76,29,149,0.22)' }}>
            <div style={{ maxWidth: '860px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ddd6fe', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Make something cool
              </div>
              <h3 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 900, margin: '0 0 0.9rem' }}>ContentCraft</h3>
              <p style={{ fontSize: '1.08rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.88)', margin: '0 0 1.25rem' }}>
                Stop bouncing between chat windows, notes, and half-finished wiki pages. ContentCraft helps you build NPCs, locations, lore, and encounters that actually remember each other.
              </p>
              <Link href="/apps/contentcraft" className={touchTargetClassName} style={{ padding: '0.95rem 1.5rem', borderRadius: '999px', background: 'white', color: '#4c1d95', textDecoration: 'none', fontWeight: 800 }}>
                See ContentCraft
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Creator tools section */}
      <section style={{ padding: '96px 0', background: 'white' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: `0 ${pageGutter}` }}>
          <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#4f46e5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Game Master Suite
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: '#111827', margin: '0 0 1rem', lineHeight: 1.15 }}>
              Run an encounter with one app while using the other to build the world around it...
            </h2>
            <p style={{ fontSize: '1.06rem', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
              Virtual Combat Simulator keeps each encounter easy to manage when the tokens hit the table. ContentCraft helps you create the NPCs, places, factions, scenes, encounters, and lore that make the whole campaign feel alive.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('320px'), gap: '1.75rem' }}>
            <div style={{ background: 'linear-gradient(160deg, #1f2937, #111827)', borderRadius: '24px', padding: cardPadding, color: 'white' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fca5a5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Jump in fast
              </div>
              <h3 style={{ fontSize: '1.7rem', fontWeight: '800', margin: '0 0 0.9rem' }}>Virtual Combat Simulator</h3>
              <p style={{ color: '#d1d5db', lineHeight: 1.8, margin: '0 0 1rem' }}>
                Stop losing momentum to “whose turn is it?”, combat chaos, and scattered notes. Put the map, initiative, stats, monsters and players where you can actually use them.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem', display: 'grid', gap: '0.55rem' }}>
                {['Grid-snapped battle maps with zoom and token control', 'Initiative, turns, HP, and characters together on one screen', 'Built for online or hybrid tables that want the fight to flow'].map((item) => (
                  <li key={item} style={{ color: '#e5e7eb', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: '#f87171' }}>●</span>{item}
                  </li>
                ))}
              </ul>
              <Link href="/apps/virtual-combat-simulator" className={touchTargetClassName} style={{ color: '#fca5a5', fontWeight: 700, textDecoration: 'none' }}>Start Playing →</Link>
            </div>

            <div style={{ background: 'linear-gradient(160deg, #312e81, #4c1d95)', borderRadius: '24px', padding: cardPadding, color: 'white' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ddd6fe', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Build bigger worlds
              </div>
              <h3 style={{ fontSize: '1.7rem', fontWeight: '800', margin: '0 0 0.9rem' }}>ContentCraft</h3>
              <p style={{ color: '#ddd6fe', lineHeight: 1.8, margin: '0 0 1rem' }}>
                Think of it as the writer’s room for your campaign or next novel. Generate content for the next chapter of your book or next D&D game session or build an entire universe. Keep your canon organized, and stop rebuilding the same world details from scratch.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem', display: 'grid', gap: '0.55rem' }}>
                {['Generate NPCs, locations, lore, and encounters that fit together', 'Canon management catches contradictions before your readers or your players do', 'Relationship mapping helps your world feel connected instead of random'].map((item) => (
                  <li key={item} style={{ color: '#f5f3ff', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: '#c4b5fd' }}>●</span>{item}
                  </li>
                ))}
              </ul>
              <Link href="/apps/contentcraft" className={touchTargetClassName} style={{ color: '#ddd6fe', fontWeight: 700, textDecoration: 'none' }}>See ContentCraft →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Four Star General feature section */}
      <section style={{ padding: '96px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: `0 ${pageGutter}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('320px'), gap: '2rem', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#b45309', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Strategy and Tactics | WWII
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: '#111827', margin: '0 0 1rem', lineHeight: 1.15 }}>
                Four Star General is about planning and tactics in the WWII theatre
              </h2>
              <p style={{ fontSize: '1.06rem', color: '#4b5563', lineHeight: 1.8, margin: '0 0 1rem' }}>
                This is for players who love the moment when their tactical positioning pays off. You deploy, manage resources, protect supply lines, call in air support, and command your forces to win battles.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                Mission objectives, resource management, and tactical counters to enemy advancement are critical. Hold river crossings, defend towns, take key positions, remove enemy strongholds, use terrain to your advantage, and coordinating your forces gives each battle that satisfying “one more turn”.
              </p>
            </div>

            <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e5e7eb', padding: cardPadding, boxShadow: '0 10px 24px rgba(15,23,42,0.05)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', margin: '0 0 1rem' }}>Game Play with Tactical Depth</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.85rem' }}>
                {[
                  'Choose your forces and supplies, then deploy them strategically',
                  'Position your forces, command them to hold objectives or engage the enemy',
                  'Manage resources smartly and protect supply lines',
                  'Use reconnaissance to gather intelligence and use counter-intelligence to divert the enemy attention',
                  'Use terrain and line of sight to your advantage to create tactical opportunities',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#374151' }}>
                    <span style={{ color: '#d97706' }}>●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/apps/fourstargeneral" className={touchTargetClassName} style={{ marginTop: '1.4rem', color: '#b45309', fontWeight: 700, textDecoration: 'none' }}>
                See Four Star General →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MasterTyping feature section */}
      <section style={{ padding: '96px 0', background: 'white' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: `0 ${pageGutter}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('320px'), gap: '2rem', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Typing for real digital life
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: '#111827', margin: '0 0 1rem', lineHeight: 1.15 }}>
                MasterTyping is for anyone who wants to improve their typing skills and have fun doing it
              </h2>
              <p style={{ fontSize: '1.06rem', color: '#4b5563', lineHeight: 1.8, margin: '0 0 1rem' }}>
                Most typing apps get boring, fast. MasterTyping goes the other direction: characters, projectiles, powers, combo streaks, and a constant stream of words to blast before they hit you.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                Under the hood it is still useful practice, but on the surface it feels a lot more like an arcade challenge than a worksheet.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {[
                'Assessment and practice modes help you sharpen speed and accuracy',
                'Game mode lets you defeat words, collect coins, and unlock characters with their own powers and play styles',
                'Helps you sharpen your skills, speed up, and improve accuracy',
                'Difficulty levels and vocabulary tiers make this accessible to everyone while still challenging you to keep climbing',
              ].map((item) => (
                <div key={item} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '18px', padding: '1.2rem 1.25rem', color: '#166534' }}>
                  {item}
                </div>
              ))}
              <Link href="/apps/mastertyping" className={touchTargetClassName} style={{ marginTop: '0.4rem', color: '#059669', fontWeight: 700, textDecoration: 'none' }}>
                Start Playing →
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
          maxWidth: '800px', margin: '0 auto', padding: `0 ${pageGutter}`,
          textAlign: 'center', position: 'relative', zIndex: 1,
        }}>
          <p style={{ color: '#818cf8', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            The lineup
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: '900',
            color: 'white', marginBottom: '1.25rem', lineHeight: 1.2,
          }}>
            Build the world. Run the encounter. Win the battle.
          </h2>
          <p style={{
            fontSize: '1.125rem', color: '#94a3b8',
            marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 2.5rem',
          }}>
            If you like role playing games, tactical game play, and game systems that make sense, you are in the right place.
          </p>
          <div className={actionRowClassName} style={{ justifyContent: 'center' }}>
            <Link href="/start-here" className="cta-primary">
              Start Playing
            </Link>
            <Link href="/tools" className="cta-secondary">
              Explore the lineup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
