import { expect, test } from '@playwright/test';

/**
 * Exercises the customer-visible Fourthwall handoff without relying on
 * screenshots alone. These checks protect the page from regaining stale
 * preview language, dead product links, or hidden sale and refund rules.
 */
test('approved merchandise is clearly ready to order', async ({ page }) => {
  await page.goto('/merch', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveTitle('Tabletop RPG Merchandise | Sixsmith Games');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Bring a little of the game table with you.',
    }),
  ).toBeVisible();

  const storeStatus = page.getByRole('region', { name: 'Store status' });
  await expect(storeStatus).toContainText('Orders are open');
  await expect(storeStatus).toContainText('Fourthwall');
  await expect(page.getByRole('complementary', { name: 'Cart' })).toHaveCount(0);
  await expect(page.getByRole('status')).toContainText('2 products ready');
  await expect(
    page.getByRole('link', { name: 'Choose your options in the shop' }),
  ).toHaveCount(2);
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

  await page.getByRole('button', { name: 'Wearables', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Wearables', exact: true }))
    .toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toContainText('1 product ready');
  await expect(page.locator('article')).toHaveCount(1);
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
