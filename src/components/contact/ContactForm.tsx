"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  locale: Locale;
  defaultService?: string;
  showSidebar?: boolean;
};

export function ContactForm({ locale, defaultService, showSidebar = true }: ContactFormProps) {
  const t = useTranslations("contact.form");
  const tInfo = useTranslations("contact.info");
  const tSidebar = useTranslations("contact.sidebar");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      locale,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="liquid-glass-panel p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 liquid-glow-teal">
          <CheckCircle2 size={32} className="text-white" />
        </div>
        <p className="relative z-10 mt-6 text-xl font-bold text-primary">{t("success")}</p>
      </div>
    );
  }

  return (
    <div className="liquid-glass-panel overflow-hidden">
      <div className={cn("relative z-10 grid", showSidebar ? "lg:grid-cols-5" : "")}>
        {showSidebar && (
          <div className="border-b border-white/40 p-8 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-10">
            <BrandLogo width={104} />
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-primary">{tSidebar("title")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{tSidebar("text")}</p>
            <div className="mt-8 space-y-4">
              <InfoRow
                icon={<Mail size={16} />}
                label={tInfo("email")}
                value={tInfo("emailValue")}
                href={`mailto:${tInfo("emailValue")}`}
              />
              <InfoRow
                icon={<Phone size={16} />}
                label={tInfo("phone")}
                value={tInfo("phonePrimary")}
                href="tel:+37460780078"
              />
              <InfoRow
                icon={<MessageCircle size={16} />}
                label={tInfo("whatsapp")}
                value={`${tInfo("phoneSecondary")} · ${tInfo("whatsapp")}`}
                href="https://wa.me/37433780078"
              />
              <InfoRow
                icon={<MapPin size={16} />}
                label={tInfo("officeArmenia")}
                value={tInfo("addressArmenia")}
              />
              <InfoRow
                icon={<MapPin size={16} />}
                label={tInfo("officeNetherlands")}
                value={tInfo("addressNetherlands")}
              />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className={cn("space-y-4 p-8", showSidebar ? "lg:col-span-3 lg:p-10" : "")}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t("name")} name="name" required />
            <Field label={t("phone")} name="phone" type="tel" required />
          </div>
          <Field label={t("email")} name="email" type="email" required />
          <div>
            <label htmlFor="service" className="mb-2 block text-sm font-semibold text-primary">{t("service")}</label>
            <select id="service" name="service" defaultValue={defaultService || ""} className="liquid-input w-full px-5 py-3.5 text-sm text-primary">
              <option value="">{t("selectService")}</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>{s.title[locale]}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-primary">{t("message")}</label>
            <textarea id="message" name="message" rows={4} className="liquid-input w-full resize-none rounded-[1.25rem] px-5 py-3.5 text-sm" />
          </div>
          {status === "error" && <p className="text-sm font-medium text-red-600">{t("error")}</p>}
          <Button type="submit" disabled={status === "loading"} className="w-full md:w-auto">
            {status === "loading" ? <><Loader2 size={16} className="animate-spin" />...</> : t("submit")}
          </Button>
        </form>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="liquid-glass-pill flex gap-3 px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted">{label}</p>
        {href ? (
          <a href={href} className="text-sm font-bold text-primary transition-colors hover:text-cta">
            {value}
          </a>
        ) : (
          <p className="text-sm font-bold leading-snug text-primary">{value}</p>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-primary">{label}</label>
      <input id={name} name={name} type={type} required={required} className="liquid-input w-full px-5 py-3.5 text-sm text-primary" />
    </div>
  );
}
