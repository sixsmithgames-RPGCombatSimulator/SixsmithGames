/**
 * Authenticated claim route for merchandise-earned GameMaster Studio time.
 */

import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import {
  applyMerchBonusToStudioSubscription,
  findMerchBonusForBuyer,
  normalizeFourthwallOrderNumber,
} from '@/lib/merchBonus.server';

/** Matches a verified Sixsmith Games account to its paid merchandise order. */
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Sign in to claim your Studio time.' }, { status: 401 });

  const user = await currentUser();
  const primaryEmail = user?.primaryEmailAddress;
  const email = primaryEmail?.emailAddress;
  if (!email || primaryEmail.verification?.status !== 'verified') {
    return NextResponse.json({ error: 'A verified account email is required.' }, { status: 403 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'The order number could not be read.' }, { status: 400 });
  }
  const rawOrderNumber =
    typeof payload === 'object'
    && payload !== null
    && 'orderNumber' in payload
    && typeof payload.orderNumber === 'string'
      ? payload.orderNumber
      : '';
  const orderNumber = normalizeFourthwallOrderNumber(rawOrderNumber);
  if (!orderNumber) {
    return NextResponse.json({ error: 'Enter the order number from your merchandise receipt.' }, { status: 400 });
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const signingSecret = process.env.FOURTHWALL_WEBHOOK_SECRET;
  if (!stripeSecret || !signingSecret) {
    return NextResponse.json({ error: 'Bonus claims are not open yet.' }, { status: 503 });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: '2026-01-28.clover' });
  const bonus = await findMerchBonusForBuyer(stripe, orderNumber, email, signingSecret);
  if (!bonus) {
    return NextResponse.json(
      { error: 'We could not match that paid order to this account email.' },
      { status: 404 },
    );
  }
  if (bonus.promotionCode.metadata?.claim_status === 'applied') {
    return NextResponse.json({ message: 'Those Studio months have already been added.' });
  }

  const publicMetadata = (user?.publicMetadata ?? {}) as Record<string, unknown>;
  const subscriptionStatus = publicMetadata.subscriptionStatus;
  const activePlans = Array.isArray(publicMetadata.subscriptionPlans)
    ? publicMetadata.subscriptionPlans
    : publicMetadata.subscriptionPlan
      ? [publicMetadata.subscriptionPlan]
      : [];
  const subscriptionId = typeof publicMetadata.stripeSubscriptionId === 'string'
    ? publicMetadata.stripeSubscriptionId
    : null;

  if (subscriptionStatus === 'active' || subscriptionStatus === 'trialing') {
    if (!activePlans.includes('bundle') || !subscriptionId) {
      return NextResponse.json(
        { error: 'Your account already has a different plan. Contact support so we can add the earned months without starting a second subscription.' },
        { status: 409 },
      );
    }

    const result = await applyMerchBonusToStudioSubscription(
      stripe,
      bonus,
      subscriptionId,
      userId,
    );
    if (result === 'not_studio') {
      return NextResponse.json(
        { error: 'We could not safely match the active Studio subscription. Contact support with the order number.' },
        { status: 409 },
      );
    }

    return NextResponse.json({
      message: result === 'already_applied'
        ? 'Those Studio months have already been added.'
        : `${bonus.months} free ${bonus.months === 1 ? 'month has' : 'months have'} been added after your current paid period.`,
    });
  }

  return NextResponse.json({
    checkoutUrl: `/checkout?planId=bundle&merchOrder=${encodeURIComponent(orderNumber)}`,
  });
}
