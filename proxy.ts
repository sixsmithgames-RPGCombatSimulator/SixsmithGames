import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';

import { SITE_HOSTNAME } from '@/lib/site';

const LEGACY_REDIRECTS: Record<string, string> = {
  '/facts': '/about/facts',
  '/contact': '/support',
  '/apps/vcs': '/apps/virtual-combat-simulator',
  '/apps/virtualcombatsimulator': '/apps/virtual-combat-simulator',
  '/apps/fsg': '/apps/fourstargeneral',
  '/apps/four-star-general': '/apps/fourstargeneral',
};

const isProtectedRoute = createRouteMatcher(['/account(.*)']);

function slugifyTag(tag: string) {
  return tag
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '-')
    .replace(/-+/g, '-');
}

const handleRequestWithClerk = clerkMiddleware(async (auth, request) => {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const legacyDestination = LEGACY_REDIRECTS[request.nextUrl.pathname];

  if (legacyDestination) {
    const url = request.nextUrl.clone();
    url.pathname = legacyDestination;
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 301);
  }

  if (request.nextUrl.pathname.startsWith('/blog/tag/') || request.nextUrl.pathname.startsWith('/articles/tag/')) {
    const prefix = request.nextUrl.pathname.startsWith('/blog/tag/') ? '/blog/tag/' : '/articles/tag/';
    const rawTag = decodeURIComponent(request.nextUrl.pathname.replace(prefix, ''));
    const canonicalTagPath = `${prefix}${slugifyTag(rawTag)}`;
    if (rawTag && canonicalTagPath !== request.nextUrl.pathname) {
      const url = request.nextUrl.clone();
      url.pathname = canonicalTagPath;
      return NextResponse.redirect(url, 301);
    }
  }

  // Keep the former apex site useful as a compatibility address while the
  // flagship site uses its clearer product-specific canonical hostname.
  if (
    process.env.NODE_ENV === 'production'
    && (host === 'sixsmithgames.com' || host === 'www.sixsmithgames.com' || host === `www.${SITE_HOSTNAME}`)
  ) {
    const url = request.nextUrl.clone();
    url.host = SITE_HOSTNAME;
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  // In dev, rewrite origin to match x-forwarded-host so Next.js 16's
  // Server Actions CSRF check doesn't reject proxied preview requests.
  if (process.env.NODE_ENV === 'development') {
    const forwardedHost = request.headers.get('x-forwarded-host');
    const origin = request.headers.get('origin');
    if (forwardedHost && origin && new URL(origin).host !== forwardedHost) {
      const proto = request.headers.get('x-forwarded-proto') || 'http';
      const headers = new Headers(request.headers);
      headers.set('origin', `${proto}://${forwardedHost}`);
      const rewritten = NextResponse.next({ request: { headers } });
      if (isProtectedRoute(request)) {
        await auth.protect();
      }
      return rewritten;
    }
  }

  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

/**
 * Keep public localhost pages independent from Clerk's production handshake.
 *
 * The live site still passes every matched request through Clerk. During local
 * development, public pages do not need an auth handshake; skipping it avoids
 * a localhost self-proxy loop while protected account and API routes continue
 * through the normal Clerk middleware.
 */
export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/');
  const canSkipLocalClerk =
    process.env.NODE_ENV === 'development'
    && !isProtectedRoute(request)
    && !isApiRoute;

  if (canSkipLocalClerk) {
    return NextResponse.next();
  }

  return handleRequestWithClerk(request, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
