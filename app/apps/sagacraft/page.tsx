import ProductMarketingPage from '@/components/ProductMarketingPage';
import { notFound } from 'next/navigation';

import { canCurrentUserSeeSagaCraft } from '@/lib/productVisibility.server';
import { sagaCraftProductDefinition } from './marketing';

export const dynamic = 'force-dynamic';

export default async function SagaCraftPage() {
  if (!(await canCurrentUserSeeSagaCraft())) {
    notFound();
  }

  return <ProductMarketingPage product={sagaCraftProductDefinition} />;
}
