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
import { getRecentPosts } from '@/lib/blog';

export default function Home() {
  const apps = [
    {
      name: 'VirtualCombatSimulator',
      tagline: 'Your D&D combat control room',
      description:
        'A modern battle management system combining responsive virtual tabletop, initiative tracking, and real-time multiplayer for faster, clearer D&D combats.',
      href: '/apps/virtual-combat-simulator',
      color: 'from-red-500 to-orange-500',
      icon: '/icons/vcs.png',
    },
    {
      name: 'ContentCraft',
      tagline: 'Stop Fighting Your AI. Start Creating Your World.',
      description:
        'AI-powered content engine for game masters and authors. Generate D&D content that fits together, track canon automatically, and never contradict yourself again.',
      href: '/apps/contentcraft',
      color: 'from-purple-500 to-pink-500',
      icon: '/icons/contentcraft.png',
    },
    {
      name: 'MasterTyping',
      tagline: 'Turn typing practice into an epic adventure',
      description:
        'Game-based typing practice with 10 unique characters, special abilities, and K-12 vocabulary. Make learning keyboard skills exciting and engaging.',
      href: '/apps/mastertyping',
      color: 'from-green-500 to-emerald-500',
      icon: '/icons/mastertyping.png',
    },
    {
      name: 'Gravity',
      tagline: 'Strategy without scheduling',
      description:
        'Deep, tactical turn-based sci-fi board game built for asynchronous multiplayer. Play with friends on your own schedule—no coordination required.',
      href: '/apps/gravity',
      color: 'from-blue-500 to-cyan-500',
      icon: '/icons/gravity.png',
    },
    {
      name: 'FourStarGeneral',
      tagline: 'Command your forces in WWII',
      description:
        'Strategic and tactical turn-based war game set in the WWII era. Plan operations, manage resources, and outmaneuver your opponents.',
      href: '/apps/fourstargeneral',
      color: 'from-amber-500 to-yellow-500',
      icon: '/icons/fourstargeneral.png',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #dc143c 50%, #f59e0b 75%, #d4af37 100%)',
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
              For Game Masters & Creators
            </h1>
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '2rem',
              fontWeight: '500',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              Time to level up! Make your gaming and writing so much easier with our suite of fun and useful applications. From D&D battle
              management to AI-assisted content creation, we've got the tools you didn't know you needed.
            </p>
            <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center'}}>
              <Link href="/pricing" className="hero-btn-primary">
                Start Your Subscription
              </Link>
              <a href="#apps" className="hero-btn-secondary">
                Explore Our Apps
              </a>
            </div>
            <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'center'}}>
              <Image
                src="https://res.cloudinary.com/dxz6khmew/image/upload/f_auto,q_auto/sixsmith-games/sixsmith-games/logo/sixsmith-logo.png"
                alt="Sixsmith Games"
                width={200}
                height={200}
                style={{
                  filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.3))',
                  opacity: 1
                }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Apps Showcase */}
      <section id="apps" style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Our Applications
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#4a5568',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Professional solutions designed for game masters, content creators, and strategy enthusiasts
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {apps.map((app) => {
              const gradientMap: Record<string, string> = {
                'from-red-500 to-orange-500': 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                'from-purple-500 to-pink-500': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                'from-green-500 to-emerald-500': 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                'from-blue-500 to-cyan-500': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                'from-amber-500 to-yellow-500': 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)'
              };
              const gradient = gradientMap[app.color] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

              return (
                <Link
                  key={app.name}
                  href={app.href}
                  className="app-card"
                >
                  <div style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '20px',
                    marginBottom: '1.5rem',
                    boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
                    overflow: 'hidden',
                  }}>
                    <Image src={app.icon} alt={app.name} width={96} height={96} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: '#1a202c',
                    marginBottom: '0.75rem'
                  }}>
                    {app.name}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#6b7280',
                    marginBottom: '1rem'
                  }}>
                    {app.tagline}
                  </p>
                  <p style={{
                    fontSize: '1rem',
                    color: '#4b5563',
                    lineHeight: '1.7',
                    marginBottom: '1.5rem'
                  }}>
                    {app.description}
                  </p>
                  <div style={{
                    color: '#3b82f6',
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}>
                    Learn more →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audience Personas */}
      <section style={{ padding: '100px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#6366f1', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              WHO IT&apos;S FOR
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: '#111827', marginBottom: '1rem', lineHeight: 1.2 }}>
              Built for Every Kind of Creator
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
              Whether you run campaigns, write fiction, play strategy games, or teach kids — we made something for you.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                title: 'Dungeon Masters',
                desc: 'Run faster, clearer combats. Track initiative, manage the battlefield, and generate lore that fits your world — all without breaking flow.',
                apps: ['VirtualCombatSimulator', 'ContentCraft'],
                gradient: 'linear-gradient(135deg, #fef2f2, #fff7ed)',
                accent: '#dc2626',
              },
              {
                title: 'Fantasy & Sci-Fi Writers',
                desc: 'Build deep, consistent worlds with AI that remembers your canon. Generate characters, locations, and lore that never contradict your story.',
                apps: ['ContentCraft'],
                gradient: 'linear-gradient(135deg, #f5f3ff, #fdf2f8)',
                accent: '#7c3aed',
              },
              {
                title: 'Strategy Gamers',
                desc: 'Command fleets in space or armies in WWII. Deep tactical gameplay designed for async multiplayer — play on your own schedule.',
                apps: ['Gravity', 'Four Star General'],
                gradient: 'linear-gradient(135deg, #eff6ff, #ecfeff)',
                accent: '#2563eb',
              },
              {
                title: 'Parents & Educators',
                desc: 'Turn typing practice into an adventure. Game-based learning with real K-12 vocabulary, character abilities, and progress tracking.',
                apps: ['MasterTyping'],
                gradient: 'linear-gradient(135deg, #ecfdf5, #f0fdf4)',
                accent: '#059669',
              },
            ].map((persona) => (
              <div key={persona.title} style={{
                background: persona.gradient,
                borderRadius: '20px',
                padding: '2.25rem',
                border: '1px solid rgba(0,0,0,0.04)',
                transition: 'transform 0.2s',
              }}>
                <h3 style={{ fontSize: '1.375rem', fontWeight: '800', color: '#111827', marginBottom: '0.75rem' }}>
                  {persona.title}
                </h3>
                <p style={{ color: '#4b5563', fontSize: '0.9375rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                  {persona.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {persona.apps.map(app => (
                    <span key={app} style={{
                      background: 'rgba(255,255,255,0.8)',
                      color: persona.accent,
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      padding: '0.25rem 0.625rem',
                      borderRadius: '999px',
                      border: `1px solid ${persona.accent}22`,
                    }}>
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section style={{
        padding: '60px 0',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}>
            {[
              { value: '5', label: 'Applications', sub: 'Covering RPGs, writing, strategy & education' },
              { value: '1', label: 'Subscription', sub: 'All-access or subscribe per app' },
              { value: '24/7', label: 'Cloud Access', sub: 'Play and create from any device' },
              { value: '0', label: 'Long-Term Contracts', sub: 'Cancel anytime, no lock-in' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#818cf8', lineHeight: 1, marginBottom: '0.5rem' }}>
                  {stat.value}
                </div>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>
                  {stat.label}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.8125rem', lineHeight: 1.5 }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Deep Dives */}
      <section style={{ padding: '100px 0', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#6366f1', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              WHAT YOU GET
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: '#111827', lineHeight: 1.2 }}>
              Tools That Actually Solve Your Problems
            </h2>
          </div>

          {/* VCS + ContentCraft spotlight */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '2rem', marginBottom: '2rem',
          }}>
            <div style={{
              background: 'linear-gradient(160deg, #1c1917, #292524)', borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)', color: 'white', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '160px', height: '160px', opacity: 0.07, overflow: 'hidden', borderRadius: '24px' }}>
                <Image src="/icons/vcs.png" alt="" width={160} height={160} style={{ objectFit: 'cover' }} />
              </div>
              <span style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700' }}>
                D&D Combat
              </span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '1rem 0 0.75rem' }}>VirtualCombatSimulator</h3>
              <p style={{ color: '#a8a29e', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Drag-and-drop initiative. Real-time tabletop. Fog of war. Everything you need to run combat without the bookkeeping killing your momentum.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
                {['Real-time multiplayer battle rooms', 'Drag-and-drop initiative tracker', 'Character sheets & ruleset editor', 'Responsive virtual tabletop'].map(f => (
                  <li key={f} style={{ color: '#d6d3d1', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#f87171', fontSize: '0.75rem' }}>●</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/apps/virtual-combat-simulator" style={{
                display: 'inline-block', marginTop: '1.5rem', color: '#fca5a5',
                fontWeight: '700', fontSize: '0.9375rem', textDecoration: 'none',
              }}>
                Learn more →
              </Link>
            </div>

            <div style={{
              background: 'linear-gradient(160deg, #1e1b4b, #312e81)', borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)', color: 'white', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '160px', height: '160px', opacity: 0.07, overflow: 'hidden', borderRadius: '24px' }}>
                <Image src="/icons/contentcraft.png" alt="" width={160} height={160} style={{ objectFit: 'cover' }} />
              </div>
              <span style={{ background: 'rgba(168,85,247,0.15)', color: '#c4b5fd', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700' }}>
                AI Worldbuilding
              </span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '1rem 0 0.75rem' }}>ContentCraft</h3>
              <p style={{ color: '#a5b4fc', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                AI that remembers your world. Generate NPCs, locations, encounters, and lore that never contradict your established canon.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
                {['Canon-aware AI generation', 'Lore & NPC consistency tracking', 'World maps & faction management', 'Export-ready for your campaign'].map(f => (
                  <li key={f} style={{ color: '#c7d2fe', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#a78bfa', fontSize: '0.75rem' }}>●</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/apps/contentcraft" style={{
                display: 'inline-block', marginTop: '1.5rem', color: '#c4b5fd',
                fontWeight: '700', fontSize: '0.9375rem', textDecoration: 'none',
              }}>
                Learn more →
              </Link>
            </div>
          </div>

          {/* Gravity + FSG + MasterTyping row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '1.5rem',
          }}>
            <div style={{
              background: 'white', borderRadius: '20px', padding: '2rem',
              border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  overflow: 'hidden',
                }}>
                  <Image src="/icons/gravity.png" alt="Gravity" width={48} height={48} style={{ objectFit: 'cover' }} /></div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', margin: 0 }}>Gravity</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.8125rem', margin: 0 }}>Async sci-fi strategy</p>
                </div>
              </div>
              <p style={{ color: '#4b5563', fontSize: '0.9375rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                Deep, tactical turn-based board game. Command fleets, manage resources, and outmaneuver opponents — all on your own schedule. No coordination required.
              </p>
              <Link href="/apps/gravity" style={{ color: '#3b82f6', fontWeight: '700', fontSize: '0.875rem', textDecoration: 'none' }}>
                Learn more →
              </Link>
            </div>

            <div style={{
              background: 'white', borderRadius: '20px', padding: '2rem',
              border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f59e0b, #eab308)',
                  overflow: 'hidden',
                }}>
                  <Image src="/icons/fourstargeneral.png" alt="Four Star General" width={48} height={48} style={{ objectFit: 'cover' }} /></div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', margin: 0 }}>Four Star General</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.8125rem', margin: 0 }}>WWII war simulation</p>
                </div>
              </div>
              <p style={{ color: '#4b5563', fontSize: '0.9375rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                Strategic and tactical turn-based gameplay set in the WWII era. Plan operations, manage your general roster, and fight through campaigns that test every decision.
              </p>
              <Link href="/apps/fourstargeneral" style={{ color: '#d97706', fontWeight: '700', fontSize: '0.875rem', textDecoration: 'none' }}>
                Learn more →
              </Link>
            </div>

            <div style={{
              background: 'white', borderRadius: '20px', padding: '2rem',
              border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #22c55e, #10b981)',
                  overflow: 'hidden',
                }}>
                  <Image src="/icons/mastertyping.png" alt="MasterTyping" width={48} height={48} style={{ objectFit: 'cover' }} /></div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', margin: 0 }}>MasterTyping</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.8125rem', margin: 0 }}>Game-based typing</p>
                </div>
              </div>
              <p style={{ color: '#4b5563', fontSize: '0.9375rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                10 unique characters with special abilities. K-12 vocabulary. Typing practice that kids actually ask to do again — because it feels like a real game.
              </p>
              <Link href="/apps/mastertyping" style={{ color: '#059669', fontWeight: '700', fontSize: '0.875rem', textDecoration: 'none' }}>
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section style={{ padding: '100px 0', background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ color: '#6366f1', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                FROM THE BLOG
              </p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '900', color: '#111827', margin: 0, lineHeight: 1.2 }}>
                Guides & Inspiration
              </h2>
            </div>
            <Link href="/blog" style={{
              color: '#6366f1', fontWeight: '700', fontSize: '0.9375rem',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            }}>
              View all articles →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '1.5rem',
          }}>
            {getRecentPosts(3).map(post => {
              const catColors: Record<string, { bg: string; text: string }> = {
                'D&D': { bg: '#fef2f2', text: '#dc2626' },
                'Writing': { bg: '#f5f3ff', text: '#7c3aed' },
                'Gaming': { bg: '#eff6ff', text: '#2563eb' },
                'Education': { bg: '#ecfdf5', text: '#059669' },
              };
              const cat = catColors[post.category] || { bg: '#f3f4f6', text: '#374151' };
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{
                  background: '#fafafa', borderRadius: '16px', padding: '2rem',
                  textDecoration: 'none', color: 'inherit',
                  border: '1px solid #f0f0f0',
                  display: 'flex', flexDirection: 'column', gap: '0.75rem',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <span style={{
                      background: cat.bg, color: cat.text,
                      padding: '0.2rem 0.625rem', borderRadius: '999px',
                      fontSize: '0.6875rem', fontWeight: '700',
                    }}>{post.category}</span>
                    <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '800', color: '#111827', lineHeight: 1.35, margin: 0 }}>
                    {post.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.65, margin: 0, flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <span style={{ color: '#6366f1', fontWeight: '700', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                    Read article →
                  </span>
                </Link>
              );
            })}
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
            READY TO START?
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: '900',
            color: 'white', marginBottom: '1.25rem', lineHeight: 1.2,
          }}>
            Your Next Campaign Starts Here
          </h2>
          <p style={{
            fontSize: '1.125rem', color: '#94a3b8',
            marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 2.5rem',
          }}>
            Join dungeon masters, fantasy writers, strategy gamers, and educators using Sixsmith Games to level up their craft.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/pricing" className="cta-primary">
              View Pricing & Subscribe
            </Link>
            <Link href="/blog" className="cta-secondary">
              Read the Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
