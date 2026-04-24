import type { Post } from "@/lib/types";
import BlogPostCard from "./BlogPostCard";

interface Props {
  posts: Post[];
  label: string;
}

export default function BlogPostGrid({ posts, label }: Props) {
  return (
    <section className="pb-12 pt-10">
      {/* Section label with decorative line */}
      <p className="flex items-center gap-3 text-[0.75rem] tracking-[0.25em] uppercase text-ink-warm italic mb-6 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-(--ink-decor-line) after:to-transparent">
        {label}
      </p>

      {posts.length === 0 ? (
        <p className="italic text-ink-warm text-center py-12">
          No posts found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-(--ink-grid-gap)">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className="animate-[fadeUp_0.5s_ease_both]"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <BlogPostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
