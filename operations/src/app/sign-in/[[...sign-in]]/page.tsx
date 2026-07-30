import type { Metadata } from "next";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getOperationsRuntimeConfig } from "@/lib/runtime-config";

export const metadata: Metadata = {
  title: "Sign in",
};

/**
 * Purpose: Renders Clerk sign-in only when connected authentication is configured.
 * Parameters: None; the catch-all route segment is handled by Clerk.
 * Returns: The branded Clerk sign-in page in connected mode.
 * Side effects: Redirects local preview requests directly to the dashboard.
 */
export default function SignInPage() {
  const config = getOperationsRuntimeConfig();

  if (config.mode === "preview") {
    redirect("/dashboard");
  }

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <Image alt="" height={64} priority src="/brand/sixsmith-games.png" width={64} />
        <span className="eyebrow">Private owner workspace</span>
        <h1>Sixsmith Games Operations</h1>
        <p>Customers, subscriptions, campaigns, products, approvals, and finances in one secure operating view.</p>
      </section>
      <section className="auth-form-panel">
        <SignIn
          fallbackRedirectUrl="/dashboard"
          forceRedirectUrl="/dashboard"
          path="/sign-in"
          routing="path"
          signUpUrl={undefined}
        />
      </section>
    </main>
  );
}
