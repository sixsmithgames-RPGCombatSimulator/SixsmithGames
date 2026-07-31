/**
 * Signed Fourthwall order webhook for GameMaster Studio merchandise bonuses.
 *
 * Only a real, paid ORDER_PLACED event from the configured shop can create a
 * benefit. Customer email is reduced to a hash before Stripe stores the claim
 * record, and duplicate deliveries reuse the same deterministic promotion.
 */

import { createHmac, timingSafeEqual } from 'node:crypto';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import {
  recordPaidMerchBonus,
  type FourthwallPaidOrder,
} from '@/lib/merchBonus.server';

export const runtime = 'nodejs';

interface FourthwallOrderEvent {
  id: string;
  shopId: string;
  type: string;
  testMode: boolean;
  data: FourthwallPaidOrder;
}

/** Compares Fourthwall's base64 HMAC without leaking timing information. */
function hasValidFourthwallSignature(
  rawBody: string,
  suppliedSignature: string,
  secret: string,
): boolean {
  const expected = createHmac('sha256', secret).update(rawBody).digest();
  let supplied: Buffer;
  try {
    supplied = Buffer.from(suppliedSignature, 'base64');
  } catch {
    return false;
  }

  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

/** Accepts only the fields required to prove and price a paid qualifying order. */
function parseFourthwallOrderEvent(value: unknown): FourthwallOrderEvent | null {
  if (typeof value !== 'object' || value === null) return null;
  const event = value as Partial<FourthwallOrderEvent>;
  const order = event.data as Partial<FourthwallPaidOrder> | undefined;
  if (
    typeof event.id !== 'string'
    || typeof event.shopId !== 'string'
    || event.type !== 'ORDER_PLACED'
    || typeof event.testMode !== 'boolean'
    || typeof order !== 'object'
    || order === null
    || typeof order.id !== 'string'
    || typeof order.friendlyId !== 'string'
    || typeof order.shopId !== 'string'
    || typeof order.status !== 'string'
    || typeof order.email !== 'string'
    || !Array.isArray(order.offers)
  ) {
    return null;
  }

  const offersAreValid = order.offers.every((offer) => (
    typeof offer === 'object'
    && offer !== null
    && typeof offer.slug === 'string'
    && typeof offer.variant === 'object'
    && offer.variant !== null
    && Number.isInteger(offer.variant.quantity)
  ));
  return offersAreValid ? event as FourthwallOrderEvent : null;
}

/** Verifies, records, and acknowledges one Fourthwall notification. */
export async function POST(request: Request) {
  const webhookSecret = process.env.FOURTHWALL_WEBHOOK_SECRET;
  const configuredShopId = process.env.FOURTHWALL_SHOP_ID;
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!webhookSecret || !configuredShopId || !stripeSecret) {
    return NextResponse.json({ error: 'Merchandise bonus processing is not configured.' }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-fourthwall-hmac-sha256');
  if (!signature || !hasValidFourthwallSignature(rawBody, signature, webhookSecret)) {
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid webhook payload.' }, { status: 400 });
  }

  const event = parseFourthwallOrderEvent(payload);
  if (!event) {
    return NextResponse.json({ error: 'Unsupported webhook payload.' }, { status: 400 });
  }
  if (event.testMode) return NextResponse.json({ received: true, test: true });
  if (
    event.shopId !== configuredShopId
    || event.data.shopId !== configuredShopId
    || event.data.status !== 'CONFIRMED'
  ) {
    return NextResponse.json({ error: 'Order is not eligible.' }, { status: 403 });
  }

  try {
    const stripe = new Stripe(stripeSecret, { apiVersion: '2026-01-28.clover' });
    const bonus = await recordPaidMerchBonus(stripe, event.data, webhookSecret);
    return NextResponse.json({ received: true, qualifying: bonus !== null });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(`Fourthwall merchandise bonus could not be recorded: ${detail}`);
    return NextResponse.json({ error: 'Bonus recording failed.' }, { status: 500 });
  }
}
