import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const COFFEE_PRODUCT_ID = 'prod_UmZYplQ9w7MaZm';

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error('Coffee checkout is missing STRIPE_SECRET_KEY');
    return NextResponse.json({ error: 'Checkout is not configured' }, { status: 500 });
  }

  try {
    const stripe = new Stripe(secretKey, { apiVersion: '2026-01-28.clover' });
    const product = await stripe.products.retrieve(COFFEE_PRODUCT_ID);

    if (!product.active) {
      return NextResponse.json({ error: 'Coffee support is currently unavailable' }, { status: 503 });
    }

    const prices = await stripe.prices.list({
      product: COFFEE_PRODUCT_ID,
      active: true,
      type: 'one_time',
      limit: 100,
    });
    const defaultPriceId = typeof product.default_price === 'string'
      ? product.default_price
      : product.default_price?.id;
    const price = prices.data.find((candidate) => candidate.id === defaultPriceId) ?? prices.data[0];

    if (!price) {
      console.error(`No active one-time price found for ${COFFEE_PRODUCT_ID}`);
      return NextResponse.json({ error: 'Coffee support is currently unavailable' }, { status: 503 });
    }

    const baseUrl = (process.env.NEXT_PUBLIC_URL || req.nextUrl.origin).replace(/\/$/, '');
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      submit_type: 'donate',
      line_items: [{ price: price.id, quantity: 1 }],
      automatic_tax: { enabled: true },
      metadata: {
        supportType: 'coffee',
        stripeProductId: COFFEE_PRODUCT_ID,
      },
      payment_intent_data: {
        metadata: {
          supportType: 'coffee',
          stripeProductId: COFFEE_PRODUCT_ID,
        },
      },
      success_url: `${baseUrl}/?coffee=thanks#support`,
      cancel_url: `${baseUrl}/#support`,
    });

    if (!session.url) {
      throw new Error('Stripe did not return a Checkout URL');
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error('Coffee checkout error:', error);
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 500 });
  }
}
