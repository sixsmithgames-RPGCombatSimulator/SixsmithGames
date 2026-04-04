/**
 * SubscribeButton Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { canAccessApps } from '@/lib/subscription';

interface SubscribeButtonProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  planId?: string;
  signInLabel?: string;
}

export default function SubscribeButton({ className, style, children, planId, signInLabel }: SubscribeButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { isSignedIn, user, isLoaded } = useUser();

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
      //'gravity': '/apps/gravity',
      //'fourstargeneral': '/apps/fourstargeneral',
      //'mastertyping': '/apps/mastertyping',
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
          {signInLabel || 'Sign Up to Subscribe'}
        </button>
      </SignInButton>
    );
  }

  const email = user?.primaryEmailAddress?.emailAddress;
  const hasAccess = canAccessApps(user?.publicMetadata, email);

  // MasterTyping is free for all signed-in users
  const isMasterTyping = planId === 'mastertyping';
  const canAccessThisApp = isMasterTyping || hasAccess;

  if (canAccessThisApp) {
    // Map planId to app route
    const appRoutes: Record<string, string> = {
      'contentcraft': '/apps/contentcraft',
      'virtual-combat-simulator': '/apps/virtual-combat-simulator',
      //'gravity': '/apps/gravity',
      //'fourstargeneral': '/apps/fourstargeneral',
      //'mastertyping': '/apps/mastertyping',
    };

    const appUrl = planId && appRoutes[planId] ? appRoutes[planId] : '/account';

    return (
      <a
        href={appUrl}
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
