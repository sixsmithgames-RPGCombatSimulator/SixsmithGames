/**
 * Purpose: Prevents layout collapse while a private route resolves server data.
 * Parameters: None.
 * Returns: An accessible loading skeleton sized like the operations workspace.
 * Side effects: Runs a reduced-motion-aware CSS shimmer animation.
 */
export default function OperationsLoading() {
  return (
    <div aria-label="Loading operations workspace" className="loading-layout" role="status">
      <span className="loading-title" />
      <span className="loading-subtitle" />
      <div className="loading-grid">{Array.from({ length: 6 }, (_, index) => <span key={index} />)}</div>
      <div className="loading-panel" />
    </div>
  );
}
