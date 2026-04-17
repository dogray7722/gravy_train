"use client";

import { useState, useEffect, useRef } from "react";
import type { ArchiveYear, ActiveArchive } from "@/lib/types";

interface Props {
  archiveYears: ArchiveYear[];
  activeArchive: ActiveArchive | null;
  onArchiveChange: (archive: ActiveArchive | null) => void;
}

export default function ArchiveDropdown({ archiveYears, activeArchive, onArchiveChange }: Props) {
  const [open, setOpen] = useState(false);
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const isYearActive = (year: number) =>
    activeArchive?.year === year && activeArchive?.month === null;

  const isMonthActive = (year: number, month: number) =>
    activeArchive?.year === year && activeArchive?.month === month;

  const handleYear = (year: number) => {
    onArchiveChange({ year, month: null });
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) { next.delete(year); } else { next.add(year); }
      return next;
    });
  };

  const handleMonth = (year: number, month: number) => {
    onArchiveChange({ year, month });
    setOpen(false);
  };

  const isActive = activeArchive !== null;

  return (
    <div ref={ref} className="relative">
      {/* Trigger — styled to match other nav links */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`text-[0.75rem] tracking-[0.16em] uppercase transition-colors cursor-pointer bg-transparent border-0 p-0 ${
          isActive ? "text-ink-text" : "text-ink-warm hover:text-ink-text"
        }`}
      >
        Archive{isActive ? " ✦" : ""}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-[rgba(20,15,10,0.97)] border border-[rgba(180,140,80,0.18)] min-w-[10rem] z-50 py-2 backdrop-blur-md">
          {/* Clear filter */}
          {isActive && (
            <button
              onClick={() => { onArchiveChange(null); setOpen(false); }}
              className="w-full text-left px-4 py-[0.35rem] text-[0.7rem] tracking-[0.12em] uppercase text-ink-gold italic hover:text-ink-text transition-colors bg-transparent border-0 cursor-pointer"
            >
              ← Clear filter
            </button>
          )}

          {archiveYears.map((yr) => (
            <div key={yr.year}>
              {/* Year row */}
              <button
                onClick={() => handleYear(yr.year)}
                className={`w-full flex items-center justify-between px-4 py-[0.4rem] text-[0.75rem] tracking-[0.12em] uppercase transition-colors bg-transparent border-0 cursor-pointer ${
                  isYearActive(yr.year)
                    ? "text-ink-text"
                    : "text-ink-warm hover:text-ink-text"
                }`}
              >
                <span>{yr.year}</span>
                <span className="text-ink-faint text-[0.65rem] ml-3">
                  {expandedYears.has(yr.year) ? "▾" : "▸"}
                </span>
              </button>

              {/* Month rows */}
              {expandedYears.has(yr.year) && (
                <div>
                  {yr.months.map((mo) => (
                    <button
                      key={mo.month}
                      onClick={() => handleMonth(yr.year, mo.month)}
                      className={`w-full flex items-center justify-between pl-8 pr-4 py-[0.35rem] text-[0.75rem] italic transition-colors bg-transparent border-0 cursor-pointer ${
                        isMonthActive(yr.year, mo.month)
                          ? "text-ink-text"
                          : "text-ink-muted hover:text-ink-text"
                      }`}
                    >
                      <span>{mo.label}</span>
                      <span className="text-ink-faint text-[0.7rem] ml-3">{mo.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
