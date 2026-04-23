import { contentCraftProductDefinition } from '@/app/apps/contentcraft/marketing';
import { fourStarGeneralProductDefinition } from '@/app/apps/fourstargeneral/marketing';
import { gravityProductDefinition } from '@/app/apps/gravity/marketing';
import { masterTypingProductDefinition } from '@/app/apps/mastertyping/marketing';
import { virtualCombatSimulatorProductDefinition } from '@/app/apps/virtual-combat-simulator/marketing';
import type { PricingPlanId } from '@/lib/pricingCatalog';
import { SITE_URL } from '@/lib/site';
import type { AppSlug } from '@/lib/subscription';

export const MARKETING_LAST_UPDATED = 'April 18, 2026';
export const MARKETING_LAST_UPDATED_ISO = '2026-04-18';

export const HELP_TOPIC_ORDER = [
  'getting-started',
  'core-features',
  'common-use-cases',
  'current-scope',
  'pricing-and-accounts',
] as const;

export type HelpTopicSlug = (typeof HELP_TOPIC_ORDER)[number];

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductDeepDive {
  title: string;
  description: string;
  href: string;
  linkLabel?: string;
}

export interface ProductCta {
  kind: 'launch' | 'subscribe' | 'link';
  label: string;
  appSlug?: AppSlug;
  planId?: PricingPlanId;
  href?: string;
  allowAccessRedirect?: boolean;
  hideForAnonymous?: boolean;
}

export interface ProductDefinition {
  slug: AppSlug;
  name: string;
  descriptor: string;
  h1: string;
  title: string;
  metaDescription: string;
  heroEyebrow: string;
  heroValue: string;
  heroSummary: string;
  oneSentence: string;
  category: string;
  primaryAudience: string;
  platform: string;
  pricingModel: string;
  availability: string;
  applicationCategory: string;
  operatingSystem: string;
  offerPrice?: number;
  officialPath: string;
  pricingPath: string;
  helpPath: string;
  supportPath: string;
  appUrl: string;
  relatedProducts: AppSlug[];
  supportingArticleSlugs: string[];
  theme: {
    gradient: string;
    accent: string;
    tint: string;
    dark: string;
    lightBorder: string;
  };
  primaryCta: ProductCta;
  secondaryCta?: ProductCta;
  whatItIs: string[];
  whoItIsFor: string[];
  problemItSolves: string[];
  howItWorks: string[];
  keyFeatures: ProductFeature[];
  pricingAndAccess: string[];
  faq: ProductFaq[];
  gettingStarted: string[];
  commonUseCases: string[];
  scopeNotes: string[];
  featureDeepDives?: ProductDeepDive[];
}

export const HELP_TOPIC_TITLES: Record<HelpTopicSlug, string> = {
  'getting-started': 'Getting started',
  'core-features': 'Core features',
  'common-use-cases': 'Common use cases',
  'current-scope': 'Current scope and limitations',
  'pricing-and-accounts': 'Pricing and account basics',
};

export const PRODUCT_DEFINITIONS: ProductDefinition[] = [
  virtualCombatSimulatorProductDefinition,
  contentCraftProductDefinition,
  masterTypingProductDefinition,
  gravityProductDefinition,
  fourStarGeneralProductDefinition,
];

export const PRODUCT_DEFINITIONS_BY_SLUG = Object.fromEntries(
  PRODUCT_DEFINITIONS.map((product) => [product.slug, product]),
) as Record<AppSlug, ProductDefinition>;

export function getProductDefinition(slug: AppSlug): ProductDefinition {
  return PRODUCT_DEFINITIONS_BY_SLUG[slug];
}

export function getProductMarketingUrl(slug: AppSlug): string {
  return `${SITE_URL}${getProductDefinition(slug).officialPath}`;
}

export function getProductHelpTopicUrl(slug: AppSlug, topic: HelpTopicSlug): string {
  return `${SITE_URL}/help/${slug}/${topic}`;
}
