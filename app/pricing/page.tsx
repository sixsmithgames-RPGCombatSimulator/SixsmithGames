/**
 * Sixsmith Games - Pricing Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import SubscribeButton from '@/components/SubscribeButton';
import ModernBackground from '@/components/ModernBackground';
import { formatMonthlyPrice, pricingCatalog } from '@/lib/pricingCatalog';

const monthlyPlans = [
  pricingCatalog.contentcraft,
  pricingCatalog['virtual-combat-simulator'],
  pricingCatalog.fourstargeneral,
  pricingCatalog.mastertyping,
];

const bundlePlan = pricingCatalog.bundle;

export default function PricingPage() {
  const check = (color: string) => (
    <svg style={{ width: '18px', height: '18px', flexShrink: 0, marginTop: '2px' }} fill="none" stroke={color} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div style={{ background: '#f8f9fa' }}>
      <section style={{ background: 'linear-gradient(135deg, #312e81 0%, #6d28d9 55%, #f43f5e 100%)', padding: '88px 0 76px', position: 'relative', overflow: 'hidden' }}>
        <ModernBackground />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.2)', zIndex: 1 }} />
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.55rem 1rem', borderRadius: '999px', background: 'rgba(255,255,255,0.14)', color: 'white', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1.2rem', border: '1px solid rgba(255,255,255,0.2)' }}>
            Monthly plans
          </div>
          <h1 style={{ fontSize: 'clamp(2.6rem, 7vw, 4.4rem)', fontWeight: 900, color: 'white', margin: '0 0 1rem', textShadow: '0 8px 30px rgba(15,23,42,0.25)' }}>
            Clear pricing, direct checkout.
          </h1>
          <p style={{ maxWidth: '760px', margin: '0 auto 1.25rem', fontSize: 'clamp(1.08rem, 2.4vw, 1.35rem)', lineHeight: 1.7, color: 'rgba(255,255,255,0.92)' }}>
            Every plan below is monthly. Choose the product you want, see the cost, and go straight to checkout.
          </p>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.76)', fontSize: '0.98rem' }}>
            The bundle includes ContentCraft and Virtual Combat Simulator together.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '56px 2rem 30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {monthlyPlans.map((plan) => (
            <article
              key={plan.planId}
              style={{
                background: 'white',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                boxShadow: '0 20px 45px rgba(15,23,42,0.07)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ background: plan.gradient, padding: '1.5rem 1.5rem 1.35rem', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
                  {plan.icon ? (
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', overflow: 'hidden', background: 'rgba(255,255,255,0.18)', flexShrink: 0 }}>
                      <Image src={plan.icon} alt="" aria-hidden="true" width={52} height={52} style={{ objectFit: 'cover' }} />
                    </div>
                  ) : null}
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>{plan.name}</h2>
                    <div style={{ marginTop: '0.25rem', fontSize: '0.95rem', color: 'rgba(255,255,255,0.84)' }}>Monthly plan</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '2.25rem', fontWeight: 900 }}>{`$${plan.monthlyPrice.toFixed(2)}`}</span>
                  <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.82)' }}>/month</span>
                </div>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.15rem', flex: 1 }}>
                <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.65 }}>{plan.summary}</p>

                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.7rem' }}>
                  {plan.highlights.map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: '#334155', fontSize: '0.95rem' }}>
                      {check(plan.color)}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'grid', gap: '0.8rem', marginTop: 'auto' }}>
                  <SubscribeButton
                    planId={plan.planId}
                    signInLabel="Sign in to continue"
                    style={{
                      width: '100%',
                      background: plan.gradient,
                      color: 'white',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '0.95rem 1.2rem',
                      fontSize: '1rem',
                      fontWeight: 800,
                      boxShadow: '0 10px 24px rgba(15,23,42,0.16)',
                      cursor: 'pointer',
                    }}
                  >
                    {`Pay ${formatMonthlyPrice(plan.monthlyPrice)}`}
                  </SubscribeButton>

                  {plan.slug ? (
                    <Link
                      href={`/apps/${plan.slug}`}
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: '#334155',
                        borderRadius: '14px',
                        padding: '0.9rem 1.2rem',
                        border: '1px solid #dbe2ea',
                        fontWeight: 700,
                        background: '#f8fafc',
                      }}
                    >
                      View product
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '18px 2rem 68px' }}>
        <div style={{ background: bundlePlan.gradient, borderRadius: '28px', padding: '2.2rem', color: 'white', boxShadow: '0 26px 60px rgba(76,29,149,0.22)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: '0.7rem' }}>
                Bundle
              </div>
              <h2 style={{ margin: '0 0 0.8rem', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 900 }}>{bundlePlan.name}</h2>
              <p style={{ margin: '0 0 1.1rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.7 }}>
                {bundlePlan.summary}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.35rem' }}>
                <span style={{ fontSize: '2.35rem', fontWeight: 900 }}>{`$${bundlePlan.monthlyPrice.toFixed(2)}`}</span>
                <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)' }}>/month</span>
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.65rem' }}>
                {bundlePlan.highlights.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: '#f5f3ff' }}>
                    <span style={{ color: '#ddd6fe' }}>●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '22px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.18)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.8rem' }}>Includes</div>
              <div style={{ display: 'grid', gap: '0.8rem', marginBottom: '1.35rem' }}>
                <Link href="/apps/contentcraft" style={{ color: 'white', textDecoration: 'none', padding: '0.85rem 1rem', borderRadius: '14px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', fontWeight: 700 }}>
                  ContentCraft
                </Link>
                <Link href="/apps/virtual-combat-simulator" style={{ color: 'white', textDecoration: 'none', padding: '0.85rem 1rem', borderRadius: '14px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', fontWeight: 700 }}>
                  Virtual Combat Simulator
                </Link>
              </div>
              <SubscribeButton
                planId="bundle"
                signInLabel="Sign in to continue"
                style={{
                  width: '100%',
                  background: 'white',
                  color: '#4c1d95',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '1rem 1.2rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                {`Pay ${formatMonthlyPrice(bundlePlan.monthlyPrice)}`}
              </SubscribeButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
