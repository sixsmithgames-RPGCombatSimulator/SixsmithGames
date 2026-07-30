import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { CustomersWorkspace } from "@/components/operations/customers-workspace";
import { ConnectedEmptyState, PageHeading } from "@/components/operations/ui";
import { getCustomerDirectoryData } from "@/data/operations";

export const metadata: Metadata = {
  title: "Customers",
};

/**
 * Purpose: Renders normalized customers with operational health and next actions.
 * Parameters: None; the authorized server data layer resolves the directory.
 * Returns: The customer workspace or an honest connected empty state.
 * Side effects: Enforces authorization through getCustomerDirectoryData.
 */
export default async function CustomersPage() {
  const { data } = await getCustomerDirectoryData();

  return (
    <>
      <PageHeading
        title="Customers"
        description="Search, segment, and act on the normalized customer record"
        actions={
          <button className="button button-primary" disabled type="button" title="Available after source connectors are configured">
            <Plus aria-hidden size={17} />
            Add customer
          </button>
        }
      />
      {data ? (
        <CustomersWorkspace data={data} />
      ) : (
        <ConnectedEmptyState workflow="The customer directory" />
      )}
    </>
  );
}
