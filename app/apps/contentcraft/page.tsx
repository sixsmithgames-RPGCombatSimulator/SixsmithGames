/**
 * ContentCraft - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Link from 'next/link';
import ModernBackground from '@/components/ModernBackground';
import SubscribeButton from '@/components/SubscribeButton';
import LaunchAppButton from '@/components/LaunchAppButton';

export default function ContentCraftPage() {
  const coreFeatures = [
    {
      title: 'AI-Powered Writing Assistant',
      description: 'Work with OpenAI, Anthropic Claude, or Google Gemini to generate, edit, and enhance your content.',
    },
    {
      title: 'Canon Management & Consistency',
      description: 'Automatically track characters, locations, items, and relationships across your entire work.',
    },
    {
      title: 'Smart Organization',
      description: 'Hierarchical project structure keeps chapters, scenes, characters, and research organized.',
    },
    {
      title: 'Version History & Rollback',
      description: 'See every edit, compare versions, and roll back changes with full revision history.',
    },
    {
      title: 'Relationship Mapping',
      description: 'Visualize and manage connections between characters, locations, and plot elements.',
    },
    {
      title: 'Export & Integration',
      description: 'Export to standard formats or integrate with your existing writing workflow.',
    },
  ];

  const dndFeatures = [
    {
      title: 'Complete D&D 5e Stat Blocks',
      description: 'Generate balanced NPCs, monsters, and encounters with proper formatting.',
      icon: '⚔️',
    },
    {
      title: 'Campaign Canon Tracking',
      description: 'Never contradict yourself—track every NPC, location, item, and event automatically.',
      icon: '📚',
    },
    {
      title: 'NPC Relationship Networks',
      description: 'Characters automatically know each other and form living social networks.',
      icon: '🕸️',
    },
    {
      title: 'Encounter Building',
      description: 'AI-generated encounters balanced for your party level and composition.',
      icon: '🎲',
    },
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
                ✨ AI-POWERED WRITING PLATFORM
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                Your Writing Studio. Powered by AI.
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                ContentCraft is the intelligent writing platform for novelists, screenwriters, and worldbuilders.
                Organize your work, maintain consistency, and harness AI without losing your creative vision.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <LaunchAppButton
                  appSlug="contentcraft"
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
                    maxWidth: '250px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Launch App →
                </LaunchAppButton>
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
                Like Scrivener. But Smarter.
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Organize novels, scripts, and complex worldbuilding projects</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>AI integration that remembers your characters and world</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Automatic consistency checking across your entire work</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Version history and change tracking built-in</span>
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
              Writing Tools Are Broken. We Fixed Them.
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', maxWidth: '900px', margin: '0 auto'}}>
              Traditional writing software ignores AI. AI tools forget everything between sessions. You need both—
              organized project management AND intelligent content generation that actually remembers your world.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #faf5ff 0%, #fce7f3 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '2px solid #e9d5ff'
            }}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '1.5rem'}}>
                The Old Way: Scrivener
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div>
                  <p style={{fontSize: '0.875rem', fontWeight: '600', color: '#059669', marginBottom: '0.25rem'}}>
                    Great at:
                  </p>
                  <p style={{color: '#4b5563'}}>Organization, structure, and project management</p>
                </div>
                <div>
                  <p style={{fontSize: '0.875rem', fontWeight: '600', color: '#dc2626', marginBottom: '0.25rem'}}>
                    Missing:
                  </p>
                  <p style={{color: '#4b5563'}}>No AI integration. No consistency checking. No automatic canon tracking.</p>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #faf5ff 0%, #fce7f3 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '2px solid #e9d5ff'
            }}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '1.5rem'}}>
                The New Way: ChatGPT
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div>
                  <p style={{fontSize: '0.875rem', fontWeight: '600', color: '#059669', marginBottom: '0.25rem'}}>
                    Great at:
                  </p>
                  <p style={{color: '#4b5563'}}>Generating content quickly with AI assistance</p>
                </div>
                <div>
                  <p style={{fontSize: '0.875rem', fontWeight: '600', color: '#dc2626', marginBottom: '0.25rem'}}>
                    Missing:
                  </p>
                  <p style={{color: '#4b5563'}}>No memory. No organization. Contradicts itself constantly.</p>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '2px solid #a855f7',
              color: 'white'
            }}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem'}}>
                ContentCraft: Both
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div>
                  <p style={{fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem'}}>
                    You get:
                  </p>
                  <p style={{color: 'rgba(255, 255, 255, 0.95)'}}>
                    Scrivener's organization + AI that remembers your entire world + automatic consistency checking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Professional Writing Features
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              Everything you need to write novels, screenplays, and complex narrative works
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
              🎲 GAME MASTERS SPECIAL
            </div>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              The D&D Differentiator
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', maxWidth: '900px', margin: '0 auto'}}>
              ContentCraft is the only writing platform with native D&D 5e integration. Generate complete stat blocks,
              balanced encounters, and campaign content—all while maintaining perfect consistency with your world.
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
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{feature.icon}</div>
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
              From Idea to Stat Block in 60 Seconds
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem'}}>
              <div style={{background: '#faf5ff', padding: '1.5rem', borderRadius: '10px', borderLeft: '4px solid #a855f7'}}>
                <p style={{fontWeight: '600', color: '#6b21a8', marginBottom: '0.5rem'}}>Traditional Method:</p>
                <p style={{fontSize: '0.875rem', color: '#4b5563'}}>
                  45 minutes: ChatGPT generation → copy/paste → format → balance → cross-reference wiki → fix contradictions
                </p>
              </div>
              <div style={{background: '#f0fdf4', padding: '1.5rem', borderRadius: '10px', borderLeft: '4px solid #22c55e'}}>
                <p style={{fontWeight: '600', color: '#166534', marginBottom: '0.5rem'}}>ContentCraft:</p>
                <p style={{fontSize: '0.875rem', color: '#4b5563'}}>
                  1 minute: Describe what you need → complete CR-appropriate stat block, properly formatted, canon-consistent, ready to use
                </p>
              </div>
            </div>
            <p style={{textAlign: 'center', fontSize: '1.5rem', fontWeight: '700', color: '#a855f7', marginTop: '2rem'}}>
              Save 75% of prep time. Never contradict yourself again.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Built For Creators
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
                Perfect For:
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Novelists writing complex multi-book series</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Screenwriters managing scripts and worldbuilding</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Game masters running long-term campaigns</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Worldbuilders creating detailed fictional universes</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#a855f7', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Content creators who need AI that remembers context</span>
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
                Why Switch from Scrivener:
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#ec4899', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>AI integration that actually understands your project</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#ec4899', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Automatic consistency checking catches contradictions</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#ec4899', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Cloud-based: access from anywhere, automatic backups</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#ec4899', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Living canon database that grows with your work</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#ec4899', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Modern interface designed for 2025, not 2005</span>
                </li>
              </ul>
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
            Write Smarter. Create Faster. Stay Consistent.
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Join novelists, screenwriters, and game masters who've transformed their creative workflow.
          </p>
          <SubscribeButton style={{
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
            Start Creating with ContentCraft
          </SubscribeButton>
        </div>
      </section>
    </div>
  );
}
