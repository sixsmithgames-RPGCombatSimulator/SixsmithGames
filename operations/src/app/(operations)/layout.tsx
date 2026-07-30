import type { ReactNode } from "react";
import { AppShell } from "@/components/operations/app-shell";
import { requireAuthorizedOperationsUser } from "@/lib/auth/authorized-user";

/**
 * Purpose: Wraps every private operations route in the shared authorized shell.
 * Parameters: The active operations page.
 * Returns: The responsive navigation and content frame.
 * Side effects: Enforces owner authorization before any private UI is rendered.
 */
export default async function OperationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAuthorizedOperationsUser();

  return (
    <AppShell
      displayName={user.displayName}
      email={user.email}
      isPreview={user.isPreview}
    >
      {children}
    </AppShell>
  );
}
