/**
 * Authenticated handoff from the GameMaster Studio website to the application.
 *
 * Clerk protects this route in proxy.ts. Keeping the redirect server-side means
 * visitors never receive a stale or duplicated application address from a CTA.
 */

import { redirect } from 'next/navigation';

import { STUDIO_APP_URL } from '@/lib/studio';

export default function StudioLaunchPage() {
  redirect(STUDIO_APP_URL);
}
