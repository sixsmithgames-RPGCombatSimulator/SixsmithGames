import ProductMarketingPage from '@/components/ProductMarketingPage';
import { notFound } from 'next/navigation';

import { canCurrentUserSeeContentCraft } from '@/lib/productVisibility.server';
import { contentCraftProductDefinition } from './marketing';

export const dynamic = 'force-dynamic';

export default async function ContentCraftPage() {
  if (!(await canCurrentUserSeeContentCraft())) {
    notFound();
  }

  return <ProductMarketingPage product={contentCraftProductDefinition} />;
}
