/**
 * ContentCraft - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import ModernBackground from '@/components/ModernBackground';
import SubscribeButton from '@/components/SubscribeButton';
import { formatMonthlyPrice, pricingCatalog } from '@/lib/pricingCatalog';

export default function ContentCraftPage() {
  const contentCraftPlan = pricingCatalog.contentcraft;
  const coreFeatures = [
    {
      title: 'Stage-Based AI Workflows',
      description: 'Move from outline to draft to edit with review points between each step instead of dumping everything into one blind prompt.',
    },
    {
      title: 'Canon & Continuity Tracking',
      description: 'Track characters, locations, items, factions, timelines, and references so the project stays internally consistent.',
    },
    {
      title: 'Projects & Shared Library',
      description: 'Keep campaigns, articles, supplements, chapters, and setting material connected to one shared source of truth.',
    },
    {
      title: 'Fact-Check & Review',
      description: 'Schema checks and review steps help catch contradictions before new material becomes part of the library.',
    },
    {
      title: 'Relationship Mapping',
      description: 'See how people, places, groups, and plot threads connect across the world of your project.',
    },
    {
      title: 'Versioned Export Workflows',
      description: 'Export structured outputs for tables, drafts, and print-friendly use without losing version history and diffs.',
    },
  ];

  const DndIcon = ({ type }: { type: string }) => {
    const s = { width: '40px', height: '40px', color: '#a855f7' };
    if (type === 'sword') return <svg style={s} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14.121 14.121L19 19m-7-7l7-7-7 7zm-5.657 5.657l-1.414-1.414M6.343 6.343L4.929 4.929M19 5l-7 7M5 19l7-7" /></svg>;
    if (type === 'book') return <svg style={s} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    if (type === 'network') return <svg style={s} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    return <svg style={s} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
  };

  const dndFeatures = [
    { title: 'Complete Stat Blocks', description: 'Generate NPCs, monsters, and encounter-ready content with clean, usable structure.', iconType: 'sword' },
    { title: 'Campaign Lore Tracking', description: 'Keep track of who matters, what happened, where it happened, and what the players still do not know.', iconType: 'book' },
    { title: 'Relationship Networks', description: 'See alliances, rivalries, loyalties, betrayals, and social connections across your setting.', iconType: 'network' },
    { title: 'Encounter Building', description: 'Generate encounters shaped by party level, campaign tone, and the needs of the moment.', iconType: 'encounter' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f43f5e 100%)',
        padding: '80px 0',
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
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 3}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center'}}>
            <div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                AI ASSISTED WORKSPACE
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                A source of truth for growing worlds
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                ContentCraft keeps campaigns, novels, and connected settings coherent while you write, prep, and publish, with staged AI workflows that stay grounded in your canon.
              </p>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
                <SubscribeButton
                  planId="contentcraft"
                  signInLabel="Sign in to continue"
                  style={{
                    background: 'white',
                    color: '#a855f7',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'inline-block',
                    textAlign: 'center',
                    border: 'none',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  Subscribe
                </SubscribeButton>
              </div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '30px',
              padding: '2.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              border: '2px solid rgba(168, 85, 247, 0.2)'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                For projects that outgrow docs, folders, and disconnected AI chats
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Projects and a shared canon library in one workspace</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Multi-stage AI workflows with review and approvals</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Canon, references, timelines, and relationships stay linked</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Version history, diffs, and export-ready outputs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Built for work that needs memory, structure, and a real source of truth
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', maxWidth: '900px', margin: '0 auto'}}>
              Most writing tools keep files organized but know nothing about the world behind the work. Most AI tools generate fast but forget the details that matter. ContentCraft connects structure, canon, and staged generation so the project stays coherent as it grows.
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #faf5ff 0%, #fce7f3 100%)',
            borderRadius: '24px',
            padding: '3rem',
            border: '2px solid #e9d5ff',
            maxWidth: '980px',
            margin: '0 auto'
          }}>
            <h3 style={{fontSize: '1.5rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem', textAlign: 'center'}}>
              Why ContentCraft holds together under pressure
            </h3>
            <ul style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0, margin: 0}}>
              {[
                'Projects, library, and canon live in one place',
                'AI generation happens in stages you can review',
                'Relationships, timelines, and references stay connected',
                'History, diffs, and exports keep the work recoverable'
              ].map((item) => (
                <li key={item} style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#4b5563'}}>
                  <svg style={{width: '22px', height: '22px', color: '#a855f7', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Creative features for work with real continuity
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              Built for ambitious projects that need canon, workflows, and revision control instead of loose notes
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {coreFeatures.map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '15px',
                padding: '2rem',
                border: '2px solid #e9d5ff',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#a855f7';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(168, 85, 247, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e9d5ff';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <h3 style={{fontSize: '1.125rem', fontWeight: '700', color: '#1a202c', marginBottom: '0.5rem'}}>
                  {feature.title}
                </h3>
                <p style={{color: '#6b7280'}}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D&D Special Features Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
            alignItems: 'start'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              border: '1px solid #f3e8ff'
            }}>
              <div style={{fontSize: '0.85rem', fontWeight: '800', color: '#a855f7', letterSpacing: '0.08em', marginBottom: '1rem'}}>
                FOR NOVELISTS, AUTHORS, AND WORLDBUILDERS
              </div>
              <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
                Designed for expanding story worlds
              </h2>
              <p style={{fontSize: '1.1rem', color: '#6b7280', marginBottom: '1.25rem', lineHeight: 1.7}}>
                ContentCraft is designed for creators working on projects with depth: novels, series, scripts, settings, and story worlds that grow more complex over time.
              </p>
              <p style={{fontSize: '1.05rem', color: '#6b7280', marginBottom: '1.5rem', lineHeight: 1.7}}>
                Instead of scattering your manuscript, notes, lore, and revisions across disconnected tools, you can keep the work in one place and generate against the project itself.
              </p>
              <div style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.875rem'}}>Use ContentCraft to:</div>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '0.875rem', padding: 0, margin: 0, listStyle: 'none'}}>
                {[
                  'manage long-form manuscripts and multi-book series',
                  'maintain story bibles, canon libraries, and lore references',
                  'track character arcs, locations, items, and timelines',
                  'fact-check new material against the project before it sticks',
                  'brainstorm, draft, and revise with more project context in view'
                ].map((item) => (
                  <li key={item} style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#4b5563'}}>
                    <svg style={{width: '20px', height: '20px', color: '#a855f7', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p style={{fontSize: '1rem', color: '#6b7280', margin: '1.5rem 0 0', lineHeight: 1.7}}>
                Whether you are writing a standalone novel or building a world across multiple books, ContentCraft helps you protect continuity without flattening the creative process.
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              border: '1px solid #f3e8ff'
            }}>
              <div style={{fontSize: '0.85rem', fontWeight: '800', color: '#a855f7', letterSpacing: '0.08em', marginBottom: '1rem'}}>
                FOR GAME MASTERS AND D&D WORLDBUILDERS
              </div>
              <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
                Built for campaign worlds
              </h2>
              <p style={{fontSize: '1.1rem', color: '#6b7280', marginBottom: '1.25rem', lineHeight: 1.7}}>
                ContentCraft is also built for GMs running deep campaigns, layered settings, and evolving casts. It helps you keep lore coherent while building new material faster.
              </p>
              <p style={{fontSize: '1.05rem', color: '#6b7280', marginBottom: '1.5rem', lineHeight: 1.7}}>
                From NPCs and factions to encounters and world events, ContentCraft gives you a connected place to build your setting and generate game-ready material without losing track of what is already true.
              </p>
              <div style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.875rem'}}>Use ContentCraft to:</div>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '0.875rem', padding: 0, margin: 0, listStyle: 'none'}}>
                {[
                  'track NPCs, factions, locations, items, and secrets',
                  'generate encounters, locations, items, and campaign content faster',
                  'maintain continuity across long-running campaigns',
                  'map character relationships and faction dynamics',
                  'build encounters shaped around your party and setting'
                ].map((item) => (
                  <li key={item} style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#4b5563'}}>
                    <svg style={{width: '20px', height: '20px', color: '#a855f7', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '50px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
                FOR GAME MASTERS AND D&D WORLDBUILDERS
            </div>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Campaign support that actually fits prep
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', maxWidth: '900px', margin: '0 auto'}}>
              The more your campaign grows, the more valuable connected memory becomes. ContentCraft helps you prep faster without letting the setting drift.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {dndFeatures.map((feature, index) => (
              <div key={index} style={{
                background: 'linear-gradient(135deg, #faf5ff 0%, #fce7f3 100%)',
                borderRadius: '20px',
                padding: '2.5rem',
                border: '2px solid #e9d5ff',
                textAlign: 'center'
              }}>
                <div style={{ marginBottom: '1rem' }}><DndIcon type={feature.iconType} /></div>
                <h3 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '0.75rem'}}>
                  {feature.title}
                </h3>
                <p style={{color: '#6b7280'}}>{feature.description}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #faf5ff 0%, #fce7f3 100%)',
            borderRadius: '20px',
            padding: '3rem',
            border: '2px solid #e9d5ff'
          }}>
            <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem', textAlign: 'center'}}>
              From first idea to finished draft, lore entry, or prep asset
            </h3>
            <p style={{fontSize: '1.125rem', color: '#4b5563', textAlign: 'center', marginBottom: '1rem'}}>Creative momentum matters. So does continuity.</p>
            <p style={{fontSize: '1rem', color: '#6b7280', textAlign: 'center', maxWidth: '920px', margin: '0 auto 1rem', lineHeight: 1.8}}>
              Without a connected system, it is easy to lose time moving between notes, research, drafts, rules references, and disconnected AI chats. ContentCraft brings those pieces together so you can move from idea to usable output with less friction and fewer contradictions.
            </p>
            <p style={{fontSize: '1rem', color: '#6b7280', textAlign: 'center', maxWidth: '920px', margin: '0 auto', lineHeight: 1.8}}>
              Whether you are revising a chapter, expanding a setting, outlining a faction, or building an encounter, the work stays connected to the larger world it belongs to.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Why creators stick with ContentCraft
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                Ideal for:
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>A workspace built for complex projects with continuity risk</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>AI that works with your world instead of outside it</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Continuity support for stories, settings, and campaigns</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Self-hosted access, version history, and connected project memory</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Predictable workflows for solo creators or shared teams</span>
                </li>
              </ul>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                For projects that need a dependable memory
              </h3>
              <p style={{color: '#6b7280', lineHeight: 1.8, margin: 0}}>
                ContentCraft is for novelists, writers, GMs, and worldbuilders who need more than a blank page and a chat box. Bring canon, workflows, revisions, and AI together in one place without giving up creative control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f43f5e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.1)'
        }} />
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            color: 'white',
            marginBottom: '1.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            Write with more control. Build with more depth.
          </h2>
              <p style={{
                fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2.5rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                ContentCraft is the premium subscription platform for bigger creative work. It includes built-in AI usage, and additional credits are available when heavier use makes sense.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <SubscribeButton planId="contentcraft" style={{
                  background: 'white',
                  color: '#a855f7',
                  padding: '1.25rem 3rem',
                  borderRadius: '50px',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  Subscribe
                </SubscribeButton>
              </div>
        </div>
      </section>
    </div>
  );
}
