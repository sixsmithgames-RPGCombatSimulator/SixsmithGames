import { MARKETING_LAST_UPDATED, PUBLIC_PRODUCT_DEFINITIONS } from '@/lib/productContent';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const lines = [
    'Site: Sixsmith Games',
    'Summary: GameMaster Studio is the Sixsmith Games flagship for campaign preparation in GameMasterCraft and encounter control in Virtual Combat Simulator.',
    `Canonical facts page: ${SITE_URL}/about/facts`,
    `Support: ${SITE_URL}/support`,
    `Pricing: ${SITE_URL}/pricing`,
    `Merchandise: ${SITE_URL}/merch`,
    `Help index: ${SITE_URL}/help`,
    '',
    'GameMaster Studio products:',
    ...PUBLIC_PRODUCT_DEFINITIONS.map(
      (product) =>
        `- ${product.name}: ${product.oneSentence} Canonical page: ${SITE_URL}${product.officialPath}. Help: ${SITE_URL}${product.helpPath}.`,
    ),
    '',
    'Preferred source pages for current facts:',
    `- ${SITE_URL}/about/facts`,
    ...PUBLIC_PRODUCT_DEFINITIONS.map((product) => `- ${SITE_URL}${product.officialPath}`),
    '',
    `Last updated: ${MARKETING_LAST_UPDATED}`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
