/**
 * Stripe Webhook Handler
 * Sets Clerk publicMetadata after successful subscription payment
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { clerkClient } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(sub);
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(sub);
        break;
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err);
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const clerkUserId = session.metadata?.clerkUserId;
  const planId = session.metadata?.planId;

  if (!clerkUserId || !planId) {
    console.error('Missing metadata in checkout session:', session.id);
    return;
  }

  const subscriptionId = session.subscription as string;
  let expiresAt: string | null = null;

  if (subscriptionId) {
    const sub = await stripe.subscriptions.retrieve(subscriptionId) as unknown as { current_period_end: number };
    expiresAt = new Date(sub.current_period_end * 1000).toISOString().split('T')[0];
  }

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(clerkUserId);
  const existingMeta = (user.publicMetadata || {}) as Record<string, unknown>;

  const existingPlans = Array.isArray(existingMeta.subscriptionPlans)
    ? (existingMeta.subscriptionPlans as string[])
    : existingMeta.subscriptionPlan
    ? [existingMeta.subscriptionPlan as string]
    : [];

  const updatedPlans = Array.from(new Set([...existingPlans, planId]));

  await clerk.users.updateUserMetadata(clerkUserId, {
    publicMetadata: {
      ...existingMeta,
      subscriptionStatus: 'active',
      subscriptionPlans: updatedPlans,
      subscriptionPlan: updatedPlans[0],
      subscriptionExpiresAt: expiresAt,
      stripeSubscriptionId: subscriptionId,
      memberSince: existingMeta.memberSince || new Date().toISOString().split('T')[0],
    },
  });

  console.log(`Activated plan "${planId}" for user ${clerkUserId}`);
}

async function handleSubscriptionUpdated(sub: Stripe.Subscription) {
  const clerkUserId = sub.metadata?.clerkUserId;
  if (!clerkUserId) return;

  const status = sub.status === 'active' || sub.status === 'trialing' ? sub.status : 'inactive';
  const rawSub = sub as unknown as { current_period_end: number };
  const expiresAt = new Date(rawSub.current_period_end * 1000).toISOString().split('T')[0];

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(clerkUserId);
  const existingMeta = (user.publicMetadata || {}) as Record<string, unknown>;

  await clerk.users.updateUserMetadata(clerkUserId, {
    publicMetadata: {
      ...existingMeta,
      subscriptionStatus: status,
      subscriptionExpiresAt: expiresAt,
    },
  });
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  const clerkUserId = sub.metadata?.clerkUserId;
  if (!clerkUserId) return;

  const planId = sub.metadata?.planId;

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(clerkUserId);
  const existingMeta = (user.publicMetadata || {}) as Record<string, unknown>;

  const existingPlans = Array.isArray(existingMeta.subscriptionPlans)
    ? (existingMeta.subscriptionPlans as string[])
    : [];

  const remainingPlans = planId
    ? existingPlans.filter(p => p !== planId)
    : [];

  await clerk.users.updateUserMetadata(clerkUserId, {
    publicMetadata: {
      ...existingMeta,
      subscriptionStatus: remainingPlans.length > 0 ? 'active' : 'inactive',
      subscriptionPlans: remainingPlans,
      subscriptionPlan: remainingPlans[0] || null,
    },
  });

  console.log(`Removed plan "${planId}" for user ${clerkUserId}, remaining: ${remainingPlans}`);
}
