import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/posts";

export default function BlogHero({ post }: { post: Post }) {
  return (
    <section className="py-10 mb-0">
      {/* Section label with decorative line */}
      <p className="flex items-center gap-3 text-[0.75rem] tracking-[0.25em] uppercase text-ink-warm italic mb-5 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-[rgba(180,140,80,0.4)] after:to-transparent">
        Featured
      </p>

      <div className="border border-[rgba(180,140,80,0.15)] p-10 bg-[rgba(255,255,255,0.02)] animate-[fadeUp_0.6s_ease_both]">
        {post.imageSrc && (
          <img
            src={post.imageSrc}
            alt=""
            className="w-full h-[17.5rem] object-cover mb-6 border border-[rgba(180,140,80,0.12)]"
          />
        )}

        <p className="text-[0.75rem] tracking-[0.18em] uppercase text-ink-warm italic mb-3">
          {post.category}
        </p>

        <Link href={`/blog/${post.slug}`} className="group">
          <h1 className="[font-family:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] font-bold text-ink-text leading-[1.1] mb-4 group-hover:text-ink-warm transition-colors">
            {post.title}
          </h1>
        </Link>

        <p className="text-base italic text-ink-warm leading-[1.85] max-w-[600px] mb-6">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-6">
          <Link
            href={`/blog/${post.slug}`}
            className="text-[0.75rem] tracking-[0.16em] uppercase text-ink-warm hover:text-ink-text transition-colors"
          >
            Continue reading →
          </Link>
          <span className="text-[0.75rem] text-ink-muted">
            {formatDate(post.date)} · {post.readTime}
          </span>
        </div>
      </div>
    </section>
  );
}
