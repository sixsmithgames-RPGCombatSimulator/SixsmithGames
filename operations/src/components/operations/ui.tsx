import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  BadgeCheck,
  CircleDollarSign,
  ClipboardCheck,
  ShieldAlert,
  TriangleAlert,
  UsersRound,
} from "lucide-react";
import type { MetricCardData, Tone } from "@/data/operations-types";
import { buildSparklinePoints, getToneClassName } from "@/lib/format";

const METRIC_ICONS = {
  approvals: ClipboardCheck,
  conflicts: ShieldAlert,
  exceptions: TriangleAlert,
  revenue: CircleDollarSign,
  risk: TriangleAlert,
  subscribers: UsersRound,
};

const PRODUCT_IMAGES: Record<string, string> = {
  GameMasterCraft: "/brand/gamemastercraft.png",
  SagaCraft: "/brand/sagacraft.png",
  "Virtual Combat Simulator": "/brand/virtual-combat-simulator.png",
  "Four Star General": "/brand/four-star-general.png",
  MasterTyping: "/brand/mastertyping.png",
  Gravity: "/brand/gravity.png",
};

export interface PageHeadingProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

/**
 * Purpose: Renders the consistent page title and optional workflow actions.
 * Parameters: Heading copy, optional breadcrumb eyebrow, and optional action controls.
 * Returns: A semantic page-heading element tree.
 * Side effects: None.
 */
export function PageHeading({
  eyebrow,
  title,
  description,
  actions,
}: PageHeadingProps) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </div>
  );
}

/**
 * Purpose: Renders one linked executive metric with semantic tone and evidence context.
 * Parameters: metric is the fully formatted metric view model.
 * Returns: A navigable metric card.
 * Side effects: None.
 */
export function MetricCard({ metric }: { metric: MetricCardData }) {
  const Icon = METRIC_ICONS[metric.icon];
  return (
    <Link className="metric-card" href={metric.href}>
      <span className={`metric-icon ${getToneClassName(metric.tone)}`}>
        <Icon aria-hidden size={23} />
      </span>
      <span className="metric-copy">
        <small>{metric.label}</small>
        <strong>{metric.value}</strong>
        <span className={metric.comparison.includes("↑") ? "positive" : "muted"}>
          {metric.comparison}
        </span>
        <em>{metric.detail}</em>
      </span>
    </Link>
  );
}

/**
 * Purpose: Renders a compact semantic status badge shared across workflows.
 * Parameters: children is badge text; tone selects the validated semantic presentation.
 * Returns: A styled inline badge.
 * Side effects: None.
 */
export function StatusBadge({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span className={`status-badge ${getToneClassName(tone)}`}>{children}</span>
  );
}

/**
 * Purpose: Renders the authoritative product artwork for a known catalog name.
 * Parameters: name is the canonical product name; size controls rendered dimensions.
 * Returns: A Next.js optimized product image.
 * Side effects: Throws an actionable error if the view model references an unknown product.
 */
export function ProductMark({
  name,
  size = 28,
}: {
  name: string;
  size?: number;
}) {
  const source = PRODUCT_IMAGES[name];

  if (!source) {
    throw new Error(
      `Product artwork is not configured for "${name}". Root cause: the product view model references a catalog name that is missing from PRODUCT_IMAGES. Fix: add the authoritative image mapping before rendering this product.`,
    );
  }

  return (
    <Image
      alt=""
      className="product-mark"
      height={size}
      src={source}
      width={size}
    />
  );
}

/**
 * Purpose: Renders a responsive inline operational trend without a heavy chart runtime.
 * Parameters: values are ordered observations; label is accessible text; tone selects the line color.
 * Returns: An accessible SVG sparkline.
 * Side effects: None.
 */
export function Sparkline({
  values,
  label,
  tone = "blue",
}: {
  values: number[];
  label: string;
  tone?: "blue" | "green" | "gold" | "red";
}) {
  return (
    <svg
      aria-label={label}
      className={`sparkline sparkline-${tone}`}
      preserveAspectRatio="none"
      role="img"
      viewBox="0 0 240 72"
    >
      <path d="M0 18H240 M0 36H240 M0 54H240" className="grid-lines" />
      <polyline fill="none" points={buildSparklinePoints(values)} />
    </svg>
  );
}

/**
 * Purpose: Renders an honest connected-mode state when a source-backed workflow has no records.
 * Parameters: workflow identifies the workspace with no current source records.
 * Returns: A zero-state with a link to the current source-status workspace.
 * Side effects: None.
 */
export function ConnectedEmptyState({ workflow }: { workflow: string }) {
  return (
    <section className="connected-empty">
      <span className="empty-icon">
        <BadgeCheck aria-hidden size={26} />
      </span>
      <h2>{workflow} has no source records yet</h2>
      <p>
        The workspace is available, but its connected sources returned no records.
        Settings explains what each service can currently provide.
      </p>
      <Link className="button button-primary" href="/settings">
        View source status
      </Link>
    </section>
  );
}
