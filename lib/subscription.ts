/**
 * Subscription utilities
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

export type SubscriptionStatus = 'active' | 'inactive' | 'trialing' | 'past_due';

export interface SubscriptionInfo {
  status: SubscriptionStatus;
  plan: string | null;
  expiresAt: string | null;
  isAdmin: boolean;
}

// Admin emails that bypass the paywall
const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export function hasActiveSubscription(publicMetadata: Record<string, unknown> | undefined | null): boolean {
  if (!publicMetadata) return false;
  const status = publicMetadata.subscriptionStatus as string | undefined;
  return status === 'active' || status === 'trialing';
}

export function getSubscriptionInfo(
  publicMetadata: Record<string, unknown> | undefined | null,
  email: string | undefined | null
): SubscriptionInfo {
  const admin = isAdminEmail(email);
  if (!publicMetadata) {
    return { status: 'inactive', plan: null, expiresAt: null, isAdmin: admin };
  }
  return {
    status: (publicMetadata.subscriptionStatus as SubscriptionStatus) || 'inactive',
    plan: (publicMetadata.subscriptionPlan as string) || null,
    expiresAt: (publicMetadata.subscriptionExpiresAt as string) || null,
    isAdmin: admin,
  };
}

export function canAccessApps(
  publicMetadata: Record<string, unknown> | undefined | null,
  email: string | undefined | null
): boolean {
  return isAdminEmail(email) || hasActiveSubscription(publicMetadata);
}

// App subdomain map
export const APP_URLS: Record<string, string> = {
  'virtual-combat-simulator': 'https://vcs.sixsmithgames.com',
  'contentcraft': 'https://contentcraft.sixsmithgames.com',
  'mastertyping': 'https://mastertyping.sixsmithgames.com',
  'gravity': 'https://gravity.sixsmithgames.com',
  'fourstargeneral': 'https://fsg.sixsmithgames.com',
};
