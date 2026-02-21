/**
 * Navigation Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsDropdownOpen, setAppsDropdownOpen] = useState(false);
  const { user } = useUser();

  const apps = [
    { name: 'VirtualCombatSimulator', href: '/apps/virtual-combat-simulator' },
    { name: 'ContentCraft', href: '/apps/contentcraft' },
    { name: 'MasterTyping', href: '/apps/mastertyping' },
    { name: 'Gravity', href: '/apps/gravity' },
    { name: 'FourStarGeneral', href: '/apps/fourstargeneral' },
  ];

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '68px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 1px 12px rgba(0,0,0,0.08)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
  };

  const innerStyle: React.CSSProperties = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 2rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '1.375rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textDecoration: 'none',
    letterSpacing: '-0.02em',
  };

  const linkStyle: React.CSSProperties = {
    color: '#374151',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.9375rem',
    padding: '0.25rem 0',
    transition: 'color 0.15s',
  };

  const signInStyle: React.CSSProperties = {
    color: '#374151',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9375rem',
    padding: '0.5rem 1.25rem',
    borderRadius: '8px',
    border: '1.5px solid #d1d5db',
    transition: 'all 0.15s',
    backgroundColor: 'transparent',
  };

  const ctaStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '0.9375rem',
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(124,58,237,0.35)',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    minWidth: '220px',
    zIndex: 10000,
    overflow: 'hidden',
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={innerStyle}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <Image
              src="https://res.cloudinary.com/dxz6khmew/image/upload/f_auto,q_auto/sixsmith-games/sixsmith-games/logo/sixsmith-logo.png"
              alt="Sixsmith Games"
              width={40}
              height={40}
              style={{ display: 'block' }}
            />
            <span style={logoStyle}>Sixsmith Games</span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {/* Apps dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setAppsDropdownOpen(!appsDropdownOpen)}
                onBlur={() => setTimeout(() => setAppsDropdownOpen(false), 150)}
                style={{
                  ...linkStyle,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Apps
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {appsDropdownOpen && (
                <div style={dropdownStyle}>
                  {apps.map((app) => (
                    <Link
                      key={app.href}
                      href={app.href}
                      onClick={() => setAppsDropdownOpen(false)}
                      style={{
                        display: 'block',
                        padding: '0.75rem 1.25rem',
                        color: '#374151',
                        textDecoration: 'none',
                        fontSize: '0.9375rem',
                        fontWeight: '500',
                        borderBottom: '1px solid #f3f4f6',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {app.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/pricing" style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#2563eb')}
              onMouseLeave={e => (e.currentTarget.style.color = '#374151')}
            >
              Pricing
            </Link>

            <Link href="/blog" style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#2563eb')}
              onMouseLeave={e => (e.currentTarget.style.color = '#374151')}
            >
              Blog
            </Link>

            {/* Auth section */}
            <SignedIn>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/account" style={{
                  color: '#374151',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '0.9375rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#2563eb')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#374151')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                  {user?.firstName || 'Account'}
                </Link>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: { width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #e5e7eb' },
                    },
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" style={signInStyle}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.color = '#2563eb'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#374151'; }}
              >
                Sign In
              </Link>
              <Link href="/sign-up" style={ctaStyle}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(124,58,237,0.35)')}
              >
                Get Started →
              </Link>
            </SignedOut>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
            className="mobile-menu-btn"
          >
            <svg width="24" height="24" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '68px',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          zIndex: 9998,
          padding: '1rem 2rem 1.5rem',
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Apps
          </div>
          {apps.map((app) => (
            <Link key={app.href} href={app.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'block', padding: '0.625rem 0', color: '#374151', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', borderBottom: '1px solid #f3f4f6' }}
            >
              {app.name}
            </Link>
          ))}
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}
            style={{ display: 'block', padding: '0.75rem 0', color: '#374151', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', borderBottom: '1px solid #f3f4f6' }}
          >
            Pricing
          </Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)}
            style={{ display: 'block', padding: '0.75rem 0', color: '#374151', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', borderBottom: '1px solid #f3f4f6' }}
          >
            Blog
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem' }}>
            <SignedIn>
              <Link href="/account" onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', color: '#374151', textDecoration: 'none', fontWeight: '600', fontSize: '1rem', backgroundColor: '#f9fafb' }}
              >
                {user?.imageUrl && (
                  <img src={user.imageUrl} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                )}
                <span>{user?.firstName || 'My Account'}</span>
              </Link>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }}>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'block', textAlign: 'center', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: '8px', color: '#374151', textDecoration: 'none', fontWeight: '600', fontSize: '1rem' }}
              >
                Sign In
              </Link>
              <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'block', textAlign: 'center', padding: '0.75rem', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', borderRadius: '8px', color: '#ffffff', textDecoration: 'none', fontWeight: '700', fontSize: '1rem' }}
              >
                Get Started →
              </Link>
            </SignedOut>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
