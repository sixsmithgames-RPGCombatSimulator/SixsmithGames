import { SITE_NAME, SITE_URL } from '@/lib/site';
import type { ProductDefinition, ProductFaq } from '@/lib/productContent';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/apple-icon.png`,
    description:
      'Sixsmith Games builds browser-based games and creative tools for game masters, writers, worldbuilders, strategy players, and people who want practical typing improvement.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'info@sixsmithgames.com',
      url: `${SITE_URL}/support`,
    },
  };
}

export function createSoftwareApplicationSchema(product: ProductDefinition) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.oneSentence,
    url: `${SITE_URL}${product.officialPath}`,
    applicationCategory: product.applicationCategory,
    operatingSystem: product.operatingSystem,
    audience: {
      '@type': 'Audience',
      audienceType: product.primaryAudience,
    },
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
  };

  if (typeof product.offerPrice === 'number') {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.offerPrice.toFixed(2),
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${product.pricingPath}`,
    };
  }

  return schema;
}

export function createFaqSchema(faq: ProductFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createArticleSchema(input: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  authorName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    author: {
      '@type': 'Organization',
      name: input.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/apple-icon.png`,
      },
    },
  };
}
