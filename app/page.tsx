/**
 * Sixsmith Games - Home Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 *
 * This source code is licensed under the terms found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import Link from 'next/link';

export default function Home() {
  const apps = [
    {
      name: 'VirtualCombatSimulator',
      tagline: 'Your D&D combat control room',
      description:
        'A modern battle management system combining responsive virtual tabletop, initiative tracking, and real-time multiplayer for faster, clearer D&D combats.',
      href: '/apps/virtual-combat-simulator',
      color: 'from-red-500 to-orange-500',
      icon: '⚔️',
    },
    {
      name: 'ContentCraft',
      tagline: 'Stop Fighting Your AI. Start Creating Your World.',
      description:
        'AI-powered content engine for game masters and authors. Generate D&D content that fits together, track canon automatically, and never contradict yourself again.',
      href: '/apps/contentcraft',
      color: 'from-purple-500 to-pink-500',
      icon: '✨',
    },
    {
      name: 'MasterTyping',
      tagline: 'Turn typing practice into an epic adventure',
      description:
        'Game-based typing practice with 10 unique characters, special abilities, and K-12 vocabulary. Make learning keyboard skills exciting and engaging.',
      href: '/apps/mastertyping',
      color: 'from-green-500 to-emerald-500',
      icon: '⌨️',
    },
    {
      name: 'Gravity',
      tagline: 'Strategy without scheduling',
      description:
        'Deep, tactical turn-based sci-fi board game built for asynchronous multiplayer. Play with friends on your own schedule—no coordination required.',
      href: '/apps/gravity',
      color: 'from-blue-500 to-cyan-500',
      icon: '🚀',
    },
    {
      name: 'FourStarGeneral',
      tagline: 'Command your forces in WWII',
      description:
        'Strategic and tactical turn-based war game set in the WWII era. Plan operations, manage resources, and outmaneuver your opponents.',
      href: '/apps/fourstargeneral',
      color: 'from-amber-500 to-yellow-500',
      icon: '🎖️',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(100px)'
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{position: 'relative', zIndex: 1}}>
          <div className="text-center max-w-4xl mx-auto">
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: '900',
              marginBottom: '2rem',
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              lineHeight: '1.2'
            }}>
              Professional Tools for Game Masters & Creators
            </h1>
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '3rem',
              fontWeight: '500',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              Transform your workflow with our suite of five innovative applications. From D&D battle
              management to AI-powered content creation, we've got everything you need.
            </p>
            <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center'}}>
              <Link
                href="/pricing"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#667eea',
                  padding: '1.25rem 3rem',
                  borderRadius: '50px',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease',
                  border: 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
                }}
              >
                Start Your Subscription
              </Link>
              <a
                href="#apps"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '1.25rem 3rem',
                  borderRadius: '50px',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-block',
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Explore Our Apps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Apps Showcase */}
      <section id="apps" style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Our Applications
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#4a5568',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Professional solutions designed for game masters, content creators, and strategy enthusiasts
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {apps.map((app) => {
              const gradientMap: Record<string, string> = {
                'from-red-500 to-orange-500': 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                'from-purple-500 to-pink-500': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                'from-green-500 to-emerald-500': 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                'from-blue-500 to-cyan-500': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                'from-amber-500 to-yellow-500': 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)'
              };
              const gradient = gradientMap[app.color] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

              return (
                <Link
                  key={app.name}
                  href={app.href}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '2.5rem',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    display: 'block',
                    border: '2px solid transparent'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <div style={{
                    background: gradient,
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
                  }}>
                    {app.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: '#1a202c',
                    marginBottom: '0.75rem'
                  }}>
                    {app.name}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#6b7280',
                    marginBottom: '1rem'
                  }}>
                    {app.tagline}
                  </p>
                  <p style={{
                    fontSize: '1rem',
                    color: '#4b5563',
                    lineHeight: '1.7',
                    marginBottom: '1.5rem'
                  }}>
                    {app.description}
                  </p>
                  <div style={{
                    color: '#3b82f6',
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}>
                    Learn more →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Why Choose Sixsmith Games?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem'
          }}>
            <div style={{textAlign: 'center'}}>
              <div style={{
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 8px 16px rgba(59, 130, 246, 0.2)'
              }}>
                <svg
                  style={{width: '40px', height: '40px', color: '#2563eb'}}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '1rem'
              }}>
                Professional Quality
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#4b5563',
                lineHeight: '1.7'
              }}>
                Enterprise-grade applications built with modern technology stacks, deployed on reliable infrastructure.
              </p>
            </div>

            <div style={{textAlign: 'center'}}>
              <div style={{
                background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 8px 16px rgba(168, 85, 247, 0.2)'
              }}>
                <svg
                  style={{width: '40px', height: '40px', color: '#9333ea'}}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '1rem'
              }}>
                All-Access Subscription
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#4b5563',
                lineHeight: '1.7'
              }}>
                One monthly subscription gives you unlimited access to all five applications.
              </p>
            </div>

            <div style={{textAlign: 'center'}}>
              <div style={{
                background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 8px 16px rgba(236, 72, 153, 0.2)'
              }}>
                <svg
                  style={{width: '40px', height: '40px', color: '#db2777'}}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '1rem'
              }}>
                Continuous Innovation
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#4b5563',
                lineHeight: '1.7'
              }}>
                Regular updates and new features based on user feedback and emerging needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
            Ready to Transform Your Workflow?
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Join game masters, content creators, and strategy enthusiasts who trust Sixsmith Games.
          </p>
          <Link
            href="/pricing"
            style={{
              background: 'white',
              color: '#667eea',
              padding: '1.25rem 3rem',
              borderRadius: '50px',
              fontSize: '1.25rem',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
            }}
          >
            View Pricing & Subscribe
          </Link>
        </div>
      </section>
    </div>
  );
}
