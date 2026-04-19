import ProductMarketingPage from '@/components/ProductMarketingPage';
import { masterTypingProductDefinition } from './marketing';

export const dynamic = 'force-static';

export default function MasterTypingPage() {
  return <ProductMarketingPage product={masterTypingProductDefinition} />;
}
