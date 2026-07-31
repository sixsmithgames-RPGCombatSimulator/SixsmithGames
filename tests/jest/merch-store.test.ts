import fs from 'node:fs';
import path from 'node:path';

import { calculateFreeStudioMonths, MERCH_PRODUCTS } from '../../lib/merchCatalog';
import { publicRoutes } from '../site-routes';

/** Reads source used by guardrail tests and fails plainly when a file is missing. */
function readProjectFile(relativePath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
}

describe('Sixsmith Games merchandise catalog', () => {
  it('uses stable, unique product and variant identifiers', () => {
    const productSlugs = MERCH_PRODUCTS.map((product) => product.slug);
    const environmentVariables = MERCH_PRODUCTS.flatMap((product) =>
      product.variants.map((variant) => variant.priceEnvironmentVariable),
    );

    expect(new Set(productSlugs).size).toBe(productSlugs.length);
    expect(new Set(environmentVariables).size).toBe(environmentVariables.length);

    for (const product of MERCH_PRODUCTS) {
      expect(product.slug).toMatch(/^[a-z0-9-]+$/);
      expect(product.name.length).toBeGreaterThan(5);
      expect(product.description.length).toBeGreaterThan(30);
      expect(product.variants.length).toBeGreaterThan(0);
      expect(new Set(product.variants.map((variant) => variant.id)).size)
        .toBe(product.variants.length);
    }
  });

  it('contains only the three approved public Fourthwall products', () => {
    expect(MERCH_PRODUCTS.map((product) => product.slug)).toEqual([
      'master-your-stories-hoodie',
      'master-your-stories-full-zip-hoodie',
      'gateway-wyrm-desk-mat',
    ]);
    expect(MERCH_PRODUCTS.map((product) => product.shopPrice)).toEqual([
      '$44.00',
      'From $59.99',
      '$34.00',
    ]);
    expect(MERCH_PRODUCTS.map((product) => product.freeStudioMonths)).toEqual([3, 3, 1]);
    expect(MERCH_PRODUCTS[0]?.tableLine).toBe(
      'For cold convention halls, late night sessions, or when the monsters feel too real.',
    );

    for (const product of MERCH_PRODUCTS) {
      expect(product.shopUrl).toMatch(
        /^https:\/\/sixsmith-games-shop\.fourthwall\.com\/products\/[a-z0-9-]+$/,
      );
    }
  });

  it('documents every required Stripe Price setting in the environment example', () => {
    const environmentExample = readProjectFile('.env.example');

    for (const product of MERCH_PRODUCTS) {
      for (const variant of product.variants) {
        expect(environmentExample).toContain(`${variant.priceEnvironmentVariable}=`);
      }
    }
  });
});

describe('merchandise commerce safeguards', () => {
  it('keeps fulfillment, shipping, and one-time Stripe validation on the server', () => {
    const storefrontSource = readProjectFile('lib/merchStorefront.server.ts');
    const checkoutSource = readProjectFile('app/api/merch-checkout/route.ts');

    expect(storefrontSource).toContain("process.env.MERCH_FULFILLMENT_READY === 'true'");
    expect(storefrontSource).toContain("price.type !== 'one_time'");
    expect(storefrontSource).toContain('sixsmith_merch_slug');
    expect(storefrontSource).toContain('sixsmith_merch_variant');
    expect(checkoutSource).toContain("mode: 'payment'");
    expect(checkoutSource).toContain('shipping_address_collection');
    expect(checkoutSource).toContain('shipping_options');
    expect(checkoutSource).toContain(
      'session_id={CHECKOUT_SESSION_ID}',
    );
    expect(checkoutSource).not.toContain('price_data');
  });

  it('verifies a paid merchandise session before showing order confirmation', () => {
    const storefrontSource = readProjectFile('lib/merchStorefront.server.ts');
    const pageSource = readProjectFile('app/merch/page.tsx');

    expect(storefrontSource).toContain('confirmMerchCheckoutSession');
    expect(storefrontSource).toContain("session.metadata?.orderType === 'merchandise'");
    expect(storefrontSource).toContain("session.status === 'complete'");
    expect(storefrontSource).toContain("session.payment_status === 'paid'");
    expect(pageSource).toContain("'unconfirmed'");
  });

  it('routes paid merchandise away from subscription entitlement updates', () => {
    const webhookSource = readProjectFile('app/api/webhook/stripe/route.ts');
    const merchandiseBranch = webhookSource.indexOf("orderType === 'merchandise'");
    const subscriptionMetadataRead = webhookSource.indexOf(
      'const clerkUserId = session.metadata?.clerkUserId',
    );

    expect(merchandiseBranch).toBeGreaterThan(-1);
    expect(subscriptionMetadataRead).toBeGreaterThan(merchandiseBranch);
  });

  it('adds Studio months by eligible item quantity and ignores unknown offers', () => {
    expect(calculateFreeStudioMonths([
      { slug: 'master-your-stories-hoodie', quantity: 1 },
      { slug: 'master-your-stories-full-zip-hoodie', quantity: 2 },
      { slug: 'gateway-wyrm-desk-mat', quantity: 3 },
      { slug: 'not-a-sixsmith-product', quantity: 99 },
    ])).toBe(12);
  });

  it('creates merchandise bonuses only from signed paid-order notifications', () => {
    const webhookSource = readProjectFile('app/api/webhook/fourthwall/route.ts');
    const bonusSource = readProjectFile('lib/merchBonus.server.ts');
    const subscriptionCheckoutSource = readProjectFile('app/api/checkout/route.ts');

    expect(webhookSource).toContain('x-fourthwall-hmac-sha256');
    expect(webhookSource).toContain('timingSafeEqual');
    expect(webhookSource).toContain("event.type !== 'ORDER_PLACED'");
    expect(webhookSource).toContain('event.testMode');
    expect(webhookSource).toContain("event.data.status !== 'CONFIRMED'");
    expect(bonusSource).toContain('buyer_email_sha256');
    expect(bonusSource).toContain('max_redemptions: 1');
    expect(bonusSource).toContain('idempotencyKey');
    expect(subscriptionCheckoutSource).toContain('promotion_code');
    expect(subscriptionCheckoutSource).not.toContain('allow_promotion_codes');
  });
});

describe('merchandise discovery', () => {
  it('uses clean customer-facing Cloudinary images instead of editor captures', () => {
    const artworkSource = readProjectFile('components/MerchArtwork.tsx');
    const catalogSource = readProjectFile('lib/merchCatalog.ts');
    const pageSource = readProjectFile('app/merch/page.tsx');

    expect(catalogSource).toContain('/e_trim:10/f_auto,q_auto,w_1400/v1785444317/');
    expect(catalogSource).toContain('/e_trim:10/f_auto,q_auto,w_1400/v1785444314/');
    expect(catalogSource).toContain('/e_trim:10/f_auto,q_auto,w_1400/v1785499541/');
    expect(artworkSource).toContain('imageUrl');
    expect(pageSource).not.toContain('SESSION NOTES');
    expect(pageSource).not.toContain('ROLL FOR');
    expect(pageSource).not.toContain('CONSEQUENCES');
    expect(pageSource).not.toContain('Two approved pieces');
    expect(pageSource).not.toContain('Fourthwall handles payment');
    expect(readProjectFile('lib/merchStorefront.server.ts')).not.toContain(
      'Sixsmith Games Fourthwall shop',
    );
    expect(readProjectFile('lib/schema.ts')).not.toContain(
      'merchandise planned for',
    );
  });

  it('covers the store in navigation, footer, sitemap, and responsive routes', () => {
    expect(publicRoutes).toContain('/merch');
    expect(readProjectFile('components/Navigation.tsx')).toContain(
      "{ label: 'Merchandise', href: '/merch' }",
    );
    expect(readProjectFile('components/Footer.tsx')).toContain(
      '<Link href="/merch">Merchandise</Link>',
    );
    expect(readProjectFile('components/Footer.tsx')).toContain(
      'https://sixsmith-games-shop.fourthwall.com/pages/terms-of-sale',
    );
    expect(readProjectFile('components/Footer.tsx')).toContain(
      'https://sixsmith-games-shop.fourthwall.com/pages/refund-return-policy',
    );
    expect(readProjectFile('app/sitemap.ts')).toContain("'/merch'");
    expect(readProjectFile('app/llms.txt/route.ts')).toContain(
      '`Merchandise: ${SITE_URL}/merch`',
    );
  });
});
