/**
 * Sixsmith Games - Pricing Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Link from 'next/link';
import SubscribeButton from '@/components/SubscribeButton';
import ModernBackground from '@/components/ModernBackground';

export default function PricingPage() {
  const apps = [
    { name: 'VirtualCombatSimulator', description: 'D&D battle management with virtual tabletop', icon: '⚔️' },
    { name: 'ContentCraft', description: 'AI-powered content creation for game masters', icon: '✨' },
    { name: 'MasterTyping', description: 'Game-based typing practice with K-12 vocabulary', icon: '⌨️' },
    { name: 'Gravity', description: 'Asynchronous multiplayer strategy board game', icon: '🚀' },
    { name: 'FourStarGeneral', description: 'WWII strategic and tactical war game', icon: '🎖️' },
  ];

  const features = [
    'Unlimited access to all 5 applications',
    'Regular updates and new features',
    'Professional-grade infrastructure',
    'Cloud-based data storage and sync',
    'Priority customer support',
    'No per-app fees or hidden costs',
    'Cancel anytime, no long-term commitment',
    'Works across all your devices',
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
          <div style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: '900',
              color: 'white',
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              Simple, Transparent Pricing
            </h1>
            <p style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              One subscription. Five powerful applications. Unlimited possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{
            background: 'white',
            borderRadius: '30px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              padding: '3rem 2rem',
              textAlign: 'center'
            }}>
              <h2 style={{fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem'}}>
                All-Access Subscription
              </h2>
              <p style={{fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.9)'}}>
                Everything you need, one simple price
              </p>
            </div>

            {/* Pricing */}
            <div style={{padding: '3rem 2rem'}}>
              <div style={{textAlign: 'center', marginBottom: '3rem'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'}}>
                  <span style={{fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: '900', color: '#1a202c'}}>
                    $29.99
                  </span>
                  <span style={{fontSize: '2rem', color: '#6b7280', marginLeft: '1rem'}}>/month</span>
                </div>
                <p style={{fontSize: '1.125rem', color: '#6b7280'}}>
                  Less than $6 per app. Cancel anytime.
                </p>
              </div>

              {/* Apps Grid */}
              <div style={{marginBottom: '3rem'}}>
                <h3 style={{fontSize: '1.75rem', fontWeight: '700', color: '#1a202c', marginBottom: '1.5rem', textAlign: 'center'}}>
                  Includes All Five Applications
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem'
                }}>
                  {apps.map((app) => (
                    <div key={app.name} style={{
                      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                      padding: '1.5rem',
                      borderRadius: '15px',
                      border: '2px solid #e5e7eb'
                    }}>
                      <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>{app.icon}</div>
                      <h4 style={{fontSize: '1.125rem', fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem'}}>
                        {app.name}
                      </h4>
                      <p style={{fontSize: '0.875rem', color: '#6b7280'}}>{app.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div style={{marginBottom: '3rem'}}>
                <h3 style={{fontSize: '1.75rem', fontWeight: '700', color: '#1a202c', marginBottom: '1.5rem', textAlign: 'center'}}>
                  What You Get
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  {features.map((feature, index) => (
                    <div key={index} style={{display: 'flex', alignItems: 'flex-start'}}>
                      <svg
                        style={{width: '24px', height: '24px', color: '#10b981', marginRight: '0.75rem', flexShrink: 0, marginTop: '2px'}}
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
                      <span style={{color: '#4b5563', fontSize: '1rem'}}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{textAlign: 'center'}}>
                <SubscribeButton style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1.25rem 3.5rem',
                  borderRadius: '50px',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease'
                }}>
                  Subscribe Now
                </SubscribeButton>
                <p style={{fontSize: '0.875rem', color: '#9ca3af', marginTop: '1rem'}}>
                  Secure payment processing powered by Stripe
                </p>
              </div>
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
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Join game masters, content creators, and strategy enthusiasts using Sixsmith Games today.
          </p>
          <SubscribeButton style={{
            background: 'white',
            color: '#667eea',
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
            Subscribe Now - $29.99/month
          </SubscribeButton>
          <p style={{fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '1rem'}}>
            Cancel anytime. No long-term commitment required.
          </p>
        </div>
      </section>
    </div>
  );
}
