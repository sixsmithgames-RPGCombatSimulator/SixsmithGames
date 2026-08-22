import { expect, test } from '@playwright/test';

import { PUBLIC_PRODUCT_DEFINITIONS } from '../../lib/productContent';

for (const product of PUBLIC_PRODUCT_DEFINITIONS) {
  test(`${product.name} is present in the initial HTML`, async ({ request }) => {
    const response = await request.get(`/apps/${product.slug}`);
    const html = await response.text();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
    expect(html).toContain(`<h1`);
    expect(html).toContain(product.h1);
  });
}
