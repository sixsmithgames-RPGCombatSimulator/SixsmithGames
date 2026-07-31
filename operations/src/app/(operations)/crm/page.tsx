import type { Metadata } from "next";
import { CustomersWorkspace } from "@/components/operations/customers-workspace";
import { LiveCrm } from "@/components/operations/live-workspaces";
import { ConnectedEmptyState, PageHeading } from "@/components/operations/ui";
import { getCustomerDirectoryData } from "@/data/operations";
import { getLiveOperationsSnapshot } from "@/lib/operations/live-snapshot";

export const metadata: Metadata = {
  title: "CRM",
};

/** Renders the one canonical customer relationship directory. */
export default async function CrmPage() {
  const { data, isPreview } = await getCustomerDirectoryData();

  if (!isPreview) {
    return <LiveCrm snapshot={await getLiveOperationsSnapshot()} />;
  }

  return (
    <>
      <PageHeading
        title="CRM"
        description="Search customer relationships, billing status, and account history"
      />
      {data ? (
        <CustomersWorkspace data={data} />
      ) : (
        <ConnectedEmptyState workflow="The CRM directory" />
      )}
    </>
  );
}
