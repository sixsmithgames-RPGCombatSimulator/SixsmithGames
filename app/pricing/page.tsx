/**
 * Sixsmith Games - Pricing Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import SubscribeButton from '@/components/SubscribeButton';
import ModernBackground from '@/components/ModernBackground';
import { actionRowClassName, cardPadding, fluidGrid, pageGutter, touchTargetClassName } from '@/lib/responsive';

const freeToStartProducts = [
  {
    slug: 'virtual-combat-simulator',
    planId: 'virtual-combat-simulator',
    name: 'Virtual Combat Simulator',
    icon: '/icons/vcs-optimized.png',
    color: '#2563eb',
    gradient: 'linear-gradient(135deg, #1d4ed8, #06b6d4)',
    monthlyPrice: 9.99,
    description: 'A D&D virtual tabletop for maps, tokens, initiative, and encounter play.',
    freeIncludes: ['Useful encounter tools right away', 'Battle maps, tokens, and initiative tracking', 'Player access and shared table state'],
    paidIncludes: ['More storage for assets and sessions', 'Expanded Game Master capability'],
    cta: 'Play now',
  },
  {
    slug: 'fourstargeneral',
    planId: 'fourstargeneral',
    name: 'Four Star General',
    icon: '/icons/fourstargeneral-optimized.png',
    color: '#b45309',
    gradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
    monthlyPrice: 1.99,
    description: 'Play now. Optional content upgrades enhance your game without changing balance.',
    freeIncludes: ['Tactical core of WWII units', 'Core scenarios and content', 'Balanced and accurate gameplay foundation'],
    paidIncludes: ['More units, weapons, and scenarios', 'Campaign mode'],
    cta: 'Play now',
  },
  {
    slug: 'mastertyping',
    planId: 'mastertyping',
    name: 'MasterTyping',
    icon: '/icons/mastertyping-optimized.png',
    color: '#16a34a',
    gradient: 'linear-gradient(135deg, #16a34a, #10b981)',
    monthlyPrice: 1.99,
    description: 'Start now. Track progress, history is retained for 30 days.',
    freeIncludes: ['Assess your skills', 'Practice like a Pro', 'Have fun in Game mode'],
    paidIncludes: ['Retain all history'],
    cta: 'Play now',
  },
];

const premiumProduct = {
  slug: 'contentcraft',
  name: 'ContentCraft',
  icon: '/icons/contentcraft-optimized.png',
  color: '#7c3aed',
  gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
  monthlyPrice: 9.99,
  yearlyPrice: 99,
  description:
    'Creative platform for writers, worldbuilders, and game masters. Track your story, characters, and locations. Build a library of canon to keep your content organized. Includes some built-in AI usage if you want to use that. For those that want to use more AI, bring your own or purchase credits.',
  includes: [
    'Great organizational app for your creative work',
    'Craft characters and scenes',
    'Build locations and items',
    'Plan story arcs based on your canon',
    'Designed for writers and game masters',
  ],
};

const bundleProduct = {
  slug: 'bundle',
  name: 'ContentCraft + VCS',
  color: '#312e81',
  gradient: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)',
  monthlyPrice: 14.99,
  description:
    'Use ContentCraft to organize your campaign world and create rich NPCs and deadly monsters. Then import those into Virtual Combat Simulator and run the combats. It is a great option for game masters who want both the creative side and the table side together in one package.',
  includes: [
    'ContentCraft subscription included',
    'Virtual Combat Simulator Game Master plan included',
    'Story, character, NPC, Monster, and location creation',
    'Import your creations into the battle',
    'Run your campaigns and encounters easily with the power of both tools',
  ],
};

const comparisonRows = [
  {
    product: 'Virtual Combat Simulator',
    howYouEnter: 'Play now',
    freeIncludes: 'Core encounter control, shared play, and Game Master support',
    paidIncludes: 'More features, more storage, and support',
  },
  {
    product: 'Four Star General',
    howYouEnter: 'Play now',
    freeIncludes: 'Playable tactical WWII missions',
    paidIncludes: 'Optional content that adds variety and expands the game',
  },
  {
    product: 'MasterTyping',
    howYouEnter: 'Play now',
    freeIncludes: 'Assessment, drills, focused practice, and game-supported repetition',
    paidIncludes: 'Free product with recent progress history',
  },
  {
    product: 'ContentCraft',
    howYouEnter: 'Subscribe',
    freeIncludes: 'No free tier',
    paidIncludes: 'Premium subscription with some AI usage included and extra credits available',
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${pageGutter}`, position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', fontWeight: '900', color: 'white', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            Games to play. Content to create.
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.375rem)', color: 'rgba(255,255,255,0.92)', margin: 0 }}>
            There are games to play and tools to use. The goal is simple: make your games easier to play and focus on the fun.
          </p>
        </div>
      </section>

      {/* Play now */}
      <section style={{ padding: `60px ${pageGutter} 40px`, maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
          Play now
        </h2>
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '1.0625rem', marginBottom: '2.5rem' }}>
          Looking for a Virtual Table Top to gather your friends around? Virtual Combat Simulator makes combat easy. Want to jump into a strategy game? Become a Four Star General and lead your forces to victory! Keyboards slowing you down? Give the video game mode in MasterTyping a try.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('300px'), gap: '1.5rem' }}>
          {freeToStartProducts.map((product) => (
            <article key={product.slug} style={{ background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #f3f4f6' }}>
              <div style={{ background: product.gradient, padding: cardPadding }}>
                <Link href={`/apps/${product.slug}`} aria-label={product.name} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden', marginBottom: '0.75rem', background: 'rgba(255,255,255,0.15)' }}>
                    <Image src={product.icon} alt="" aria-hidden="true" width={56} height={56} sizes="56px" style={{ objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '800', margin: '0 0 0.375rem' }}>{product.name}</h3>
                </Link>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{product.description}</p>
              </div>
              <div style={{ padding: cardPadding, display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#111827', marginBottom: '0.625rem' }}>What free includes</div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {product.freeIncludes.map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9rem', color: '#374151' }}>
                        {check(product.color)}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={`/apps/${product.slug}`} className={touchTargetClassName} style={{ background: product.gradient, color: 'white', padding: '0.875rem 1.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '700', textDecoration: 'none', textAlign: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.18)', width: '100%' }}>
                  Play now
                </Link>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#111827', marginBottom: '0.625rem' }}>What paid adds</div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {product.paidIncludes.map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9rem', color: '#374151' }}>
                        {check(product.color)}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <SubscribeButton
                  planId={product.planId}
                  signInLabel="Sign in to continue"
                  hideForAnonymous
                  style={{
                    background: product.gradient,
                    color: 'white',
                    padding: '0.875rem 1.5rem',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                    textAlign: 'center',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                    width: '100%',
                    display: 'inline-block',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {`Subscribe: $${product.monthlyPrice.toFixed(2)}`}
                </SubscribeButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Premium creative platform */}
      <section style={{ padding: `20px ${pageGutter} 40px`, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('320px'), gap: '1.5rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #1f1147 0%, #4c1d95 100%)', borderRadius: '24px', padding: cardPadding, color: 'white', boxShadow: '0 20px 60px rgba(76,29,149,0.22)' }}>
            <div style={{ maxWidth: '860px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ddd6fe', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Premium creative platform
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '900', margin: '0 0 0.9rem' }}>{premiumProduct.name}</h2>
              <p style={{ fontSize: '1.06rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.88)', margin: '0 0 1.25rem' }}>
                {premiumProduct.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white' }}>${premiumProduct.monthlyPrice.toFixed(2)}</span>
                <span style={{ color: '#ddd6fe', fontSize: '1rem' }}>/month</span>
                <span style={{ color: '#ddd6fe', fontSize: '0.95rem' }}>or ${premiumProduct.yearlyPrice}/year</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'grid', gap: '0.55rem' }}>
                {premiumProduct.includes.map((item) => (
                  <li key={item} style={{ color: '#f5f3ff', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: '#c4b5fd' }}>●</span>{item}
                  </li>
                ))}
              </ul>
              <div className={actionRowClassName}>
                <Link href="/apps/contentcraft" className={touchTargetClassName} style={{ padding: '0.95rem 1.5rem', borderRadius: '999px', background: 'white', color: '#4c1d95', textDecoration: 'none', fontWeight: 800 }}>
                  Explore ContentCraft
                </Link>
                <SubscribeButton planId="contentcraft" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', padding: '0.95rem 1.5rem', borderRadius: '999px', fontSize: '1rem', fontWeight: '800', border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer' }}>
                  Subscribe
                </SubscribeButton>
              </div>
            </div>
          </div>

          <div style={{ background: bundleProduct.gradient, borderRadius: '24px', padding: cardPadding, color: 'white', boxShadow: '0 20px 60px rgba(15,23,42,0.2)' }}>
            <div style={{ maxWidth: '860px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#c7d2fe', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Creative + table top gaming bundle
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '900', margin: '0 0 0.9rem' }}>{bundleProduct.name}</h2>
              <p style={{ fontSize: '1.06rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.88)', margin: '0 0 1.25rem' }}>
                {bundleProduct.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white' }}>${bundleProduct.monthlyPrice.toFixed(2)}</span>
                <span style={{ color: '#c7d2fe', fontSize: '1rem' }}>/month</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'grid', gap: '0.55rem' }}>
                {bundleProduct.includes.map((item) => (
                  <li key={item} style={{ color: '#eef2ff', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: '#a5b4fc' }}>●</span>{item}
                  </li>
                ))}
              </ul>
              <div className={actionRowClassName}>
                <Link href="/apps/virtual-combat-simulator" className={touchTargetClassName} style={{ padding: '0.95rem 1.5rem', borderRadius: '999px', background: 'white', color: '#312e81', textDecoration: 'none', fontWeight: 800 }}>
                  Explore Virtual Combat Simulator
                </Link>
                <SubscribeButton planId="bundle" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', padding: '0.95rem 1.5rem', borderRadius: '999px', fontSize: '1rem', fontWeight: '800', border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer' }}>
                  Subscribe
                </SubscribeButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table - commented out for now */}
      {/* <section style={{ padding: '20px 2rem 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
            Comparison table
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.0625rem', margin: 0 }}>
            The entry point, free offering, and paid offering for each product at a glance.
          </p>
        </div>
        <div style={{ overflowX: 'auto', background: 'white', borderRadius: '20px', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '860px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Product</th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>How you enter</th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What free includes</th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What paid includes</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.product} style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 800, color: '#111827', verticalAlign: 'top' }}>{row.product}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#374151', verticalAlign: 'top' }}>{row.howYouEnter}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#4b5563', lineHeight: 1.7, verticalAlign: 'top' }}>{row.freeIncludes}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#4b5563', lineHeight: 1.7, verticalAlign: 'top' }}>{row.paidIncludes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section> */}
    </div>
  );
}
