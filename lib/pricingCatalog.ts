/**
 * Pricing catalog reference used by the website UI and internal docs.
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

export type PricingPlanId =
  | 'bundle'
  | 'ai-features'
  | 'virtual-combat-simulator'
  | 'fourstargeneral'
  | 'mastertyping';

export interface PricingCatalogEntry {
  planId: PricingPlanId;
  name: string;
  slug?: string;
  monthlyPrice: number;
  /** Intended standard monthly rate shown for comparison with the founding offer. */
  standardMonthlyPrice?: number;
  productId?: string;
  icon?: string;
  color: string;
  gradient: string;
  summary: string;
  highlights: string[];
}

export const pricingCatalog: Record<PricingPlanId, PricingCatalogEntry> = {
  'ai-features': {
    planId: 'ai-features',
    name: 'GameMasterCraft AI',
    slug: 'ai-features',
    monthlyPrice: 9.99,
    standardMonthlyPrice: 19.99,
    icon: '/icons/contentcraft-optimized.png',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #7c3aed, #2563eb)',
    summary: 'AI help for campaign prep, NPCs, locations, factions, and the pieces you need before game night.',
    highlights: [
      'AI-assisted campaign brainstorming',
      'Prep help for NPCs, places, and factions',
      'Your campaign workspace stays usable without AI',
    ],
  },
  'virtual-combat-simulator': {
    planId: 'virtual-combat-simulator',
    name: 'Virtual Combat Simulator',
    slug: 'virtual-combat-simulator',
    monthlyPrice: 9.99,
    standardMonthlyPrice: 19.99,
    productId: 'prod_U0bDDphtA7GnSP',
    icon: '/icons/vcs-optimized.png',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
    summary: 'Battle map D&D combat control with room to grow into paid Game Master tools.',
    highlights: [
      'Map, token, and initiative tools',
      'Paid upgrade for storage and GM tools',
      'Works well for shared table state',
    ],
  },
  fourstargeneral: {
    planId: 'fourstargeneral',
    name: 'Four Star General',
    slug: 'fourstargeneral',
    monthlyPrice: 1.99,
    productId: 'prod_U0dK97iSh6vyzi',
    icon: '/icons/fourstargeneral-optimized.png',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
    summary: 'WWII tactical command with a monthly unlock for expanded scenarios and content.',
    highlights: [
      'Tactical core gameplay',
      'Monthly unlock for more units and scenarios',
      'Campaign content included in the paid plan',
    ],
  },
  mastertyping: {
    planId: 'mastertyping',
    name: 'MasterTyping',
    slug: 'mastertyping',
    monthlyPrice: 1.99,
    productId: 'prod_U0dJjEQ5I7NuIZ',
    icon: '/icons/mastertyping-optimized.png',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #16a34a, #10b981)',
    summary: 'Typing practice with guided assessment and a monthly plan for retained history.',
    highlights: [
      'Assessment, drills, Pro mode, and game mode',
      'Monthly plan keeps your progress history',
      'Good fit for daily practice',
    ],
  },
  bundle: {
    planId: 'bundle',
    name: 'GameMaster Studio',
    monthlyPrice: 14.99,
    standardMonthlyPrice: 29.99,
    productId: 'prod_UGroftGaUS7177',
    color: '#4c1d95',
    gradient: 'linear-gradient(135deg, #312e81, #7c3aed)',
    summary: 'Campaign prep in GameMasterCraft plus the paid Game Master tools in Virtual Combat Simulator.',
    highlights: [
      'GameMasterCraft AI-assisted prep',
      'Virtual Combat Simulator GM tools',
      'One subscription for the campaign and the table',
    ],
  },
};

export const pricingCatalogList: PricingCatalogEntry[] = [
  pricingCatalog['ai-features'],
  pricingCatalog['virtual-combat-simulator'],
  pricingCatalog.fourstargeneral,
  pricingCatalog.mastertyping,
  pricingCatalog.bundle,
];

export function formatMonthlyPrice(price: number): string {
  return `$${price.toFixed(2)}/month`;
}
