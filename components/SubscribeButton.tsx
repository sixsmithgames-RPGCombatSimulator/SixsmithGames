/**
 * SubscribeButton Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { trackMarketingEvent } from '@/lib/analytics';
import { APP_URLS, canAccessApp, getActivePlans, isAppSlug, type AppSlug } from '@/lib/subscription';
import { useSubscriptionAccess } from '@/lib/useSubscriptionAccess';

interface SubscribeButtonProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  planId?: string;
  signInLabel?: string;
  /**
   * When true, keep the button visible for users who already have access and
   * turn it into an "Open App" link. Otherwise hide it once access exists.
   */
  allowAccessRedirect?: boolean;
  /**
   * When true, hide the button entirely for anonymous users.
   * Useful for free-to-start products where subscription should only
   * be offered to signed-in users.
   */
  hideForAnonymous?: boolean;
}

export default function SubscribeButton({
  className,
  style,
  children,
  planId,
  allowAccessRedirect = false,
  hideForAnonymous = false,
}: SubscribeButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { isSignedIn, user, isLoaded } = useUser();

  // Hide button entirely for anonymous users when hideForAnonymous is true
  if (hideForAnonymous && isLoaded && !isSignedIn) {
    return null;
  }
  const { accessInfo, loading: accessLoading } = useSubscriptionAccess(isLoaded && Boolean(isSignedIn));

  const appPlanIds = new Set<AppSlug>([
    'contentcraft',
    'virtual-combat-simulator',
    'fourstargeneral',
    'gravity',
    'mastertyping',
  ]);
  const appPlanId = planId && isAppSlug(planId) ? planId : null;
  const isAppPlanId = appPlanId !== null && appPlanIds.has(appPlanId);
  const checkoutUrl = `/checkout?planId=${encodeURIComponent(planId || 'bundle')}`;

  /**
   * Purpose: Provide a predictable, crawlable destination when auth state has not hydrated.
   * Change reason: Replace "Loading..." placeholder with a functional CTA for SEO and user clarity.
   * Parameters: targetPlanId - optional plan identifier used to map to a meaningful href.
   * Returns: Href string pointing to pricing or a specific app route.
   * Side effects: None.
   */
  const resolveInitialHref = (targetPlanId?: string) => {
    if (targetPlanId) {
      return `/checkout?planId=${encodeURIComponent(targetPlanId)}`;
    }
    return '/pricing';
  };

  const handleClick = () => {
    setLoading(true);
    trackMarketingEvent('product_subscribe_click', {
      product_slug: planId || 'bundle',
      destination_type: 'checkout',
    });
    window.location.href = checkoutUrl;
  };

  if (!mounted || !isLoaded) {
    return (
      <a
        href={resolveInitialHref(planId)}
        className={className}
        onClick={() => {
          trackMarketingEvent('product_pricing_click', {
            product_slug: planId || 'bundle',
            destination_type: planId ? 'checkout' : 'pricing',
          });
        }}
        style={{ ...style, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
      >
        {children || 'View pricing'}
      </a>
    );
  }

  if (!isSignedIn) {
    return (
      <SignInButton
        mode="modal"
        forceRedirectUrl={checkoutUrl}
        fallbackRedirectUrl={checkoutUrl}
        signUpForceRedirectUrl={checkoutUrl}
        signUpFallbackRedirectUrl={checkoutUrl}
      >
        <button
          className={className}
          style={style}
          onClick={() => {
            trackMarketingEvent('product_sign_in_prompt_click', {
              product_slug: planId || 'bundle',
              destination_type: 'sign_in',
            });
          }}
        >
          {children}
        </button>
      </SignInButton>
    );
  }

  const activePlans = getActivePlans(user?.publicMetadata);
  const metadataCanAccessThisApp = planId === 'bundle'
    ? activePlans.includes('bundle')
    : appPlanId && isAppPlanId
      ? canAccessApp(appPlanId, user?.publicMetadata)
      : false;
  const serverCanAccessThisApp = planId === 'bundle'
    ? Boolean(accessInfo?.plans.includes('bundle') || accessInfo?.isAdmin)
    : appPlanId && isAppPlanId
      ? Boolean(accessInfo?.accessibleApps.includes(appPlanId))
      : false;
  const canAccessThisApp = metadataCanAccessThisApp || serverCanAccessThisApp;

  if (!metadataCanAccessThisApp && accessLoading) {
    return (
      <button
        className={className}
        style={{ ...style, opacity: 0.7, cursor: 'wait' }}
        disabled
      >
        Loading...
      </button>
    );
  }

  if (canAccessThisApp && allowAccessRedirect) {
    const appUrl = planId && isAppSlug(planId) ? APP_URLS[planId] : '/account';

    return (
      <a
        href={appUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackMarketingEvent('product_launch_click', {
            product_slug: planId || 'bundle',
            destination_type: 'app',
          });
        }}
        className={className}
        style={{ ...style, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
      >
        Open App
      </a>
    );
  }

  if (canAccessThisApp) {
    return null;
  }

  return (
    <button
      className={className}
      style={{ ...style, opacity: loading ? 0.7 : 1 }}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? 'Redirecting...' : children}
    </button>
  );
}
