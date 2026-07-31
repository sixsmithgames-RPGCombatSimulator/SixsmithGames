"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell, Menu, Search } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CommandSearch } from "@/components/operations/command-search";

interface OperationsHeaderProps {
  displayName: string;
  email: string;
  isPreview: boolean;
  onOpenNavigation: () => void;
}

/**
 * Purpose: Renders global search, environment state, notifications, and identity controls.
 * Parameters: Owner identity, runtime state, and the callback that opens mobile navigation.
 * Returns: The sticky application header and command-search overlay.
 * Side effects: Subscribes to the Command/Ctrl+K shortcut and maintains search visibility.
 */
export function OperationsHeader({
  displayName,
  email,
  isPreview,
  onOpenNavigation,
}: OperationsHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="topbar">
        <button
          aria-label="Open navigation"
          className="icon-button mobile-menu"
          onClick={onOpenNavigation}
          type="button"
        >
          <Menu aria-hidden size={20} />
        </button>
        <button
          className="global-search"
          onClick={() => setSearchOpen(true)}
          type="button"
        >
          <Search aria-hidden size={18} />
          <span>Search operations workspaces…</span>
          <kbd>⌘ K</kbd>
        </button>

        <div className="topbar-actions">
          <Link aria-label="Open tasks and approvals" className="notification-button" href="/approvals">
            <Bell aria-hidden size={20} />
          </Link>
          <span className={`environment-pill ${isPreview ? "preview" : ""}`}>
            <i />
            {isPreview ? "Preview" : "Live"}
          </span>
          {isPreview ? (
            <div className="user-summary">
              <span className="avatar avatar-brand">TS</span>
              <span>
                <strong>{displayName}</strong>
                <small>{email}</small>
              </span>
            </div>
          ) : (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "clerk-avatar",
                },
              }}
            />
          )}
        </div>
      </header>
      <CommandSearch onClose={closeSearch} open={searchOpen} />
    </>
  );
}
