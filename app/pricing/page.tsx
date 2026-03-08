/**
 * Sixsmith Games - Pricing Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import SubscribeButton from '@/components/SubscribeButton';
import ModernBackground from '@/components/ModernBackground';

const creatorPlans = [
  {
    slug: 'contentcraft',
    name: 'ContentCraft',
    icon: '/icons/contentcraft.png',
    price: 9.99,
    yearlyPrice: 99,
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
    description: 'Write lore, shape campaigns, track characters and factions, and keep your world consistent with AI-assisted tools.',
    features: ['Unlimited projects', 'Lore and canon tracking', 'Character and faction relationship tracking', 'Adventure and worldbuilding templates'],
    secondaryFeatures: ['Use your own AI keys', 'Export tools', '100 bonus AI credits each month', 'Bonus credits stay for 60 days'],
    trial: ['1 project', 'Limited export', 'Limited lore tools', 'Sample AI credits'],
  },
  {
    slug: 'virtual-combat-simulator',
    name: 'Virtual Combat Simulator',
    icon: '/icons/vcs.png',
    price: 9.99,
    yearlyPrice: 99,
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
    description: 'Run encounters, upload maps, make custom monsters, and host private campaigns at your table.',
    features: ['Unlimited active games', 'Custom monsters', 'House rules and custom systems', 'Campaign libraries'],
    secondaryFeatures: ['Saved encounter setups', 'Live table sync', 'Import/export tools', 'Upload your own maps'],
    freePlan: ['Join unlimited games', 'Create 1 room or run 1 active game', 'Up to 4 custom characters', 'Core rules content'],
  },
];

const freeApps = [
  {
    slug: 'gravity',
    name: 'Gravity',
    icon: '/icons/gravity.png',
    color: '#2563eb',
    gradient: 'linear-gradient(135deg, #2563eb, #06b6d4)',
    description: 'Play the full core game free, then unlock more captains, crews, upgrades, and ship designs for new tactics and fleet builds.',
    freeCore: ['1 captain', '1 crew set', 'Core upgrade pool', '3 ship designs'],
    monetization: ['Captains from $2.99', 'Crew packs from $1.99', 'Upgrade packs from $2.99', 'Founder Fleet $24.99'],
  },
  {
    slug: 'fourstargeneral',
    name: 'Four Star General',
    icon: '/icons/fourstargeneral.png',
    color: '#b45309',
    gradient: 'linear-gradient(135deg, #b45309, #f5c46d)',
    description: 'Play the full core game free, then unlock more colleges, factions, branches, campaigns, and battle packs for more strategies and more replayability.',
    freeCore: ['Tutorial campaign', '2 colleges', '2 factions', 'Core unit roster'],
    monetization: ['Colleges from $2.99', 'Factions from $2.99', 'Branch packs from $1.99', 'Complete War Chest $24.99'],
  },
  {
    slug: 'mastertyping',
    name: 'MasterTyping',
    icon: '/icons/mastertyping.png',
    color: '#16a34a',
    gradient: 'linear-gradient(135deg, #16a34a, #84cc16)',
    description: 'Free typing adventure with kid-friendly practice, challenge modes, and progress tracking.',
    features: ['Game mode', 'Pro mode', 'Assessment mode', 'Progress tracking'],
  },
];

export default function PricingPage() {
  const creatorBundlePrice = 17.99;
  const creatorBundleYearlyPrice = 179;
  const creatorBundleSavings = creatorPlans.reduce((sum, plan) => sum + plan.price, 0) - creatorBundlePrice;

  const betaLabel = (slug: string) => {
    if (slug === 'contentcraft' || slug === 'virtual-combat-simulator') return 'Beta';
    if (slug === 'gravity' || slug === 'fourstargeneral') return 'Early Beta';
    return null;
  };

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
            Choose Your Way to Play
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.375rem)', color: 'rgba(255,255,255,0.92)', margin: 0 }}>
            Build worlds, run the table, and jump into strategy your way. Pick creator plans for the tools you use every week, or play free and unlock more options when you want them.
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
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fde68a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Most Popular</span>
            </div>
            <h2 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '900', margin: '0 0 0.75rem' }}>
              Creator Bundle
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.0625rem', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
              Get ContentCraft Creator and VCS Game Master together. Save ${creatorBundleSavings.toFixed(2)}/month and keep your lore, prep, maps, and encounters together.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {creatorPlans.map(p => (
                <span key={p.slug} style={{ background: 'rgba(255,255,255,0.12)', color: 'white', borderRadius: '999px', padding: '0.3rem 0.875rem', fontSize: '0.875rem', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Image src={p.icon} alt="" aria-hidden="true" width={16} height={16} style={{ borderRadius: '3px', objectFit: 'cover' }} /> {p.name}
                </span>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '4px' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.5rem', marginTop: '0.5rem' }}>$</span>
              <span style={{ color: 'white', fontSize: 'clamp(3.5rem, 8vw, 5rem)', fontWeight: '900', lineHeight: 1 }}>{creatorBundlePrice.toFixed(2)}</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', alignSelf: 'flex-end', marginBottom: '0.5rem' }}>/mo</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', margin: '0.25rem 0 1.5rem' }}>
              or ${creatorBundleYearlyPrice}/year
            </p>
            <Link href="/apps/contentcraft" style={{
              background: 'white', color: '#4c1d95',
              padding: '1rem 2.5rem', borderRadius: '50px',
              fontSize: '1.0625rem', fontWeight: '800', textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)', whiteSpace: 'nowrap', display: 'inline-block',
            }}>
              See Creator Plans
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '0.75rem' }}>Best value if you use both every month</p>
          </div>
        </div>
      </section>

      {/* Creator plans */}
      <section style={{ padding: '60px 2rem 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
          Tools for Writers, GMs, and Worldbuilders
        </h2>
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '1.0625rem', marginBottom: '2.5rem' }}>
          For the apps you keep open while building lore, prepping sessions, and running the table.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {creatorPlans.map((plan) => (
            <div key={plan.slug} style={{ background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #f3f4f6' }}>
              <div style={{ background: plan.gradient, padding: '1.75rem 1.75rem 1.5rem' }}>
                <Link href={`/apps/${plan.slug}`} aria-label={plan.name} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden', marginBottom: '0.75rem', background: 'rgba(255,255,255,0.15)' }}>
                    <Image src={plan.icon} alt="" aria-hidden="true" width={56} height={56} style={{ objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '800', margin: '0 0 0.375rem' }}>{plan.name}</h3>
                </Link>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{plan.description}</p>
              </div>
              <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '2.25rem', fontWeight: '900', color: '#111827' }}>${plan.price.toFixed(2)}</span>
                  <span style={{ color: '#6b7280', fontSize: '1rem' }}>/month</span>
                  <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>or ${plan.yearlyPrice}/year</span>
                  {betaLabel(plan.slug) && (
                    <span style={{ background: '#fef3c7', color: '#b45309', borderRadius: '999px', padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 700 }}>
                      {betaLabel(plan.slug)}
                    </span>
                  )}
                </div>

                {'trial' in plan && plan.trial ? (
                  <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '1rem', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827', marginBottom: '0.625rem' }}>Try it free with</div>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {plan.trial.map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9rem', color: '#374151' }}>
                          {check(plan.color)}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {'freePlan' in plan && plan.freePlan ? (
                  <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '1rem', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827', marginBottom: '0.625rem' }}>Play free with</div>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {plan.freePlan.map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9rem', color: '#374151' }}>
                          {check(plan.color)}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
                  {plan.features.map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9375rem', color: '#374151' }}>
                      {check(plan.color)}
                      {item}
                    </li>
                  ))}
                  {plan.secondaryFeatures.map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9375rem', color: '#374151' }}>
                      {check(plan.color)}
                      {item}
                    </li>
                  ))}
                </ul>

                <SubscribeButton planId={plan.slug} style={{ background: plan.gradient, color: 'white', padding: '0.875rem 1.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '700', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.18)', width: '100%' }}>
                  {plan.slug === 'contentcraft' ? `Get Creator Plan — $${plan.price.toFixed(2)}/mo` : `Unlock Game Master — $${plan.price.toFixed(2)}/mo`}
                </SubscribeButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Free core games */}
      <section style={{ padding: '20px 2rem 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
          Play Free. Unlock More.
        </h2>
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '1.0625rem', marginBottom: '2.5rem' }}>
          Play the full core game free. Unlock more captains, factions, branches, ships, and other options when you want more ways to play.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {freeApps.map((plan) => (
            <div key={plan.slug} style={{ background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #f3f4f6' }}>
              <div style={{ background: plan.gradient, padding: '1.75rem 1.75rem 1.5rem' }}>
                <Link href={`/apps/${plan.slug}`} aria-label={plan.name} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden', marginBottom: '0.75rem', background: 'rgba(255,255,255,0.15)' }}>
                    <Image src={plan.icon} alt="" aria-hidden="true" width={56} height={56} style={{ objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '800', margin: '0 0 0.375rem' }}>{plan.name}</h3>
                </Link>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{plan.description}</p>
              </div>
              <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '900', color: '#111827' }}>{plan.slug === 'mastertyping' ? 'Free' : 'Play Free'}</span>
                  {betaLabel(plan.slug) && (
                    <span style={{ background: '#fef3c7', color: '#b45309', borderRadius: '999px', padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 700 }}>
                      {betaLabel(plan.slug)}
                    </span>
                  )}
                </div>

                {'freeCore' in plan && plan.freeCore ? (
                  <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#111827', marginBottom: '0.625rem', letterSpacing: '0.01em' }}>Included free</div>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {plan.freeCore.map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9rem', color: '#374151' }}>
                          {check(plan.color)}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {'monetization' in plan && plan.monetization ? (
                  <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#111827', marginBottom: '0.625rem', letterSpacing: '0.01em' }}>Unlock more options</div>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {plan.monetization.map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9rem', color: '#374151' }}>
                          {check(plan.color)}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {'features' in plan && plan.features ? (
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
                    {plan.features.map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9375rem', color: '#374151' }}>
                        {check(plan.color)}
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : <div style={{ flex: 1 }} />}

                {plan.slug === 'mastertyping' ? (
                  <SubscribeButton planId={plan.slug} signInLabel="Sign Up" style={{ background: plan.gradient, color: 'white', padding: '0.875rem 1.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '700', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.18)', width: '100%' }}>
                    Play Free
                  </SubscribeButton>
                ) : (
                  <Link href={`/apps/${plan.slug}`} style={{ background: plan.gradient, color: 'white', padding: '0.875rem 1.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '700', textDecoration: 'none', textAlign: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.18)', width: '100%', display: 'inline-block' }}>
                    {plan.slug === 'gravity' ? 'See Fleet Unlocks' : 'See War Unlocks'}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company bundles */}
      <section style={{ padding: '20px 2rem 50px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Bundle</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', margin: '0 0 0.5rem' }}>Creator Bundle</h3>
            <p style={{ color: '#6b7280', margin: '0 0 1rem', lineHeight: 1.6 }}>One bundle for worldbuilding, session prep, and running the table.</p>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#111827', marginBottom: '0.75rem' }}>$17.99<span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: 500 }}>/month</span></div>
            <div style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '1rem' }}>or $179/year</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['ContentCraft Creator', 'VCS Game Master', 'Best value if you use both every month', 'Best place to start'].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', color: '#374151' }}>
                  {check('#4c1d95')}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Bundle</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', margin: '0 0 0.5rem' }}>Strategy Bundle</h3>
            <p style={{ color: '#6b7280', margin: '0 0 1rem', lineHeight: 1.6 }}>One bundle that opens up all launch content in Gravity and Four Star General.</p>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#111827', marginBottom: '0.75rem' }}>$29.99<span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: 500 }}> one-time</span></div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['All launch Gravity unlocks', 'All launch Four Star General unlocks', 'Buy once, keep it', 'Best pick if you want both strategy games fully opened up'].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', color: '#374151' }}>
                  {check('#1e3a8a')}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Launch guidance */}
      <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', margin: '0 0 1rem', textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
          Pick Your Path
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.125rem', margin: '0 0 2rem', maxWidth: '860px', marginInline: 'auto' }}>
          Build worlds, run battles, or jump into strategy for free—then unlock more when you’re ready for new ways to play.
        </p>
        <Link href="/apps/contentcraft" style={{ background: 'white', color: '#4c1d95', padding: '1.125rem 3rem', borderRadius: '50px', fontSize: '1.125rem', fontWeight: '800', textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.25)', display: 'inline-block' }}>
          Explore the Apps
        </Link>
      </section>
    </div>
  );
}
