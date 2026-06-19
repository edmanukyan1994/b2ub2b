type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  service?: string;
  message?: string;
  locale?: string;
  pageUrl?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function getTelegramChatIds(): string[] {
  const raw = process.env.TELEGRAM_CHAT_IDS ?? process.env.TELEGRAM_CHAT_ID ?? "";
  return raw
    .split(/[\s,;]+/)
    .map((id) => id.trim())
    .filter(Boolean);
}

export function formatLeadMessage(lead: LeadPayload) {
  const lines = [
    "🆕 <b>Новая заявка B2U B2B</b>",
    "",
    `👤 <b>Имя:</b> ${escapeHtml(lead.name)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(lead.phone)}`,
    `✉️ <b>Email:</b> ${escapeHtml(lead.email)}`,
    `🧩 <b>Услуга:</b> ${escapeHtml(lead.service || "—")}`,
    `🌍 <b>Язык:</b> ${escapeHtml(lead.locale || "—")}`,
  ];

  if (lead.message) {
    lines.push("", `💬 <b>Сообщение:</b>`, escapeHtml(lead.message));
  }

  if (lead.pageUrl) {
    lines.push("", `🔗 ${escapeHtml(lead.pageUrl)}`);
  }

  return lines.join("\n");
}

export async function sendTelegramLead(lead: LeadPayload) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatIds = getTelegramChatIds();

  if (!botToken) {
    console.warn("[Telegram] TELEGRAM_BOT_TOKEN is not set");
    return { sent: false, reason: "missing_token" as const };
  }

  if (chatIds.length === 0) {
    console.warn("[Telegram] TELEGRAM_CHAT_IDS is empty");
    return { sent: false, reason: "missing_chats" as const };
  }

  const text = formatLeadMessage(lead);
  const results = await Promise.allSettled(
    chatIds.map(async (chatId) => {
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Chat ${chatId}: ${body}`);
      }
    }),
  );

  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length === results.length) {
    console.error("[Telegram] All deliveries failed:", failed);
    return { sent: false, reason: "delivery_failed" as const };
  }

  if (failed.length > 0) {
    console.warn("[Telegram] Partial delivery failure:", failed);
  }

  return { sent: true, delivered: results.length - failed.length, total: results.length };
}
