/**
 * Server-authoritative merchandise availability and pricing.
 *
 * The browser receives only verified display data and stable product choices.
 * Stripe Price IDs, shipping configuration, and the fulfillment switch stay on
 * the server so a shopper cannot turn a design preview into an unsupported
 * order by changing browser data.
 */

import 'server-only';

import { cache } from 'react';
import Stripe from 'stripe';

import {
  MERCH_PRODUCTS,
  type MerchProductDefinition,
  type MerchVariantDefinition,
} from '@/lib/merchCatalog';

const STRIPE_API_VERSION = '2026-01-28.clover';

/** A safe, serializable variant that can cross from a Server Component to the cart. */
export interface StorefrontMerchVariant {
  id: string;
  label: string;
  formattedPrice: string | null;
  unitAmount: number | null;
  currency: string | null;
  purchasable: boolean;
}

/** Product copy plus verified price state for public storefront components. */
export interface StorefrontMerchProduct
  extends Omit<MerchProductDefinition, 'variants'> {
  variants: StorefrontMerchVariant[];
  startingPrice: string | null;
  purchasable: boolean;
}

/** Complete public shop state, including a plain-language launch message. */
export interface MerchStorefront {
  products: StorefrontMerchProduct[];
  /** True when either Fourthwall or the guarded local checkout can take orders. */
  ordersOpen: boolean;
  checkoutReady: boolean;
  notice: string;
}

/** A normalized line item accepted by the merchandise checkout route. */
export interface MerchCheckoutRequestItem {
  productSlug: string;
  variantId: string;
  quantity: number;
}

/** A Stripe-ready line item produced only after server-side catalog validation. */
export interface ResolvedMerchCheckoutItem {
  priceId: string;
  quantity: number;
  productSlug: string;
  variantId: string;
}

/** Shipping and fulfillment controls required before the shop may take money. */
export interface MerchCheckoutConfiguration {
  ready: boolean;
  allowedCountries: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[];
  shippingRateIds: string[];
}

interface VerifiedMerchPrice {
  priceId: string;
  unitAmount: number;
  currency: string;
}

const STRIPE_CHECKOUT_SESSION_ID = /^cs_(?:test|live)_[A-Za-z0-9_]+$/;

/**
 * Creates a Stripe client only when the server secret exists.
 *
 * Returning null is intentional for preview builds; public pages still render
 * the first-batch designs while clearly keeping ordering closed.
 */
function createStripeClient(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;

  return new Stripe(secretKey, { apiVersion: STRIPE_API_VERSION });
}

/**
 * Reads the explicit shop-opening controls.
 *
 * All three controls are required: an owner must confirm fulfillment, name at
 * least one destination country, and configure at least one Stripe shipping
 * rate. This prevents a code deployment alone from opening physical checkout.
 */
export function getMerchCheckoutConfiguration(): MerchCheckoutConfiguration {
  const fulfillmentReady = process.env.MERCH_FULFILLMENT_READY === 'true';
  const allowedCountries = (
    (process.env.MERCH_ALLOWED_COUNTRIES ?? '')
      .split(',')
      .map((country) => country.trim().toUpperCase())
      .filter((country) => /^[A-Z]{2}$/.test(country))
  ) as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[];
  const shippingRateIds = (process.env.MERCH_SHIPPING_RATE_IDS ?? '')
    .split(',')
    .map((rateId) => rateId.trim())
    .filter((rateId) => rateId.startsWith('shr_'));

  return {
    ready:
      fulfillmentReady
      && allowedCountries.length > 0
      && shippingRateIds.length > 0,
    allowedCountries,
    shippingRateIds,
  };
}

/**
 * Formats Stripe's integer amount without maintaining a second price in code.
 */
function formatStripeAmount(unitAmount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(unitAmount / 100);
}

/**
 * Confirms that one configured Stripe Price belongs to the expected shop item.
 *
 * Both the Stripe Product and Price require stable metadata. That check keeps a
 * copied subscription or unrelated one-time Price ID from appearing in the
 * shop or being charged through the merchandise route.
 */
async function verifyMerchPrice(
  stripe: Stripe,
  product: MerchProductDefinition,
  variant: MerchVariantDefinition,
): Promise<VerifiedMerchPrice | null> {
  const priceId = process.env[variant.priceEnvironmentVariable];
  if (!priceId) return null;

  try {
    const price = await stripe.prices.retrieve(priceId, {
      expand: ['product'],
    });
    const stripeProduct = price.product;

    if (
      !price.active
      || price.type !== 'one_time'
      || price.unit_amount === null
      || price.unit_amount <= 0
      || typeof stripeProduct === 'string'
      || stripeProduct.deleted
      || !stripeProduct.active
      || stripeProduct.metadata.sixsmith_merch_slug !== product.slug
      || price.metadata.sixsmith_merch_variant !== variant.id
    ) {
      console.error(
        `Merchandise price ${priceId} failed validation for ${product.slug}/${variant.id}.`,
      );
      return null;
    }

    return {
      priceId: price.id,
      unitAmount: price.unit_amount,
      currency: price.currency,
    };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(
      `Could not verify merchandise price for ${product.slug}/${variant.id}: ${detail}`,
    );
    return null;
  }
}

/**
 * Loads the public storefront once per server render.
 *
 * Missing prices are an expected pre-launch state. A partially configured shop
 * stays closed and says so plainly rather than quietly substituting a guessed
 * amount or an unrelated Stripe product.
 */
export const getMerchStorefront = cache(async (): Promise<MerchStorefront> => {
  const stripe = createStripeClient();
  const checkoutConfiguration = getMerchCheckoutConfiguration();

  const products = await Promise.all(
    MERCH_PRODUCTS.map(async (product): Promise<StorefrontMerchProduct> => {
      const verifiedPrices = stripe
        ? await Promise.all(
            product.variants.map((variant) => verifyMerchPrice(stripe, product, variant)),
          )
        : product.variants.map(() => null);

      const variants = product.variants.map((variant, index): StorefrontMerchVariant => {
        const verifiedPrice = verifiedPrices[index];

        return {
          id: variant.id,
          label: variant.label,
          formattedPrice: verifiedPrice
            ? formatStripeAmount(verifiedPrice.unitAmount, verifiedPrice.currency)
            : null,
          unitAmount: verifiedPrice?.unitAmount ?? null,
          currency: verifiedPrice?.currency ?? null,
          purchasable: verifiedPrice !== null && checkoutConfiguration.ready,
        };
      });
      const pricedVariants = variants.filter(
        (variant): variant is StorefrontMerchVariant & { unitAmount: number; currency: string } =>
          variant.unitAmount !== null && variant.currency !== null,
      );
      const lowestPrice = pricedVariants.reduce<
        (StorefrontMerchVariant & { unitAmount: number; currency: string }) | null
      >((lowest, variant) => {
        if (!lowest || variant.unitAmount < lowest.unitAmount) return variant;
        return lowest;
      }, null);
      const allPricesMatch =
        pricedVariants.length > 0
        && pricedVariants.every((variant) => variant.unitAmount === lowestPrice?.unitAmount);
      const startingPrice = lowestPrice
        ? `${allPricesMatch ? '' : 'From '}${formatStripeAmount(
            lowestPrice.unitAmount,
            lowestPrice.currency,
          )}`
        : null;

      return {
        ...product,
        variants,
        startingPrice,
        purchasable: variants.some((variant) => variant.purchasable),
      };
    }),
  );
  const hasAnyVerifiedPrice = products.some((product) =>
    product.variants.some((variant) => variant.unitAmount !== null),
  );
  const configuredCurrencies = new Set(
    products.flatMap((product) =>
      product.variants.flatMap((variant) =>
        variant.currency ? [variant.currency] : [],
      ),
    ),
  );
  const hasOneStoreCurrency = configuredCurrencies.size <= 1;
  const customerReadyProducts = hasOneStoreCurrency
    ? products
    : products.map((product) => ({
        ...product,
        purchasable: false,
        variants: product.variants.map((variant) => ({
          ...variant,
          purchasable: false,
        })),
      }));
  const checkoutReady =
    checkoutConfiguration.ready
    && hasOneStoreCurrency
    && customerReadyProducts.some((product) => product.purchasable);
  const fourthwallReady = customerReadyProducts.some((product) => Boolean(product.shopUrl));
  const ordersOpen = fourthwallReady || checkoutReady;

  let notice =
    'The first batch is still at the workbench. Browse every design now; orders stay closed until prices, shipping, and who packs and sends each order are confirmed.';

  if (fourthwallReady) {
    // Fourthwall owns the live merchandise cart and final amount. The website
    // links directly to each verified listing rather than creating a second,
    // conflicting physical-goods checkout.
    notice =
      'Orders are open. Each piece is made after you order it, and shipping plus any tax are shown before you pay.';
  } else if (!hasOneStoreCurrency) {
    // A mixed-currency catalog cannot produce a truthful cart total. Keep the
    // entire shop closed until every one-time Price uses the store currency.
    console.error('Merchandise ordering is closed because configured prices use multiple currencies.');
    notice =
      'Prices are still being checked, so ordering remains closed for now.';
  } else if (hasAnyVerifiedPrice && !checkoutConfiguration.ready) {
    notice =
      'Prices are being checked, but orders are still closed until shipping and order handling are ready.';
  } else if (checkoutReady) {
    notice =
      'Orders are open. Pick your gear, choose the available option, and head to secure checkout when your cart is ready.';
  }

  return {
    products: customerReadyProducts,
    ordersOpen,
    checkoutReady,
    notice,
  };
});

/**
 * Confirms a successful shop return against Stripe before the page celebrates
 * or clears the browser cart.
 *
 * Query parameters are visitor-controlled. A `checkout=thanks` flag alone is
 * never proof that an order exists or was paid.
 */
export async function confirmMerchCheckoutSession(
  sessionId: string | null,
): Promise<boolean> {
  if (!sessionId || !STRIPE_CHECKOUT_SESSION_ID.test(sessionId)) return false;

  const stripe = createStripeClient();
  if (!stripe) return false;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return (
      session.metadata?.orderType === 'merchandise'
      && session.status === 'complete'
      && session.payment_status === 'paid'
    );
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(`Could not confirm merchandise Checkout Session ${sessionId}: ${detail}`);
    return false;
  }
}

/**
 * Resolves browser cart choices back to verified Stripe Price IDs.
 *
 * The route calls this after validating basic request shape. Every line is
 * rechecked against server configuration so stale local carts and altered
 * requests cannot select a hidden, recurring, or unrelated Stripe price.
 */
export async function resolveMerchCheckoutItems(
  items: MerchCheckoutRequestItem[],
): Promise<ResolvedMerchCheckoutItem[]> {
  const checkoutConfiguration = getMerchCheckoutConfiguration();
  if (!checkoutConfiguration.ready) {
    throw new Error('Merchandise fulfillment is not ready.');
  }

  const stripe = createStripeClient();
  if (!stripe) {
    throw new Error('Stripe checkout is not configured.');
  }

  return Promise.all(
    items.map(async (item) => {
      const product = MERCH_PRODUCTS.find((candidate) => candidate.slug === item.productSlug);
      const variant = product?.variants.find((candidate) => candidate.id === item.variantId);

      if (!product || !variant) {
        throw new Error(`Unknown merchandise choice: ${item.productSlug}/${item.variantId}.`);
      }

      const verifiedPrice = await verifyMerchPrice(stripe, product, variant);
      if (!verifiedPrice) {
        throw new Error(
          `Merchandise choice is not available: ${item.productSlug}/${item.variantId}.`,
        );
      }

      return {
        priceId: verifiedPrice.priceId,
        quantity: item.quantity,
        productSlug: item.productSlug,
        variantId: item.variantId,
      };
    }),
  );
}
