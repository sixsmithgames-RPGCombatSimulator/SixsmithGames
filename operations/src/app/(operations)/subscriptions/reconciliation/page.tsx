import type { Metadata } from "next";
import { Download, RefreshCw } from "lucide-react";
import { ReconciliationWorkspace } from "@/components/operations/reconciliation-workspace";
import { LiveSubscriptions } from "@/components/operations/live-workspaces";
import { ConnectedEmptyState, PageHeading } from "@/components/operations/ui";
import { getReconciliationData } from "@/data/operations";
import { getLiveOperationsSnapshot } from "@/lib/operations/live-snapshot";

export const metadata: Metadata = {
  title: "Entitlement Reconciliation",
};

/**
 * Purpose: Renders evidence-backed reconciliation across billing, identity, and access.
 * Parameters: None; the authorized data layer resolves the reconciliation snapshot.
 * Returns: The reconciliation workspace or an honest connected empty state.
 * Side effects: Enforces authorization through getReconciliationData.
 */
export default async function ReconciliationPage() {
  const { data, isPreview } = await getReconciliationData();

  if (!isPreview) {
    return <LiveSubscriptions snapshot={await getLiveOperationsSnapshot()} />;
  }

  return (
    <>
      <PageHeading
        title="Entitlement Reconciliation"
        description="Compare Stripe, Clerk, and product access before proposing a correction"
        actions={
          <>
            <span className="snapshot-label">Refreshed 2m ago</span>
            <button className="button button-secondary" disabled type="button"><Download aria-hidden size={16} />Export</button>
            <button className="button button-primary" disabled type="button"><RefreshCw aria-hidden size={16} />Reconcile now</button>
          </>
        }
      />
      {data ? (
        <ReconciliationWorkspace data={data} />
      ) : (
        <ConnectedEmptyState workflow="Entitlement reconciliation" />
      )}
    </>
  );
}
