/**
 * Studio-first site navigation.
 *
 * GameMasterCraft and Virtual Combat Simulator stay visible as the two Studio
 * modules. The rest of the catalog is preserved under "More from Sixsmith
 * Games" so those product pages remain available without competing with the
 * flagship. SagaCraft is added only for its verified owner account.
 */

'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  isContentCraftOwnerEmail,
  isSagaCraftOwnerEmail,
} from '@/lib/productVisibility';
import styles from './Navigation.module.css';

const STUDIO_URL = 'https://gmstudio.sixsmithgames.com';

const primaryLinks = [
  { label: 'Why Studio', href: '/#why-studio' },
  { label: 'GameMasterCraft', href: '/apps/gamemastercraft' },
  { label: 'VCS', href: '/apps/virtual-combat-simulator' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Guides', href: '/articles' },
];

const secondaryProducts = [
  { label: 'Merchandise', href: '/merch' },
  { label: 'Four Star General', href: '/apps/fourstargeneral' },
  { label: 'MasterTyping', href: '/apps/mastertyping' },
  { label: 'Gravity', href: '/apps/gravity' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const ownerCanSeeSagaCraft = isSagaCraftOwnerEmail(
    user?.primaryEmailAddress?.emailAddress,
  );
  const ownerEmail = user?.primaryEmailAddress?.emailAddress;
  const ownerCanSeeContentCraft = isContentCraftOwnerEmail(ownerEmail);
  const tuckedProducts = [
    ...secondaryProducts,
    ...(ownerCanSeeContentCraft ? [{ label: 'ContentCraft', href: '/apps/contentcraft' }] : []),
    ...(ownerCanSeeSagaCraft ? [{ label: 'SagaCraft', href: '/apps/sagacraft' }] : []),
  ];

  function closeMenus() {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.brand} onClick={closeMenus}>
          <Image
            src="/icons/sixsmith-logo.png"
            alt=""
            width={44}
            height={44}
            priority
          />
          <span>
            <strong>GameMaster Studio</strong>
            <small>by Sixsmith Games</small>
          </span>
        </Link>

        <div className={styles.desktopLinks}>
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}

          <div className={styles.moreMenu}>
            <button
              type="button"
              className={styles.moreButton}
              aria-expanded={moreMenuOpen}
              aria-haspopup="menu"
              onClick={() => setMoreMenuOpen((open) => !open)}
              onBlur={() => window.setTimeout(() => setMoreMenuOpen(false), 120)}
            >
              More
              <span aria-hidden="true">⌄</span>
            </button>
            {moreMenuOpen && (
              <div className={styles.dropdown} role="menu">
                <p>More from Sixsmith Games</p>
                {tuckedProducts.map((product) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    role="menuitem"
                    onClick={closeMenus}
                  >
                    {product.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.desktopAccount}>
          {isSignedIn ? (
            <>
              <Link href="/account" className={styles.signInLink}>Account</Link>
              <a href={STUDIO_URL} className={styles.primaryCta}>Open Studio</a>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
            <Link href="/sign-in" className={styles.signInLink}>Sign in</Link>
            <Link href="/sign-up" className={styles.primaryCta}>Start free</Link>
            </>
          )}
        </div>

        <button
          type="button"
          className={styles.mobileButton}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{mobileMenuOpen ? '×' : '☰'}</span>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className={styles.mobilePanel}>
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenus}>
              {link.label}
            </Link>
          ))}

          <p>More from Sixsmith Games</p>
          {tuckedProducts.map((product) => (
            <Link key={product.href} href={product.href} onClick={closeMenus}>
              {product.label}
            </Link>
          ))}

          <div className={styles.mobileAccount}>
            {isSignedIn ? (
              <>
                <Link href="/account" onClick={closeMenus}>Account</Link>
                <a href={STUDIO_URL} className={styles.primaryCta}>Open Studio</a>
              </>
            ) : (
              <>
              <Link href="/sign-in" onClick={closeMenus}>Sign in</Link>
              <Link href="/sign-up" className={styles.primaryCta} onClick={closeMenus}>
                Start free
              </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
