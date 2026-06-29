import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { assertAdminAuth, isAdminAuthenticated } from "@/lib/cms/auth";
import { readCmsMessages, writeCmsMessages } from "@/lib/cms/store";
import { locales, type Locale } from "@/i18n/routing";

type Params = { params: Promise<{ locale: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  assertAdminAuth(await isAdminAuthenticated());
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }
  const messages = await readCmsMessages(locale as Locale);
  return NextResponse.json(messages);
}

export async function PUT(request: NextRequest, { params }: Params) {
  assertAdminAuth(await isAdminAuthenticated());
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }
  const messages = await request.json();
  await writeCmsMessages(locale as Locale, messages);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
