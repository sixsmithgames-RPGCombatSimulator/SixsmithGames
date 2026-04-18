import { expect, test, type Page } from '@playwright/test';

import { publicRoutes, screenshotSlug } from '../site-routes';

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const width = window.innerWidth;
    const scrollWidth = Math.max(
      document.documentElement.scrollWidth,
      document.body?.scrollWidth ?? 0,
    );

    return { width, scrollWidth };
  });

  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.width + 1);
}

async function assertInteractiveElementsStayInViewport(page: Page) {
  const offenders = await page.locator('a, button, input, select, textarea').evaluateAll((nodes) => {
    return nodes.flatMap((node, index) => {
      const element = node as HTMLElement;
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      if (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        rect.width === 0 ||
        rect.height === 0
      ) {
        return [];
      }

      if (rect.left < -1 || rect.right > window.innerWidth + 1) {
        return [{
          index,
          label: (element.innerText || element.getAttribute('aria-label') || element.getAttribute('href') || '').trim().slice(0, 120),
          left: rect.left,
          right: rect.right,
        }];
      }

      return [];
    }).slice(0, 10);
  });

  expect(offenders).toEqual([]);
}

for (const route of publicRoutes) {
  test(`responsive audit for ${route}`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport ?? '').toContain('width=device-width');

    await assertNoHorizontalOverflow(page);
    await assertInteractiveElementsStayInViewport(page);

    const screenshotPath = testInfo.outputPath(`${screenshotSlug(route)}.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      animations: 'disabled',
    });

    await testInfo.attach('page-screenshot', {
      path: screenshotPath,
      contentType: 'image/png',
    });
  });
}
