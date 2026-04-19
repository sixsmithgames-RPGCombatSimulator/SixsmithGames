import ProductMarketingPage from '@/components/ProductMarketingPage';
import { gravityProductDefinition } from './marketing';

export const dynamic = 'force-static';

export default function GravityPage() {
  return <ProductMarketingPage product={gravityProductDefinition} />;
}
