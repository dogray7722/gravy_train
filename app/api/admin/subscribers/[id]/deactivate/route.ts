import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== process.env.ADMIN_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }

  await db
    .update(subscribers)
    .set({ active: false })
    .where(eq(subscribers.id, numericId));

  return NextResponse.json({ success: true });
}
