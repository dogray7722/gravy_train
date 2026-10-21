import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== process.env.ADMIN_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const db = getDb();
  const result = await db
    .delete(subscribers)
    .where(eq(subscribers.active, false));

  return NextResponse.json({ success: true, purged: result.rowsAffected });
}
