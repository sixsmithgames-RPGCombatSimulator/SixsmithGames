import type { Metadata } from "next";
import { AnalyticsWorkspace } from "@/components/operations/analytics-workspace";
import { requireAuthorizedOperationsUser } from "@/lib/auth/authorized-user";
import {
  getPreviewWebAnalyticsSnapshot,
  getVercelWebAnalyticsSnapshot,
  resolveAnalyticsRange,
} from "@/lib/integrations/vercel-web-analytics";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Private aggregate acquisition and website analytics for Sixsmith Games Operations.",
};

interface AnalyticsPageProps {
  searchParams: Promise<{ range?: string | string[] }>;
}

/**
 * Purpose: Serves the authorized, source-backed Phase 1 Analytics workspace.
 * Parameters: searchParams contains the bounded 7, 30, or 90 day reporting range.
 * Returns: A first-class analytics report with truthful provider and preview states.
 * Side effects: Enforces owner authorization and may perform cached Vercel API reads.
 */
export default async function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
  const user = await requireAuthorizedOperationsUser();
  const range = resolveAnalyticsRange((await searchParams).range);
  const snapshot = user.isPreview
    ? getPreviewWebAnalyticsSnapshot(range)
    : await getVercelWebAnalyticsSnapshot(range);

  return <AnalyticsWorkspace snapshot={snapshot} />;
}
