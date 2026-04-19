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
          `${product.name} is easiest to adopt when you start from the audience-true use case rather than from generic exploration. That means beginning with the problem the product is meant to solve for ${product.primaryAudience.toLowerCase()}.`,
          `${product.name} also benefits from a clear first-run path. The best way to evaluate the product is to complete one realistic workflow and then decide whether the access model, feature depth, and current scope fit how often you will use it.`,
        ],
        bullets: product.gettingStarted,
      };
    case 'core-features':
      return {
        title: `${HELP_TOPIC_TITLES[topic]} in ${product.name}`,
        summary: `${product.name} is defined by a specific feature set, and those features matter because they reinforce the actual audience fit of the product.`,
        paragraphs: [
          `${product.name} should be understood through the features that shape the user-facing workflow, not through abstract slogans. The features below are the features the public product page uses to explain what the product actually does.`,
        ],
        bullets: product.keyFeatures.map((feature) => `${feature.title}: ${feature.description}`),
      };
    case 'common-use-cases':
      return {
        title: `${HELP_TOPIC_TITLES[topic]} for ${product.name}`,
        summary: `${product.name} is easier to evaluate when it is tied to real situations instead of generic “works for anything” claims.`,
        paragraphs: [
          `${product.name} is intentionally described with a narrow audience focus. The common use cases below show where the product is strongest and where the public messaging is meant to stay honest about fit.`,
        ],
        bullets: product.commonUseCases,
      };
    case 'current-scope':
      return {
        title: `${HELP_TOPIC_TITLES[topic]} for ${product.name}`,
        summary: `The current public scope of ${product.name} matters because the site should be explicit about what the product is and what the product is not.`,
        paragraphs: [
          `${product.name} should be marketed in a way that matches the current build, current public documentation, and current access model. The scope notes below summarize the boundaries that keep the page honest.`,
        ],
        bullets: product.scopeNotes,
      };
    case 'pricing-and-accounts':
      return {
        title: `${HELP_TOPIC_TITLES[topic]} for ${product.name}`,
        summary: `${product.name} has a specific access model, and the goal of the pricing explanation is to make that model easy to understand before someone clicks deeper into the app.`,
        paragraphs: [
          `The public pricing model for ${product.name} is: ${product.pricingModel}.`,
          `${product.name} is currently described as: ${product.availability}.`,
          `For account questions, support, or official next steps, use the pricing page, the product page, and the support path rather than guessing from outdated summaries.`,
        ],
        bullets: [
          `Pricing page: ${product.pricingPath}`,
          `Product page: ${product.officialPath}`,
          `Help landing page: ${product.helpPath}`,
          `Support path: ${product.supportPath}`,
          `Official app URL: ${product.appUrl}`,
        ],
      };
  }
}
