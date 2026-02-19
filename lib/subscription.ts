/**
 * Subscription utilities
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

export type SubscriptionStatus = 'active' | 'inactive' | 'trialing' | 'past_due';

export type AppSlug = 'contentcraft' | 'gravity' | 'virtual-combat-simulator' | 'fourstargeneral' | 'mastertyping';

export interface PlanInfo {
  id: string;
  name: string;
  price: number;
  apps: AppSlug[];
}

export const PLANS: Record<string, PlanInfo> = {
  bundle: {
    id: 'bundle',
    name: 'All-Access Bundle',
    price: 19.99,
    apps: ['contentcraft', 'gravity', 'virtual-combat-simulator', 'fourstargeneral', 'mastertyping'],
  },
  contentcraft: {
    id: 'contentcraft',
    name: 'ContentCraft',
    price: 9.99,
    apps: ['contentcraft'],
  },
  'virtual-combat-simulator': {
    id: 'virtual-combat-simulator',
    name: 'VirtualCombatSimulator',
    price: 9.99,
    apps: ['virtual-combat-simulator'],
  },
  gravity: {
    id: 'gravity',
    name: 'Gravity',
    price: 4.99,
    apps: ['gravity'],
  },
  fourstargeneral: {
    id: 'fourstargeneral',
    name: 'Four Star General',
    price: 4.99,
    apps: ['fourstargeneral'],
  },
  mastertyping: {
    id: 'mastertyping',
    name: 'MasterTyping',
    price: 4.99,
    apps: ['mastertyping'],
  },
};

export interface SubscriptionInfo {
  status: SubscriptionStatus;
  plan: string | null;
  plans: string[];
  expiresAt: string | null;
  isAdmin: boolean;
  nextBillingDate: string | null;
  billingHistory: BillingRecord[];
  memberSince: string | null;
  accessibleApps: AppSlug[];
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
  { id: 'inv_001', date: '2026-02-01', amount: 19.99, status: 'paid', description: 'All-Access Bundle — Monthly' },
  { id: 'inv_002', date: '2026-01-01', amount: 19.99, status: 'paid', description: 'All-Access Bundle — Monthly' },
  { id: 'inv_003', date: '2025-12-01', amount: 19.99, status: 'paid', description: 'All-Access Bundle — Monthly' },
  { id: 'inv_004', date: '2025-11-01', amount: 19.99, status: 'paid', description: 'All-Access Bundle — Monthly' },
  { id: 'inv_005', date: '2025-10-01', amount: 19.99, status: 'paid', description: 'All-Access Bundle — Monthly' },
  { id: 'inv_006', date: '2025-09-01', amount: 19.99, status: 'paid', description: 'All-Access Bundle — Monthly' },
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

export function getActivePlans(
  publicMetadata: Record<string, unknown> | undefined | null
): string[] {
  if (!publicMetadata) return [];
  const raw = publicMetadata.subscriptionPlans;
  if (Array.isArray(raw)) return raw as string[];
  const single = publicMetadata.subscriptionPlan as string | undefined;
  if (single) return [single];
  return [];
}

export function getAccessibleApps(
  publicMetadata: Record<string, unknown> | undefined | null,
  email: string | undefined | null
): AppSlug[] {
  if (isAdminEmail(email) || isDummySubscriber(email)) {
    return ['contentcraft', 'gravity', 'virtual-combat-simulator', 'fourstargeneral', 'mastertyping'];
  }
  if (!hasActiveSubscription(publicMetadata)) return [];
  const plans = getActivePlans(publicMetadata);
  const apps = new Set<AppSlug>();
  for (const planId of plans) {
    const plan = PLANS[planId];
    if (plan) plan.apps.forEach(a => apps.add(a));
  }
  return Array.from(apps);
}

export function canAccessApp(
  appSlug: AppSlug,
  publicMetadata: Record<string, unknown> | undefined | null,
  email: string | undefined | null
): boolean {
  return getAccessibleApps(publicMetadata, email).includes(appSlug);
}

export function getSubscriptionInfo(
  publicMetadata: Record<string, unknown> | undefined | null,
  email: string | undefined | null
): SubscriptionInfo {
  const admin = isAdminEmail(email);
  const dummy = isDummySubscriber(email);
  const allApps: AppSlug[] = ['contentcraft', 'gravity', 'virtual-combat-simulator', 'fourstargeneral', 'mastertyping'];

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
      accessibleApps: allApps,
    };
  }

  if (!publicMetadata) {
    return { status: 'inactive', plan: null, plans: [], expiresAt: null, isAdmin: admin, nextBillingDate: null, billingHistory: [], memberSince: null, accessibleApps: [] };
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
    accessibleApps: getAccessibleApps(publicMetadata, email),
  };
}

export function canAccessApps(
  publicMetadata: Record<string, unknown> | undefined | null,
  email: string | undefined | null
): boolean {
  return getAccessibleApps(publicMetadata, email).length > 0;
}

// App subdomain map
export const APP_URLS: Record<string, string> = {
  'virtual-combat-simulator': 'https://vcs.sixsmithgames.com',
  'contentcraft': 'https://contentcraft.sixsmithgames.com',
  'mastertyping': 'https://mastertyping.sixsmithgames.com',
  'gravity': 'https://gravity.sixsmithgames.com',
  'fourstargeneral': 'https://fsg.sixsmithgames.com',
};
