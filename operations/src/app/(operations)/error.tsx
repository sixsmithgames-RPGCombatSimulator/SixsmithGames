"use client";

import { CircleAlert } from "lucide-react";

interface OperationsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Purpose: Renders a recoverable private-route error with actionable context.
 * Parameters: error is the captured exception; reset requests a boundary rerender.
 * Returns: An accessible error panel.
 * Side effects: Invokes the Next.js error-boundary reset callback when requested.
 */
export default function OperationsError({ error, reset }: OperationsErrorProps) {
  return (
    <section className="connected-empty" role="alert">
      <span className="empty-icon danger"><CircleAlert aria-hidden size={26} /></span>
      <h2>This workspace could not be loaded</h2>
      <p>{error.message}</p>
      <button className="button button-primary" onClick={reset} type="button">Try again</button>
    </section>
  );
}
