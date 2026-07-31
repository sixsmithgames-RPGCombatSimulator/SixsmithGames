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
  await expect(
    page.getByText(
      'For cold convention halls, late night sessions, or when the monsters feel too real.',
    ),
  ).toBeVisible();
  await expect(
    page.getByText('For cold convention halls, late sessions, and one more scene than anyone planned.'),
  ).toHaveCount(0);
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
  const pulloverCard = page.locator('article').filter({
    has: page.getByRole('heading', { name: 'Master Your Stories Hoodie', exact: true }),
  });
  const zipperedCard = page.locator('article').filter({
    has: page.getByRole('heading', { name: 'Master Your Stories Zippered Hoodie' }),
  });
  await expect(pulloverCard.getByText('$44.00', { exact: true })).toBeVisible();
  await expect(zipperedCard.getByText('From $60.00', { exact: true })).toBeVisible();
  await expect(
    page.getByText('Earn a one-use Studio coupon: 3 months at no additional charge'),
  ).toHaveCount(2);
  await expect(
    page.getByText('Earn a one-use Studio coupon: 1 month at no additional charge'),
  ).toBeVisible();
  await expect(page.getByText(/Includes .*free month/i)).toHaveCount(0);
  await expect(
    page.getByText(/New subscriptions renew at the standard monthly price/),
  ).toHaveCount(3);
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
  await expect(
    page.getByText(/standard monthly billing begins after the coupon ends unless you cancel first/),
  ).toBeVisible();

  const claimButton = page.getByRole('button', { name: 'Claim my Studio time' });
  const consentPrompt = page.getByRole('complementary', { name: 'Analytics preference' });
  if (await consentPrompt.isVisible()) {
    const [claimButtonBox, consentPromptBox] = await Promise.all([
      claimButton.boundingBox(),
      consentPrompt.boundingBox(),
    ]);

    // A first-time visitor should not have to guess that the receipt action is
    // hidden behind the optional analytics prompt, especially on a phone.
    expect(claimButtonBox, 'The claim button should have a measurable position.').not.toBeNull();
    expect(consentPromptBox, 'The consent prompt should have a measurable position.').not.toBeNull();
    expect(claimButtonBox!.y + claimButtonBox!.height).toBeLessThanOrEqual(consentPromptBox!.y);
  }

  await page.getByLabel('Merchandise order number').fill('D3XZFWPP');
  await claimButton.click();
  await expect(page.getByRole('status')).toContainText('Sign in to claim your Studio time.');
});
