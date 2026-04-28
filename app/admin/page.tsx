"use server";

import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";
import { getAllPosts } from "@/lib/posts";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const authenticated = session?.value === process.env.ADMIN_SECRET;

  if (!authenticated) {
    return <AdminLogin />;
  }

  const rows = await db.select().from(subscribers);
  const posts = getAllPosts();

  return <AdminDashboard subscribers={rows} posts={posts} />;
}
