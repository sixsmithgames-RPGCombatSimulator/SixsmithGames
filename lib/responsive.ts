export const pageGutter = 'var(--page-gutter)';
export const cardPadding = 'var(--card-padding)';
export const actionRowClassName = 'responsive-button-row';
export const touchTargetClassName = 'touch-target';

export function fluidGrid(minWidth: string) {
  return `repeat(auto-fit, minmax(min(100%, ${minWidth}), 1fr))`;
}
