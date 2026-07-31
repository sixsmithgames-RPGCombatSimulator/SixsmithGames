/**
 * Server-only merchandise bonus ledger backed by Stripe coupons.
 *
 * Fourthwall confirms the paid physical order. Stripe then holds one
 * deterministic, single-use promotion record for that order. The buyer's
 * normalized email is stored only as a SHA-256 digest, allowing the claim
 * route to prove account ownership without copying the address into metadata.
 */

import 'server-only';

import { createHash, createHmac } from 'node:crypto';

import Stripe from 'stripe';

import { calculateFreeStudioMonths, getMerchProduct } from '@/lib/merchCatalog';
import { PLANS } from '@/lib/subscription';

const MAX_AUTOMATED_BONUS_MONTHS = 24;

export interface FourthwallPaidOrder {
  id: string;
  friendlyId: string;
  shopId: string;
  status: string;
  email: string;
  offers: Array<{
    slug: string;
    variant: {
      quantity: number;
    };
  }>;
}

export interface MerchBonusPromotion {
  promotionCode: Stripe.PromotionCode;
  orderNumber: string;
  months: number;
}

/** Converts the shopper-facing order number to the only accepted form. */
export function normalizeFourthwallOrderNumber(value: string): string | null {
  const normalized = value.trim().toUpperCase();
  return /^[A-Z0-9]{6,32}$/.test(normalized) ? normalized : null;
}

/** Produces the same non-reversible email identity for webhook and claim paths. */
export function hashMerchBuyerEmail(email: string): string {
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}

/** Stores only approved merch slugs and quantities for truthful Operations counts. */
function serializeMerchItems(order: FourthwallPaidOrder): string {
  const quantities = new Map<string, number>();

  for (const offer of order.offers) {
    const quantity = offer.variant.quantity;
    if (!getMerchProduct(offer.slug) || !Number.isInteger(quantity) || quantity <= 0) {
      continue;
    }
    quantities.set(offer.slug, (quantities.get(offer.slug) ?? 0) + quantity);
  }

  return JSON.stringify(
    [...quantities].map(([slug, quantity]) => ({ slug, quantity })),
  );
}

/**
 * Creates an unguessable but reproducible promotion code for one order.
 *
 * The public order number is not enough to derive this value. A keyed suffix
 * prevents someone who sees another buyer's receipt number from guessing a
 * usable Stripe code.
 */
function buildMerchPromotionCode(orderNumber: string, signingSecret: string): string {
  const suffix = createHmac('sha256', signingSecret)
    .update(`sixsmith-merch-bonus:${orderNumber}`)
    .digest('hex')
    .slice(0, 12)
    .toUpperCase();

  return `SSG-${orderNumber}-${suffix}`;
}

/** Resolves the Stripe Product that owns the current Studio subscription price. */
async function getStudioStripeProductId(stripe: Stripe): Promise<string> {
  const bundlePrice = await stripe.prices.retrieve(PLANS.bundle.stripePriceId);
  if (typeof bundlePrice.product === 'string') return bundlePrice.product;
  if (!bundlePrice.product.deleted) return bundlePrice.product.id;

  throw new Error('The GameMaster Studio Stripe product is not active.');
}

/**
 * Creates or reuses the one coupon assigned to a Fourthwall order.
 *
 * A deterministic coupon ID plus Stripe idempotency protects against delayed
 * duplicate webhook deliveries, including duplicates arriving after Stripe's
 * normal idempotency retention window.
 */
async function getOrCreateOrderCoupon(
  stripe: Stripe,
  order: FourthwallPaidOrder,
  months: number,
): Promise<Stripe.Coupon> {
  const couponId = `ssg_merch_${createHash('sha256').update(order.id).digest('hex').slice(0, 24)}`;
  const studioProductId = await getStudioStripeProductId(stripe);

  try {
    return await stripe.coupons.create(
      {
        id: couponId,
        name: `${months} free Studio ${months === 1 ? 'month' : 'months'}`,
        percent_off: 100,
        duration: 'repeating',
        duration_in_months: months,
        max_redemptions: 1,
        applies_to: { products: [studioProductId] },
        metadata: {
          benefit_type: 'merch_studio_months',
          fourthwall_order_id: order.id,
          fourthwall_order_number: order.friendlyId,
          free_studio_months: String(months),
        },
      },
      { idempotencyKey: `sixsmith-merch-coupon:${order.id}` },
    );
  } catch (error) {
    if (
      error instanceof Stripe.errors.StripeInvalidRequestError
      && error.code === 'resource_already_exists'
    ) {
      return stripe.coupons.retrieve(couponId);
    }
    throw error;
  }
}

/**
 * Records a paid qualifying order as one single-use Stripe promotion.
 *
 * The function is safe to call again for the same order. It never grants time
 * directly; the signed-in claim path must still match the hashed buyer email.
 */
export async function recordPaidMerchBonus(
  stripe: Stripe,
  order: FourthwallPaidOrder,
  signingSecret: string,
): Promise<MerchBonusPromotion | null> {
  const orderNumber = normalizeFourthwallOrderNumber(order.friendlyId);
  if (!orderNumber || order.status !== 'CONFIRMED') return null;

  const months = calculateFreeStudioMonths(
    order.offers.map((offer) => ({
      slug: offer.slug,
      quantity: offer.variant.quantity,
    })),
  );
  if (months <= 0) return null;
  if (months > MAX_AUTOMATED_BONUS_MONTHS) {
    throw new Error('This order requires manual review because its Studio bonus exceeds 24 months.');
  }

  const code = buildMerchPromotionCode(orderNumber, signingSecret);
  const existingCodes = await stripe.promotionCodes.list({ code, limit: 1 });
  const existingCode = existingCodes.data[0];
  if (existingCode) {
    return { promotionCode: existingCode, orderNumber, months };
  }

  const coupon = await getOrCreateOrderCoupon(stripe, order, months);
  const metadata = {
    benefit_type: 'merch_studio_months',
    buyer_email_sha256: hashMerchBuyerEmail(order.email),
    claim_status: 'available',
    fourthwall_order_id: order.id,
    fourthwall_order_number: orderNumber,
    free_studio_months: String(months),
    merch_items_json: serializeMerchItems(order),
  };

  try {
    const promotionCode = await stripe.promotionCodes.create(
      {
        promotion: { type: 'coupon', coupon: coupon.id },
        code,
        max_redemptions: 1,
        metadata,
      },
      { idempotencyKey: `sixsmith-merch-promotion:${order.id}` },
    );
    return { promotionCode, orderNumber, months };
  } catch (error) {
    // A concurrent duplicate may win after the first list call. Re-read the
    // deterministic code before treating that harmless race as a failure.
    const duplicateCodes = await stripe.promotionCodes.list({ code, limit: 1 });
    const duplicateCode = duplicateCodes.data[0];
    if (duplicateCode) return { promotionCode: duplicateCode, orderNumber, months };
    throw error;
  }
}

/** Finds an order benefit and proves it belongs to the signed-in email. */
export async function findMerchBonusForBuyer(
  stripe: Stripe,
  orderNumberInput: string,
  buyerEmail: string,
  signingSecret: string,
): Promise<MerchBonusPromotion | null> {
  const orderNumber = normalizeFourthwallOrderNumber(orderNumberInput);
  if (!orderNumber) return null;

  const code = buildMerchPromotionCode(orderNumber, signingSecret);
  const promotionCodes = await stripe.promotionCodes.list({ code, limit: 1 });
  const promotionCode = promotionCodes.data[0];
  if (!promotionCode) return null;
  const promotionMetadata = promotionCode.metadata ?? {};

  if (promotionMetadata.buyer_email_sha256 !== hashMerchBuyerEmail(buyerEmail)) {
    return null;
  }

  const months = Number(promotionMetadata.free_studio_months);
  if (!Number.isInteger(months) || months <= 0 || months > MAX_AUTOMATED_BONUS_MONTHS) {
    return null;
  }

  return { promotionCode, orderNumber, months };
}

/**
 * Adds earned months after the subscriber's already-paid Studio period.
 *
 * The target trial end is written to the promotion metadata before Stripe is
 * changed. Retrying therefore uses the same timestamp and idempotency key,
 * preventing two rapid claim requests from extending the subscription twice.
 */
export async function applyMerchBonusToStudioSubscription(
  stripe: Stripe,
  bonus: MerchBonusPromotion,
  subscriptionId: string,
  clerkUserId: string,
): Promise<'applied' | 'already_applied' | 'not_studio'> {
  const promotion = bonus.promotionCode;
  const promotionMetadata = promotion.metadata ?? {};

  if (promotionMetadata.claim_status === 'applied') return 'already_applied';

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const subscriptionMetadata = subscription.metadata ?? {};
  const belongsToUser = subscriptionMetadata.clerkUserId === clerkUserId;
  const isStudio = subscription.items.data.some(
    (item) => item.price.id === PLANS.bundle.stripePriceId,
  );
  if (!belongsToUser || !isStudio || !['active', 'trialing'].includes(subscription.status)) {
    return 'not_studio';
  }

  const rawSubscription = subscription as Stripe.Subscription & {
    current_period_end?: number;
  };
  const savedTarget = Number(promotionMetadata.target_trial_end);
  const currentBase = Math.max(
    Math.floor(Date.now() / 1000),
    rawSubscription.current_period_end ?? 0,
    subscription.trial_end ?? 0,
  );
  const targetTrialEnd = Number.isInteger(savedTarget) && savedTarget > currentBase
    ? savedTarget
    : addCalendarMonths(currentBase, bonus.months);

  await stripe.promotionCodes.update(promotion.id, {
    active: false,
    metadata: {
      ...promotionMetadata,
      claim_status: 'applying',
      claimed_by_clerk_user_id: clerkUserId,
      claimed_subscription_id: subscription.id,
      target_trial_end: String(targetTrialEnd),
    },
  });

  await stripe.subscriptions.update(
    subscription.id,
    {
      trial_end: targetTrialEnd,
      proration_behavior: 'none',
      metadata: {
        ...subscriptionMetadata,
        latest_merch_bonus_order: bonus.orderNumber,
        latest_merch_bonus_months: String(bonus.months),
      },
    },
    { idempotencyKey: `sixsmith-merch-claim:${promotionMetadata.fourthwall_order_id}` },
  );

  await stripe.promotionCodes.update(promotion.id, {
    active: false,
    metadata: {
      ...promotionMetadata,
      claim_status: 'applied',
      claimed_by_clerk_user_id: clerkUserId,
      claimed_subscription_id: subscription.id,
      target_trial_end: String(targetTrialEnd),
    },
  });

  return 'applied';
}

/** Adds whole UTC calendar months while preserving the day when possible. */
function addCalendarMonths(timestampSeconds: number, months: number): number {
  const value = new Date(timestampSeconds * 1000);
  const originalDay = value.getUTCDate();
  value.setUTCDate(1);
  value.setUTCMonth(value.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + 1, 0))
    .getUTCDate();
  value.setUTCDate(Math.min(originalDay, lastDay));
  return Math.floor(value.getTime() / 1000);
}
