/**
 * VirtualCombatSimulator - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Link from 'next/link';
import ModernBackground from '@/components/ModernBackground';
import SubscribeButton from '@/components/SubscribeButton';
import LaunchAppButton from '@/components/LaunchAppButton';

export default function VirtualCombatSimulatorPage() {
  const features = [
    {
      title: 'Virtual Tabletop & Map',
      items: [
        'Interactive battle map with zoom and pan',
        'Grid snapping for precise token placement',
        'Tokens for characters, monsters, and objects',
        'Support for custom map images',
      ],
    },
    {
      title: 'Combat Management',
      items: [
        'Initiative tracker with automatic sorting',
        'Turn-based combat flow with visual indicators',
        'Action panel for attacks, spells, and movement',
        'Token-linked HP tracking with multiple displays',
      ],
    },
    {
      title: 'Sheets & Stats',
      items: [
        'Character sheet viewer',
        'Monster sheet viewer',
        'Combat stats visible when needed',
        'Notes and custom fields for context',
      ],
    },
    {
      title: 'Multiplayer & Persistence',
      items: [
        'WebSocket-based multiplayer support',
        'Session persistence with save/load',
        'Asset management for maps/tokens/characters',
        'JWT-based authentication',
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fbbf24 100%)',
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
                D&D BATTLE MANAGEMENT
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                Run D&D Combats at Full Speed
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                A modern battle map and initiative tracker built for real play. VirtualCombatSimulator keeps
                the table aligned with grid-snapped maps, token control, and turn tracking—online or in-person.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <LaunchAppButton
                  appSlug="virtual-combat-simulator"
                  style={{
                    background: 'white',
                    color: '#ef4444',
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
              border: '2px solid rgba(239, 68, 68, 0.2)'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                Your encounter control room
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#ef4444', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Run combats faster with automatic initiative tracking</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#ef4444', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Make positioning obvious with grid-snapped maps</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#ef4444', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Keep turns, HP, and stats in one place</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#ef4444', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Play together in real-time with WebSocket multiplayer</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#1a202c',
              marginBottom: '1.5rem'
            }}>
              Stop Asking "Whose Turn Is It?"
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              Combat stalls when positioning and turns aren't crystal clear. VirtualCombatSimulator centralizes
              the map, tokens, initiative, and sheets so the GM can keep pace and players stay engaged.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Everything You Need for Tactical Combat
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
                border: '2px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = '#ef4444';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}>
                <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#1a202c', marginBottom: '1.5rem'}}>
                  {feature.title}
                </h3>
                <ul style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                  {feature.items.map((item, i) => (
                    <li key={i} style={{display: 'flex', alignItems: 'flex-start'}}>
                      <svg
                        style={{width: '20px', height: '20px', color: '#ef4444', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span style={{color: '#4b5563', fontSize: '1rem'}}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <h2 style={{fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', color: '#1a202c', marginBottom: '2rem', textAlign: 'center'}}>
              Built with Modern Technology
            </h2>
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '2px solid #fed7aa'
            }}>
              <ul style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                color: '#4b5563'
              }}>
                {['React + TypeScript frontend', 'Express + TypeScript backend', 'MongoDB persistence', 'Socket.IO multiplayer', 'JWT authentication', 'Stripe integration'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg style={{ width: '16px', height: '16px', color: '#ef4444', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fbbf24 100%)',
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
            Start Running Better Combats Today
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Join game masters who've transformed their D&D sessions with VirtualCombatSimulator.
          </p>
          <SubscribeButton style={{
            background: 'white',
            color: '#ef4444',
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
            Subscribe Now
          </SubscribeButton>
        </div>
      </section>
    </div>
  );
}
