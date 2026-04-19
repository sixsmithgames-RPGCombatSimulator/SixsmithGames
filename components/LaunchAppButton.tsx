/**
 * LaunchAppButton Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import { useEffect } from 'react';
import { useUser, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { trackMarketingEvent } from '@/lib/analytics';
import { APP_URLS, type AppSlug } from '@/lib/subscription';
import { useSubscriptionAccess } from '@/lib/useSubscriptionAccess';

interface LaunchAppButtonProps {
  appSlug: AppSlug;
  style?: React.CSSProperties;
  children: React.ReactNode;
  autoLaunch?: boolean;
}

function renderStaticButton(label: string, style?: React.CSSProperties) {
  return (
    <button style={{ ...style, opacity: 0.82, cursor: 'default' }} disabled>
      {label}
    </button>
  );
}

function LaunchButtonInner({ appSlug, style, children, autoLaunch }: LaunchAppButtonProps) {
  const { isLoaded, isSignedIn } = useUser();
  const { accessInfo, loading: accessLoading } = useSubscriptionAccess(isLoaded && Boolean(isSignedIn));

  // Free-core titles: always launchable for signed-in users without paid plans
  const freeAppSlugs = ['mastertyping', 'fourstargeneral', 'virtual-combat-simulator'];
  const isFreeApp = freeAppSlugs.includes(appSlug);
  const isGravity = appSlug === 'gravity';
  const hasPaidAccess = Boolean(accessInfo?.accessibleApps.length);
  const hasAccess = isFreeApp || hasPaidAccess;
  const appUrl = APP_URLS[appSlug];
  const label = hasPaidAccess ? 'Open App' : children;
  const gravityCanLaunch = isGravity && accessInfo?.isDummySubscriber === true;

  useEffect(() => {
    if (autoLaunch && isLoaded && ((isGravity && gravityCanLaunch) || (!isGravity && hasAccess)) && appUrl) {
      window.location.href = appUrl;
    }
  }, [autoLaunch, appUrl, gravityCanLaunch, hasAccess, isGravity, isLoaded]);

  if (isGravity) {
    if (!isLoaded || (isSignedIn && accessLoading && !accessInfo)) {
      return (
        <button style={{ ...style, opacity: 0.6, cursor: 'not-allowed' }} disabled>
          Loading...
        </button>
      );
    }

    if (gravityCanLaunch && appUrl) {
      return (
        <a
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackMarketingEvent('product_launch_click', {
              product_slug: appSlug,
              destination_type: 'app',
            });
          }}
          style={{ ...style, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
        >
          Open App
        </a>
      );
    }

    return renderStaticButton('Coming Soon', style);
  }

  if (!isLoaded || (!isFreeApp && accessLoading && !accessInfo)) {
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
        onClick={() => {
          trackMarketingEvent('product_launch_click', {
            product_slug: appSlug,
            destination_type: 'app',
          });
        }}
        style={{ ...style, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href="/pricing"
      onClick={() => {
        trackMarketingEvent('product_pricing_click', {
          product_slug: appSlug,
          destination_type: 'pricing',
        });
      }}
      style={{ ...style, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
    >
      Subscribe to Launch
    </a>
  );
}

export default function LaunchAppButton(props: LaunchAppButtonProps) {
  if (props.appSlug === 'gravity') {
    return (
      <>
        <SignedIn>
          <LaunchButtonInner {...props} />
        </SignedIn>
        <SignedOut>{renderStaticButton('Coming Soon', props.style)}</SignedOut>
      </>
    );
  }

  return (
    <>
      <SignedIn>
        <LaunchButtonInner {...props} />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button
            style={props.style}
            onClick={() => {
              trackMarketingEvent('product_sign_in_prompt_click', {
                product_slug: props.appSlug,
                destination_type: 'sign_in',
              });
            }}
          >
            Sign In to Launch
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
