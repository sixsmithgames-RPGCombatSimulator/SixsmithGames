import fs from 'node:fs';
import path from 'node:path';

import { PUBLIC_PRODUCT_DEFINITIONS } from '../../lib/productContent';
import {
  isSagaCraftOwnerEmail,
  SAGACRAFT_OWNER_EMAIL,
} from '../../lib/productVisibility';
import { PLANS } from '../../lib/subscription';

describe('GameMaster Studio product visibility', () => {
  it('keeps SagaCraft out of every public product collection', () => {
    expect(PUBLIC_PRODUCT_DEFINITIONS.map((product) => product.slug)).not.toContain('sagacraft');
  });

  it('does not grant SagaCraft through any public subscription plan', () => {
    for (const plan of Object.values(PLANS)) {
      expect(plan.apps).not.toContain('sagacraft');
    }
  });

  it('recognizes only the configured owner email', () => {
    expect(isSagaCraftOwnerEmail(SAGACRAFT_OWNER_EMAIL)).toBe(true);
    expect(isSagaCraftOwnerEmail('another@example.com')).toBe(false);
    expect(isSagaCraftOwnerEmail(undefined)).toBe(false);
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
});
