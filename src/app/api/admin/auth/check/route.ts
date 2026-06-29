import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";

export async function GET() {
  return NextResponse.json({ authed: await isAdminAuthenticated() });
}
