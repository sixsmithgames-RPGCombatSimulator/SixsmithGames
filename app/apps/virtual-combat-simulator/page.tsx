import ProductMarketingPage from '@/components/ProductMarketingPage';
import { virtualCombatSimulatorProductDefinition } from './marketing';

export const dynamic = 'force-static';

export default function VirtualCombatSimulatorPage() {
  return <ProductMarketingPage product={virtualCombatSimulatorProductDefinition} />;
}
