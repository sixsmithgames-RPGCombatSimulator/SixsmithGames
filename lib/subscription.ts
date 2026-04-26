/**
 * Subscription utilities
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import { pricingCatalog } from '@/lib/pricingCatalog';

export type SubscriptionStatus = 'active' | 'inactive' | 'trialing' | 'past_due';

export const APP_SLUGS = [
  'contentcraft',
  'gamemastercraft',
  'sagacraft',
  'gravity',
  'virtual-combat-simulator',
  'fourstargeneral',
  'mastertyping',
] as const;

export type AppSlug = (typeof APP_SLUGS)[number];

export function isAppSlug(value: string): value is AppSlug {
  return APP_SLUGS.some((slug) => slug === value);
}

export interface PlanInfo {
  id: string;
  name: string;
  price: number;
  apps: AppSlug[];
  stripePriceId: string;
}

export const PLANS: Record<string, PlanInfo> = {
  bundle: {
    id: 'bundle',
    name: 'ContentCraft + VCS Bundle',
    price: pricingCatalog.bundle.monthlyPrice,
    apps: ['contentcraft', 'virtual-combat-simulator'],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUNDLE || 'price_1TIK5IGeOb0qevnhqqzkBPtv',
  },
  contentcraft: {
    id: 'contentcraft',
    name: 'ContentCraft',
    price: pricingCatalog.contentcraft.monthlyPrice,
    apps: ['contentcraft'],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CONTENTCRAFT || 'price_1T2a1NGeOb0qevnhOaJNFSyf',
  },
  'virtual-combat-simulator': {
    id: 'virtual-combat-simulator',
    name: 'VirtualCombatSimulator',
    price: pricingCatalog['virtual-combat-simulator'].monthlyPrice,
    apps: ['virtual-combat-simulator'],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_VCS || 'price_1T2a0sGeOb0qevnht6dM5yOX',
  },
  //gravity: {
  //  id: 'gravity',
  //  name: 'Gravity',
  //  price: 1.99,
  //  apps: ['gravity'],
  //  stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_GRAVITY || 'price_1T2c55GeOb0qevnhW94VyGdo',
  //},
  fourstargeneral: {
    id: 'fourstargeneral',
    name: 'Four Star General',
    price: pricingCatalog.fourstargeneral.monthlyPrice,
    apps: ['fourstargeneral'],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_FSG || 'price_1T2c3rGeOb0qevnhIqyhXYwL',
  },
  mastertyping: {
    id: 'mastertyping',
    name: 'MasterTyping',
    price: pricingCatalog.mastertyping.monthlyPrice,
    apps: ['mastertyping'],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MASTERTYPING || 'price_1T2c3KGeOb0qevnh47ej77SI',
  },
};

export interface SubscriptionInfo {
  status: SubscriptionStatus;
  plan: string | null;
  plans: string[];
  expiresAt: string | null;
  isAdmin: boolean;
  isDummySubscriber: boolean;
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

export function hasActiveSubscription(publicMetadata: Record<string, unknown> | undefined | null): boolean {
  if (!publicMetadata) return false;
  const status = publicMetadata.subscriptionStatus as string | undefined;
  return status === 'active' || status === 'trialing';
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
  _email?: string | undefined | null
): AppSlug[] {
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
  email?: string | undefined | null
): boolean {
  return getAccessibleApps(publicMetadata, email).includes(appSlug);
}

export function getSubscriptionInfo(
  publicMetadata: Record<string, unknown> | undefined | null,
  _email?: string | undefined | null
): SubscriptionInfo {
  if (!publicMetadata) {
    return { status: 'inactive', plan: null, plans: [], expiresAt: null, isAdmin: false, isDummySubscriber: false, nextBillingDate: null, billingHistory: [], memberSince: null, accessibleApps: [] };
  }

  const plans = getActivePlans(publicMetadata);
  return {
    status: (publicMetadata.subscriptionStatus as SubscriptionStatus) || 'inactive',
    plan: plans[0] || null,
    plans,
    expiresAt: (publicMetadata.subscriptionExpiresAt as string) || null,
    isAdmin: (publicMetadata.isAdmin as boolean) || false,
    isDummySubscriber: false,
    nextBillingDate: (publicMetadata.subscriptionExpiresAt as string) || null,
    billingHistory: [],
    memberSince: (publicMetadata.memberSince as string) || null,
    accessibleApps: getAccessibleApps(publicMetadata),
  };
}

export function canAccessApps(
  publicMetadata: Record<string, unknown> | undefined | null,
  email: string | undefined | null
): boolean {
  return getAccessibleApps(publicMetadata, email).length > 0;
}

// App subdomain map
export const APP_URLS: Record<AppSlug, string> = {
  'virtual-combat-simulator': 'https://vcs.sixsmithgames.com',
  'contentcraft': 'https://contentcraft.sixsmithgames.com',
  'gamemastercraft': 'https://gmcraft.sixsmithgames.com',
  'sagacraft': 'https://sagacraft.sixsmithgames.com',
  'mastertyping': 'https://mastertyping.sixsmithgames.com',
  'gravity': 'https://gravity.sixsmithgames.com',
  'fourstargeneral': 'https://fsg.sixsmithgames.com',
};
