/**
 * FourStarGeneral - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import ModernBackground from '@/components/ModernBackground';
import SubscribeButton from '@/components/SubscribeButton';
import LaunchAppButton from '@/components/LaunchAppButton';
import { formatMonthlyPrice, pricingCatalog } from '@/lib/pricingCatalog';

export default function FourStarGeneralPage() {
  const fourStarPlan = pricingCatalog.fourstargeneral;
  const features = [
    { title: 'Tactical command', description: 'Realistic challenges and outcomes require planning, resources, and positioning.' },
    { title: 'Battlefield pressure', description: 'Every turn tightens the situation. Hold key positions or risk collapse across the front.' },
    { title: 'Turn flow and supply', description: 'Every turn is a decision point. Supply runs thin, pressure builds, and timing determines whether you hold or break.' },
    { title: 'Mission objectives', description: 'Objectives define every battle. Hold ground, control crossings, fortify positions.' },
    { title: 'Unit composition', description: 'Decide what to deploy: Armor, infantry, artillery, air, and support all have roles.' },
    { title: 'Replayable battles', description: 'Different forces, scenarios, and difficulty levels create new tactical problems every time you play.' },
  ];

  const unitTypes = [
    'Armored companies',
    'Anti-air groups',
    'Artillery support',
    'Mechanized infantry',
    'Air support',
    'Specialized infantry',
    'Supply convoys',
    'Reconnaissance units',
    'Engineer teams',
    'Ammo and Fuel trucks',
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
                WWII TACTICAL COMMAND
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                Hold the line. Repel enemies. Win the war.
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Four Star General is a turn-based WWII strategy game centered on a tactical battlefield game. Requisition and deploy forces, call for air support, manage logistics, and fight through mission after mission with realistic resolution.
              </p>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
                <LaunchAppButton
                  appSlug="fourstargeneral"
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
                    maxWidth: '250px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Play now
                </LaunchAppButton>
                <SubscribeButton
                  planId="fourstargeneral"
                  signInLabel="Sign in to continue"
                  hideForAnonymous
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
                  {`Subscribe: $${fourStarPlan.monthlyPrice.toFixed(2)}`}
                </SubscribeButton>
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
                Front line tactics
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Deployment choices matter on the battlefield</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Reserves and logisitics management shape every turn</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Call in air support and artillery strikes to help</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Mission scenarios with objectives like holding key positions create distinct tactical opportunites</span>
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
              Tactical depth. Real pressure.
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              Four Star General is built around realistic units and tactics, fortifications and terrain, reserves, logistics, and mission scenarios with clear objectives. As the general, you make decisions that shape the outcome. Read the battlefield and take control.
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
                Detailed Tactics
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Deployment matters - position your forces strategically</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Force composition - choose your units wisely</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Resouce and logistics management - keep your forces supplied</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Stay focused on objectives and make the hard choices</span>
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
                Realistic Tatics
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Reposition or stand and fight, dig in and fortify or assault the enemy</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Bring your forces to bear at the right time and place</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Armor companies and infantry battalions have their roles but don't bring a rifle to a cannon fight</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Expand the game with more units and missions and go deep with a full European theatre campaign</span>
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
              Core tactical systems
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
              Unit Types
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              You choose the units, support elements, and supplies needed to win the battle.
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
                Mission scenarios such as River Crossing
              </h2>
              <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', marginBottom: '1.5rem'}}>
                Defend the river crossing with limited forces against enemy advancement until reinforcement arrive. Minimal artillery support is available and there might be just enough time to build some fortifications.
              </p>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Difficulty is high, most generals will struggle to hold the river</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Enemy forces may shift before rolling into sustained assaults</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}> Pressure escalates once crossings are held to keep your forces supplied and alive</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Careful planning and execution are required to succeed</span>
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
                For players who like realistic turn based war games
              </h3>
              <p style={{color: '#4b5563', marginBottom: '1.5rem'}}>
                If you want realistic tactical engagements that reward planning and force composition discipline, play Four Star General.
              </p>
              <div style={{
                background: '#fef3c7',
                borderRadius: '15px',
                padding: '1.5rem',
                border: '2px solid #fcd34d'
              }}>
                <p style={{fontWeight: '600', color: '#92400e', marginBottom: '0.75rem'}}>Built for players who enjoy:</p>
                <ul style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#4b5563', fontSize: '0.875rem'}}>
                  <li>Realistic tactical outcomes</li>
                  <li>Logistics and supplies management</li>
                  <li>Reconnaissance and intelligence gathering</li>
                  <li>Strategic positioning and terrain awareness</li>
                  <li>WWII units and support</li>
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
            Start playing Four Star General
          </h2>
              <p style={{
                fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2.5rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Play with the tactical core of units. Add units, weapons, and scenarios when you want more. Check out campaign mode where you can start from planning for D-day and play through victory over the Axis.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <LaunchAppButton
                  appSlug="fourstargeneral"
              style={{
                background: 'rgba(255, 255, 255, 0.14)',
                color: 'white',
                padding: '1.1rem 2.4rem',
                borderRadius: '50px',
                fontSize: '1.05rem',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                cursor: 'pointer'
              }}
            >
              Play now
            </LaunchAppButton>
            <SubscribeButton planId="fourstargeneral" signInLabel="Sign in to continue" style={{
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
              {`Subscribe: $${fourStarPlan.monthlyPrice.toFixed(2)}`}
            </SubscribeButton>
          </div>
        </div>
      </section>
    </div>
  );
}
