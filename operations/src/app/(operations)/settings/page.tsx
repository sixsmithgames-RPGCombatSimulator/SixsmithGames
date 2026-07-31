import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import {
  RefreshConnectionsButton,
  SettingsWorkspace,
} from "@/components/operations/settings-workspace";
import { PageHeading, StatusBadge } from "@/components/operations/ui";
import { requireAuthorizedOperationsUser } from "@/lib/auth/authorized-user";
import { getIntegrationOverview } from "@/lib/integrations/status";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Settings",
  description: "Configure and verify Sixsmith Games Operations integrations.",
};

/**
 * Purpose: Renders the owner-only integration workspace from live server capability checks.
 * Parameters: None; the current Clerk request and server environment provide configuration context.
 * Returns: Accurate provider status, clickable setup details, and safe external management links.
 * Side effects: Enforces owner authorization and performs read-only provider checks.
 */
export default async function SettingsPage() {
  const user = await requireAuthorizedOperationsUser();
  let clerkSessionToken: string | null = null;

  if (!user.isPreview) {
    const authState = await auth();
    clerkSessionToken = await authState.getToken();
  }

  const overview = await getIntegrationOverview({
    allowedEmail: user.email,
    clerkSessionToken,
    clerkSessionVerified: !user.isPreview,
    isPreview: user.isPreview,
  });

  return (
    <>
      <PageHeading
        actions={<RefreshConnectionsButton checkedAt={overview.checkedAt} />}
        description="Authentication, source connectors, permissions, and live capability checks"
        title="Settings"
      />
      <div style={{ marginBottom: 14 }}>
        <StatusBadge tone={user.isPreview ? "purple" : "green"}>
          {user.isPreview ? "Local preview" : "Production owner session verified"}
        </StatusBadge>
      </div>
      <SettingsWorkspace overview={overview} />
    </>
  );
}
