/**
 * Stripe Checkout Session API
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth, currentUser } from '@clerk/nextjs/server';
import { PLANS } from '@/lib/subscription';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://www.sixsmithgames.com';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    const body = await req.json();
    const { planId } = body as { planId: string };

    const plan = PLANS[planId];
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    if (!plan.stripePriceId) {
      return NextResponse.json({ error: 'Plan not configured' }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: plan.stripePriceId, quantity: 1 }],
      automatic_tax: { enabled: true },
      customer_email: email,
      metadata: {
        clerkUserId: userId,
        planId,
      },
      subscription_data: {
        metadata: {
          clerkUserId: userId,
          planId,
        },
      },
      success_url: `${BASE_URL}/account?checkout=success`,
      cancel_url: `${BASE_URL}/pricing?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
