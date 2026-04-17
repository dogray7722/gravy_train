export type PostType = "text" | "image" | "video";

export type Category = "video" | "travel" | "thoughts" | "random";

export type CategoryFilter = "all" | Category;

export interface ArchiveMonth {
  month: number;  // 1–12
  label: string;  // "January"
  count: number;
}

export interface ArchiveYear {
  year: number;
  months: ArchiveMonth[];
  count: number;
}

export interface ActiveArchive {
  year: number;
  month: number | null; // null = whole year
}

export interface Post {
  id: number;
  slug: string;
  category: Category;
  title: string;
  date: string;       // ISO string e.g. "2026-03-18"
  readTime: string;   // e.g. "7 min read"
  excerpt: string;
  type: PostType;
  featured?: boolean;
  imageSrc?: string;  // for type === "image"
  videoId?: string;   // YouTube video ID for type === "video"
}
