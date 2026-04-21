"use client";

import { useState, useMemo } from "react";
import type {
  Post,
  CategoryFilter,
  ActiveArchive,
  SortOrder
} from "@/lib/types";
import { computeArchive } from "@/lib/posts";
import BlogHeader from "./BlogHeader";
import BlogHero from "./BlogHero";
import BlogPostGrid from "./BlogPostGrid";
import BlogSidebar from "./BlogSidebar";

const CATEGORIES: CategoryFilter[] = [
  "all",
  "video",
  "travel",
  "thoughts",
  "random"
];

interface Props {
  posts: Post[];
}

export default function BlogLayout({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeArchive, setActiveArchive] = useState<ActiveArchive | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const archiveYears = useMemo(() => computeArchive(posts), [posts]);

  const hero = useMemo(() => posts.find((p) => p.featured), [posts]);

  const filtered = useMemo(() => {
    return posts
      .filter((p) => !p.featured)
      .filter((p) => activeCategory === "all" || p.category === activeCategory)
      .filter(
        (p) =>
          search === "" ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(search.toLowerCase())
      )
      .filter((p) => {
        if (!activeArchive) return true;
        const d = new Date(p.date);
        if (d.getFullYear() !== activeArchive.year) return false;
        if (
          activeArchive.month !== null &&
          d.getMonth() + 1 !== activeArchive.month
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
        return sortOrder === "newest" ? diff : -diff;
      });
  }, [posts, activeCategory, search, activeArchive, sortOrder]);

  const showFeatured =
    activeCategory === "all" && search === "" && activeArchive === null;

  const gridLabel = (() => {
    if (activeArchive) {
      if (activeArchive.month !== null) {
        const monthLabel = archiveYears
          .find((y) => y.year === activeArchive.year)
          ?.months.find((m) => m.month === activeArchive.month)?.label;
        return `${monthLabel} ${activeArchive.year}`;
      }
      return `${activeArchive.year}`;
    }
    if (activeCategory !== "all") {
      return activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
    }
    if (search !== "") return `Results for "${search}"`;
    return "Posts";
  })();

  return (
    <div
      className="min-h-screen bg-ink-bg text-ink-text [font-family:var(--font-lora)]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 40% at 10% 90%, rgba(180,140,90,0.09) 0%, transparent 55%),
          radial-gradient(ellipse 50% 35% at 90% 10%, rgba(200,160,100,0.06) 0%, transparent 50%)
        `
      }}
    >
      <BlogHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        archiveYears={archiveYears}
        activeArchive={activeArchive}
        onArchiveChange={setActiveArchive}
      />

      <div
        id="main-content"
        className="flex max-w-screen-xl mx-auto px-8 items-start"
      >
        {/* Main content */}
        <div className="flex-1 min-w-0 border-r border-[rgba(180,140,80,0.12)] pr-10">
          {showFeatured && hero && <BlogHero post={hero} />}
          <BlogPostGrid posts={filtered} label={gridLabel} />
        </div>

        {/* Collapsible sidebar */}
        <BlogSidebar
          isOpen={sidebarOpen}
          categories={CATEGORIES}
          archiveYears={archiveYears}
          activeCategory={activeCategory}
          activeArchive={activeArchive}
          search={search}
          sortOrder={sortOrder}
          onCategoryChange={setActiveCategory}
          onSearchChange={setSearch}
          onArchiveChange={setActiveArchive}
          onSortChange={setSortOrder}
        />
      </div>

      <footer className="border-t border-[rgba(180,140,80,0.12)] py-10 px-8 text-center mt-auto">
        <p className="text-[0.75rem] text-ink-muted tracking-[0.12em] italic">
          The Gravy Train · Est. 2025
        </p>
      </footer>
    </div>
  );
}
