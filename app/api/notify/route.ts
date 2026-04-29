import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { getPostBySlug } from "@/lib/posts";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const postSlug: unknown = body?.postSlug;

  if (typeof postSlug !== "string" || !postSlug) {
    return NextResponse.json({ error: "postSlug required." }, { status: 400 });
  }

  const post = getPostBySlug(postSlug);
  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  const db = getDb();
  const activeSubscribers = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.active, true));

  if (activeSubscribers.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  // Resend batch limit is 100 per call — chunk if needed
  const chunks: (typeof activeSubscribers)[] = [];
  for (let i = 0; i < activeSubscribers.length; i += 100) {
    chunks.push(activeSubscribers.slice(i, i + 100));
  }

  let totalSent = 0;
  for (const chunk of chunks) {
    const messages = chunk.map((sub) => {
      const unsubUrl = `${siteUrl}/api/unsubscribe?token=${sub.unsubscribeToken}`;
      return {
        from: fromEmail,
        to: sub.email,
        subject: `New post: ${post.title}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2c2620;padding:2rem">
            <h2 style="font-family:Georgia,serif;font-size:1.4rem;font-weight:700;margin-bottom:0.5rem">
              ${post.title}
            </h2>
            <p style="font-size:1rem;line-height:1.7;color:#4a3f30">
              ${post.excerpt}
            </p>
            <a href="${postUrl}"
               style="display:inline-block;margin-top:1rem;padding:0.7rem 1.4rem;background:#c9a96e;color:#2c2620;font-family:Georgia,serif;font-size:0.85rem;font-weight:700;letter-spacing:0.12em;text-decoration:none;text-transform:uppercase">
              Read Now
            </a>
            <hr style="border:none;border-top:1px solid rgba(180,140,80,0.3);margin:1.5rem 0"/>
            <p style="font-size:0.8rem;color:#a08a68">
              You're receiving this because you subscribed to the Gravy Train.
              <a href="${unsubUrl}" style="color:#a08a68">Unsubscribe.</a>
            </p>
          </div>
        `,
      };
    });

    await resend.batch.send(messages);
    totalSent += chunk.length;
  }

  return NextResponse.json({ sent: totalSent });
}
