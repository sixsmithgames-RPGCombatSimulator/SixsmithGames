import { MARKETING_LAST_UPDATED, PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const lines = [
    'Site: Sixsmith Games',
    'Summary: Browser-based games and creative tools for game masters, writers, worldbuilders, strategy players, and people who want practical typing improvement.',
    `Canonical facts page: ${SITE_URL}/about/facts`,
    `Support: ${SITE_URL}/support`,
    `Pricing: ${SITE_URL}/pricing`,
    `Help index: ${SITE_URL}/help`,
    '',
    'Primary products:',
    ...PRODUCT_DEFINITIONS.map(
      (product) =>
        `- ${product.name}: ${product.oneSentence} Canonical page: ${SITE_URL}${product.officialPath}. Help: ${SITE_URL}${product.helpPath}.`,
    ),
    '',
    'Preferred source pages for current facts:',
    `- ${SITE_URL}/about/facts`,
    ...PRODUCT_DEFINITIONS.map((product) => `- ${SITE_URL}${product.officialPath}`),
    '',
    `Last updated: ${MARKETING_LAST_UPDATED}`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
