"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { OPERATIONS_NAVIGATION } from "@/components/operations/navigation";

interface CommandSearchProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Purpose: Provides keyboard-accessible search over implemented operations workspaces.
 * Parameters: open controls visibility; onClose returns control to the header.
 * Returns: A modal command palette when open, otherwise no rendered UI.
 * Side effects: Focuses the search input and subscribes to Escape-key events while mounted.
 */
export function CommandSearch({ open, onClose }: CommandSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClose = () => {
    setQuery("");
    onClose();
  };
  const normalizedQuery = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      OPERATIONS_NAVIGATION.filter((item) => {
        const searchable = `${item.label} ${item.description}`.toLowerCase();
        return normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
      }),
    [normalizedQuery],
  );

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setQuery("");
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!open) {
    return null;
  }

  return (
    <div aria-modal="true" className="command-overlay" role="dialog">
      <button
        aria-label="Close command search"
        className="command-backdrop"
        onClick={handleClose}
        type="button"
      />
      <div className="command-dialog">
        <div className="command-input-row">
          <Search aria-hidden size={19} />
          <input
            aria-label="Search operations workspaces"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search workspaces and workflows…"
            ref={inputRef}
            value={query}
          />
          <button
            aria-label="Close search"
            className="icon-button"
            onClick={handleClose}
            type="button"
          >
            <X aria-hidden size={18} />
          </button>
        </div>
        <div className="command-results">
          {matches.map((item) => {
            const Icon = item.icon;
            return (
              <Link href={item.href} key={item.href} onClick={handleClose}>
                <span className="command-icon">
                  <Icon aria-hidden size={18} />
                </span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
              </Link>
            );
          })}
          {matches.length === 0 ? (
            <p className="command-empty">No workspace matches “{query}”.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
