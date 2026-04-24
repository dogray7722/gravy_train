import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/posts";
import ThemeToggle from "./ThemeToggle";

interface Props {
  post: Post;
  content: React.ReactNode;
}

export default function PostDetail({ post, content }: Props) {
  return (
    <main id="main-content" className="max-w-[65ch] mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="text-[0.75rem] tracking-[0.16em] uppercase text-ink-warm hover:text-ink-text transition-colors"
      >
        ← Back to Blog
      </Link>

      {/* Category */}
      <p className="text-[0.75rem] tracking-[0.18em] uppercase text-ink-warm italic mt-8 mb-3">
        {post.category}
      </p>

      {/* Title */}
      <h1 className="[font-family:var(--font-playfair)] text-[clamp(2rem,5vw,3.5rem)] font-bold text-ink-text leading-[1.1] mb-4">
        {post.title}
      </h1>

      {/* Meta */}
      <p className="text-[0.75rem] text-ink-muted tracking-[0.06em] mb-8 pb-8 border-b border-(--ink-border-mid)">
        {formatDate(post.date)} · {post.readTime}
      </p>

      {/* Hero media */}
      {post.type === "image" && post.imageSrc && (
        <img
          src={post.imageSrc}
          alt=""
          className="w-full mb-10 border border-(--ink-border-soft)"
        />
      )}
      {post.type === "video" && post.videoId && (
        <div className="w-full aspect-video mb-10">
          <iframe
            src={`https://www.youtube.com/embed/${post.videoId}`}
            title={post.title}
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}

      {/* MDX prose content */}
      <div className="[font-family:var(--font-lora)] text-ink-text leading-[1.9] text-[1.0625rem]">
        {content}
      </div>
    </main>
  );
}
