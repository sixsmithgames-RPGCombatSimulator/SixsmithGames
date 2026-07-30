"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
  useClerk: boolean;
}

/**
 * Purpose: Mounts the Clerk browser context only when connected mode is configured.
 * Parameters: children is the application tree; useClerk selects the validated runtime provider.
 * Returns: Either the unchanged preview tree or the Clerk-wrapped connected tree.
 * Side effects: Initializes the Clerk browser client in connected mode.
 */
export function AppProviders({ children, useClerk }: AppProvidersProps) {
  if (!useClerk) {
    return children;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
