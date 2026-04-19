import ProductMarketingPage from '@/components/ProductMarketingPage';
import { contentCraftProductDefinition } from './marketing';

export const dynamic = 'force-static';

export default function ContentCraftPage() {
  return <ProductMarketingPage product={contentCraftProductDefinition} />;
}
