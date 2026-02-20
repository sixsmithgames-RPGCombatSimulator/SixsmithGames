import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define which routes require authentication
// Currently all routes are public - add protected routes here as needed
const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing(.*)',
  '/apps(.*)',
  '/blog(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
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
      if (!isPublicRoute(request)) {
        await auth.protect();
      }
      return rewritten;
    }
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
