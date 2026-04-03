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
                TYPING TRAINING FOR REAL DIGITAL LIFE
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                Typing training for creators, gamers, and digital hobbyists
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Improve speed, accuracy, and endurance with guided assessment, targeted drills, and a game mode that keeps practice interesting.
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
                  Play now
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
                Why MasterTyping works
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Assessment and drills point you toward what actually needs work</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Multiple modes support focused training, not just repetition</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Game mode helps keep practice from feeling dead</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Free to use, with recent typing history kept for a limited window</span>
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
              Typing practice works better when it connects to daily digital life
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', marginBottom: '2rem'}}>
              Writing, research, chat, campaign prep, streaming, modding, and general digital work all get easier when typing feels more comfortable. MasterTyping gives you a clearer way to improve without turning practice into a chore.
            </p>
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '2px solid #86efac'
            }}>
              <p style={{fontSize: '1.5rem', fontWeight: '700', color: '#166534', marginBottom: '1rem'}}>
                Practice gets easier to sustain when it feels useful and you can see the point of it.
              </p>
              <p style={{color: '#4b5563'}}>
                Use assessment mode to spot weak keys and patterns, move into targeted exercises, tighten things up in Pro mode, and lean on game mode when you want practice to feel lighter.
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
              Game mode keeps practice interesting
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              The fun layer matters, but it supports the training instead of replacing it
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
                Why it matters outside a typing test
              </h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Writing and note-taking</h3>
                    <p style={{color: '#6b7280'}}>When typing feels smoother, drafting, journaling, outlining, and note capture feel less tiring</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Research and study</h3>
                    <p style={{color: '#6b7280'}}>Faster, cleaner typing helps when you are taking notes, answering prompts, or moving through information quickly</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Chat, streaming, and community</h3>
                    <p style={{color: '#6b7280'}}>If you spend time in games, Discord, streams, forums, or comments, better typing simply makes the experience easier</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Campaign prep and digital hobbies</h3>
                    <p style={{color: '#6b7280'}}>Typing matters when you are writing session notes, modding, researching builds, or working through hobby projects online</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#22c55e', marginRight: '0.75rem', flexShrink: 0, marginTop: '4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>Recent history stays visible</h3>
                    <p style={{color: '#6b7280'}}>Keeps your recent typing history available so you can track improvement without managing a permanent archive</p>
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
                {['Creators who spend real time writing at a keyboard', 'Gamers who type constantly in chat, communities, and live play', 'Students who want faster, cleaner typing for everyday work', 'Hobbyists who like structured practice with useful feedback', 'Anyone trying to build comfort, speed, and endurance over time'].map(item => (
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
              Free and useful right away
            </h2>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
            borderRadius: '20px',
            padding: '3rem',
            border: '2px solid #86efac'
          }}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', textAlign: 'left'}}>
              <div>
                <p style={{fontSize: '0.875rem', color: '#166534', marginBottom: '0.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em'}}>Free</p>
                <p style={{fontSize: '2.25rem', fontWeight: '900', color: '#1a202c', marginBottom: '0.75rem'}}>Assessment, drills, Pro mode, and game mode</p>
                <p style={{fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.7}}>The core product is free to use for signed-in users. You can assess where you are, work on specific weaknesses, and practice in the mode that fits the day.</p>
              </div>
              <div>
                <p style={{fontSize: '0.875rem', color: '#166534', marginBottom: '0.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em'}}>Recent history</p>
                <p style={{fontSize: '2.25rem', fontWeight: '900', color: '#1a202c', marginBottom: '0.75rem'}}>A limited recent-history window</p>
                <p style={{fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.7}}>Recent typing history stays available so you can keep an eye on improvement without turning the product into a permanent archive of every session.</p>
              </div>
            </div>
            <p style={{marginTop: '2rem', textAlign: 'center', color: '#166534', fontSize: '1rem', lineHeight: 1.7}}>
              The point is straightforward: useful typing practice, clear feedback, and enough recent history to see progress without overcomplicating it.
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
            Practice typing in a way that is actually useful
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Guided assessment, targeted drills, Pro mode, and game mode are free. Recent history stays available for a limited window so you can keep track of improvement over time.
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
            Try free
          </SubscribeButton>
        </div>
      </section>
    </div>
  );
}
