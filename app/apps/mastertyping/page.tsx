/**
 * MasterTyping - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Link from 'next/link';
import ModernBackground from '@/components/ModernBackground';
import SubscribeButton from '@/components/SubscribeButton';

export default function MasterTypingPage() {
  const characters = [
    '🧙‍♂️ Wizard - Magic projectiles',
    '🦧 Ape - Banana slicks',
    '👵 Grandma - Yarn zones',
    '🦄 Unicorn - Rainbow bonuses',
    '🐲 Dragon - Fire zones',
    '🥷 Ninja - Vortex traps',
    '🤖 Robot - Magnetic clumps',
    '👨‍🍳 Chef - Food effects',
    '🧛 Vampire - Bat swarms',
    '👽 Alien - Abduction beams',
  ];

  const gameModes = [
    {
      name: 'Video Game Mode',
      description: 'Defeat words with projectiles, unlock characters, and collect coins',
      icon: '🎮',
    },
    {
      name: 'Pro Mode',
      description: 'Skill-focused practice with power-ups and strategic gameplay',
      icon: '🎯',
    },
    {
      name: 'Assessment Mode',
      description: 'Comprehensive typing evaluation with detailed metrics',
      icon: '📊',
    },
    {
      name: 'Practice Mode',
      description: 'Traditional typing practice with adjustable difficulty levels',
      icon: '📝',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #22c55e 0%, #10b981 50%, #14b8a6 100%)',
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
                ⌨️ GAME-BASED TYPING PRACTICE
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                Turn Typing Practice Into an Epic Adventure
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                MasterTyping combines game-based learning with educational vocabulary for typing practice that
                actually engages students. Choose your character, defeat incoming words, and master K-12 vocabulary
                while having fun.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <Link
                  href="/pricing"
                  style={{
                    background: 'white',
                    color: '#22c55e',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'inline-block',
                    textAlign: 'center',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    maxWidth: '200px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
                  }}
                >
                  Start Playing
                </Link>
              </div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '30px',
              padding: '2.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              border: '2px solid rgba(34, 197, 94, 0.2)'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                Why Kids Love MasterTyping
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Practice feels like playtime, not homework</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>10 unique characters with special abilities</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Build vocabulary AND typing skills simultaneously</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>One purchase, unlimited practice—no subscriptions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{maxWidth: '900px', margin: '0 auto', textAlign: 'center'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#1a202c',
              marginBottom: '1.5rem'
            }}>
              "My Child Hates Typing Practice"
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', marginBottom: '2rem'}}>
              Traditional typing programs are boring and repetitive. Kids resist practice time, progress stalls,
              and homework becomes a battle.
            </p>
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '2px solid #86efac'
            }}>
              <p style={{fontSize: '1.5rem', fontWeight: '700', color: '#166534', marginBottom: '1rem'}}>
                Finally, a typing program your kids will actually BEG to use.
              </p>
              <p style={{color: '#4b5563'}}>
                Turn practice time into game time with MasterTyping. Video game mode with wizards, dragons, unicorns,
                and special abilities makes kids ASK to practice instead of avoiding it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Multiple Game Modes for Every Learning Style
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {gameModes.map((mode, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                border: '2px solid #d1fae5'
              }}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{mode.icon}</div>
                <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#1a202c', marginBottom: '0.75rem'}}>
                  {mode.name}
                </h3>
                <p style={{color: '#4b5563'}}>{mode.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              10 Unique Characters with Special Abilities
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              Each character has unique powers that slow, stop, push, or control incoming words
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem'
          }}>
            {characters.map((character, index) => (
              <div
                key={index}
                style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  border: '2px solid #d1fae5',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#22c55e';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#d1fae5';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <p style={{color: '#1f2937', fontWeight: '500'}}>{character}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Features Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center'}}>
            <div>
              <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                Educational Content That Works
              </h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>13 Vocabulary Levels</h3>
                    <p style={{color: '#6b7280'}}>Kindergarten through Grade 12, with 200+ words per level</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Standards-Aligned Content</h3>
                    <p style={{color: '#6b7280'}}>Age-appropriate vocabulary complexity aligned with educational standards</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Progressive Difficulty</h3>
                    <p style={{color: '#6b7280'}}>5 difficulty levels from Super Easy to Impossible</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Real-Time Statistics</h3>
                    <p style={{color: '#6b7280'}}>Track WPM, accuracy, combo streaks, and progress</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '30px',
              padding: '2.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
              border: '2px solid #d1fae5'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                Perfect For:
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#4b5563'}}>
                <li>✓ Parents seeking engaging homework tools</li>
                <li>✓ K-12 Teachers needing classroom resources</li>
                <li>✓ Homeschool families</li>
                <li>✓ Adult learners improving professional skills</li>
                <li>✓ ESL/Language learners building vocabulary</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '900px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Stop Paying Monthly for Typing Practice
            </h2>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
            borderRadius: '20px',
            padding: '3rem',
            border: '2px solid #86efac'
          }}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center'}}>
              <div>
                <p style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Typical Typing Apps</p>
                <p style={{fontSize: '3rem', fontWeight: '900', color: '#dc2626', marginBottom: '0.5rem'}}>$10-30</p>
                <p style={{fontSize: '0.875rem', color: '#6b7280'}}>per month, per user</p>
                <p style={{fontSize: '1.5rem', fontWeight: '700', color: '#1a202c', marginTop: '1rem'}}>$100+/year</p>
              </div>
              <div>
                <p style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>MasterTyping</p>
                <p style={{fontSize: '3rem', fontWeight: '900', color: '#22c55e', marginBottom: '0.5rem'}}>Included</p>
                <p style={{fontSize: '0.875rem', color: '#6b7280'}}>in subscription</p>
                <p style={{fontSize: '1.5rem', fontWeight: '700', color: '#1a202c', marginTop: '1rem'}}>+ 4 More Apps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #22c55e 0%, #10b981 50%, #14b8a6 100%)',
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
            Turn Practice Time Into Game Time
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Join families and teachers who've made typing practice fun with MasterTyping.
          </p>
          <SubscribeButton style={{
            background: 'white',
            color: '#22c55e',
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
            Start Learning Today
          </SubscribeButton>
        </div>
      </section>
    </div>
  );
}
