/**
 * Product visibility rules shared by browser and server code.
 *
 * SagaCraft is intentionally owner-only while it is hidden from the public
 * Sixsmith Games catalog. Keeping the email and comparison in one place
 * prevents the navigation, account page, and route guard from drifting apart.
 */

export const SAGACRAFT_OWNER_EMAIL = 'sexsmith2005@gmail.com';

export function isSagaCraftOwnerEmail(email: string | null | undefined): boolean {
  return email?.trim().toLowerCase() === SAGACRAFT_OWNER_EMAIL;
}
