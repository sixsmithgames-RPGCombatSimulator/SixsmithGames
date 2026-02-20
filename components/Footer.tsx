/**
 * Footer Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import Link from 'next/link';

const linkStyle: React.CSSProperties = {
  color: '#9ca3af',
  textDecoration: 'none',
  fontSize: '0.9375rem',
  lineHeight: '1.75',
  transition: 'color 0.15s',
  display: 'block',
};

const headingStyle: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '0.8125rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: '1.25rem',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#0f1117', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem 2rem' }}>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 2', minWidth: '220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem',
              }}>🎮</div>
              <span style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: '800', letterSpacing: '-0.01em' }}>
                Sixsmith Games
              </span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: '1.7', maxWidth: '320px', margin: '0 0 1.5rem' }}>
              Professional tools for game masters, content creators, and strategy enthusiasts.
            </p>
            <a
              href="mailto:info@sixsmithgames.com"
              style={{ color: '#818cf8', fontSize: '0.875rem', textDecoration: 'none', fontWeight: '500' }}
            >
              info@sixsmithgames.com
            </a>
          </div>

          {/* Apps */}
          <div>
            <p style={headingStyle}>Applications</p>
            <Link href="/apps/virtual-combat-simulator" style={linkStyle}>Virtual Combat Simulator</Link>
            <Link href="/apps/contentcraft" style={linkStyle}>ContentCraft</Link>
            <Link href="/apps/mastertyping" style={linkStyle}>MasterTyping</Link>
            <Link href="/apps/gravity" style={linkStyle}>Gravity</Link>
            <Link href="/apps/fourstargeneral" style={linkStyle}>Four Star General</Link>
          </div>

          {/* Company */}
          <div>
            <p style={headingStyle}>Company</p>
            <Link href="/pricing" style={linkStyle}>Pricing</Link>
            <Link href="/account" style={linkStyle}>My Account</Link>
            <Link href="/sign-in" style={linkStyle}>Sign In</Link>
            <Link href="/sign-up" style={linkStyle}>Get Started</Link>
          </div>

        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-between', gap: '1rem',
          }}>
            <p style={{ color: '#4b5563', fontSize: '0.8125rem', margin: 0 }}>
              &copy; {currentYear} Sixsmith Games. All rights reserved.
            </p>
            <p style={{ color: '#374151', fontSize: '0.75rem', margin: 0, textAlign: 'right' }}>
              Virtual Combat Simulator, ContentCraft, MasterTyping, Gravity, and Four Star General are trademarks of Sixsmith Games.
              Prices shown exclude applicable taxes.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
