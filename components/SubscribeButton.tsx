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
  const [loading, setLoading] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { isSignedIn, user, isLoaded } = useUser();

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
      <button className={className} style={{ ...style, opacity: 0.6 }} disabled>
        Loading...
      </button>
    );
  }

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
