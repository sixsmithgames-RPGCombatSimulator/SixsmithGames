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
  nextBillingDate: string | null;
  billingHistory: BillingRecord[];
  memberSince: string | null;
}

export interface BillingRecord {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'failed' | 'refunded';
  description: string;
}

const DUMMY_BILLING_EMAILS = ['sexsmith2005@gmail.com'];

const DUMMY_BILLING_HISTORY: BillingRecord[] = [
  { id: 'inv_001', date: '2026-02-01', amount: 19.99, status: 'paid', description: 'Sixsmith Games Pro — Monthly' },
  { id: 'inv_002', date: '2026-01-01', amount: 19.99, status: 'paid', description: 'Sixsmith Games Pro — Monthly' },
  { id: 'inv_003', date: '2025-12-01', amount: 19.99, status: 'paid', description: 'Sixsmith Games Pro — Monthly' },
  { id: 'inv_004', date: '2025-11-01', amount: 19.99, status: 'paid', description: 'Sixsmith Games Pro — Monthly' },
  { id: 'inv_005', date: '2025-10-01', amount: 19.99, status: 'paid', description: 'Sixsmith Games Pro — Monthly' },
  { id: 'inv_006', date: '2025-09-01', amount: 19.99, status: 'paid', description: 'Sixsmith Games Pro — Monthly' },
];

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

export function isDummySubscriber(email: string | undefined | null): boolean {
  if (!email) return false;
  return DUMMY_BILLING_EMAILS.includes(email.toLowerCase());
}

export function getSubscriptionInfo(
  publicMetadata: Record<string, unknown> | undefined | null,
  email: string | undefined | null
): SubscriptionInfo {
  const admin = isAdminEmail(email);
  const dummy = isDummySubscriber(email);

  if (dummy) {
    return {
      status: 'active',
      plan: 'Pro',
      expiresAt: '2026-03-01',
      isAdmin: admin,
      nextBillingDate: '2026-03-01',
      billingHistory: DUMMY_BILLING_HISTORY,
      memberSince: '2025-09-01',
    };
  }

  if (!publicMetadata) {
    return { status: 'inactive', plan: null, expiresAt: null, isAdmin: admin, nextBillingDate: null, billingHistory: [], memberSince: null };
  }
  return {
    status: (publicMetadata.subscriptionStatus as SubscriptionStatus) || 'inactive',
    plan: (publicMetadata.subscriptionPlan as string) || null,
    expiresAt: (publicMetadata.subscriptionExpiresAt as string) || null,
    isAdmin: admin,
    nextBillingDate: (publicMetadata.subscriptionExpiresAt as string) || null,
    billingHistory: [],
    memberSince: (publicMetadata.memberSince as string) || null,
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
