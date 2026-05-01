"use client";

import Link from "next/link";
import { PanelLeft, PanelLeftClose } from "lucide-react";
import type { ArchiveYear, ActiveArchive } from "@/lib/types";
import ArchiveDropdown from "./ArchiveDropdown";
import ThemeToggle from "./ThemeToggle";

interface Props {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  archiveYears: ArchiveYear[];
  activeArchive: ActiveArchive | null;
  onArchiveChange: (archive: ActiveArchive | null) => void;
}

export default function BlogHeader({
  sidebarOpen,
  onToggleSidebar,
  archiveYears,
  activeArchive,
  onArchiveChange
}: Props) {
  return (
    <header className="bg-(--ink-overlay-header) backdrop-blur-md border-b border-(--ink-border-strong) px-8 sm:px-12 sticky top-0 z-50">
      {/* Top row */}
      <div className="flex items-center justify-between h-17.5 border-b border-(--ink-border-subtle)">
        <Link
          href="/"
          className="[font-family:var(--font-playfair)] text-[1.8rem] font-bold text-ink-text no-underline"
        >
          The <em className="text-ink-gold not-italic">Gravy Train</em>
        </Link>

        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-[0.75rem] tracking-[0.14em] uppercase text-ink-warm italic">
            David Gray · Est. 1977
          </span>
          <Link
            href="/#subscribe"
            className="px-5 py-2 border border-(--ink-border-subscribe) bg-(--ink-surface-subscribe) text-ink-warm text-[0.75rem] italic tracking-[0.12em] uppercase transition-colors hover:bg-(--ink-surface-subscribe-hover) hover:border-ink-warm hover:text-ink-text"
          >
            <span aria-hidden="true">✦</span> Subscribe
          </Link>
          <ThemeToggle />
          <button
            onClick={onToggleSidebar}
            className="w-11 h-11 flex items-center justify-center text-ink-warm hover:text-ink-text transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-dark"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? (
              <PanelLeftClose size={20} />
            ) : (
              <PanelLeft size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Nav row — hidden on mobile */}
      <nav className="hidden sm:flex gap-8 h-11 items-center">
        <Link
          href="/blog"
          onClick={() => onArchiveChange(null)}
          className="text-[0.75rem] tracking-[0.16em] uppercase text-ink-warm hover:text-ink-text transition-colors"
        >
          Blog
        </Link>

        <ArchiveDropdown
          archiveYears={archiveYears}
          activeArchive={activeArchive}
          onArchiveChange={onArchiveChange}
        />

        <Link
          href="/about"
          className="text-[0.75rem] tracking-[0.16em] uppercase text-ink-warm hover:text-ink-text transition-colors"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
