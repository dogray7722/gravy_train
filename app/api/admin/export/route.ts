import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== process.env.ADMIN_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const db = getDb();
  const rows = await db.select().from(subscribers);

  const lines = [
    "id,email,subscribed_at,active",
    ...rows.map(
      (r) => `${r.id},${r.email},${r.subscribedAt},${r.active}`
    ),
  ];

  const today = new Date().toISOString().slice(0, 10);
  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="subscribers-${today}.csv"`,
    },
  });
}
