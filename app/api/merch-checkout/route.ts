/**
 * Server-authoritative Stripe Checkout for physical merchandise.
 *
 * The route remains closed until fulfillment, shipping destinations, shipping
 * rates, and exact one-time merchandise prices are configured. It never trusts
 * a price or product description sent by the browser.
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import {
  getMerchCheckoutConfiguration,
  resolveMerchCheckoutItems,
  type MerchCheckoutRequestItem,
} from '@/lib/merchStorefront.server';

const MAX_DISTINCT_ITEMS = 12;
const MAX_QUANTITY_PER_ITEM = 10;
const MAX_TOTAL_ITEMS = 24;

/**
 * Accepts only the small stable cart contract used by the public shop.
 *
 * Duplicate choices are combined before checkout so an altered request cannot
 * bypass per-item limits by repeating the same line.
 */
function parseCartRequest(payload: unknown): MerchCheckoutRequestItem[] | null {
  if (
    typeof payload !== 'object'
    || payload === null
    || !('items' in payload)
    || !Array.isArray(payload.items)
    || payload.items.length === 0
    || payload.items.length > MAX_DISTINCT_ITEMS
  ) {
    return null;
  }

  const combined = new Map<string, MerchCheckoutRequestItem>();

  for (const candidate of payload.items) {
    if (
      typeof candidate !== 'object'
      || candidate === null
      || !('productSlug' in candidate)
      || !('variantId' in candidate)
      || !('quantity' in candidate)
      || typeof candidate.productSlug !== 'string'
      || !/^[a-z0-9-]{1,80}$/.test(candidate.productSlug)
      || typeof candidate.variantId !== 'string'
      || !/^[a-z0-9-]{1,40}$/.test(candidate.variantId)
      || typeof candidate.quantity !== 'number'
      || !Number.isInteger(candidate.quantity)
      || candidate.quantity < 1
      || candidate.quantity > MAX_QUANTITY_PER_ITEM
    ) {
      return null;
    }

    const key = `${candidate.productSlug}:${candidate.variantId}`;
    const existing = combined.get(key);
    const quantity = (existing?.quantity ?? 0) + candidate.quantity;
    if (quantity > MAX_QUANTITY_PER_ITEM) return null;

    combined.set(key, {
      productSlug: candidate.productSlug,
      variantId: candidate.variantId,
      quantity,
    });
  }

  const items = [...combined.values()];
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  return totalQuantity <= MAX_TOTAL_ITEMS ? items : null;
}

/**
 * Creates a secure one-time Stripe session after every cart choice is rechecked.
 */
export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const checkoutConfiguration = getMerchCheckoutConfiguration();

  if (!secretKey || !checkoutConfiguration.ready) {
    return NextResponse.json(
      { error: 'Merchandise ordering is not open yet.' },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'The cart could not be read.' }, { status: 400 });
  }

  const requestedItems = parseCartRequest(payload);
  if (!requestedItems) {
    return NextResponse.json({ error: 'The cart is not valid.' }, { status: 400 });
  }

  try {
    const resolvedItems = await resolveMerchCheckoutItems(requestedItems);
    const stripe = new Stripe(secretKey, {
      apiVersion: '2026-01-28.clover',
    });
    const baseUrl = (process.env.NEXT_PUBLIC_URL || request.nextUrl.origin).replace(/\/$/, '');
    const cartReference = resolvedItems
      .map((item) => `${item.productSlug}:${item.variantId}:${item.quantity}`)
      .join('|')
      .slice(0, 500);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: resolvedItems.map((item) => ({
        price: item.priceId,
        quantity: item.quantity,
      })),
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: checkoutConfiguration.allowedCountries,
      },
      shipping_options: checkoutConfiguration.shippingRateIds.map((shippingRate) => ({
        shipping_rate: shippingRate,
      })),
      customer_creation: 'always',
      metadata: {
        orderType: 'merchandise',
        cartVersion: 'v1',
        cartReference,
      },
      payment_intent_data: {
        metadata: {
          orderType: 'merchandise',
          cartVersion: 'v1',
          cartReference,
        },
      },
      // Stripe replaces this literal placeholder after payment. The return
      // page retrieves that session server-side before showing confirmation.
      success_url: `${baseUrl}/merch?checkout=thanks&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/merch?checkout=cancelled`,
    });

    if (!session.url) {
      throw new Error('Stripe did not return a Checkout URL.');
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(`Merchandise checkout could not start: ${detail}`);
    return NextResponse.json(
      { error: 'Secure checkout could not open. The cart was not charged.' },
      { status: 500 },
    );
  }
}
