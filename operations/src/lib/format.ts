import type { Tone } from "@/data/operations-types";

const TONE_CLASS_NAMES: Record<Tone, string> = {
  brand: "tone-brand",
  blue: "tone-blue",
  green: "tone-green",
  gold: "tone-gold",
  orange: "tone-orange",
  purple: "tone-purple",
  red: "tone-red",
  slate: "tone-slate",
};

/**
 * Purpose: Resolves a semantic data tone without duplicating CSS class decisions in views.
 * Parameters: tone is the validated semantic tone attached to an operations view model.
 * Returns: The corresponding stable CSS class name.
 * Side effects: None.
 */
export function getToneClassName(tone: Tone): string {
  return TONE_CLASS_NAMES[tone];
}

/**
 * Purpose: Produces deterministic SVG coordinates for compact operational trend charts.
 * Parameters: values are the ordered observations; width and height define the SVG viewport.
 * Returns: A whitespace-delimited SVG polyline point string.
 * Side effects: None.
 */
export function buildSparklinePoints(
  values: number[],
  width = 240,
  height = 72,
): string {
  if (values.length === 0) {
    return "";
  }

  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const range = maximum - minimum;

  return values
    .map((value, index) => {
      const x =
        values.length === 1 ? width / 2 : (index / (values.length - 1)) * width;
      const normalized = range === 0 ? 0.5 : (value - minimum) / range;
      const y = height - normalized * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}
