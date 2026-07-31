import { permanentRedirect } from "next/navigation";

/**
 * Purpose: Preserves old customer-directory bookmarks after CRM consolidation.
 * Parameters: None.
 * Returns: Never; navigation continues at the canonical CRM route.
 * Side effects: Sends a permanent redirect to /crm.
 */
export default async function CustomersPage() {
  permanentRedirect("/crm");
}
