'use client';

import { SignIn, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { pageGutter, touchTargetClassName } from '@/lib/responsive';

interface CheckoutClientProps {
  planId: string;
}

export default function CheckoutClient({ planId }: CheckoutClientProps) {
  const checkoutPath = `/checkout?planId=${encodeURIComponent(planId)}`;
  const { isLoaded, isSignedIn } = useUser();
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || startedRef.current) {
      return;
    }

    startedRef.current = true;
    let isCancelled = false;

    const startCheckout = async () => {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId }),
        });
        const data = await res.json();

        if (!res.ok || !data.url) {
          throw new Error(data.error || 'Failed to create checkout session');
        }

        window.location.href = data.url;
      } catch {
        if (!isCancelled) {
          setError('Could not start checkout. Please try again.');
        }
      }
    };

    void startCheckout();

    return () => {
      isCancelled = true;
    };
  }, [isLoaded, isSignedIn, planId]);

  if (!isLoaded) {
    return (
      <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: pageGutter }}>
        <p style={{ fontSize: '1.125rem', color: '#334155' }}>Preparing checkout...</p>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main style={{ minHeight: '80vh', display: 'grid', placeItems: 'center', padding: pageGutter }}>
        <SignIn
          forceRedirectUrl={checkoutPath}
          fallbackRedirectUrl={checkoutPath}
          signUpForceRedirectUrl={checkoutPath}
          signUpFallbackRedirectUrl={checkoutPath}
        />
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: pageGutter }}>
        <div style={{ textAlign: 'center', maxWidth: '32rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
            Checkout could not start
          </h1>
          <p style={{ fontSize: '1rem', color: '#475569', marginBottom: '1.5rem' }}>{error}</p>
          <Link href="/pricing" className={touchTargetClassName} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
            Return to pricing
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: pageGutter }}>
      <p style={{ fontSize: '1.125rem', color: '#334155' }}>Redirecting to secure checkout...</p>
    </main>
  );
}
