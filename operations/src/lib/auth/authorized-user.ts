import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getOperationsRuntimeConfig } from "@/lib/runtime-config";

export interface AuthorizedOperationsUser {
  clerkUserId: string;
  email: string;
  displayName: string;
  role: "owner_admin";
  isPreview: boolean;
}

/**
 * Purpose: Enforces the owner-only Clerk boundary at the same layer that serves operational data.
 * Parameters: None; Clerk resolves the current request session in connected mode.
 * Returns: The minimum user identity needed by the UI and audit layer.
 * Side effects: Redirects signed-out or non-allowlisted requests before data can be returned.
 */
export const requireAuthorizedOperationsUser = cache(
  async (): Promise<AuthorizedOperationsUser> => {
    const config = getOperationsRuntimeConfig();

    if (config.mode === "preview") {
      return {
        clerkUserId: "preview_owner",
        email: config.allowedEmail,
        displayName: "Tyler Sixsmith",
        role: "owner_admin",
        isPreview: true,
      };
    }

    const { userId } = await auth();

    if (!userId) {
      redirect("/sign-in");
    }

    const user = await currentUser();
    const primaryEmail = user?.primaryEmailAddress?.emailAddress
      .trim()
      .toLowerCase();

    if (!user || !primaryEmail || primaryEmail !== config.allowedEmail) {
      redirect("/access-denied");
    }

    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
    const displayName = fullName.length > 0 ? fullName : primaryEmail;

    return {
      clerkUserId: user.id,
      email: primaryEmail,
      displayName,
      role: "owner_admin",
      isPreview: false,
    };
  },
);
