import { NextRequest, NextResponse } from 'next/server';

import {
  classifyAnalyticsDevice,
  isAnalyticsBot,
  normalizeFirstPartyAnalyticsEvent,
} from '@/lib/first-party-analytics-contract';

const MAX_BODY_BYTES = 8_192;

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  return Boolean(origin && origin === request.nextUrl.origin);
}

function analyticsEnvironment(): 'production' | 'preview' | 'development' {
  if (process.env.VERCEL_ENV === 'production') return 'production';
  if (process.env.VERCEL_ENV === 'preview') return 'preview';
  return 'development';
}

/**
 * Accepts privacy-minimized browser events on the public site's own origin and
 * forwards them to the owner-only Operations ledger with a server credential.
 */
export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Analytics events must come from this site.' }, { status: 403 });
  }

  const userAgent = request.headers.get('user-agent');
  if (isAnalyticsBot(userAgent)) return new NextResponse(null, { status: 204 });

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Analytics event is too large.' }, { status: 413 });
  }

  let input: unknown;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Analytics event must be valid JSON.' }, { status: 400 });
  }

  const event = normalizeFirstPartyAnalyticsEvent(input, {
    countryCode: request.headers.get('x-vercel-ip-country'),
    deviceType: classifyAnalyticsDevice(userAgent),
    environment: analyticsEnvironment(),
  });
  if (!event) {
    return NextResponse.json({ error: 'Analytics event failed the privacy contract.' }, { status: 400 });
  }

  const endpoint = process.env.OPERATIONS_ANALYTICS_INGEST_URL?.trim();
  const secret = process.env.ANALYTICS_INGEST_SECRET?.trim();
  if (!endpoint || !secret) {
    return NextResponse.json(
      { error: 'First-party analytics forwarding is not configured.' },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
      cache: 'no-store',
      signal: AbortSignal.timeout(4_000),
    });

    if (!response.ok) {
      console.error('First-party analytics forwarding failed.', {
        status: response.status,
        eventName: event.event_name,
      });
      return NextResponse.json({ error: 'Operations did not accept the event.' }, { status: 502 });
    }

    return new NextResponse(null, { status: 202 });
  } catch (error) {
    console.error('First-party analytics forwarding failed before Operations answered.', {
      eventName: event.event_name,
      detail: error instanceof Error ? error.message : 'unknown_error',
    });
    return NextResponse.json({ error: 'Operations analytics is temporarily unavailable.' }, { status: 502 });
  }
}
