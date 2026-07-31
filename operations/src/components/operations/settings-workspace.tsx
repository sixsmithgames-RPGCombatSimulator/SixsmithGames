"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  CircleAlert,
  Database,
  ExternalLink,
  Gamepad2,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { StatusBadge } from "@/components/operations/ui";
import type {
  IntegrationOverview,
  IntegrationSnapshot,
} from "@/lib/integrations/status";
import styles from "./settings-workspace.module.css";

const ICONS = {
  clerk: ShieldCheck,
  gamemastercraft: Gamepad2,
  neon: Database,
  "remaining-products": CircleAlert,
  stripe: WalletCards,
  vcs: Gamepad2,
} as const;

/**
 * Purpose: Refreshes the Server Component tree so every provider capability is checked again.
 * Parameters: checkedAt is the last server verification timestamp shown beside the control.
 * Returns: A keyboard-accessible refresh control with pending feedback.
 * Side effects: Requests a fresh render of the current Settings route.
 */
export function RefreshConnectionsButton({ checkedAt }: { checkedAt: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  }).format(new Date(checkedAt));

  return (
    <div className={styles.refreshGroup}>
      <span>Checked {formattedTime}</span>
      <button
        className="button button-secondary"
        disabled={isPending}
        onClick={() => startTransition(() => router.refresh())}
        type="button"
      >
        <RefreshCw aria-hidden className={isPending ? styles.spinning : undefined} size={15} />
        {isPending ? "Checking…" : "Recheck connections"}
      </button>
    </div>
  );
}

/**
 * Purpose: Renders one clickable connector row with truthful requirements, capabilities, and provider actions.
 * Parameters: integration is a serializable live status snapshot; open controls its disclosure state.
 * Returns: An accessible accordion item whose enabled actions all lead to working destinations.
 * Side effects: Toggling changes only local disclosure state; external links open provider consoles.
 */
function IntegrationRow({
  integration,
  open,
  onToggle,
}: {
  integration: IntegrationSnapshot;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = ICONS[integration.id as keyof typeof ICONS] ?? KeyRound;
  const panelId = `integration-${integration.id}`;

  return (
    <article className={`${styles.integrationCard} ${open ? styles.open : ""}`}>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className={styles.integrationSummary}
        onClick={onToggle}
        type="button"
      >
        <span className={styles.integrationIcon}><Icon aria-hidden size={20} /></span>
        <span className={styles.integrationIdentity}>
          <small>{integration.category}</small>
          <strong>{integration.name}</strong>
          <span>{integration.description}</span>
        </span>
        <span className={styles.integrationState}>
          <StatusBadge tone={integration.tone}>{integration.statusLabel}</StatusBadge>
          <ChevronDown aria-hidden className={styles.chevron} size={18} />
        </span>
      </button>
      <div className={styles.integrationDetail} hidden={!open} id={panelId}>
        <div className={styles.detailLead}>
          <div>
            <span className="eyebrow">Current capability</span>
            <p>{integration.summary}</p>
          </div>
          <div>
            <span className="eyebrow">Source of truth</span>
            <p>{integration.sourceOfTruth}</p>
          </div>
        </div>

        <div className={styles.detailGrid}>
          <section aria-labelledby={`${panelId}-requirements`}>
            <h3 id={`${panelId}-requirements`}>Configuration checklist</h3>
            <ul className={styles.requirementList}>
              {integration.requirements.map((requirement) => (
                <li key={requirement.label}>
                  <span className={`${styles.requirementIcon} ${styles[requirement.state]}`}>
                    {requirement.state === "complete" ? <Check aria-hidden size={13} /> : <CircleAlert aria-hidden size={13} />}
                  </span>
                  <span><strong>{requirement.label}</strong><small>{requirement.detail}</small></span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby={`${panelId}-capabilities`}>
            <h3 id={`${panelId}-capabilities`}>Verified capabilities</h3>
            {integration.capabilities.length > 0 ? (
              <ul className={styles.capabilityList}>
                {integration.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
              </ul>
            ) : (
              <p className={styles.noCapabilities}>No operational capability has been verified yet.</p>
            )}
          </section>
        </div>

        <footer className={styles.integrationFooter}>
          <div><span>Next step</span><strong>{integration.nextStep}</strong></div>
          <div className={styles.integrationActions}>
            <a className="button button-secondary" href="https://vercel.com/dashboard" rel="noreferrer" target="_blank">
              Environment settings <ExternalLink aria-hidden size={13} />
            </a>
            {integration.manageUrl ? (
              <a className="button button-primary" href={integration.manageUrl} rel="noreferrer" target="_blank">
                Open provider <ExternalLink aria-hidden size={13} />
              </a>
            ) : null}
          </div>
        </footer>
      </div>
    </article>
  );
}

/**
 * Purpose: Presents core and source integrations as a usable configuration workspace rather than static placeholders.
 * Parameters: overview contains provider checks performed on the server for the current request.
 * Returns: Summary metrics, security guidance, and clickable connector accordions.
 * Side effects: Maintains only which connector panels are expanded.
 */
export function SettingsWorkspace({ overview }: { overview: IntegrationOverview }) {
  const firstActionable = overview.integrations.find((integration) =>
    ["error", "identified_not_connected", "not_configured"].includes(integration.state),
  );
  const [openRows, setOpenRows] = useState<Record<string, boolean>>(
    firstActionable ? { [firstActionable.id]: true } : {},
  );

  return (
    <div className={styles.workspace}>
      <section className={`panel ${styles.summaryPanel}`}>
        <div>
          <span className={styles.summaryIcon}><ShieldCheck aria-hidden size={26} /></span>
          <div>
            <span className="eyebrow">Live configuration</span>
            <h2>Core services are checked from the server</h2>
            <p>
              Provider secrets stay in Vercel. This page validates safe read capabilities and never returns secret values to the browser.
            </p>
          </div>
        </div>
        <dl>
          <div><dt>Connected</dt><dd>{overview.connectedCount}</dd></div>
          <div><dt>Needs setup</dt><dd>{overview.actionableCount}</dd></div>
          <div><dt>Total sources</dt><dd>{overview.integrations.length}</dd></div>
        </dl>
      </section>

      <section aria-labelledby="connector-heading" className={styles.connectorSection}>
        <div className={styles.sectionHeading}>
          <div><h2 id="connector-heading">Connections</h2><p>Select a connection to review its setup, permissions, and next action.</p></div>
          <span><KeyRound aria-hidden size={15} /> Secrets are never displayed</span>
        </div>
        <div className={styles.integrationList}>
          {overview.integrations.map((integration) => (
            <IntegrationRow
              integration={integration}
              key={integration.id}
              onToggle={() => setOpenRows((current) => ({ ...current, [integration.id]: !current[integration.id] }))}
              open={Boolean(openRows[integration.id])}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
