import { expect, test } from '@playwright/test';

const GOOGLE_SCRIPT_PREFIX = 'https://www.googletagmanager.com/gtag/js';
const META_SCRIPT_PREFIX = 'https://connect.facebook.net/en_US/fbevents.js';

test('optional analytics providers load only after opt-in and stay off after withdrawal', async ({
  page,
}) => {
  const providerRequests: string[] = [];

  page.on('request', (request) => {
    const url = request.url();
    if (url.startsWith(GOOGLE_SCRIPT_PREFIX) || url.startsWith(META_SCRIPT_PREFIX)) {
      providerRequests.push(url);
    }
  });

  await page.route(`${GOOGLE_SCRIPT_PREFIX}**`, (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }),
  );
  await page.route(META_SCRIPT_PREFIX, (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }),
  );

  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('complementary', { name: 'Analytics preference' })).toBeVisible();
  await page.waitForTimeout(400);
  expect(providerRequests).toEqual([]);

  await page.getByRole('button', { name: 'Allow optional tracking' }).click();

  await expect.poll(() => providerRequests.some((url) => url.startsWith(GOOGLE_SCRIPT_PREFIX))).toBe(true);
  await expect.poll(() => providerRequests.some((url) => url.startsWith(META_SCRIPT_PREFIX))).toBe(true);
  await expect(page.getByRole('button', { name: 'Privacy settings' })).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem('sixsmith_analytics_consent')))
    .toBe('accepted');

  await page.getByRole('button', { name: 'Privacy settings' }).click();
  await page.getByRole('button', { name: 'Keep optional tracking off' }).click();

  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem('sixsmith_analytics_consent')))
    .toBe('declined');
  await expect(page.getByRole('button', { name: 'Privacy settings' })).toBeVisible();

  const requestCountAfterWithdrawal = providerRequests.length;
  await page.waitForTimeout(500);
  expect(providerRequests).toHaveLength(requestCountAfterWithdrawal);
});
