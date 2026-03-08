/**
 * ContentCraft - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Link from 'next/link';
import ModernBackground from '@/components/ModernBackground';
import SubscribeButton from '@/components/SubscribeButton';

export default function ContentCraftPage() {
  const coreFeatures = [
    {
      title: 'AI Writing Assistant',
      description: 'Work with OpenAI, Anthropic Claude, or Google Gemini to draft, revise, brainstorm, refine, and expand with your project context in view.',
    },
    {
      title: 'Lore & Continuity Tracking',
      description: 'Track characters, locations, items, factions, timelines, and relationships across your work.',
    },
    {
      title: 'Structured Project Space',
      description: 'Keep chapters, scenes, notes, research, story elements, and world details organized in one connected studio.',
    },
    {
      title: 'Safe Revision Workflows',
      description: 'Compare edits, revisit earlier drafts, and restore previous versions with confidence.',
    },
    {
      title: 'Relationship Tracking',
      description: 'See how people, places, groups, and plot threads connect across the world of your project.',
    },
    {
      title: 'Flexible Export Options',
      description: 'Export your work in standard formats and fit ContentCraft into the creative process you already use.',
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
                AI-WRITING STUDIO
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                A Connected Creative Studio
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                ContentCraft brings writing, lore, continuity, and AI together in one place—so your novel, screenplay, or campaign world stays organized, consistent, and alive as it grows.
              </p>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
                <SubscribeButton
                  planId="contentcraft"
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
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Start Your Free Trial
                </SubscribeButton>
                <Link href="/pricing" style={{
                  background: 'rgba(255, 255, 255, 0.16)',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-block',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}>
                  See Creator Plan
                </Link>
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
                For projects that outgrow documents, folders, and stateless AI
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>A serious writing space for serious projects</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>AI guided by your project’s lore and structure</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Lore and continuity tracking across your project</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Revision history that protects the work as it evolves</span>
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
              Built for work that needs memory, structure, and continuity
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', maxWidth: '900px', margin: '0 auto'}}>
              Most writing tools handle structure well but know nothing about the world behind the work. Most AI tools generate quickly but lose track of the details that matter. ContentCraft brings those two strengths together, so your project stays organized and your AI-assisted writing stays grounded in the world you are building.
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
              Why ContentCraft Works
            </h3>
            <ul style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0, margin: 0}}>
              {[
                'A serious writing space for serious projects',
                'AI that works within the world you are building',
                'Lore and continuity tracking across your project',
                'Revision history that protects the work as it evolves'
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
              Professional Creative Features
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              Everything you need to write, refine, expand, and manage ambitious narrative work
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
                FOR NOVELISTS, SCREENWRITERS, AND WORLDBUILDERS
              </div>
              <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
                Designed for Expanding Story Worlds
              </h2>
              <p style={{fontSize: '1.1rem', color: '#6b7280', marginBottom: '1.25rem', lineHeight: 1.7}}>
                ContentCraft is designed for creators working on projects with depth: novels, series, scripts, settings, and story worlds that grow more complex over time.
              </p>
              <p style={{fontSize: '1.05rem', color: '#6b7280', marginBottom: '1.5rem', lineHeight: 1.7}}>
                Instead of scattering your manuscript, notes, world lore, and revisions across disconnected tools, you can keep everything in one place and work with AI that stays grounded in the project itself.
              </p>
              <div style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.875rem'}}>Use ContentCraft to:</div>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '0.875rem', padding: 0, margin: 0, listStyle: 'none'}}>
                {[
                  'manage long-form manuscripts and multi-book series',
                  'maintain story bibles and world lore',
                  'track character arcs, locations, items, and timelines',
                  'Helps keep project details consistent as your world grows',
                  'brainstorm and revise with more project context in view'
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
                Whether you are writing a standalone novel or building a world across multiple books, ContentCraft helps you protect continuity without slowing down the creative process.
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
                Built for Campaign Worlds
              </h2>
              <p style={{fontSize: '1.1rem', color: '#6b7280', marginBottom: '1.25rem', lineHeight: 1.7}}>
                ContentCraft is also built for game masters running deep campaigns, layered settings, and evolving casts of characters. It helps you keep campaign lore coherent while creating new material faster.
              </p>
              <p style={{fontSize: '1.05rem', color: '#6b7280', marginBottom: '1.5rem', lineHeight: 1.7}}>
                From NPCs and factions to encounter ideas and world events, ContentCraft gives you a connected place to build your setting and generate game-ready material without losing track of what is already true in your world.
              </p>
              <div style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.875rem'}}>Use ContentCraft to:</div>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '0.875rem', padding: 0, margin: 0, listStyle: 'none'}}>
                {[
                  'track NPCs, factions, locations, items, and secrets',
                  'generate stat blocks and campaign content faster',
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
              D&D 5e Support That Actually Fits Campaign Prep
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', maxWidth: '900px', margin: '0 auto'}}>
              The more your campaign grows, the more valuable connected memory becomes. ContentCraft helps you prep faster without losing continuity.
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
              From First Idea to Finished Draft, Lore Entry, or Stat Block
            </h3>
            <p style={{fontSize: '1.125rem', color: '#4b5563', textAlign: 'center', marginBottom: '1rem'}}>Creative momentum matters. So does continuity.</p>
            <p style={{fontSize: '1rem', color: '#6b7280', textAlign: 'center', maxWidth: '920px', margin: '0 auto 1rem', lineHeight: 1.8}}>
              Without a connected system, it is easy to lose time moving between notes, research, drafts, rules references, and disconnected AI chats. ContentCraft brings those pieces together, so you can move from idea to usable output with far less friction.
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
              Why Creators Choose ContentCraft
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
                  <span style={{color: '#4b5563'}}>A creative studio built for complex projects</span>
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
                  <span style={{color: '#4b5563'}}>Cloud access, version history, and connected project memory</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>A modern experience built for today’s creators</span>
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
                For projects that need depth
              </h3>
              <p style={{color: '#6b7280', lineHeight: 1.8, margin: 0}}>
                ContentCraft is a creative studio for novelists, screenwriters, game masters, and worldbuilders who need more than a blank page. Bring writing, lore, continuity, and AI together in one place without giving up creative control.
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
            Write With More Control. Build With More Depth.
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Start with a 14-day free trial, then upgrade to Creator when you want unlimited projects, full lore tools, and deeper AI-assisted creation.
          </p>
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
            Start Your Free Trial
          </SubscribeButton>
        </div>
      </section>
    </div>
  );
}
