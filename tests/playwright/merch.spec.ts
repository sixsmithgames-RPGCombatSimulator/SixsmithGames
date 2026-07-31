import { expect, test } from '@playwright/test';

/**
 * Exercises the shopper path without relying on screenshots alone. These
 * checks keep internal review and fulfillment language out of the pitch while
 * protecting the live product links and shop policies.
 */
test('merchandise speaks to players and is ready to order', async ({ page }) => {
  await page.goto('/merch', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveTitle('Tabletop RPG Merchandise | Sixsmith Games');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Gear for the game table.',
    }),
  ).toBeVisible();
  await expect(page.getByText('Wear the story. Set the scene.')).toBeVisible();
  await expect(page.getByText(/\bapproved\b/i)).toHaveCount(0);
  await expect(page.getByText(/Fourthwall/i)).toHaveCount(0);

  await expect(page.getByRole('complementary', { name: 'Cart' })).toHaveCount(0);
  await expect(
    page.getByRole('img', {
      name: 'Back of the black Master Your Stories pullover hoodie with the Sixsmith Games crest',
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('img', {
      name: 'Back of the black Master Your Stories zippered hoodie with the Sixsmith Games crest',
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('img', {
      name: 'Gateway Wyrm Desk Mat with adventurers facing a blue-lit dungeon portal',
    }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Shop the hoodie' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Shop the zippered hoodie' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Shop the desk mat' })).toBeVisible();
  await expect(page.getByText('Includes 3 free months of GameMaster Studio')).toHaveCount(2);
  await expect(page.getByText('Includes 1 free month of GameMaster Studio')).toBeVisible();
  await expect(page.getByText('SESSION NOTES')).toHaveCount(0);
  await expect(page.getByText('ROLL FOR CONSEQUENCES')).toHaveCount(0);
  await expect(page.getByText('Upload image')).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'Terms of Sale' }),
  ).toHaveAttribute(
    'href',
    'https://sixsmith-games-shop.fourthwall.com/pages/terms-of-sale',
  );
  await expect(
    page.getByRole('link', { name: 'Refund & Return Policy' }),
  ).toHaveAttribute(
    'href',
    'https://sixsmith-games-shop.fourthwall.com/pages/refund-return-policy',
  );
  await expect(page.locator('article')).toHaveCount(3);
});

/**
 * A visitor can type any query string, so a success flag without a Stripe
 * Checkout Session must never look like proof of payment.
 */
test('unverified checkout return never claims an order was paid', async ({ page }) => {
  await page.goto('/merch?checkout=thanks', { waitUntil: 'domcontentloaded' });

  const checkoutReviewAlert = page.getByRole('alert').filter({
    hasText: 'We could not confirm an order from this link.',
  });

  await expect(checkoutReviewAlert).toContainText(
    'We could not confirm an order from this link.',
  );
  await expect(page.getByText('Order confirmed.', { exact: true })).toHaveCount(0);
});

/**
 * The public claim page stays readable, while the API refuses an order number
 * until the buyer has authenticated the matching Sixsmith Games account.
 */
test('merchandise bonus claim keeps account matching on the server', async ({ page }) => {
  await page.goto('/merch/claim', { waitUntil: 'domcontentloaded' });

  await expect(
    page.getByRole('heading', { level: 1, name: 'Bring your Studio time to the table.' }),
  ).toBeVisible();
  await expect(
    page.getByRole('main').getByRole('link', { name: 'Sign in', exact: true }),
  ).toBeVisible();

  await page.getByLabel('Merchandise order number').fill('D3XZFWPP');
  await page.getByRole('button', { name: 'Claim my Studio time' }).click();
  await expect(page.getByRole('status')).toContainText('Sign in to claim your Studio time.');
});
