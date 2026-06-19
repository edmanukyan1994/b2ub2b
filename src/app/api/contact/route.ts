import { NextRequest, NextResponse } from "next/server";
import { sendTelegramLead } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message, locale } = body;

    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const referer = request.headers.get("referer") ?? undefined;
    const result = await sendTelegramLead({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      service: service ? String(service).trim() : undefined,
      message: message ? String(message).trim() : undefined,
      locale: locale ? String(locale).trim() : undefined,
      pageUrl: referer,
    });

    if (!result.sent) {
      console.log("[Contact Form fallback]", { name, phone, email, service, message, locale });
    }

    return NextResponse.json({ ok: true, delivered: result.sent });
  } catch (error) {
    console.error("[Contact Form]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
