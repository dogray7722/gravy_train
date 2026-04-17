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
      style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 40% at 10% 90%, rgba(180,140,90,0.09) 0%, transparent 55%),
          radial-gradient(ellipse 50% 35% at 90% 10%, rgba(200,160,100,0.06) 0%, transparent 50%)
        `,
      }}
    >
      <PostDetail post={post} content={<PostContent />} />
    </div>
  );
}
