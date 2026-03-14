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

export default async function Home() {
  const apps = [
    {
      name: 'Virtual Combat Simulator',
      tagline: 'Map-first combat control',
      description:
        'Run D&D encounters with a map-first control room built around initiative, action economy, rules clarity, and shared table state.',
      href: '/apps/virtual-combat-simulator',
      color: 'from-red-500 to-orange-500',
      icon: '/icons/vcs.png',
    },
    {
      name: 'ContentCraft',
      tagline: 'Canon-safe creative workspace',
      description:
        'Build campaigns, novels, and settings with structured canon tracking and multi-stage AI workflows that stay grounded in your source of truth.',
      href: '/apps/contentcraft',
      color: 'from-purple-500 to-pink-500',
      icon: '/icons/contentcraft.png',
    },
    {
      name: 'MasterTyping',
      tagline: 'Typing practice that plays like a game',
      description:
        'Progressive lessons, six-step assessments, targeted exercises, and classroom-friendly tracking that make practice feel more like play than homework.',
      href: '/apps/mastertyping',
      color: 'from-green-500 to-emerald-500',
      icon: '/icons/mastertyping.png',
    },
    {
      name: 'Gravity',
      tagline: 'Simultaneous-turn sci-fi strategy',
      description:
        'Plan orders in parallel, lock the turn, and watch the whole board resolve at once in a tactics game built around power routing, crew roles, and escape pressure.',
      href: '/apps/gravity',
      color: 'from-blue-500 to-cyan-500',
      icon: '/icons/gravity.png',
    },
    {
      name: 'Four Star General',
      tagline: 'Deterministic WWII command',
      description:
        'Command a WWII tactical battle prototype built around deterministic resolution, deployment choices, supply tempo, and scenario-driven pressure.',
      href: '/apps/fourstargeneral',
      color: 'from-amber-500 to-yellow-500',
      icon: '/icons/fourstargeneral.png',
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
              Games and tools for people who take play seriously
            </h1>
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '2rem',
              fontWeight: '500',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              Run tighter sessions, build better worlds, and sink your teeth into strategy games built around clear systems, strong flavor, and smart decisions.
            </p>
            <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center'}}>
              <Link href="/pricing" className="hero-btn-primary">
                See Pricing
              </Link>
              <a href="#apps" className="hero-btn-secondary">
                Explore the Lineup
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
              Choose Your Arena
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#4a5568',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              From rules-faithful encounter control to canon-safe writing tools to simultaneous-turn strategy, every title is built to make play sharper, smoother, or deeper.
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
              Pick Your Path
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
              Whether you run the table, build the world, command the board, or teach through play, there is a strong starting point here.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                title: 'Run the Table',
                desc: 'Keep combat moving, prep faster, and stay on top of maps, initiative, and lore without breaking the session rhythm.',
                apps: ['Virtual Combat Simulator', 'ContentCraft'],
                gradient: 'linear-gradient(135deg, #fef2f2, #fff7ed)',
                accent: '#dc2626',
              },
              {
                title: 'Build the World',
                desc: 'Write with a real source of truth. Track canon, relationships, timelines, and revisions so the project stays coherent as it grows.',
                apps: ['ContentCraft'],
                gradient: 'linear-gradient(135deg, #f5f3ff, #fdf2f8)',
                accent: '#7c3aed',
              },
              {
                title: 'Command the Board',
                desc: 'Play strategy games built around deterministic outcomes, simultaneous planning, supply pressure, and hard tradeoffs instead of busywork.',
                apps: ['Gravity', 'Four Star General'],
                gradient: 'linear-gradient(135deg, #eff6ff, #ecfeff)',
                accent: '#2563eb',
              },
              {
                title: 'Learn Through Play',
                desc: 'Give kids typing practice with game modes, six-step assessments, targeted exercises, and progress tracking that feels worth coming back to.',
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
              { value: '5', label: 'Titles', sub: 'Covering GM tools, worldbuilding, strategy, and learning' },
              { value: '2', label: 'Ways to Start', sub: 'Subscribe for creator tools or jump into free core games' },
              { value: '24/7', label: 'Access', sub: 'Prep, write, practice, or plan your next turn whenever you have time' },
              { value: '0', label: 'Lock-In', sub: 'Stay because the lineup earns it' },
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
              WHERE TO START
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: '#111827', lineHeight: 1.2 }}>
              The lineup at a glance
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
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '1rem 0 0.75rem' }}>Virtual Combat Simulator</h3>
              <p style={{ color: '#a8a29e', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                A map-first combat control room for D&D 5e play, with initiative, action economy, rules checks, and table sync that keep fights clean and readable.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
                {['5e 2024 defaults and combat flow', 'Grid-aware map, tokens, and positioning', 'Audit-ready combat log and rules checks', 'Players join free with shared state'].map(f => (
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
                Canon-Safe Writing
              </span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '1rem 0 0.75rem' }}>ContentCraft</h3>
              <p style={{ color: '#a5b4fc', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                A connected creative workspace for campaigns, novels, and setting work, with canon-aware AI, approvals, and versioned project memory.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
                {['Projects and shared canon library', 'Stage-based AI generation workflows', 'Fact-checking, history, and diffs', 'Bring your own model keys or use credits'].map(f => (
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
                  <p style={{ color: '#6b7280', fontSize: '0.8125rem', margin: 0 }}>Simultaneous-turn sci-fi strategy</p>
                </div>
              </div>
              <p style={{ color: '#4b5563', fontSize: '0.9375rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                Route power, repair hulls, plan crew actions, and lock orders before the entire turn resolves at once. It is a tactics game with real system pressure.
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
                  <Image src="/icons/fourstargeneral.png" alt="Four Star General" width={48} height={48} style={{ objectFit: 'cover', transform: 'scale(1.08)' }} /></div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', margin: 0 }}>Four Star General</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.8125rem', margin: 0 }}>Deterministic WWII tactics</p>
                </div>
              </div>
              <p style={{ color: '#4b5563', fontSize: '0.9375rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                A WWII tactical battle prototype built around deterministic resolution, deployment choices, supply tempo, and authored scenarios like River Crossing Watch.
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
                Game mode, pro mode, a six-step assessment, targeted exercises, and core tracking in one free typing adventure, with deeper analytics available when players need sharper feedback.
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
                Playbooks, design notes, and campaign fuel
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
            {(await getRecentPosts(3)).map(post => {
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
            YOUR STARTING POINT
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: '900',
            color: 'white', marginBottom: '1.25rem', lineHeight: 1.2,
          }}>
            Find your lane
          </h2>
          <p style={{
            fontSize: '1.125rem', color: '#94a3b8',
            marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 2.5rem',
          }}>
            Start with the tool or game that matches how you play: run sessions, build worlds, command the board, or learn through play.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/pricing" className="cta-primary">
              See Pricing & Paths
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
