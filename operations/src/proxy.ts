import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

const RUNTIME_MODE = process.env.OPERATIONS_RUNTIME_MODE;
const OPERATIONS_AUTHORIZED_PARTIES = [
  "https://operations.sixsmithgames.com",
];
const CONNECTED_CLERK_PROXY =
  RUNTIME_MODE === "connected"
    ? clerkMiddleware({
        authorizedParties: OPERATIONS_AUTHORIZED_PARTIES,
      })
    : undefined;

/**
 * Purpose: Runs Clerk session parsing for connected environments while allowing explicit local preview review.
 * Parameters:
 *   - request: The incoming Next.js request.
 *   - event: The request lifecycle event supplied by Next.js.
 * Returns: Clerk's proxy response in connected mode or an unmodified local preview response.
 * Side effects: Blocks accidental preview-mode production deployment with a configuration response.
 */
export default function proxy(request: NextRequest, event: NextFetchEvent) {
  if (RUNTIME_MODE === "preview") {
    if (process.env.VERCEL_ENV === "production") {
      return NextResponse.json(
        {
          error:
            "Preview mode cannot run in production. Root cause: OPERATIONS_RUNTIME_MODE=preview would expose a sample-data build without connected Clerk enforcement. Fix: configure Clerk and Neon environment variables, then set OPERATIONS_RUNTIME_MODE=connected before deployment.",
        },
        { status: 503 },
      );
    }

    return NextResponse.next();
  }

  if (!CONNECTED_CLERK_PROXY) {
    return NextResponse.json(
      {
        error:
          'Operations runtime is not configured. Root cause: OPERATIONS_RUNTIME_MODE is missing or invalid. Fix: set it to "preview" for local review or "connected" after Clerk and Neon are configured.',
      },
      { status: 503 },
    );
  }

  return CONNECTED_CLERK_PROXY(request, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
