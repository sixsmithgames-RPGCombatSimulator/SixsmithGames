"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Purpose: Renders a root recovery document when configuration prevents shell initialization.
 * Parameters: error is the captured root exception; reset requests another render.
 * Returns: A complete HTML recovery document.
 * Side effects: Invokes the Next.js root-boundary reset callback when requested.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main className="standalone-state">
          <p className="eyebrow">Configuration error</p>
          <h1>Sixsmith Games Operations could not start</h1>
          <p>{error.message}</p>
          <button className="button button-primary" onClick={reset} type="button">Try again</button>
        </main>
      </body>
    </html>
  );
}
