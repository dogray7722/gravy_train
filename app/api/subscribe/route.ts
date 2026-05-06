import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email: unknown = body?.email;

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const normalized = email.toLowerCase().trim();
  const db = getDb();

  const existing = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.email, normalized))
    .get();

  if (existing?.active) {
    return NextResponse.json({ success: true, message: "already_subscribed" });
  }

  const token = crypto.randomUUID();
  const now = new Date().toISOString();

  if (existing && !existing.active) {
    await db
      .update(subscribers)
      .set({ active: true, subscribedAt: now, unsubscribeToken: token })
      .where(eq(subscribers.email, normalized));
  } else {
    await db.insert(subscribers).values({
      email: normalized,
      subscribedAt: now,
      unsubscribeToken: token,
      active: true,
    });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${token}`;

  let emailError: string | null = null;
  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: normalized,
      subject: "You're on the Gravy Train",
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2c2620;padding:2rem">
          <h2 style="font-family:Georgia,serif;font-size:1.5rem;font-weight:700;margin-bottom:0.5rem">
            Welcome aboard.
          </h2>
          <p style="font-size:1rem;line-height:1.7;color:#4a3f30">
            You're now subscribed to the Gravy Train. I'll drop you a note whenever
            something new goes up — no spam, no cadence, just new posts.
          </p>
          <hr style="border:none;border-top:1px solid rgba(180,140,80,0.3);margin:1.5rem 0"/>
          <p style="font-size:0.8rem;color:#a08a68">
            Changed your mind?
            <a href="${unsubscribeUrl}" style="color:#a08a68">Unsubscribe here.</a>
          </p>
        </div>
      `,
    });
    if (result.error) {
      emailError = result.error.message;
      console.error("[subscribe] Resend error:", result.error);
    }
  } catch (err) {
    emailError = err instanceof Error ? err.message : "Unknown email error";
    console.error("[subscribe] Resend threw:", emailError);
  }

  return NextResponse.json({ success: true, emailSent: !emailError, emailError });
}
