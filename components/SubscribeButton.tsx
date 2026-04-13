/**
 * SubscribeButton Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { APP_URLS, canAccessApp, getActivePlans, type AppSlug } from '@/lib/subscription';
import { useSubscriptionAccess } from '@/lib/useSubscriptionAccess';

interface SubscribeButtonProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  planId?: string;
  signInLabel?: string;
  allowAccessRedirect?: boolean;
}

export default function SubscribeButton({
  className,
  style,
  children,
  planId,
  signInLabel,
  allowAccessRedirect = true,
}: SubscribeButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { isSignedIn, user, isLoaded } = useUser();
  const { accessInfo, loading: accessLoading } = useSubscriptionAccess(isLoaded && Boolean(isSignedIn));

  const appPlanIds = new Set<AppSlug>([
    'contentcraft',
    'virtual-combat-simulator',
    'fourstargeneral',
    'mastertyping',
  ]);

  /**
   * Purpose: Provide a predictable, crawlable destination when auth state has not hydrated.
   * Change reason: Replace "Loading..." placeholder with a functional CTA for SEO and user clarity.
   * Parameters: targetPlanId - optional plan identifier used to map to a meaningful href.
   * Returns: Href string pointing to pricing or a specific app route.
   * Side effects: None.
   */
  const resolveInitialHref = (targetPlanId?: string) => {
    const appRoutes: Record<string, string> = {
      'contentcraft': '/apps/contentcraft',
      'virtual-combat-simulator': '/apps/virtual-combat-simulator',
      'fourstargeneral': '/apps/fourstargeneral',
      'mastertyping': '/apps/mastertyping',
    };
    if (targetPlanId && appRoutes[targetPlanId]) {
      return appRoutes[targetPlanId];
    }
    return '/pricing';
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: planId || 'bundle' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Could not start checkout. Please try again.');
      }
    } catch {
      alert('Could not start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !isLoaded) {
    return (
      <a
        href={resolveInitialHref(planId)}
        className={className}
        style={{ ...style, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
      >
        {children || 'View pricing'}
      </a>
    );
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button className={className} style={style}>
          {signInLabel || 'Sign in to pay'}
        </button>
      </SignInButton>
    );
  }

  const activePlans = getActivePlans(user?.publicMetadata);
  const metadataCanAccessThisApp = planId === 'bundle'
    ? activePlans.includes('bundle')
    : Boolean(planId) && appPlanIds.has(planId as AppSlug)
      ? canAccessApp(planId as AppSlug, user?.publicMetadata)
      : false;
  const serverCanAccessThisApp = planId === 'bundle'
    ? Boolean(accessInfo?.plans.includes('bundle') || accessInfo?.isAdmin)
    : Boolean(planId) && appPlanIds.has(planId as AppSlug)
      ? Boolean(accessInfo?.accessibleApps.includes(planId as AppSlug))
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
    const appUrl = planId && planId in APP_URLS ? APP_URLS[planId] : '/account';

    return (
      <a
        href={appUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ ...style, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
      >
        Open App
      </a>
    );
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
