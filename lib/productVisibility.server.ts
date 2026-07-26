import 'server-only';

import { currentUser } from '@clerk/nextjs/server';

import {
  isContentCraftOwnerEmail,
  isSagaCraftOwnerEmail,
} from '@/lib/productVisibility';

/**
 * Verify the signed-in Clerk identity before revealing SagaCraft.
 *
 * A verified primary address is required so an unverified address cannot be
 * used to obtain the owner-only product route.
 */
export async function canCurrentUserSeeSagaCraft(): Promise<boolean> {
  try {
    const user = await currentUser();
    const primaryEmail = user?.primaryEmailAddress;

    if (primaryEmail?.verification?.status !== 'verified') {
      return false;
    }

    return isSagaCraftOwnerEmail(primaryEmail.emailAddress);
  } catch {
    /*
     * Public local pages intentionally skip the Clerk handshake. If the auth
     * context is unavailable, fail closed so the private route still returns
     * not found instead of leaking or raising a server error.
     */
    return false;
  }
}

/** Check the verified primary email before revealing the private ContentCraft page. */
export async function canCurrentUserSeeContentCraft(): Promise<boolean> {
  try {
    const user = await currentUser();
    const primaryEmail = user?.primaryEmailAddress;
    if (primaryEmail?.verification?.status !== 'verified') return false;
    return isContentCraftOwnerEmail(primaryEmail.emailAddress);
  } catch {
    // Auth failures must fail closed for the private marketing route.
    return false;
  }
}
