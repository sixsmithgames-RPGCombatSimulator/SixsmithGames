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

test('first-party analytics captures itch.io page and CTA evidence without a pre-consent identifier', async ({
  page,
}) => {
  const events: Array<Record<string, unknown>> = [];
  await page.route('**/api/analytics/events', async (route) => {
    const body = route.request().postData();
    if (body) events.push(JSON.parse(body) as Record<string, unknown>);
    await route.fulfill({ status: 202, body: '' });
  });

  await page.goto(
    '/apps/fourstargeneral?utm_source=itchio&utm_medium=game_listing&utm_campaign=four_star_general',
    { waitUntil: 'domcontentloaded' },
  );

  const playCta = page.getByRole('link', { name: 'Play free in browser' });
  await expect(playCta).toBeVisible();
  await expect(playCta).toHaveAttribute('href', 'https://fsg.sixsmithgames.com');

  await expect.poll(() => events.some((event) => event.event_name === 'page_view')).toBe(true);
  const pageView = events.find((event) => event.event_name === 'page_view');
  expect(pageView).toMatchObject({
    path: '/apps/fourstargeneral',
    source_type: 'game_marketplace',
    source_detail: 'itch.io',
    utm_source: 'itchio',
    utm_medium: 'game_listing',
    utm_campaign: 'four_star_general',
    consent_state: 'unset',
  });
  expect(pageView).not.toHaveProperty('session_id');

  await page.getByRole('link', { name: 'See the $2 expansion' }).click();
  await expect.poll(() => events.some((event) => event.event_name === 'product_pricing_click')).toBe(true);
  const pricingClick = events.find((event) => event.event_name === 'product_pricing_click');
  expect(pricingClick).toMatchObject({
    event_name: 'product_pricing_click',
    path: '/apps/fourstargeneral',
    consent_state: 'unset',
    properties: {
      product_slug: 'fourstargeneral',
      destination_type: 'pricing',
      surface: 'product_hero_secondary',
    },
  });
  expect(pricingClick).not.toHaveProperty('session_id');
});
