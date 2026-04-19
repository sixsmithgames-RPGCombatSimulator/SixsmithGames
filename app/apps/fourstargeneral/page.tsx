import ProductMarketingPage from '@/components/ProductMarketingPage';
import { fourStarGeneralProductDefinition } from './marketing';

export const dynamic = 'force-static';

export default function FourStarGeneralPage() {
  return <ProductMarketingPage product={fourStarGeneralProductDefinition} />;
}
