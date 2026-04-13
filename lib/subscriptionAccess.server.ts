import 'server-only';

import type { AppSlug, BillingRecord, SubscriptionInfo, SubscriptionStatus } from '@/lib/subscription';
import { getActivePlans, hasActiveSubscription, PLANS } from '@/lib/subscription';

type EmailAddressLike = {
  emailAddress?: string | null;
  verification?: {
    status?: string | null;
  } | null;
} | null | undefined;

const ALL_APPS: AppSlug[] = ['contentcraft', 'gravity', 'virtual-combat-simulator', 'fourstargeneral', 'mastertyping'];

const DUMMY_BILLING_EMAILS = ['sexsmith2005@gmail.com', 'quentind@gmail.com', 'djmerdur@gmail.com'];

const DUMMY_BILLING_HISTORY: BillingRecord[] = [
  { id: 'inv_001', date: '2026-02-01', amount: 14.99, status: 'paid', description: 'Game Creator Bundle - Monthly' },
  { id: 'inv_002', date: '2026-01-01', amount: 14.99, status: 'paid', description: 'Game Creator Bundle - Monthly' },
  { id: 'inv_003', date: '2025-12-01', amount: 14.99, status: 'paid', description: 'Game Creator Bundle - Monthly' },
  { id: 'inv_004', date: '2025-11-01', amount: 14.99, status: 'paid', description: 'Game Creator Bundle - Monthly' },
  { id: 'inv_005', date: '2025-10-01', amount: 14.99, status: 'paid', description: 'Game Creator Bundle - Monthly' },
  { id: 'inv_006', date: '2025-09-01', amount: 14.99, status: 'paid', description: 'Game Creator Bundle - Monthly' },
];

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function getVerifiedPrimaryEmail(primaryEmail: EmailAddressLike): string | null {
  const email = primaryEmail?.emailAddress?.trim().toLowerCase();
  if (!email) return null;
  if (primaryEmail?.verification?.status !== 'verified') return null;
  return email;
}

export function isAdminEmail(primaryEmail: EmailAddressLike): boolean {
  const email = getVerifiedPrimaryEmail(primaryEmail);
  return email ? ADMIN_EMAILS.includes(email) : false;
}

export function isDummySubscriber(primaryEmail: EmailAddressLike): boolean {
  const email = getVerifiedPrimaryEmail(primaryEmail);
  return email ? DUMMY_BILLING_EMAILS.includes(email) : false;
}

export function getResolvedAccessibleApps(
  publicMetadata: Record<string, unknown> | undefined | null,
  primaryEmail: EmailAddressLike
): AppSlug[] {
  if (isAdminEmail(primaryEmail) || isDummySubscriber(primaryEmail)) {
    return ALL_APPS;
  }

  if (!hasActiveSubscription(publicMetadata)) return [];

  const plans = getActivePlans(publicMetadata);
  const apps = new Set<AppSlug>();
  for (const planId of plans) {
    const plan = PLANS[planId];
    if (plan) plan.apps.forEach((app) => apps.add(app));
  }

  return Array.from(apps);
}

export function getResolvedSubscriptionInfo(
  publicMetadata: Record<string, unknown> | undefined | null,
  primaryEmail: EmailAddressLike
): SubscriptionInfo {
  const admin = isAdminEmail(primaryEmail);
  const dummy = isDummySubscriber(primaryEmail);

  if (dummy) {
    return {
      status: 'active',
      plan: 'bundle',
      plans: ['bundle'],
      expiresAt: '2026-03-01',
      isAdmin: admin,
      nextBillingDate: '2026-03-01',
      billingHistory: DUMMY_BILLING_HISTORY,
      memberSince: '2025-09-01',
      accessibleApps: ALL_APPS,
    };
  }

  if (!publicMetadata) {
    return {
      status: 'inactive',
      plan: null,
      plans: [],
      expiresAt: null,
      isAdmin: admin,
      nextBillingDate: null,
      billingHistory: [],
      memberSince: null,
      accessibleApps: admin ? ALL_APPS : [],
    };
  }

  const plans = getActivePlans(publicMetadata);
  return {
    status: (publicMetadata.subscriptionStatus as SubscriptionStatus) || 'inactive',
    plan: plans[0] || null,
    plans,
    expiresAt: (publicMetadata.subscriptionExpiresAt as string) || null,
    isAdmin: admin,
    nextBillingDate: (publicMetadata.subscriptionExpiresAt as string) || null,
    billingHistory: [],
    memberSince: (publicMetadata.memberSince as string) || null,
    accessibleApps: getResolvedAccessibleApps(publicMetadata, primaryEmail),
  };
}
