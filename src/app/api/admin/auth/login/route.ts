import { NextRequest, NextResponse } from "next/server";
import { createAdminSession, verifyAdminCredentials } from "@/lib/cms/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "");

  if (!verifyAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid login or password" }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
