import type { Metadata } from "next";
import {
  BadgeCheck,
  Boxes,
  CircleDollarSign,
  ClipboardCheck,
  Headphones,
  Megaphone,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { notFound } from "next/navigation";
import { PageHeading, StatusBadge } from "@/components/operations/ui";
import { requireAuthorizedOperationsUser } from "@/lib/auth/authorized-user";

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

const WORKSPACE_SECTIONS = {
  orders: {
    title: "Orders",
    description: "Unified orders, payment events, refunds, and fulfillment state",
    icon: ShoppingCart,
    sources: ["Stripe charges", "Stripe refunds", "Product fulfillment events"],
  },
  crm: {
    title: "CRM",
    description: "Lifecycle signals, personalized outreach, and retained context",
    icon: CircleDollarSign,
    sources: ["Customer 360", "Email provider", "Engagement events"],
  },
  products: {
    title: "Products",
    description: "Product catalog, offers, access rules, and portfolio health",
    icon: Boxes,
    sources: ["Product catalog", "Plan mappings", "Application access events"],
  },
  support: {
    title: "Support",
    description: "Customer cases, issue patterns, and feedback evidence",
    icon: Headphones,
    sources: ["Support inbox", "Product issues", "Customer identity links"],
  },
  approvals: {
    title: "Tasks & Approvals",
    description: "Review proposals, exceptions, evidence, and owner decisions",
    icon: ClipboardCheck,
    sources: ["Proposal versions", "Evidence snapshots", "Audit events"],
  },
  reports: {
    title: "Reports",
    description: "Saved operating views, scheduled summaries, and exports",
    icon: BadgeCheck,
    sources: ["Operational read models", "Saved filters", "Export jobs"],
  },
  settings: {
    title: "Settings",
    description: "Authentication, source connectors, policies, and sync health",
    icon: Settings,
    sources: ["Clerk authentication", "Neon Postgres", "Stripe and product connectors"],
  },
  marketing: {
    title: "Marketing",
    description: "Campaign portfolio, content operations, and attribution",
    icon: Megaphone,
    sources: ["Campaign plans", "Content proposals", "Channel performance"],
  },
} as const;

export const metadata: Metadata = {
  title: "Workspace Setup",
};

/**
 * Purpose: Renders a truthful setup state for Stage 2 domains without source data.
 * Parameters: params contains the validated reserved workspace route segment.
 * Returns: A connector checklist, or not-found for unknown segments.
 * Side effects: Enforces owner authorization and can terminate with notFound.
 */
export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  const configuration =
    WORKSPACE_SECTIONS[section as keyof typeof WORKSPACE_SECTIONS];

  if (!configuration) {
    notFound();
  }

  const user = await requireAuthorizedOperationsUser();
  const Icon = configuration.icon;

  return (
    <>
      <PageHeading
        title={configuration.title}
        description={configuration.description}
        actions={<StatusBadge tone={user.isPreview ? "purple" : "green"}>{user.isPreview ? "Preview planning state" : "Connected runtime"}</StatusBadge>}
      />
      <section className="panel setup-workspace">
        <span className="setup-icon"><Icon aria-hidden size={28} /></span>
        <div>
          <span className="eyebrow">Stage 2 workspace</span>
          <h2>Connector-backed data is not configured yet</h2>
          <p>
            This route is reserved in the application architecture, but it will
            not invent operational records. Add each source below, validate its
            permissions, and run an initial ingestion before this workspace
            becomes active.
          </p>
        </div>
        <div className="setup-checklist">
          {configuration.sources.map((source, index) => (
            <div key={source}>
              <span>{index + 1}</span>
              <strong>{source}</strong>
              <StatusBadge tone="slate">Not configured</StatusBadge>
            </div>
          ))}
        </div>
        <footer>
          No source changes, messages, approvals, or external actions can run
          from this setup state.
        </footer>
      </section>
    </>
  );
}
