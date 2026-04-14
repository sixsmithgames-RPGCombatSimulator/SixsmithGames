/**
 * Footer Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import Link from 'next/link';
import Image from 'next/image';

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

const legalLinkStyle: React.CSSProperties = {
  color: '#6b7280',
  textDecoration: 'none',
  fontSize: '0.75rem',
  fontWeight: '600',
  transition: 'color 0.15s',
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
            <div style={{ marginBottom: '1rem' }}>
              <Image
                src="/icons/sixsmith-logo.png"
                alt="Sixsmith Games"
                width={256}
                height={256}
                style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: '1.7', maxWidth: '320px', margin: '0 0 1.5rem' }}>
              Thoughtful games and creative tools for people who care about systems, craft, and meaningful play.
            </p>
            <a
              href="mailto:info@sixsmithgames.com"
              style={{ color: '#818cf8', fontSize: '0.875rem', textDecoration: 'none', fontWeight: '500' }}
            >
              info@sixsmithgames.com
            </a>
          </div>

          {/* Tools */}
          <div>
            <p style={headingStyle}>Tools</p>
            <Link href="/apps/virtual-combat-simulator" style={linkStyle}>Virtual Combat Simulator</Link>
            <Link href="/apps/contentcraft" style={linkStyle}>ContentCraft</Link>
          </div>

          {/* Games */}
          <div>
            <p style={headingStyle}>Games</p>
            <Link href="/apps/fourstargeneral" style={linkStyle}>Four Star General</Link>
            <Link href="/apps/mastertyping" style={linkStyle}>MasterTyping</Link>
          </div>

          {/* Company */}
          <div>
            <p style={headingStyle}>Company</p>
            <Link href="/pricing" style={linkStyle}>Pricing</Link>
            <Link href="/about" style={linkStyle}>About</Link>
            <Link href="/blog" style={linkStyle}>Blog</Link>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/terms" style={legalLinkStyle}>Terms of Service</Link>
              <span style={{ color: '#374151', fontSize: '0.75rem' }}>•</span>
              <Link href="/privacy" style={legalLinkStyle}>Privacy Policy</Link>
            </div>
            <p style={{ color: '#374151', fontSize: '0.75rem', margin: 0, textAlign: 'right' }}>
              Use of this software constitues acceptance of terms. Virtual Combat Simulator, ContentCraft, MasterTyping, Gravity, and Four Star General are trademarks of Sixsmith Games. Prices shown exclude applicable taxes.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
