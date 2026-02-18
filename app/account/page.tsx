/**
 * Sixsmith Games - Account Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import { useUser, SignInButton } from '@clerk/nextjs';
import { getSubscriptionInfo, canAccessApps, APP_URLS } from '@/lib/subscription';

const appDetails = [
  { slug: 'virtual-combat-simulator', name: 'Virtual Combat Simulator', desc: 'Tactical military combat', icon: '⚔️', color: '#ef4444', bg: '#fef2f2' },
  { slug: 'contentcraft', name: 'ContentCraft', desc: 'AI-powered content creation', icon: '✨', color: '#a855f7', bg: '#faf5ff' },
  { slug: 'mastertyping', name: 'MasterTyping', desc: 'Speed & accuracy training', icon: '⌨️', color: '#22c55e', bg: '#f0fdf4' },
  { slug: 'gravity', name: 'Gravity', desc: 'Space fleet commander', icon: '🚀', color: '#3b82f6', bg: '#eff6ff' },
  { slug: 'fourstargeneral', name: 'Four Star General', desc: 'Strategic war simulation', icon: '🎖️', color: '#f59e0b', bg: '#fffbeb' },
];

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function StatusBadge({ active, label }: { active: boolean; label: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '0.3rem 0.875rem', borderRadius: '999px', fontSize: '0.8125rem', fontWeight: '600',
      background: active ? '#dcfce7' : '#f3f4f6',
      color: active ? '#15803d' : '#6b7280',
    }}>
      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: active ? '#22c55e' : '#9ca3af', display: 'inline-block' }} />
      {label}
    </span>
  );
}

export default function AccountPage() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #e5e7eb', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>Loading your account...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem' }}>
        <div style={{ fontSize: '3rem' }}>🔐</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827', margin: 0 }}>Sign in to view your account</h1>
        <p style={{ color: '#6b7280', fontSize: '1rem', margin: 0 }}>Access your subscription, billing, and apps.</p>
        <SignInButton mode="modal">
          <button style={{
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: 'white',
            padding: '0.875rem 2.5rem', borderRadius: '10px', fontSize: '1rem',
            fontWeight: '700', border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(124,58,237,0.4)',
          }}>
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }

  const email = user?.primaryEmailAddress?.emailAddress;
  const sub = getSubscriptionInfo(user?.publicMetadata, email);
  const hasAccess = canAccessApps(user?.publicMetadata, email);
  const isActive = hasAccess;

  const card: React.CSSProperties = {
    background: 'white', borderRadius: '16px', padding: '1.75rem 2rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
    border: '1px solid #f3f4f6', marginBottom: '1.5rem',
  };

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Hero header */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #4c1d95 100%)', padding: '3rem 2rem 5rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="Avatar" style={{ width: '72px', height: '72px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.4)', flexShrink: 0 }} />
          ) : (
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>
              {(user?.firstName?.[0] || email?.[0] || '?').toUpperCase()}
            </div>
          )}
          <div>
            <h1 style={{ color: 'white', fontSize: '1.625rem', fontWeight: '800', margin: '0 0 0.25rem', letterSpacing: '-0.02em' }}>
              {user?.fullName || user?.firstName || 'My Account'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem', margin: 0 }}>{email}</p>
            {sub.memberSince && (
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', margin: '0.25rem 0 0' }}>
                Member since {fmt(sub.memberSince)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '-3rem auto 0', padding: '0 2rem 4rem' }}>

        {/* ── Subscription card ── */}
        <div style={{ ...card, marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', margin: 0 }}>Subscription</h2>
                <StatusBadge active={isActive} label={sub.isAdmin ? 'Admin' : isActive ? (sub.plan || 'Active') : 'No Plan'} />
              </div>

              {isActive ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem' }}>
                  {sub.plan && (
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.25rem' }}>Plan</p>
                      <p style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', margin: 0 }}>Sixsmith Games {sub.plan}</p>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.125rem 0 0' }}>$19.99 / month</p>
                    </div>
                  )}
                  {sub.nextBillingDate && (
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.25rem' }}>Next Billing Date</p>
                      <p style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', margin: 0 }}>{fmt(sub.nextBillingDate)}</p>
                    </div>
                  )}
                  {sub.billingHistory.length > 0 && (
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.25rem' }}>Last Payment</p>
                      <p style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', margin: 0 }}>${sub.billingHistory[0].amount.toFixed(2)}</p>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.125rem 0 0' }}>{fmt(sub.billingHistory[0].date)}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <p style={{ color: '#6b7280', fontSize: '0.9375rem', margin: 0 }}>
                    You don&apos;t have an active subscription. Subscribe to unlock all 5 apps.
                  </p>
                  <a href="/pricing" style={{
                    display: 'inline-block', background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                    color: 'white', padding: '0.625rem 1.5rem', borderRadius: '8px',
                    fontWeight: '700', fontSize: '0.9375rem', textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(124,58,237,0.35)', whiteSpace: 'nowrap',
                  }}>
                    Subscribe Now →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── App Access ── */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', margin: 0 }}>Your Apps</h2>
            {isActive && (
              <span style={{ fontSize: '0.8125rem', color: '#22c55e', fontWeight: '600' }}>✓ Full Access</span>
            )}
          </div>

          {!isActive && (
            <div style={{
              background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px',
              padding: '0.875rem 1.25rem', marginBottom: '1.25rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <span>🔒</span>
              <p style={{ color: '#92400e', fontSize: '0.9rem', margin: 0 }}>
                Subscribe to unlock all apps.{' '}
                <a href="/pricing" style={{ color: '#b45309', fontWeight: '700' }}>View plans</a>
              </p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {appDetails.map((app) => {
              const locked = !hasAccess;
              return (
                <div key={app.slug} style={{
                  border: `1.5px solid ${locked ? '#e5e7eb' : app.color + '33'}`,
                  borderRadius: '12px', padding: '1.25rem',
                  background: locked ? '#fafafa' : app.bg,
                  opacity: locked ? 0.7 : 1,
                  display: 'flex', flexDirection: 'column', gap: '0.5rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{app.icon}</span>
                    <div>
                      <p style={{ fontSize: '0.9375rem', fontWeight: '700', color: '#111827', margin: 0 }}>{app.name}</p>
                      <p style={{ fontSize: '0.8125rem', color: '#6b7280', margin: 0 }}>{app.desc}</p>
                    </div>
                  </div>
                  {locked ? (
                    <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: '600' }}>🔒 Locked — subscribe to access</span>
                  ) : (
                    <a href={APP_URLS[app.slug]} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      fontSize: '0.875rem', fontWeight: '700', color: app.color,
                      textDecoration: 'none', marginTop: '0.25rem',
                    }}>
                      Launch app →
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Billing History ── */}
        {isActive && sub.billingHistory.length > 0 && (
          <div style={card}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', margin: '0 0 1.25rem' }}>Billing History</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                    {['Date', 'Description', 'Amount', 'Status'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sub.billingHistory.map((rec) => (
                    <tr key={rec.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                      <td style={{ padding: '0.875rem 0.75rem', color: '#374151', whiteSpace: 'nowrap' }}>{fmt(rec.date)}</td>
                      <td style={{ padding: '0.875rem 0.75rem', color: '#374151' }}>{rec.description}</td>
                      <td style={{ padding: '0.875rem 0.75rem', color: '#111827', fontWeight: '600', whiteSpace: 'nowrap' }}>${rec.amount.toFixed(2)}</td>
                      <td style={{ padding: '0.875rem 0.75rem' }}>
                        <span style={{
                          display: 'inline-block', padding: '0.2rem 0.75rem', borderRadius: '999px',
                          fontSize: '0.75rem', fontWeight: '700',
                          background: rec.status === 'paid' ? '#dcfce7' : rec.status === 'failed' ? '#fee2e2' : '#f3f4f6',
                          color: rec.status === 'paid' ? '#15803d' : rec.status === 'failed' ? '#dc2626' : '#6b7280',
                        }}>
                          {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Subscribe CTA for non-subscribers ── */}
        {!isActive && (
          <div style={{
            ...card,
            background: 'linear-gradient(135deg, #1e3a8a 0%, #4c1d95 100%)',
            border: 'none', textAlign: 'center', padding: '3rem 2rem',
          }}>
            <p style={{ fontSize: '1.75rem', margin: '0 0 0.5rem' }}>🎮</p>
            <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.75rem' }}>
              Unlock All 5 Apps
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', margin: '0 0 1.75rem', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
              Get full access to Virtual Combat Simulator, ContentCraft, MasterTyping, Gravity, and Four Star General for one low monthly price.
            </p>
            <a href="/pricing" style={{
              display: 'inline-block', background: 'white', color: '#1e3a8a',
              padding: '0.875rem 2.5rem', borderRadius: '10px', fontWeight: '800',
              fontSize: '1.0625rem', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            }}>
              View Plans & Pricing →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
