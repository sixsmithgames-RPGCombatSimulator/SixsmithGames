"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAuthorizedOperationsUser } from "@/lib/auth/authorized-user";
import { getProductActivityRuntimeConfig } from "@/lib/product-activity/config";
import {
  deleteCustomerProductActivity,
  synchronizeAllProductActivitySources,
} from "@/lib/product-activity/ingestion";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Purpose: Runs the owner-requested product feed synchronization and refreshes its projection.
 * Parameters: None; sources and least-privilege credentials are server configured.
 * Returns: Never; redirects to a status-labeled product activity report.
 * Side effects: Enforces owner authorization, pulls enabled read-only feeds, writes normalized projections, and revalidates Operations views.
 */
export async function synchronizeProductActivityAction(): Promise<never> {
  const user = await requireAuthorizedOperationsUser();
  const config = getProductActivityRuntimeConfig();
  if (user.isPreview || !config.ledgerEnabled || config.sourceConfigurationError) {
    redirect("/product-activity?sync=not_available");
  }

  const results = await synchronizeAllProductActivitySources();
  const needsAttention = results.some((result) => ["unavailable", "rejected", "stale"].includes(result.state));
  revalidatePath("/product-activity");
  revalidatePath("/customers");
  redirect(`/product-activity?sync=${needsAttention ? "attention" : "complete"}`);
}

/**
 * Purpose: Executes an explicit support-driven deletion of one customer's Operations activity projection.
 * Parameters: FormData must contain a normalized customer UUID, safe return path, and exact destructive confirmation phrase.
 * Returns: Never; redirects back to the customer record with a deletion outcome.
 * Side effects: Permanently deletes identified activity projections after owner authorization and writes an audit event.
 */
export async function deleteCustomerProductActivityAction(
  formData: FormData,
): Promise<never> {
  const user = await requireAuthorizedOperationsUser();
  const customerId = formData.get("customerId");
  const confirmation = formData.get("confirmation");
  const returnPath = formData.get("returnPath");
  if (user.isPreview || typeof customerId !== "string" || !UUID_PATTERN.test(customerId) || confirmation !== "DELETE PRODUCT ACTIVITY") {
    const safePath = typeof returnPath === "string" && returnPath.startsWith("/customers/") ? returnPath : "/customers";
    redirect(`${safePath}?activityDeletion=not_confirmed`);
  }

  await deleteCustomerProductActivity(customerId, user.clerkUserId);
  revalidatePath("/product-activity");
  revalidatePath("/customers");
  const safePath = typeof returnPath === "string" && returnPath.startsWith("/customers/") ? returnPath : "/customers";
  redirect(`${safePath}?activityDeletion=complete`);
}
