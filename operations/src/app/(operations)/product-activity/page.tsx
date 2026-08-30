import type { Metadata } from "next";
import { ProductActivityWorkspace } from "@/components/operations/product-activity-workspace";
import { getProductActivityPortfolioSnapshot } from "@/lib/product-activity/read-model";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Product Activity",
  description: "Source-authoritative product activity, entities, customer use, and source health for Sixsmith Games Operations.",
};

interface ProductActivityPageProps {
  searchParams: Promise<{ sync?: string | string[] }>;
}

/**
 * Purpose: Serves the owner-only product activity ledger and portfolio projection.
 * Parameters: searchParams carries a bounded result label from an owner-requested synchronization.
 * Returns: The first-class ledger report with synthetic preview or connected source evidence.
 * Side effects: Enforces authorization through the read model and may auto-sync when explicitly enabled.
 */
export default async function ProductActivityPage({ searchParams }: ProductActivityPageProps) {
  const snapshot = await getProductActivityPortfolioSnapshot();
  const rawSync = (await searchParams).sync;
  const syncResult = typeof rawSync === "string" && ["complete", "attention", "not_available"].includes(rawSync)
    ? rawSync as "complete" | "attention" | "not_available"
    : null;
  return <ProductActivityWorkspace snapshot={snapshot} syncResult={syncResult} />;
}
