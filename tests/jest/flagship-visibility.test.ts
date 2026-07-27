import fs from 'node:fs';
import path from 'node:path';

jest.mock('../../lib/productVisibility.server', () => ({
  canCurrentUserSeeContentCraft: jest.fn().mockResolvedValue(false),
}));

import { PUBLIC_PRODUCT_DEFINITIONS } from '../../lib/productContent';
import { getAllArticles, getAllArticleTags, getAllNewsTags } from '../../lib/blog';
import { slugifyTag } from '../../lib/blogTags';
import {
  isContentCraftOwnerEmail,
  isSagaCraftOwnerEmail,
  CONTENTCRAFT_OWNER_EMAIL,
  SAGACRAFT_OWNER_EMAIL,
} from '../../lib/productVisibility';
import { PLANS } from '../../lib/subscription';

describe('GameMaster Studio product visibility', () => {
  it('keeps private products out of every public product collection', () => {
    const publicSlugs = PUBLIC_PRODUCT_DEFINITIONS.map((product) => product.slug);
    expect(publicSlugs).not.toContain('sagacraft');
    expect(publicSlugs).not.toContain('contentcraft');
  });

  it('does not grant SagaCraft through any public subscription plan', () => {
    for (const plan of Object.values(PLANS)) {
      expect(plan.apps).not.toContain('sagacraft');
    }
  });

  it('keeps ContentCraft articles and tags out of public content collections', async () => {
    const publicArticles = await getAllArticles();
    const publicTags = await getAllArticleTags();
    const publicNewsTags = await getAllNewsTags();

    expect(publicArticles.every((article) => !article.relatedProducts.includes('contentcraft'))).toBe(true);
    expect(publicArticles.some((article) => article.slug === 'what-is-contentcraft')).toBe(false);
    expect(publicTags).not.toContain('contentcraft');
    expect(publicNewsTags.map(slugifyTag)).not.toContain('contentcraft');
  });

  it('recognizes only the configured owner email', () => {
    expect(isSagaCraftOwnerEmail(SAGACRAFT_OWNER_EMAIL)).toBe(true);
    expect(isSagaCraftOwnerEmail('another@example.com')).toBe(false);
    expect(isSagaCraftOwnerEmail(undefined)).toBe(false);
    expect(isContentCraftOwnerEmail(CONTENTCRAFT_OWNER_EMAIL)).toBe(true);
    expect(isContentCraftOwnerEmail('another@example.com')).toBe(false);
  });

  it('does not expose static SagaCraft metadata to an anonymous 404 response', () => {
    const layoutSource = fs.readFileSync(
      path.join(process.cwd(), 'app/apps/sagacraft/layout.tsx'),
      'utf8',
    );

    expect(layoutSource).not.toContain('export const metadata');
    expect(layoutSource).toContain("title: 'Page not found | Sixsmith Games'");
    expect(layoutSource).toContain('await canCurrentUserSeeSagaCraft()');
  });

  it('does not expose static ContentCraft metadata to an anonymous 404 response', () => {
    const layoutSource = fs.readFileSync(
      path.join(process.cwd(), 'app/apps/contentcraft/layout.tsx'),
      'utf8',
    );

    expect(layoutSource).not.toContain('export const metadata');
    expect(layoutSource).toContain("title: 'Page not found | Sixsmith Games'");
    expect(layoutSource).toContain('canCurrentUserSeeContentCraft');
  });

  it('promotes SmartPaste with review and content-rights boundaries', () => {
    const smartPasteSources = [
      'app/page.tsx',
      'app/apps/virtual-combat-simulator/marketing.ts',
      'app/apps/virtual-combat-simulator/character-sheet/page.tsx',
      'app/pricing/page.tsx',
      'lib/helpContent.ts',
    ].map((relativePath) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8'));
    const publicSmartPasteCopy = smartPasteSources.join('\n');

    expect(publicSmartPasteCopy).toContain('SmartPaste character import');
    expect(publicSmartPasteCopy).toContain('review');
    expect(publicSmartPasteCopy).toContain('created, own, licensed');
    expect(publicSmartPasteCopy).toContain('SRD-backed');
    expect(publicSmartPasteCopy).not.toContain('D&D Beyond');
    expect(publicSmartPasteCopy).not.toContain('Roll20');
  });

  it('labels planned standard prices as future prices rather than former discounts', () => {
    const pricingSources = [
      'app/page.tsx',
      'app/pricing/page.tsx',
      'app/apps/gamemastercraft/marketing.ts',
      'app/apps/virtual-combat-simulator/marketing.ts',
      'lib/helpContent.ts',
    ].map((relativePath) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8'));
    const publicPricingCopy = pricingSources.join('\n');

    expect(publicPricingCopy).toContain('planned standard');
    expect(publicPricingCopy).not.toMatch(/Regularly\s+\$?\{?\$?(19|29)\.99/i);
  });
});
