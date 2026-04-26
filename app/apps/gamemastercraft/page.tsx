import ProductMarketingPage from '@/components/ProductMarketingPage';
import { gameMasterCraftProductDefinition } from './marketing';

export const dynamic = 'force-static';

export default function GameMasterCraftPage() {
  return <ProductMarketingPage product={gameMasterCraftProductDefinition} />;
}
