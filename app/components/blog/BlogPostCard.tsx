import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/posts";

export default function BlogPostCard({ post }: { post: Post }) {
  return (
    <article className="bg-ink-bg p-7 hover:bg-ink-surface transition-colors h-full group">
      {post.type === "image" && post.imageSrc && (
        <img
          src={post.imageSrc}
          alt=""
          loading="lazy"
          className="w-full aspect-video object-cover mb-4 border border-(--ink-border-soft)"
        />
      )}
      {post.type === "video" && post.videoId && (
        <iframe
          src={`https://www.youtube.com/embed/${post.videoId}`}
          title={post.title}
          allowFullScreen
          className="w-full aspect-video mb-4"
        />
      )}

      <p className="text-[0.75rem] tracking-[0.18em] uppercase text-ink-warm italic mb-2">
        {post.category}
      </p>

      <Link href={`/blog/${post.slug}`}>
        <h2 className="[font-family:var(--font-playfair)] text-[1.15rem] font-bold text-ink-text leading-tight mb-2 group-hover:text-ink-warm transition-colors">
          {post.title}
        </h2>
      </Link>

      <p className="text-[0.875rem] text-ink-warm leading-[1.75] mb-3">
        {post.excerpt}
      </p>

      <p className="text-[0.75rem] text-ink-muted tracking-[0.06em]">
        {formatDate(post.date)} · {post.readTime}
      </p>
    </article>
  );
}
