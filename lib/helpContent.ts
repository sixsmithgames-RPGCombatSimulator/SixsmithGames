import {
  HELP_TOPIC_TITLES,
  type HelpTopicSlug,
  type ProductDefinition,
} from '@/lib/productContent';

export interface HelpTopicContent {
  title: string;
  summary: string;
  paragraphs: string[];
  bullets: string[];
}

export function getHelpTopicContent(product: ProductDefinition, topic: HelpTopicSlug): HelpTopicContent {
  switch (topic) {
    case 'getting-started':
      return {
        title: `${HELP_TOPIC_TITLES[topic]} with ${product.name}`,
        summary: `${product.name} works best when the first session or first visit is tied to the real job the product is meant to do.`,
        paragraphs: [
          `${product.name} is easiest to adopt when you start from a real use case rather than generic exploration. That means beginning with the problem the product is meant to solve for ${product.primaryAudience.toLowerCase()}.`,
          `${product.name} also benefits from a clear first-run path. The best way to evaluate the product is to complete one realistic workflow and then decide whether the pricing, feature depth, and current scope fit how often you will use it.`,
        ],
        bullets: product.gettingStarted,
      };
    case 'core-features':
      return {
        title: `${HELP_TOPIC_TITLES[topic]} in ${product.name}`,
        summary: `${product.name} has a specific feature set, and those features matter because they shape how the product actually fits your work.`,
        paragraphs: [
          `${product.name} is easiest to understand through the features that shape the workflow, not through abstract slogans. The features below are what the product page uses to explain what the product actually does.`,
        ],
        bullets: product.keyFeatures.map((feature) => `${feature.title}: ${feature.description}`),
      };
    case 'common-use-cases':
      return {
        title: `${HELP_TOPIC_TITLES[topic]} for ${product.name}`,
        summary: `${product.name} is easier to evaluate when it is tied to real situations instead of generic “works for anything” claims.`,
        paragraphs: [
          `${product.name} is intentionally built for a specific audience. The common use cases below show where the product is strongest.`,
        ],
        bullets: product.commonUseCases,
      };
    case 'current-scope':
      return {
        title: `${HELP_TOPIC_TITLES[topic]} for ${product.name}`,
        summary: `The current scope of ${product.name} matters because you should know what the product is and what it is not before you start using it.`,
        paragraphs: [
          `${product.name} is described here to match the current build and how it is available today. The scope notes below summarize the boundaries so expectations stay clear.`,
        ],
        bullets: product.scopeNotes,
      };
    case 'pricing-and-accounts':
      return {
        title: `${HELP_TOPIC_TITLES[topic]} for ${product.name}`,
        summary: `${product.name} has a specific pricing and access setup. This page explains it so you know what to expect before you click deeper into the app.`,
        paragraphs: [
          `Pricing model for ${product.name}: ${product.pricingModel}.`,
          `Availability: ${product.availability}.`,
          `For account questions, support, or next steps, use the pricing page, the product page, and the support page rather than guessing from outdated summaries.`,
        ],
        bullets: [
          `Pricing page: ${product.pricingPath}`,
          `Product page: ${product.officialPath}`,
          `Help landing page: ${product.helpPath}`,
          `Support: ${product.supportPath}`,
          `Official app URL: ${product.appUrl}`,
        ],
      };
  }
}
