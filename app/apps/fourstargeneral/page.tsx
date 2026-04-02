/**
 * FourStarGeneral - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Link from 'next/link';
import ModernBackground from '@/components/ModernBackground';
import LaunchAppButton from '@/components/LaunchAppButton';

export default function FourStarGeneralPage() {
  const features = [
    { title: 'Deterministic Resolution', description: 'Clear rules and engine-driven outcomes put the emphasis on planning, deployment, and positioning.' },
    { title: 'Deployment to Engine', description: 'The allocation UI feeds directly into the GameEngine with enforced base camps, reserves, and scenario normalization.' },
    { title: 'Turn Flow with Supply', description: 'Battles advance through explicit turn transitions that surface supply tempo and pressure.' },
    { title: 'Mission Profiles', description: 'Scenario profiles define objectives, defaults, and difficulty-scaled turn limits for each battle.' },
    { title: 'Branch Composition', description: 'Coordinate land, air, naval, and support elements with distinct colleges and roles.' },
    { title: 'Replayable Content', description: 'Battle packs, campaigns, factions, and colleges create room for more scenarios as the build expands.' },
  ];

  const unitTypes = [
    'Land forces',
    'Armored groups',
    'Artillery support',
    'Air assets',
    'Naval elements',
    'Reserve formations',
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
                DETERMINISTIC WWII TACTICAL COMMAND
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                Hold the line. Spend the reserves. Make it count.
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Four Star General is a turn-based WWII strategy game currently centered on a tactical battle prototype. Deploy forces, assign base camps, manage supply tempo, and fight through authored scenarios with deterministic resolution.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
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
                The current front line
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Deployment choices feed directly into the live battle engine</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Reserve management and base camp rules shape every opening turn</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Supply tempo and turn pressure matter as much as raw positioning</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '24px', height: '24px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{color: '#4b5563', fontSize: '1rem'}}>Author-driven scenarios like River Crossing Watch create distinct problems to solve</span>
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
              Clear rules. Real pressure. Meaningful decisions.
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              Four Star General is built around deterministic tactics, deployment discipline, reserves, supply pressure, and authored scenarios with clear objectives. The point is not noise. The point is readable battlefield decisions.
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
                What is live now
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Deployment templates map into engine-ready payloads</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Scenario data is normalized for palette, objectives, and sides</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Base camp assignment and reserve resets are enforced</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Serialization support is in place for future persistence</span>
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
                Why deterministic tactics matter
              </h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>You can plan around the rules instead of hoping randomness carries the turn</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Deployment, reserves, and timing stay readable because outcomes follow clear logic</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Losses and pressure feel earned, which makes scenario problem-solving more satisfying</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={{color: '#f59e0b', marginRight: '0.5rem', fontWeight: '700', fontSize: '1.25rem'}}>→</span>
                  <span style={{color: '#4b5563'}}>Paid content can expand the experience without materially changing the core balance of play</span>
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
              Force types in the prototype
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280'}}>
              Branches, support elements, and reserves all matter once the scenario starts asking hard questions.
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
                Signature scenario: River Crossing Watch
              </h2>
              <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', marginBottom: '1.5rem'}}>
                Defend the river line while managing limited crossings, enemy probes, and a turn clock that tightens with difficulty. It is a clean showcase of how the prototype handles pressure, pacing, and scenario rules.
              </p>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Difficulty-scaled turn limits: Easy 14, Normal 12, Hard 11</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Probe phases that roll into sustained assaults</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Reserve pressure that escalates once crossings are held</span>
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg style={{width: '20px', height: '20px', color: '#f59e0b', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{color: '#4b5563'}}>Mission-profile defaults that shape deployment zones and rules</span>
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
                For players who like deterministic war games
              </h3>
              <p style={{color: '#4b5563', marginBottom: '1.5rem'}}>
                If you want clear rules, visible pressure, and tactical battles that reward deployment discipline, this is the lane Four Star General is carving out.
              </p>
              <div style={{
                background: '#fef3c7',
                borderRadius: '15px',
                padding: '1.5rem',
                border: '2px solid #fcd34d'
              }}>
                <p style={{fontWeight: '600', color: '#92400e', marginBottom: '0.75rem'}}>Built for players who enjoy:</p>
                <ul style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#4b5563', fontSize: '0.875rem'}}>
                  <li>• Deterministic tactical outcomes</li>
                  <li>• Deployment and reserve management</li>
                  <li>• Supply tempo and scenario pressure</li>
                  <li>• WWII-flavored command problems</li>
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
            Start with the tactical prototype
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Start with the free tactical core, then add more content when you want more scenarios, more factions, and more tactical variety. The paid path expands the experience without changing the core fairness of the game.
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
            <Link href="/pricing" style={{
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
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
