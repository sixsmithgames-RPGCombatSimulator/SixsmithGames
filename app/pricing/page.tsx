/**
 * Sixsmith Games - Pricing Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Image from 'next/image';
import SubscribeButton from '@/components/SubscribeButton';
import ModernBackground from '@/components/ModernBackground';

const individualPlans = [
  {
    slug: 'contentcraft',
    name: 'ContentCraft',
    icon: '/icons/contentcraft.png',
    price: 9.99,
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
    description: 'AI-powered content creation for game masters and storytellers.',
    features: ['Unlimited projects', 'AI writing assistant', 'Canon management', 'Export tools'],
  },
  {
    slug: 'virtual-combat-simulator',
    name: 'VirtualCombatSimulator',
    icon: '/icons/vcs.png',
    price: 9.99,
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
    description: 'D&D battle management with virtual tabletop and real-time combat.',
    features: ['Battle rooms', 'Character sheets', 'Ruleset editor', 'Real-time sync'],
  },
  {
    slug: 'gravity',
    name: 'Gravity',
    icon: '/icons/gravity.png',
    price: 1.99,
    color: '#2563eb',
    gradient: 'linear-gradient(135deg, #2563eb, #06b6d4)',
    description: 'Asynchronous multiplayer tactical space survival board game.',
    features: ['Multiplayer matches', 'Fleet management', 'Strategic campaigns', 'Leaderboards'],
  },
  {
    slug: 'fourstargeneral',
    name: 'Four Star General',
    icon: '/icons/fourstargeneral.png',
    price: 1.99,
    color: '#b45309',
    gradient: 'linear-gradient(135deg, #b45309, #f5c46d)',
    description: 'WWII strategic and tactical war simulation with deep campaign play.',
    features: ['Campaign missions', 'Unit management', 'Tactical combat', 'General roster'],
  },
  {
    slug: 'mastertyping',
    name: 'MasterTyping',
    icon: '/icons/mastertyping.png',
    price: 4.99,
    color: '#16a34a',
    gradient: 'linear-gradient(135deg, #16a34a, #84cc16)',
    description: 'Game-based typing practice with K-12 vocabulary and progress tracking.',
    features: ['Game mode', 'Pro mode', 'Assessment mode', 'Progress stats'],
  },
];

export default function PricingPage() {
  const check = (color: string) => (
    <svg style={{ width: '18px', height: '18px', flexShrink: 0, marginTop: '2px' }} fill="none" stroke={color} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div style={{ background: '#f8f9fa' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <ModernBackground />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', zIndex: 1 }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', fontWeight: '900', color: 'white', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.375rem)', color: 'rgba(255,255,255,0.92)', margin: 0 }}>
            Subscribe to individual apps or save with the All-Access Bundle.
          </p>
        </div>
      </section>

      {/* Bundle highlight */}
      <section style={{ padding: '60px 2rem 0', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #4c1d95 100%)',
          borderRadius: '24px', padding: '3rem 2.5rem',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem',
          boxShadow: '0 20px 60px rgba(76,29,149,0.35)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ flex: '1 1 340px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: '999px', padding: '0.3rem 1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fde68a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Best Value</span>
            </div>
            <h2 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '900', margin: '0 0 0.75rem' }}>
              All-Access Bundle
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.0625rem', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
              All five apps for one low price. Save over $14/month vs. subscribing individually.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {individualPlans.map(p => (
                <span key={p.slug} style={{ background: 'rgba(255,255,255,0.12)', color: 'white', borderRadius: '999px', padding: '0.3rem 0.875rem', fontSize: '0.875rem', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Image src={p.icon} alt={p.name} width={16} height={16} style={{ borderRadius: '3px', objectFit: 'cover' }} /> {p.name}
                </span>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '4px' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.5rem', marginTop: '0.5rem' }}>$</span>
              <span style={{ color: 'white', fontSize: 'clamp(3.5rem, 8vw, 5rem)', fontWeight: '900', lineHeight: 1 }}>22.99</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', alignSelf: 'flex-end', marginBottom: '0.5rem' }}>/mo</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', margin: '0.25rem 0 1.5rem' }}>
              vs. $28.95 if purchased separately
            </p>
            <SubscribeButton planId="bundle" style={{
              background: 'white', color: '#4c1d95',
              padding: '1rem 2.5rem', borderRadius: '50px',
              fontSize: '1.0625rem', fontWeight: '800', border: 'none', cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)', whiteSpace: 'nowrap',
            }}>
              Get All-Access — $22.99/mo
            </SubscribeButton>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '0.75rem' }}>Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Individual plans */}
      <section style={{ padding: '60px 2rem 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
          Or Subscribe to Individual Apps
        </h2>
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '1.0625rem', marginBottom: '2.5rem' }}>
          Only pay for what you use.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {individualPlans.map((plan) => (
            <div key={plan.slug} style={{
              background: 'white', borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              border: '1px solid #f3f4f6',
            }}>
              <div style={{ background: plan.gradient, padding: '1.75rem 1.75rem 1.5rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden', marginBottom: '0.75rem', background: 'rgba(255,255,255,0.15)' }}>
                  <Image src={plan.icon} alt={plan.name} width={56} height={56} style={{ objectFit: 'cover' }} />
                </div>
                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '800', margin: '0 0 0.375rem' }}>{plan.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{plan.description}</p>
              </div>
              <div style={{ padding: '1.5rem 1.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '2.25rem', fontWeight: '900', color: '#111827' }}>${plan.price.toFixed(2)}</span>
                  <span style={{ color: '#6b7280', fontSize: '1rem' }}>/month</span>
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9375rem', color: '#374151' }}>
                      {check(plan.color)}
                      {f}
                    </li>
                  ))}
                </ul>
                <SubscribeButton planId={plan.slug} style={{
                  background: plan.gradient, color: 'white',
                  padding: '0.875rem 1.5rem', borderRadius: '12px',
                  fontSize: '1rem', fontWeight: '700', border: 'none', cursor: 'pointer',
                  boxShadow: `0 4px 14px rgba(0,0,0,0.18)`, width: '100%',
                }}>
                  Subscribe — ${plan.price.toFixed(2)}/mo
                </SubscribeButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', margin: '0 0 1rem', textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
          Ready to Play?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.125rem', margin: '0 0 2rem' }}>
          Join game masters, content creators, and strategists using Sixsmith Games today.
        </p>
        <SubscribeButton planId="bundle" style={{
          background: 'white', color: '#4c1d95',
          padding: '1.125rem 3rem', borderRadius: '50px',
          fontSize: '1.125rem', fontWeight: '800', border: 'none', cursor: 'pointer',
          boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
        }}>
          Get All-Access Bundle — $22.99/mo
        </SubscribeButton>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', marginTop: '1rem' }}>
          Cancel anytime. No long-term commitment required.
        </p>
      </section>
    </div>
  );
}
