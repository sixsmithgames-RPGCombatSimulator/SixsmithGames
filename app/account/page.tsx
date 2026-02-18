/**
 * Sixsmith Games - Account Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import { useUser, SignInButton } from '@clerk/nextjs';
import { getSubscriptionInfo, canAccessApps, APP_URLS } from '@/lib/subscription';

const appDetails = [
  { slug: 'virtual-combat-simulator', name: 'VirtualCombatSimulator', icon: '⚔️', color: '#ef4444' },
  { slug: 'contentcraft', name: 'ContentCraft', icon: '✨', color: '#a855f7' },
  { slug: 'mastertyping', name: 'MasterTyping', icon: '⌨️', color: '#22c55e' },
  { slug: 'gravity', name: 'Gravity', icon: '🚀', color: '#3b82f6' },
  { slug: 'fourstargeneral', name: 'FourStarGeneral', icon: '🎖️', color: '#f59e0b' },
];

export default function AccountPage() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>Loading...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1a202c' }}>Sign in to view your account</h1>
        <SignInButton mode="modal">
          <button style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            fontSize: '1.125rem',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
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

  return (
    <div style={{ background: '#f8f9fa', minHeight: '80vh' }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        padding: '60px 0 40px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {user?.imageUrl && (
              <img
                src={user.imageUrl}
                alt="Profile"
                style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid white', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
              />
            )}
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                {user?.fullName || user?.firstName || 'Your Account'}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.125rem' }}>{email}</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', marginTop: '-20px' }}>
        {/* Subscription Status Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a202c', marginBottom: '0.5rem' }}>
                Subscription
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.25rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  background: hasAccess ? '#dcfce7' : '#fef3c7',
                  color: hasAccess ? '#166534' : '#92400e',
                }}>
                  {sub.isAdmin ? 'Admin Access' : sub.status === 'active' ? 'Active' : sub.status === 'trialing' ? 'Trial' : 'Inactive'}
                </span>
                {sub.plan && (
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {sub.plan}
                  </span>
                )}
              </div>
              {sub.expiresAt && (
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Renews: {new Date(sub.expiresAt).toLocaleDateString()}
                </p>
              )}
            </div>
            {!hasAccess && (
              <a
                href="/pricing"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                }}
              >
                Subscribe Now
              </a>
            )}
          </div>
        </div>

        {/* Your Apps */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a202c', marginBottom: '1.5rem' }}>
            Your Apps
          </h2>
          {!hasAccess && (
            <div style={{
              background: '#fef3c7',
              border: '1px solid #fde68a',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <span style={{ fontSize: '1.25rem' }}>🔒</span>
              <p style={{ color: '#92400e', fontSize: '0.95rem' }}>
                Subscribe to unlock all five applications.{' '}
                <a href="/pricing" style={{ color: '#92400e', fontWeight: '700', textDecoration: 'underline' }}>View pricing</a>
              </p>
            </div>
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem',
          }}>
            {appDetails.map((app) => {
              const url = APP_URLS[app.slug];
              const locked = !hasAccess;
              return (
                <div
                  key={app.slug}
                  style={{
                    border: '2px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    transition: 'all 0.2s ease',
                    opacity: locked ? 0.6 : 1,
                    position: 'relative',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{app.icon}</div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1a202c', marginBottom: '0.5rem' }}>
                    {app.name}
                  </h3>
                  {locked ? (
                    <span style={{
                      display: 'inline-block',
                      padding: '0.4rem 1.25rem',
                      borderRadius: '50px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      background: '#f3f4f6',
                      color: '#6b7280',
                    }}>
                      🔒 Locked
                    </span>
                  ) : (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '0.4rem 1.25rem',
                        borderRadius: '50px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        background: app.color,
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Launch →
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
