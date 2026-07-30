"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { OperationsHeader } from "@/components/operations/header";
import { Sidebar } from "@/components/operations/sidebar";

interface AppShellProps {
  children: ReactNode;
  displayName: string;
  email: string;
  isPreview: boolean;
}

/**
 * Purpose: Coordinates responsive navigation around authorized operations pages.
 * Parameters: children is page content; identity fields populate the header; isPreview labels runtime state.
 * Returns: The persistent sidebar, top bar, preview guard, and active route content.
 * Side effects: Maintains mobile navigation visibility in client state.
 */
export function AppShell({
  children,
  displayName,
  email,
  isPreview,
}: AppShellProps) {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar
        mobileOpen={mobileNavigationOpen}
        onClose={() => setMobileNavigationOpen(false)}
      />
      <div className="app-column">
        <OperationsHeader
          displayName={displayName}
          email={email}
          isPreview={isPreview}
          onOpenNavigation={() => setMobileNavigationOpen(true)}
        />
        {isPreview ? (
          <div className="preview-banner" role="status">
            Local preview · Sample data only · Changes are not persisted
          </div>
        ) : null}
        <main className="page-canvas">{children}</main>
      </div>
    </div>
  );
}
