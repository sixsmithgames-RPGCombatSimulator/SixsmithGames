/**
 * Account-aware primary entry point for GameMaster Studio.
 *
 * Signed-out visitors start Clerk registration and continue to the protected
 * `/app` handoff. Signed-in users receive a direct, accurately labelled path to
 * the application. The loading state is deliberately disabled so a late Clerk
 * response cannot send an existing customer into registration by mistake.
 */

'use client';

import { SignUpButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

import { trackMarketingEvent } from '@/lib/analytics';

interface StudioEntryLinkProps {
  className?: string;
  onActivate?: () => void;
  placement: string;
}

export default function StudioEntryLink({
  className,
  onActivate,
  placement,
}: StudioEntryLinkProps) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <button
        type="button"
        className={className}
        aria-label="Checking your account"
        aria-busy="true"
        disabled
      >
        Start now
      </button>
    );
  }

  if (isSignedIn) {
    return (
      <Link
        href="/app"
        className={className}
        onClick={() => {
          onActivate?.();
          trackMarketingEvent('product_launch_click', {
            product_slug: 'gamemaster-studio',
            destination_type: 'app',
            surface: placement,
          });
        }}
      >
        Open app
      </Link>
    );
  }

  return (
    <SignUpButton
      mode="modal"
      forceRedirectUrl="/app"
      signInForceRedirectUrl="/app"
    >
      <button
        type="button"
        className={className}
        onClick={() => {
          onActivate?.();
          trackMarketingEvent('studio_signup_click', {
            placement,
            plan: 'free_start',
          });
        }}
      >
        Start now
      </button>
    </SignUpButton>
  );
}
