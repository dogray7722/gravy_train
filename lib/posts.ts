import type { Post, CategoryFilter, ArchiveYear } from "./types";

export const POSTS: Post[] = [
  {
    id: 7,
    slug: "five-days-on-the-amalfi-coast",
    category: "travel",
    title: "Five Days on the Amalfi Coast",
    date: "2026-04-20",
    readTime: "6 min read",
    excerpt:
      "Nobody tells you about the stairs. You read 'perched on a cliff' and you imagine the view.",
    imageSrc:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80"
  },
  {
    id: 1,
    slug: "lost-somewhere-between-lisbon-and-porto",
    category: "travel",
    title: "Lost Somewhere Between Lisbon and Porto",
    date: "2026-03-18",
    readTime: "7 min read",
    excerpt:
      "A train ride, a wrong stop, and the best meal I never planned for.",
    type: "image",
    featured: true,
    imageSrc:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80"
  },
  {
    id: 2,
    slug: "why-i-deleted-everything",
    category: "thoughts",
    title: "Why I Deleted Everything",
    date: "2026-03-05",
    readTime: "5 min read",
    excerpt:
      "Social media had me performing a version of myself I no longer recognized.",
    type: "text"
  },
  {
    id: 3,
    slug: "making-bolognese-at-midnight",
    category: "thoughts",
    title: "Making Bolognese at Midnight",
    date: "2026-02-22",
    readTime: "4 min read",
    excerpt:
      "No recipe. No plan. Just a bottle of red and whatever's in the fridge.",
    type: "image",
    imageSrc:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=80"
  },
  {
    id: 4,
    slug: "bear-creek-trail",
    category: "travel",
    title: "Traversing the Bear Creek Trail",
    date: "2026-02-10",
    readTime: "8 min read",
    excerpt: "A ride along the bear creek trail.",
    type: "video",
    videoId: "Y50pwVVMbLk "
  },
  {
    id: 5,
    slug: "the-gravy-train-episode-one",
    category: "video",
    title: "The Gravy Train — Episode One",
    date: "2026-01-30",
    readTime: "22 min",
    excerpt:
      "First episode. A conversation about leaving things behind and building something new.",
    type: "video",
    videoId: "ylXk1LBvIqU"
  },
  {
    id: 6,
    slug: "a-note-on-slowness",
    category: "thoughts",
    title: "A Note on Slowness",
    date: "2026-01-15",
    readTime: "3 min read",
    excerpt:
      "Moving fast is a personality trait we've collectively mistaken for a virtue.",
    type: "text"
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
