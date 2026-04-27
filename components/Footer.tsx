/**
 * Footer Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import Link from 'next/link';
import Image from 'next/image';
import { fluidGrid, pageGutter, touchTargetClassName } from '@/lib/responsive';

const linkStyle: React.CSSProperties = {
  color: '#9ca3af',
  textDecoration: 'none',
  fontSize: '0.9375rem',
  lineHeight: '1.75',
  transition: 'color 0.15s',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
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
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#0f1117', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `4rem ${pageGutter} 2rem` }}>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: fluidGrid('180px'),
          gap: '3rem',
          marginBottom: '3rem',
        }}>

          {/* Brand */}
          <div className="footer-brand" style={{ minWidth: 0 }}>
            <div style={{ marginBottom: '1rem' }}>
              <Image
                src="/icons/sixsmith-logo.png"
                alt="Sixsmith Games"
                width={256}
                height={256}
                sizes="(max-width: 768px) 180px, 256px"
                style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: '1.7', maxWidth: '320px', margin: '0 0 1.5rem' }}>
              Browser-based games and creative tools for game masters, writers, worldbuilders, strategy players, and people who want practical typing improvement.
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
            <Link href="/apps/virtual-combat-simulator" style={linkStyle} className={touchTargetClassName}>Virtual Combat Simulator</Link>
            <Link href="/apps/gamemastercraft" style={linkStyle} className={touchTargetClassName}>GameMasterCraft</Link>
            <Link href="/apps/sagacraft" style={linkStyle} className={touchTargetClassName}>SagaCraft</Link>
            <Link href="/apps/gravity" style={linkStyle} className={touchTargetClassName}>Gravity</Link>
          </div>

          {/* Games */}
          <div>
            <p style={headingStyle}>Games</p>
            <Link href="/apps/fourstargeneral" style={linkStyle} className={touchTargetClassName}>Four Star General</Link>
            <Link href="/apps/mastertyping" style={linkStyle} className={touchTargetClassName}>MasterTyping</Link>
          </div>

          {/* Company */}
          <div>
            <p style={headingStyle}>Company</p>
            <Link href="/pricing" style={linkStyle} className={touchTargetClassName}>Pricing</Link>
            <Link href="/about" style={linkStyle} className={touchTargetClassName}>About</Link>
            <Link href="/about/facts" style={linkStyle} className={touchTargetClassName}>Facts</Link>
            <Link href="/blog" style={linkStyle} className={touchTargetClassName}>Blog</Link>
            <Link href="/articles" style={linkStyle} className={touchTargetClassName}>Articles</Link>
            <Link href="/help" style={linkStyle} className={touchTargetClassName}>Help</Link>
            <Link href="/support" style={linkStyle} className={touchTargetClassName}>Support</Link>
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
              <Link href="/terms" style={legalLinkStyle} className={touchTargetClassName}>Terms of Service</Link>
              <span style={{ color: '#374151', fontSize: '0.75rem' }}>•</span>
              <Link href="/privacy" style={legalLinkStyle} className={touchTargetClassName}>Privacy Policy</Link>
            </div>
            <p style={{ color: '#374151', fontSize: '0.75rem', margin: 0, textAlign: 'right' }}>
              Use of this software constitutes acceptance of terms. Virtual Combat Simulator, GameMasterCraft, SagaCraft, MasterTyping, Gravity, and Four Star General are trademarks of Sixsmith Games. Prices shown exclude applicable taxes.
            </p>
          </div>
        </div>

      </div>
      <style>{`
        @media (min-width: 768px) {
          .footer-brand {
            grid-column: span 2;
          }
        }
      `}</style>
    </footer>
  );
}
