import { redirect } from "next/navigation";

/**
 * Purpose: Gives the private application a single canonical entry route.
 * Parameters: None.
 * Returns: No UI because Next.js completes a server redirect.
 * Side effects: Redirects the request from `/` to `/dashboard`.
 */
export default function HomePage() {
  redirect("/dashboard");
}
