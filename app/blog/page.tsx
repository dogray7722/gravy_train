import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import BlogLayout from "@/app/components/blog/BlogLayout";

export const metadata: Metadata = {
  title: "Blog | The Gravy Train",
  description: "Essays, travel notes, videos, and random dispatches.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogLayout posts={posts} />;
}
