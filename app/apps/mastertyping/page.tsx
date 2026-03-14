/**
 * MasterTyping - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Link from 'next/link';
import ModernBackground from '@/components/ModernBackground';
import SubscribeButton from '@/components/SubscribeButton';
import LaunchAppButton from '@/components/LaunchAppButton';

export default function MasterTypingPage() {
  const characters = [
    'Wizard — Magic projectiles',
    'Ape — Banana slicks',
    'Grandma — Yarn zones',
    'Unicorn — Rainbow bonuses',
    'Dragon — Fire zones',
    'Ninja — Vortex traps',
    'Robot — Magnetic clumps',
    'Chef — Food effects',
    'Vampire — Bat swarms',
    'Alien — Abduction beams',
  ];

  const ModeIcon = ({ type }: { type: string }) => {
    const s = { width: '36px', height: '36px', color: '#22c55e' };
    if (type === 'game') return <svg style={s} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>;
    if (type === 'target') return <svg style={s} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
    if (type === 'chart') return <svg style={s} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
    if (type === 'edit') return <svg style={s} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
    return <svg style={s} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
  };

  const gameModes = [
    { name: 'Game Mode', description: 'Playful stages with themed prompts, characters, and light progression', iconType: 'game' },
    { name: 'Pro Mode', description: 'Skill-focused drills for speed and accuracy with stricter scoring', iconType: 'target' },
    { name: 'Assessment Mode', description: 'A six-step assessment that spots weak fingers, shift-key issues, common patterns, and raw speed gaps', iconType: 'chart' },
    { name: 'Exercise Mode', description: 'Targeted drills that focus on the exact weak spots uncovered by assessment results', iconType: 'edit' },
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
                GAME-BASED TYPING PRACTICE
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                Typing practice that feels like a game
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                MasterTyping turns typing practice into a light adventure, with game mode, pro mode, a six-step assessment, specialized exercises, and progress tracking for kids, families, and classrooms.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <LaunchAppButton
                  appSlug="mastertyping"
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
              border: '2px solid rgba(34, 197, 94, 0.2)'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                Why MasterTyping keeps players coming back
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Practice feels like play instead of worksheet time</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Multiple modes let players practice, assess, or drill weak spots on purpose</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Assessment mode shows where players struggle before practice turns into guesswork</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Free core access gets families and classrooms in fast, with premium analytics there when deeper breakdowns matter</span>
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
              Typing practice works better when it feels worth doing
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', marginBottom: '2rem'}}>
              Traditional typing tools lose players because they feel repetitive and flat, and they rarely show exactly what needs work next. MasterTyping keeps practice moving with game framing, clearer feedback, and assessments that point players toward the right drills.
            </p>
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '2px solid #86efac'
            }}>
              <p style={{fontSize: '1.5rem', fontWeight: '700', color: '#166534', marginBottom: '1rem'}}>
                Practice gets easier to sustain when it feels like progress, not punishment.
              </p>
              <p style={{color: '#4b5563'}}>
                Players can jump into playful runs, tighten up in Pro mode, use the six-step assessment to spot weak keys and patterns, then move into targeted exercises while tracking real improvement in speed and accuracy.
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
              Multiple modes for different kinds of practice
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
                <div style={{ marginBottom: '1rem' }}><ModeIcon type={mode.iconType} /></div>
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
              Characters, themes, and reasons to come back
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              A playful cast helps the app feel more like a game than a drill screen
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
                Assessment feedback and tracking that actually help
              </h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Progressive lessons</h3>
                    <p style={{color: '#6b7280'}}>Difficulty ramps up gradually so players can build skill without hitting a wall</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Challenge runs</h3>
                    <p style={{color: '#6b7280'}}>Timed and streak-based pressure keeps repetition engaging instead of dull</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Assessment analytics</h3>
                    <p style={{color: '#6b7280'}}>Six assessment steps surface weak zones, with optional deep analytics for detailed breakdowns and next-step recommendations</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Profiles and progress tracking</h3>
                    <p style={{color: '#6b7280'}}>Per-mode stats, WPM charts, recent sessions, and persistent weakness tracking stay saved locally in the browser</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Classroom-friendly use</h3>
                    <p style={{color: '#6b7280'}}>Run assessments, review results fast, and move students into the right drills without setup overhead</p>
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
                Great fit for:
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#4b5563'}}>
                {['Kids and families who want practice that feels like a game', 'Teachers who need quick assessments and visible progress', 'Homeschool families', 'Students building speed and accuracy with feedback', 'Classrooms that need low-friction typing practice'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <svg style={{ width: '18px', height: '18px', color: '#22c55e', flexShrink: 0, marginTop: '2px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
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
              Core practice stays free
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
                <p style={{fontSize: '3rem', fontWeight: '900', color: '#22c55e', marginBottom: '0.5rem'}}>FREE</p>
                <p style={{fontSize: '0.875rem', color: '#6b7280'}}>for any signed-in user</p>
                <p style={{fontSize: '1.5rem', fontWeight: '700', color: '#1a202c', marginTop: '1rem'}}>Core lessons, challenges, assessments, exercises, and tracking</p>
              </div>
            </div>
            <p style={{marginTop: '2rem', textAlign: 'center', color: '#166534', fontSize: '1rem', lineHeight: 1.7}}>
              Premium adds deeper assessment analytics, including per-exercise breakdowns, weakness detection, personalized recommendations, and character-level performance insights.
            </p>
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
            Start typing in a space that feels like play
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Game mode, pro mode, assessments, exercises, and core tracking are free to start. Premium unlocks deeper analytics when sharper feedback matters.
          </p>
          <SubscribeButton planId="mastertyping" signInLabel="Sign Up" style={{
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
            Sign up and start typing
          </SubscribeButton>
        </div>
      </section>
    </div>
  );
}
