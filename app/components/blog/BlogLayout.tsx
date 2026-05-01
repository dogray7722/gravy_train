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
  "travel",
  "thoughts",
  "cycling",
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
  const [randomPostId, setRandomPostId] = useState<number | null>(null);

  const handleCategoryChange = (cat: CategoryFilter) => {
    if (cat === "random") {
      const pool = posts.filter((p) => !p.featured);
      const pick = pool[Math.floor(Math.random() * pool.length)];
      setRandomPostId(pick.id);
    }
    setActiveCategory(cat);
  };

  const archiveYears = useMemo(() => computeArchive(posts), [posts]);

  const hero = useMemo(() => posts.find((p) => p.featured), [posts]);

  const filtered = useMemo(() => {
    const heroVisible =
      activeCategory === "all" &&
      search === "" &&
      !activeArchive &&
      sortOrder === "newest";

    return posts
      .filter((p) => (heroVisible ? !p.featured : true))
      .filter((p) => {
        if (activeCategory === "all") return true;
        if (activeCategory === "random") return p.id === randomPostId;
        return p.category === activeCategory;
      })
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
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [posts, activeCategory, search, activeArchive, sortOrder, randomPostId]);

  const showFeatured =
    activeCategory === "all" &&
    search === "" &&
    activeArchive === null &&
    sortOrder === "newest";

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
      style={{ backgroundImage: "var(--ink-page-gradient)" }}
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
        className="flex max-w-7xl mx-auto px-8 items-start"
      >
        {/* Main content */}
        <div className="flex-1 min-w-0 border-r border-(--ink-border-soft) pr-10">
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
          onCategoryChange={handleCategoryChange}
          onSearchChange={setSearch}
          onArchiveChange={setActiveArchive}
          onSortChange={setSortOrder}
        />
      </div>

      <footer className="border-t border-(--ink-border-soft) py-10 px-8 text-center mt-auto">
        <p className="text-[0.75rem] text-ink-muted tracking-[0.12em] italic">
          The Gravy Train · Est. 2026
        </p>
      </footer>
    </div>
  );
}
