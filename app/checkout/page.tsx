import CheckoutClient from './CheckoutClient';

interface CheckoutPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const rawPlanId = params.planId;
  const planId = Array.isArray(rawPlanId) ? rawPlanId[0] : rawPlanId || 'bundle';
  const rawMerchOrder = params.merchOrder;
  const merchOrder = Array.isArray(rawMerchOrder) ? rawMerchOrder[0] : rawMerchOrder;

  return <CheckoutClient planId={planId} merchOrder={merchOrder ?? null} />;
}
