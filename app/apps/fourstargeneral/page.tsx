/**
 * FourStarGeneral - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Link from 'next/link';
import ModernBackground from '@/components/ModernBackground';
import SubscribeButton from '@/components/SubscribeButton';

export default function FourStarGeneralPage() {
  const features = [
    {
      title: 'Strategic Campaign Management',
      description: 'Plan large-scale operations across multiple theaters of war',
      icon: '🗺️',
    },
    {
      title: 'Tactical Combat Resolution',
      description: 'Command units in detailed turn-based battles',
      icon: '⚔️',
    },
    {
      title: 'Historical WWII Setting',
      description: 'Authentic units, equipment, and historical scenarios',
      icon: '📜',
    },
    {
      title: 'Resource Management',
      description: 'Balance production, supply lines, and force deployment',
      icon: '⚙️',
    },
    {
      title: 'Command Structure',
      description: 'Organize your forces with realistic military hierarchies',
      icon: '🎖️',
    },
    {
      title: 'Multiple Victory Conditions',
      description: 'Achieve victory through conquest, economic dominance, or strategic objectives',
      icon: '🏆',
    },
  ];

  const unitTypes = [
    'Infantry Divisions',
    'Armored Units',
    'Artillery Battalions',
    'Air Forces',
    'Naval Fleets',
    'Special Operations',
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #eab308 50%, #fb923c 100%)',
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
                🎖️ WWII STRATEGIC WAR GAME
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                Command Your Forces in WWII
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                FourStarGeneral is a strategic and tactical turn-based war game set in the WWII era. Plan
                complex operations, manage resources and supply lines, and outmaneuver your opponents in
                historically authentic campaigns.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <Link
                  href="/pricing"
                  style={{
                    background: 'white',
                    color: '#f59e0b',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'inline-block',
                    textAlign: 'center',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    maxWidth: '220px'
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
                  Take Command
                </Link>
              </div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '30px',
              padding: '2.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              border: '2px solid rgba(245, 158, 11, 0.2)'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                Lead Your Nation to Victory
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Plan strategic operations across multiple fronts</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Command diverse military units with authentic capabilities</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Manage supply lines, production, and logistics</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Engage in historically inspired scenarios and campaigns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Depth Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#1a202c',
              marginBottom: '1.5rem'
            }}>
              Strategic Depth Meets Tactical Precision
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              FourStarGeneral combines grand strategy with detailed tactical combat. Make high-level
              decisions about resource allocation and theater management, then execute tactical battles
              with precision and skill.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '2px solid #fcd34d'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                Strategic Layer
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Plan multi-theater campaigns and operations</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Manage production, research, and economic development</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Establish and maintain critical supply lines</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Deploy forces to achieve strategic objectives</span>
                </li>
              </ul>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '2px solid #fcd34d'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                Tactical Layer
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Command units in turn-based tactical battles</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Utilize terrain and weather for tactical advantage</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Coordinate combined arms operations</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Execute flanking maneuvers and defensive strategies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Comprehensive War Game Features
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                border: '2px solid #fde68a',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#f59e0b';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 158, 11, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#fde68a';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
              }}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{feature.icon}</div>
                <h3 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '0.75rem'}}>
                  {feature.title}
                </h3>
                <p style={{color: '#4b5563'}}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unit Types Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Diverse Military Forces
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              Command historically authentic units across all branches of military service
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {unitTypes.map((unit, index) => (
              <div
                key={index}
                style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
                  borderRadius: '15px',
                  padding: '2rem',
                  textAlign: 'center',
                  border: '2px solid #fcd34d',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#f59e0b';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#fcd34d';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <p style={{fontWeight: '700', color: '#1a202c', fontSize: '1.125rem'}}>{unit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Authenticity Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center'}}>
            <div>
              <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                Rooted in History
              </h2>
              <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', marginBottom: '1.5rem'}}>
                FourStarGeneral brings the complexity and challenge of WWII-era warfare to your screen
                with historically researched units, authentic equipment capabilities, and inspired scenarios
                from actual military operations.
              </p>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Authentic WWII military units and equipment</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Historically inspired campaign scenarios</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Realistic supply and logistics systems</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Accurate combat resolution based on historical performance</span>
                </li>
              </ul>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '30px',
              padding: '2.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
              border: '2px solid #fde68a'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                For Strategy Enthusiasts
              </h3>
              <p style={{color: '#4b5563', marginBottom: '1.5rem'}}>
                Whether you're a history buff, a strategy game veteran, or new to war gaming,
                FourStarGeneral offers depth and challenge that rewards thoughtful planning and
                tactical execution.
              </p>
              <div style={{
                background: '#fef3c7',
                borderRadius: '15px',
                padding: '1.5rem',
                border: '2px solid #fcd34d'
              }}>
                <p style={{fontWeight: '600', color: '#92400e', marginBottom: '0.75rem'}}>Perfect for players who enjoy:</p>
                <ul style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#4b5563', fontSize: '0.875rem'}}>
                  <li>• Grand strategy and military history</li>
                  <li>• Complex tactical decision-making</li>
                  <li>• Resource and logistics management</li>
                  <li>• Turn-based competitive gameplay</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #f59e0b 0%, #eab308 50%, #fb923c 100%)',
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
            History Awaits Your Command
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Lead your forces to victory in the most challenging conflict of the 20th century.
          </p>
          <SubscribeButton style={{
            background: 'white',
            color: '#f59e0b',
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
            Begin Your Campaign
          </SubscribeButton>
        </div>
      </section>
    </div>
  );
}
