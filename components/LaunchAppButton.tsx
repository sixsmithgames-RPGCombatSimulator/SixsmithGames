/**
 * LaunchAppButton Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import { useEffect } from 'react';
import { useUser, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { canAccessApps, APP_URLS } from '@/lib/subscription';

interface LaunchAppButtonProps {
  appSlug: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  autoLaunch?: boolean;
}

function LaunchButtonInner({ appSlug, style, children, autoLaunch }: LaunchAppButtonProps) {
  const { user, isLoaded } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const hasAccess = isLoaded ? canAccessApps(user?.publicMetadata, email) : false;
  const appUrl = APP_URLS[appSlug];

  useEffect(() => {
    if (autoLaunch && isLoaded && hasAccess && appUrl) {
      window.location.href = appUrl;
    }
  }, [autoLaunch, isLoaded, hasAccess, appUrl]);

  if (!isLoaded) {
    return (
      <button style={{ ...style, opacity: 0.6, cursor: 'not-allowed' }} disabled>
        Loading...
      </button>
    );
  }

  if (hasAccess && appUrl) {
    return (
      <a
        href={appUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...style, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href="/pricing"
      style={{ ...style, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
    >
      Subscribe to Launch
    </a>
  );
}

export default function LaunchAppButton(props: LaunchAppButtonProps) {
  return (
    <>
      <SignedIn>
        <LaunchButtonInner {...props} />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button style={props.style}>
            Sign In to Launch
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
