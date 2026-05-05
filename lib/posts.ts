import type { Post, CategoryFilter, ArchiveYear } from "./types";

export const POSTS: Post[] = [
  {
    id: 1,
    slug: "bear-creek-trail",
    category: "cycling",
    title: "Traversing the Bear Creek Trail",
    date: "2026-02-10",
    readTime: "4 min read",
    excerpt: "A way too early trek on a path in the Denver suburbs",
    type: "video",
    videoId: "Y50pwVVMbLk "
  },
  {
    id: 2,
    slug: "bear-creek-part-two",
    category: "cycling",
    title: "Bear Creek Trail — Part 2",
    date: "2026-02-11",
    readTime: "4 min read",
    excerpt: "A continuation of my February ride down the Bear Creek Trail",
    type: "video",
    videoId: "UtjHy7FkXRU "
  },
  {
    id: 3,
    slug: "lee-gulch-ride",
    category: "cycling",
    title: "Riding Lee Gulch",
    date: "2026-03-29",
    readTime: "4 min read",
    excerpt: "A spring ride on the South Suburban Trail system",
    type: "video",
    videoId: "B3KZwqWr8Ks "
  },
  {
    id: 4,
    slug: "belize-and-points-west",
    category: "travel",
    title: "Belize And Points West",
    date: "2026-04-20",
    readTime: "6 min read",
    excerpt:
      "The Cayo, Tikal, and out to the coast.  Six days in Central America",
    featured: true,
    imageSrc: "/images/san_pedro_hotel.jpg"
  },
  {
    id: 5,
    slug: "tikal",
    category: "travel",
    title: "Tikal",
    date: "2026-04-21",
    readTime: "9 min read",
    excerpt:
      "A journey into the Guatemalan countryside and a mysterious Maya megalopolis",
    imageSrc: "/images/temple_of_the_jaguar.jpg"
  },
  {
    id: 6,
    slug: "san_pedro",
    category: "travel",
    title: "San Pedro",
    date: "2026-04-22",
    readTime: "10 min read",
    excerpt: "Spending time in the waters of Amergris Caye",
    imageSrc: "/images/san_pedro.jpg"
  }
];

export function getAllPosts(): Post[] {
  return [...POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: CategoryFilter): Post[] {
  const all = getAllPosts();
  return category === "all" ? all : all.filter((p) => p.category === category);
}

export function getFeaturedPost(): Post | undefined {
  return getAllPosts().find((p) => p.featured === true);
}

export function getAllSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

export function computeArchive(posts: Post[]): ArchiveYear[] {
  const map = new Map<number, Map<number, number>>();
  for (const p of posts) {
    const d = new Date(p.date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    if (!map.has(year)) map.set(year, new Map());
    const ym = map.get(year)!;
    ym.set(month, (ym.get(month) ?? 0) + 1);
  }
  return [...map.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, ym]) => ({
      year,
      count: [...ym.values()].reduce((a, b) => a + b, 0),
      months: [...ym.entries()]
        .sort(([a], [b]) => b - a)
        .map(([month, count]) => ({
          month,
          label: new Date(year, month - 1).toLocaleString("default", {
            month: "long"
          }),
          count
        }))
    }));
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
