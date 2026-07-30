import Link from "next/link";

/**
 * Purpose: Gives missing records and unknown routes a safe recovery path.
 * Parameters: None.
 * Returns: The global not-found page.
 * Side effects: None.
 */
export default function NotFound() {
  return (
    <main className="standalone-state">
      <p className="eyebrow">404</p>
      <h1>Workspace not found</h1>
      <p>The requested operations record or route does not exist.</p>
      <Link className="button button-primary" href="/dashboard">Return to dashboard</Link>
    </main>
  );
}
