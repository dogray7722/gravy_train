import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/unsubscribed?status=invalid", req.url));
  }

  const subscriber = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.unsubscribeToken, token))
    .get();

  if (!subscriber) {
    return NextResponse.redirect(new URL("/unsubscribed?status=invalid", req.url));
  }

  await db
    .update(subscribers)
    .set({ active: false })
    .where(eq(subscribers.unsubscribeToken, token));

  return NextResponse.redirect(new URL("/unsubscribed", req.url));
}
