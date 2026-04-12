/**
 * VirtualCombatSimulator - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import ModernBackground from '@/components/ModernBackground';
import SubscribeButton from '@/components/SubscribeButton';
import LaunchAppButton from '@/components/LaunchAppButton';
import { formatMonthlyPrice, pricingCatalog } from '@/lib/pricingCatalog';

export default function VirtualCombatSimulatorPage() {
  const vcsPlan = pricingCatalog['virtual-combat-simulator'];
  const features = [
    {
      title: 'Map-First Encounter Control',
      items: [
        'Upload maps, set square or hex grids, and scale the field cleanly',
        'Drag, resize, and place tokens with layer-aware controls',
        'Use grid-aware measurement, reach, and positioning checks',
        'Keep players synced to the same shared battle state',
      ],
    },
    {
      title: 'Rules-Faithful Combat Flow',
      items: [
        'Initiative, turn order, action, bonus action, and reaction tracking',
        'Advantage, saves, criticals, resistances, and concentration support',
        'Range, line, cover, movement, and opportunity checks before resolution',
        'Token-linked HP, conditions, and combat state in one place',
      ],
    },
    {
      title: 'Import-Ready Sheets & Data',
      items: [
        'SmartPaste and JSON imports into canonical character and monster schemas',
        'Character and monster sheets with stats visible when needed',
        'Support for SRD-friendly content and homebrew alike',
        'Notes, equipment, spells, and features preserved in import flows',
      ],
    },
    {
      title: 'Sync, Audit, and Persistence',
      items: [
        'Socket-enabled multiplayer so every player sees the same state',
        'Combat log with roll math, results, and GM override markers',
        'Save/load encounter presets and persist sessions with assets',
        'House rules toggles and GM-side enforcement controls',
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
                MAP-FIRST D&D COMBAT CONTROL
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                Run D&D combats with fewer stalls
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '1rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Virtual Combat Simulator is a map-first battle control room for D&D 5e play, with rules-faithful combat flow, import-ready data, and table sync that keeps everyone aligned.
              </p>
              <p style={{ margin: '0 0 1.5rem', color: 'rgba(255,255,255,0.86)', fontSize: '1rem', fontWeight: 700 }}>
                Game Master plan: {formatMonthlyPrice(vcsPlan.monthlyPrice)}
              </p>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
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
                  Play now
                </LaunchAppButton>
                <SubscribeButton
                  planId="virtual-combat-simulator"
                  signInLabel="Sign in to continue"
                  style={{
                    background: 'rgba(255, 255, 255, 0.14)',
                    color: 'white',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'inline-block',
                    textAlign: 'center',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.22)',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.28)',
                    cursor: 'pointer',
                  }}
                >
                  {`Pay ${formatMonthlyPrice(vcsPlan.monthlyPrice)}`}
                </SubscribeButton>
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
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Run combats faster with initiative, action economy, and condition tracking</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#ef4444', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Make positioning obvious with grid-aware maps, tokens, and reach checks</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#ef4444', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Keep turns, HP, stats, and logs in one place</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#ef4444', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Let players join free and stay synced in real time</span>
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
              Stop asking what the board state actually is
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              Combat stalls when turns, movement, cover, and results are split across too many tools. Virtual Combat Simulator centralizes the map, tokens, initiative, rules checks, and logs so the GM can keep pace and players can trust what they are seeing.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Everything you need for tactical combat
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
              Built for reliable table state
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
                {['Socket-enabled live updates', 'Persisted sessions and asset management', 'Canonical data schemas for characters and monsters', 'Audit-ready combat logs', 'SmartPaste and JSON imports', 'House rules toggles and GM overrides'].map(item => (
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
            Start running cleaner combats today
          </h2>
              <p style={{
                fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '1rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Start with the core tools. The monthly plan adds more storage, more Game Master tools, and saved sessions.
              </p>
              <p style={{ margin: '0 0 1.5rem', color: 'rgba(255,255,255,0.86)', fontSize: '1rem', fontWeight: 700 }}>
                Game Master plan: {formatMonthlyPrice(vcsPlan.monthlyPrice)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <LaunchAppButton
                  appSlug="virtual-combat-simulator"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: 'white',
                padding: '1.1rem 2.5rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                cursor: 'pointer'
              }}
            >
              Play now
            </LaunchAppButton>
              <SubscribeButton planId="virtual-combat-simulator" style={{
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
                {`Pay ${formatMonthlyPrice(vcsPlan.monthlyPrice)}`}
              </SubscribeButton>
            </div>
        </div>
      </section>
    </div>
  );
}
