import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { assertAdminAuth, isAdminAuthenticated } from "@/lib/cms/auth";
import { readCmsStore, writeCmsStore } from "@/lib/cms/store";
import type { CmsSection, CmsStore } from "@/lib/cms/types";

export async function GET() {
  assertAdminAuth(await isAdminAuthenticated());
  const store = await readCmsStore();
  return NextResponse.json(store);
}

export async function PUT(request: NextRequest) {
  assertAdminAuth(await isAdminAuthenticated());
  const body = await request.json();

  if (body.section && body.data !== undefined) {
    const section = body.section as CmsSection;
    const store = await readCmsStore();
    (store as Record<string, unknown>)[section] = body.data;
    await writeCmsStore(store);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, section });
  }

  if (body.store) {
    await writeCmsStore(body.store as CmsStore);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
}
