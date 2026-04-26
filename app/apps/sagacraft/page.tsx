import ProductMarketingPage from '@/components/ProductMarketingPage';
import { sagaCraftProductDefinition } from './marketing';

export const dynamic = 'force-static';

export default function SagaCraftPage() {
  return <ProductMarketingPage product={sagaCraftProductDefinition} />;
}
