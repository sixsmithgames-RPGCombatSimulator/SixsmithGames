import { SITE_NAME, SITE_URL } from '@/lib/site';
import type { ProductDefinition, ProductFaq } from '@/lib/productContent';
import { getProductScreenshots } from '@/lib/screenshots';

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
      'Sixsmith Games builds GameMaster Studio for campaign preparation in GameMasterCraft and encounter control in Virtual Combat Simulator.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'info@sixsmithgames.com',
      url: `${SITE_URL}/support`,
    },
  };
}

/** Describes the live merchandise page as a browsable two-product collection. */
export function createMerchCollectionSchema(
  products: Array<{ name: string; slug: string; description: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Sixsmith Games tabletop RPG merchandise',
    description:
      'Sixsmith Games gear for Game Masters, game nights, and tabletop RPG tables.',
    url: `${SITE_URL}/merch`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/merch#${product.slug}`,
        item: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
          brand: {
            '@type': 'Brand',
            name: SITE_NAME,
          },
        },
      })),
    },
  };
}

export function createSoftwareApplicationSchema(product: ProductDefinition) {
  const screenshots = getProductScreenshots(product.slug);
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

  if (screenshots.length > 0) {
    schema.image = screenshots.map((shot) => shot.src);
  }

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
