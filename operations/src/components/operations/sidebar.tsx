"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { OPERATIONS_NAVIGATION } from "@/components/operations/navigation";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

/**
 * Purpose: Renders persistent desktop navigation and the responsive mobile drawer.
 * Parameters: mobileOpen controls the transform state; onClose dismisses the mobile drawer.
 * Returns: The navigation scrim, brand lockup, route links, and workspace footer.
 * Side effects: Reads the active pathname to present the current route.
 */
export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <button
        aria-label="Close navigation"
        className={`nav-scrim ${mobileOpen ? "is-open" : ""}`}
        onClick={onClose}
        type="button"
      />
      <aside className={`sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="brand-lockup">
          <Image
            alt=""
            className="brand-mark"
            height={42}
            priority
            src="/brand/sixsmith-games.png"
            width={42}
          />
          <span>
            <strong>Sixsmith Games</strong>
            <small>Operations</small>
          </span>
          <button
            aria-label="Close navigation"
            className="icon-button sidebar-close"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden size={18} />
          </button>
        </div>

        <nav aria-label="Primary navigation" className="primary-nav">
          {OPERATIONS_NAVIGATION.map((item) => {
            const isActive = pathname.startsWith(item.activePrefix);
            const Icon = item.icon;

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`nav-link ${isActive ? "is-active" : ""}`}
                href={item.href}
                key={item.label}
                onClick={onClose}
              >
                <Icon aria-hidden size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <footer className="sidebar-footer">
          <strong>Sixsmith Games Operations</strong>
          <span>Private owner workspace</span>
          <span>© 2026 Sixsmith Games</span>
        </footer>
      </aside>
    </>
  );
}
