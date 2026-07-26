/**
 * Product visibility rules shared by browser and server code.
 *
 * ContentCraft and SagaCraft are intentionally owner-only while hidden from
 * the public Sixsmith Games catalog. Keeping the email and comparison in one
 * place prevents navigation, account, and route guards from drifting apart.
 */

export const SAGACRAFT_OWNER_EMAIL = 'sexsmith2005@gmail.com';
export const CONTENTCRAFT_OWNER_EMAIL = SAGACRAFT_OWNER_EMAIL;

export function isPrivateProductOwnerEmail(email: string | null | undefined): boolean {
  return email?.trim().toLowerCase() === CONTENTCRAFT_OWNER_EMAIL;
}

export function isSagaCraftOwnerEmail(email: string | null | undefined): boolean {
  return isPrivateProductOwnerEmail(email);
}

export function isContentCraftOwnerEmail(email: string | null | undefined): boolean {
  return isPrivateProductOwnerEmail(email);
}
