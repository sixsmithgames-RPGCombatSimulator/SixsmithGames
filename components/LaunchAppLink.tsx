/**
 * LaunchAppLink — auth-aware wrapper for non-button launch surfaces (hero imagery, figures, cards).
 * Copyright (c) 2026 Sixsmith Games. All rights reserved.
 *
 * Signed-in users click through to the target app URL (with optional deep link path) in a new tab.
 * Signed-out users see Clerk's sign-in modal and, upon completing sign-in, are force-redirected
 * to the deep link so they land exactly where the marketing copy promised.
 */

'use client';

import type { CSSProperties, ReactNode } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

import { trackMarketingEvent } from '@/lib/analytics';
import { APP_URLS, type AppSlug } from '@/lib/subscription';

interface LaunchAppLinkProps {
  appSlug: AppSlug;
  /** Optional path appended to the app URL for a deep link (e.g. `/character/edit/new`). */
  deepLinkPath?: string;
  /** Accessible label for the link / sign-in trigger. */
  ariaLabel?: string;
  /** Analytics event suffix — distinguishes clicks on the hero image from the CTA button. */
  trackingSurface?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /**
   * If true, signed-out visitors also go directly to the target URL — no Clerk modal fires.
   * Use this only when the destination is a public route (e.g. the anonymous character sheet
   * editor at `/character/edit/new`).
   */
  openPublic?: boolean;
}

function buildTargetUrl(appSlug: AppSlug, deepLinkPath?: string) {
  const base = APP_URLS[appSlug];
  if (!base) return undefined;
  if (!deepLinkPath) return base;
  return `${base}${deepLinkPath}`;
}

export default function LaunchAppLink({
  appSlug,
  deepLinkPath,
  ariaLabel,
  trackingSurface,
  className,
  style,
  children,
  openPublic,
}: LaunchAppLinkProps) {
  const targetUrl = buildTargetUrl(appSlug, deepLinkPath);

  const plainAnchor = targetUrl ? (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      style={style}
      onClick={() => {
        trackMarketingEvent('product_launch_click', {
          product_slug: appSlug,
          destination_type: 'app',
          surface: trackingSurface ?? 'media_link',
        });
      }}
    >
      {children}
    </a>
  ) : (
    <span className={className} style={style} aria-label={ariaLabel}>
      {children}
    </span>
  );

  // For public destinations, render the same anchor for signed-in and signed-out visitors —
  // no Clerk modal is ever triggered.
  if (openPublic) {
    return plainAnchor;
  }

  return (
    <>
      <SignedIn>{plainAnchor}</SignedIn>
      <SignedOut>
        <SignInButton
          mode="modal"
          forceRedirectUrl={targetUrl}
          signUpForceRedirectUrl={targetUrl}
        >
          <button
            type="button"
            aria-label={ariaLabel}
            className={className}
            style={{ ...style, background: 'transparent', border: 0, padding: 0, cursor: 'pointer' }}
            onClick={() => {
              trackMarketingEvent('product_sign_in_prompt_click', {
                product_slug: appSlug,
                destination_type: 'sign_in',
                surface: trackingSurface ?? 'media_link',
              });
            }}
          >
            {children}
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
