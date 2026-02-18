/**
 * LaunchAppButton Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { canAccessApps, APP_URLS } from '@/lib/subscription';

interface LaunchAppButtonProps {
  appSlug: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function LaunchAppButton({ appSlug, style, children }: LaunchAppButtonProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { isSignedIn, user, isLoaded } = useUser();

  if (!mounted || !isLoaded) {
    return (
      <button
        style={{
          ...style,
          opacity: 0.6,
          cursor: 'not-allowed',
        }}
        disabled
      >
        Loading...
      </button>
    );
  }

  // Not signed in — prompt sign in
  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button style={style}>
          Sign In to Launch
        </button>
      </SignInButton>
    );
  }

  const email = user?.primaryEmailAddress?.emailAddress;
  const hasAccess = canAccessApps(user?.publicMetadata, email);
  const appUrl = APP_URLS[appSlug];

  // Has access — launch the app
  if (hasAccess && appUrl) {
    return (
      <a
        href={appUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...style,
          textDecoration: 'none',
          display: 'inline-block',
          textAlign: 'center',
        }}
      >
        {children}
      </a>
    );
  }

  // Signed in but no subscription — go to pricing
  return (
    <a
      href="/pricing"
      style={{
        ...style,
        textDecoration: 'none',
        display: 'inline-block',
        textAlign: 'center',
      }}
    >
      Subscribe to Launch
    </a>
  );
}
