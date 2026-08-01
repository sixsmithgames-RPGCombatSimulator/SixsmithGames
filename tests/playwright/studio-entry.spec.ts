import { expect, test } from '@playwright/test';

test('the account-loading state is safe and the app handoff cannot be bypassed', async ({ page, request }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // Production Clerk keys intentionally do not hydrate on 127.0.0.1. The
  // local audit therefore verifies the non-clickable state shown until Clerk
  // confirms the visitor. Signed-in/out labels are exercised on the preview.
  const primaryEntry = page.getByRole('button', { name: 'Checking your account' }).first();
  await expect(primaryEntry).toBeVisible();
  await expect(primaryEntry).toHaveText('Start now');
  await expect(primaryEntry).toBeDisabled();
  await expect(page.getByRole('link', { name: 'Open app' })).toHaveCount(0);

  const protectedResponse = await request.get('/app', { maxRedirects: 0 });
  expect(protectedResponse.status()).toBe(307);
  expect(protectedResponse.headers().location).toContain('/sign-in');
});
