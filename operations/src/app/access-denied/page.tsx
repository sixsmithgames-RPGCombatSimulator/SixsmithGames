import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

export const metadata: Metadata = {
  title: "Access denied",
};

/**
 * Purpose: Explains the owner-only policy without exposing operational content.
 * Parameters: None.
 * Returns: A standalone access-denied page with a sign-in recovery link.
 * Side effects: None.
 */
export default function AccessDeniedPage() {
  return (
    <main className="standalone-state">
      <span><LockKeyhole aria-hidden size={28} /></span>
      <p className="eyebrow">Access denied</p>
      <h1>This workspace is owner-only</h1>
      <p>
        The signed-in Clerk account is not the authorized operations owner.
        Sign out and use the approved Sixsmith Games account.
      </p>
      <Link className="button button-primary" href="/sign-in">Return to sign in</Link>
    </main>
  );
}
