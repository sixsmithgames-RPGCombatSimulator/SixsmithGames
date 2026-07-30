import "server-only";

import type {
  CampaignData,
  CustomerDetailData,
  CustomerDirectoryData,
  DashboardData,
  ProfitabilityData,
  ReconciliationData,
} from "@/data/operations-types";
import {
  PREVIEW_CAMPAIGN,
  PREVIEW_CUSTOMER_DETAIL,
  PREVIEW_CUSTOMER_DIRECTORY,
  PREVIEW_DASHBOARD,
  PREVIEW_PROFITABILITY,
  PREVIEW_RECONCILIATION,
} from "@/data/preview-data";
import { requireAuthorizedOperationsUser } from "@/lib/auth/authorized-user";

export interface OperationsResult<T> {
  data: T | null;
  isPreview: boolean;
}

/**
 * Purpose: Loads an authorized workflow without substituting sample data in connected mode.
 * Parameters: The typed preview snapshot used only by the local review runtime.
 * Returns: Preview data locally, or an explicit empty connected result until ingestion is configured.
 * Side effects: Enforces owner authorization before operational data is resolved.
 */
async function loadOperationsResult<T>(
  previewData: T,
): Promise<OperationsResult<T>> {
  const user = await requireAuthorizedOperationsUser();

  if (user.isPreview) {
    return { data: previewData, isPreview: true };
  }

  return { data: null, isPreview: false };
}

/**
 * Purpose: Loads the executive dashboard after enforcing owner authorization.
 * Parameters: None.
 * Returns: The typed dashboard snapshot or an explicit connected empty state.
 * Side effects: Resolves the current Clerk session in connected mode.
 */
export async function getDashboardData(): Promise<
  OperationsResult<DashboardData>
> {
  return loadOperationsResult(PREVIEW_DASHBOARD);
}

/**
 * Purpose: Loads the normalized customer directory after enforcing owner authorization.
 * Parameters: None.
 * Returns: The typed directory or an explicit connected empty state.
 * Side effects: Resolves the current Clerk session in connected mode.
 */
export async function getCustomerDirectoryData(): Promise<
  OperationsResult<CustomerDirectoryData>
> {
  return loadOperationsResult(PREVIEW_CUSTOMER_DIRECTORY);
}

/**
 * Purpose: Loads one customer 360 record after enforcing owner authorization.
 * Parameters: customerId is the normalized route identifier requested by the owner.
 * Returns: The matching record, or null when the authorized source contains no match.
 * Side effects: Resolves the current Clerk session in connected mode.
 */
export async function getCustomerDetailData(
  customerId: string,
): Promise<OperationsResult<CustomerDetailData>> {
  const result = await loadOperationsResult(PREVIEW_CUSTOMER_DETAIL);

  if (result.data?.id !== customerId) {
    return { data: null, isPreview: result.isPreview };
  }

  return result;
}

/**
 * Purpose: Loads one versioned campaign workspace after enforcing owner authorization.
 * Parameters: campaignId is the campaign identifier requested by the route.
 * Returns: The matching campaign, or null when the authorized source contains no match.
 * Side effects: Resolves the current Clerk session in connected mode.
 */
export async function getCampaignData(
  campaignId: string,
): Promise<OperationsResult<CampaignData>> {
  const result = await loadOperationsResult(PREVIEW_CAMPAIGN);

  if (result.data?.id !== campaignId) {
    return { data: null, isPreview: result.isPreview };
  }

  return result;
}

/**
 * Purpose: Loads Stripe, Clerk, and product-access reconciliation evidence.
 * Parameters: None.
 * Returns: The typed reconciliation snapshot or an explicit connected empty state.
 * Side effects: Resolves the current Clerk session in connected mode.
 */
export async function getReconciliationData(): Promise<
  OperationsResult<ReconciliationData>
> {
  return loadOperationsResult(PREVIEW_RECONCILIATION);
}

/**
 * Purpose: Loads profitability and contribution-margin data after authorization.
 * Parameters: None.
 * Returns: The typed profitability snapshot or an explicit connected empty state.
 * Side effects: Resolves the current Clerk session in connected mode.
 */
export async function getProfitabilityData(): Promise<
  OperationsResult<ProfitabilityData>
> {
  return loadOperationsResult(PREVIEW_PROFITABILITY);
}
