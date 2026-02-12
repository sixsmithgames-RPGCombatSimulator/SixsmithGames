/**
 * Gravity - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Link from 'next/link';
import ModernBackground from '@/components/ModernBackground';
import SubscribeButton from '@/components/SubscribeButton';

export default function GravityPage() {
  const features = [
    {
      title: 'Asynchronous Multiplayer',
      description: 'Take your turn when you have time. No scheduling, no coordination, no waiting.',
    },
    {
      title: 'Deep Tactical Gameplay',
      description: 'Ship systems, crew roles, and high-impact actions create meaningful strategic depth.',
    },
    {
      title: 'Turn-Based Board Game',
      description: 'One great decision at a time. Clear board state, transparent rules, fair outcomes.',
    },
    {
      title: 'Ship Systems Management',
      description: 'Power routing, damage control, and repairs create real tradeoffs every turn.',
    },
    {
      title: 'Crew Roles & Abilities',
      description: 'Captain abilities and crew coordination change how you approach each match.',
    },
    {
      title: 'Cross-Platform Play',
      description: 'Web-based client with shared engine for consistency and portability.',
    },
  ];

  const actions = [
    { name: 'Repair', description: 'Fix damaged systems and restore ship functionality' },
    { name: 'Maneuver', description: 'Position your ship for tactical advantage' },
    { name: 'Scan/Acquire', description: 'Gather resources and intelligence' },
    { name: 'Combat', description: 'Attack opponents and defend your position' },
    { name: 'Assemble', description: 'Build and upgrade ship components' },
    { name: 'Power', description: 'Route power to critical systems' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #14b8a6 100%)',
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
          background: 'rgba(0, 0, 0, 0.2)',
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
                🚀 ASYNCHRONOUS STRATEGY
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                Strategy Without Scheduling
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Gravity is a deep, tactical turn-based sci-fi board game built for asynchronous multiplayer.
                Take your turn when you have time, coordinate with your crew, and outplay opponents—without
                needing everyone online at once.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <Link
                  href="/pricing"
                  style={{
                    background: 'white',
                    color: '#3b82f6',
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
                  Join the Fleet
                </Link>
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              borderRadius: '30px',
              padding: '2.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: 'white', marginBottom: '1.5rem'}}>
                Your crew. Your ship. Your move.
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#06b6d4', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: 'rgba(255, 255, 255, 0.95)', fontSize: '1rem'}}>Play with friends across time zones</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#06b6d4', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: 'rgba(255, 255, 255, 0.95)', fontSize: '1rem'}}>Deep tactics without the time commitment</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#06b6d4', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: 'rgba(255, 255, 255, 0.95)', fontSize: '1rem'}}>Every decision matters, every turn counts</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#06b6d4', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: 'rgba(255, 255, 255, 0.95)', fontSize: '1rem'}}>No scheduling, no waiting, no coordination needed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{maxWidth: '900px', margin: '0 auto', textAlign: 'center'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#1a202c',
              marginBottom: '1.5rem'
            }}>
              Your Group Loves Strategy Games. Your Schedules Don't.
            </h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
                Scheduling is the final boss. Your group wants deep games, but real-time sessions fall apart.
                Most "async" games feel shallow, removing tension and meaningful interaction.
              </p>
              <div style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)',
                borderRadius: '20px',
                padding: '2.5rem',
                border: '2px solid #93c5fd'
              }}>
                <p style={{fontSize: '1.5rem', fontWeight: '700', color: '#1e40af', marginBottom: '1rem'}}>
                  Gravity delivers serious tactical gameplay designed for async from day one.
                </p>
                <p style={{color: '#4b5563'}}>
                  Make one great decision at a time. See the board clearly. Trust the rules. Keep the game moving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              What Makes Gravity Compelling
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                border: '2px solid #bfdbfe'
              }}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '0.75rem'}}>
                  {feature.title}
                </h3>
                <p style={{color: '#4b5563'}}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gameplay Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              High-Stakes Decision Loops
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', maxWidth: '900px', margin: '0 auto'}}>
              Every turn asks a hard question. Each action creates real tradeoffs that evolve across the match.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {actions.map((action, index) => (
              <div
                key={index}
                style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)',
                  borderRadius: '15px',
                  padding: '2rem',
                  border: '2px solid #93c5fd',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#93c5fd';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{fontSize: '1.125rem', fontWeight: '700', color: '#1a202c', marginBottom: '0.5rem'}}>
                  {action.name}
                </h3>
                <p style={{color: '#4b5563'}}>{action.description}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
            color: 'white',
            borderRadius: '20px',
            padding: '3rem'
          }}>
            <h3 style={{fontSize: '1.75rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center'}}>
              Every Turn Matters
            </h3>
            <ul style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <li style={{display: 'flex', alignItems: 'flex-start'}}>
                <span style={{color: '#06b6d4', marginRight: '0.5rem', fontSize: '1.25rem'}}>→</span>
                <span style={{color: 'rgba(255, 255, 255, 0.95)'}}>Do you repair now or gamble for resources?</span>
              </li>
              <li style={{display: 'flex', alignItems: 'flex-start'}}>
                <span style={{color: '#06b6d4', marginRight: '0.5rem', fontSize: '1.25rem'}}>→</span>
                <span style={{color: 'rgba(255, 255, 255, 0.95)'}}>Do you maneuver for position or power systems for defense?</span>
              </li>
              <li style={{display: 'flex', alignItems: 'flex-start'}}>
                <span style={{color: '#06b6d4', marginRight: '0.5rem', fontSize: '1.25rem'}}>→</span>
                <span style={{color: 'rgba(255, 255, 255, 0.95)'}}>Do you scan/acquire to get ahead or attack to keep others from stabilizing?</span>
              </li>
              <li style={{display: 'flex', alignItems: 'flex-start'}}>
                <span style={{color: '#06b6d4', marginRight: '0.5rem', fontSize: '1.25rem'}}>→</span>
                <span style={{color: 'rgba(255, 255, 255, 0.95)'}}>Your ship is a living system with power, damage, and repair tradeoffs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Built For Strategic Minds
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
                  <svg style={{width: '20px', height: '20px', color: '#3b82f6', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Busy adults who love strategy but can't guarantee a 2-4 hour session</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#3b82f6', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Tabletop groups that want ongoing games across time zones</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#3b82f6', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Strategy gamers who want meaningful choices, not clicker progression</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#3b82f6', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Competitive friends who want clear rules and fair outcomes</span>
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
                Why Gravity Over Alternatives:
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#06b6d4', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Designed for async from day one (not real-time awkwardly slowed down)</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#06b6d4', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Crunchy strategy without the meeting invite</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#06b6d4', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Rules you can trust: deterministic logic and validation-focused design</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#06b6d4', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Modern web delivery: no installs, jump in fast</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #14b8a6 100%)',
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
            A Board Game That Fits Real Life
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Join strategists who play serious games on their own schedule.
          </p>
          <SubscribeButton style={{
            background: 'white',
            color: '#3b82f6',
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
            Take Your First Turn
          </SubscribeButton>
        </div>
      </section>
    </div>
  );
}
