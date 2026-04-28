import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const password: unknown = body?.password;

  if (typeof password !== "string" || password !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", process.env.ADMIN_SECRET!, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.json({ success: true });
}
