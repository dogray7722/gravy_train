"use client";

import type { CategoryFilter, ArchiveYear, ActiveArchive } from "@/lib/types";

const TAGS = [
  "#wandering",
  "#light",
  "#music",
  "#cities",
  "#memory",
  "#stillness",
  "#food",
  "#solitude"
];

interface Props {
  isOpen: boolean;
  categories: CategoryFilter[];
  archiveYears: ArchiveYear[];
  activeCategory: CategoryFilter;
  activeArchive: ActiveArchive | null;
  search: string;
  onCategoryChange: (cat: CategoryFilter) => void;
  onSearchChange: (val: string) => void;
  onArchiveChange: (archive: ActiveArchive | null) => void;
}

export default function BlogSidebar({
  isOpen,
  categories,
  archiveYears,
  activeCategory,
  activeArchive,
  search,
  onCategoryChange,
  onSearchChange,
  onArchiveChange
}: Props) {
  return (
    <aside
      className={`hidden sm:block shrink-0 overflow-hidden transition-[width,opacity] duration-300 ease-in-out ${
        isOpen ? "w-[17.5rem] opacity-100" : "w-0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="w-[17.5rem] pl-8 py-10 sticky"
        style={{ top: "var(--header-height)" }}
      >
        {/* Search */}
        <div className="mb-10">
          <p className="text-[0.75rem] tracking-[0.22em] uppercase text-ink-warm italic mb-4 pb-2 border-b border-[rgba(180,140,80,0.15)]">
            Search
          </p>
          <div className="relative">
            <span
              className="absolute left-[0.65rem] top-1/2 -translate-y-1/2 text-ink-faint text-[0.75rem] pointer-events-none select-none"
              aria-hidden="true"
            >
              ✦
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search…"
              className="w-full py-[0.65rem] pr-[0.9rem] pl-8 bg-[rgba(255,255,255,0.04)] border border-[rgba(180,140,80,0.22)] outline-none text-ink-text [font-family:var(--font-lora)] text-[0.875rem] placeholder:text-ink-faint focus:border-[rgba(180,140,80,0.55)] transition-colors"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-10">
          <p className="text-[0.75rem] tracking-[0.22em] uppercase text-ink-warm italic mb-4 pb-2 border-b border-[rgba(180,140,80,0.15)]">
            Categories
          </p>
          <div className="flex flex-wrap gap-[0.4rem]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-[0.8rem] py-[0.3rem] border text-[0.75rem] italic [font-family:var(--font-lora)] cursor-pointer transition-all capitalize ${
                  activeCategory === cat
                    ? "border-ink-warm text-ink-text bg-[rgba(255,255,255,0.06)]"
                    : "border-[rgba(180,140,80,0.25)] text-ink-warm hover:border-ink-warm hover:text-ink-text hover:bg-[rgba(255,255,255,0.06)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Archive */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[rgba(180,140,80,0.15)]">
            <p className="text-[0.75rem] tracking-[0.22em] uppercase text-ink-warm italic">
              Archive
            </p>
            {activeArchive && (
              <button
                onClick={() => onArchiveChange(null)}
                className="text-[0.7rem] text-ink-gold italic hover:text-ink-text transition-colors bg-transparent border-0 cursor-pointer p-0"
              >
                clear
              </button>
            )}
          </div>
          <ul className="space-y-0">
            {archiveYears.map((yr) =>
              yr.months.map((mo) => {
                const isActive =
                  activeArchive?.year === yr.year &&
                  activeArchive?.month === mo.month;
                return (
                  <li key={`${yr.year}-${mo.month}`}>
                    <button
                      onClick={() =>
                        onArchiveChange({ year: yr.year, month: mo.month })
                      }
                      className={`flex justify-between w-full text-[0.875rem] py-2 border-b border-[rgba(180,140,80,0.08)] cursor-pointer transition-colors bg-transparent border-t-0 border-l-0 border-r-0 ${
                        isActive
                          ? "text-ink-text"
                          : "text-ink-warm hover:text-ink-text"
                      }`}
                    >
                      <span>
                        {mo.label} {yr.year}
                      </span>
                      <span
                        className={`italic text-[0.8rem] ${isActive ? "text-ink-muted" : "text-ink-muted"}`}
                      >
                        {mo.count}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
}
