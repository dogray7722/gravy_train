import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import PostDetail from "@/app/components/blog/PostDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | The Gravy Train`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { default: PostContent } = await import(
    `@/content/posts/${slug}.mdx`
  );

  return (
    <div
      className="min-h-screen bg-ink-bg text-ink-text [font-family:var(--font-lora)]"
      style={{ backgroundImage: "var(--ink-page-gradient)" }}
    >
      <PostDetail post={post} content={<PostContent />} />
    </div>
  );
}
