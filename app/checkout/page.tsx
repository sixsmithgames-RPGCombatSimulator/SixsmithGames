import CheckoutClient from './CheckoutClient';

interface CheckoutPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const rawPlanId = params.planId;
  const planId = Array.isArray(rawPlanId) ? rawPlanId[0] : rawPlanId || 'bundle';

  return <CheckoutClient planId={planId} />;
}
