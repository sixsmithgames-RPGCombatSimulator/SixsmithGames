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
}

export default function SubscribeButton({ className, style, children, planId }: SubscribeButtonProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { isSignedIn, user, isLoaded } = useUser();

  if (!mounted || !isLoaded) {
    return (
      <button className={className} style={{ ...style, opacity: 0.6 }} disabled>
        Loading...
      </button>
    );
  }

  // Not signed in — prompt sign in first
  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button className={className} style={style}>
          Sign Up to Subscribe
        </button>
      </SignInButton>
    );
  }

  const email = user?.primaryEmailAddress?.emailAddress;
  const hasAccess = canAccessApps(user?.publicMetadata, email);

  // Already subscribed or admin
  if (hasAccess) {
    return (
      <a
        href="/account"
        className={className}
        style={{ ...style, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
      >
        View Your Account
      </a>
    );
  }

  // Signed in but not subscribed — Stripe checkout (placeholder)
  const handleClick = () => {
    const plan = planId || 'bundle';
    alert(`Stripe checkout coming soon!\nPlan: ${plan}\nYou will be redirected to a secure payment page.`);
  };

  return (
    <button
      className={className}
      style={style}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
