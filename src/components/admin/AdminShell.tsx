"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  Briefcase,
  Globe,
  Image,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
  Save,
  Star,
  Users,
} from "lucide-react";
import { CMS_SECTIONS, type CmsSection } from "@/lib/cms/types";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type View =
  | { type: "dashboard" }
  | { type: "store"; section: CmsSection }
  | { type: "messages"; locale: Locale };

const SECTION_ICONS: Partial<Record<CmsSection, React.ReactNode>> = {
  services: <Briefcase size={18} />,
  portfolioProjects: <LayoutDashboard size={18} />,
  clientLogos: <Image size={18} />,
  blogPosts: <BookOpen size={18} />,
  mapProjects: <MapPin size={18} />,
  partners: <Users size={18} />,
  testimonials: <Star size={18} />,
  mapMarkerByProject: <MapPin size={18} />,
};

export function AdminShell() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [view, setView] = useState<View>({ type: "dashboard" });
  const [store, setStore] = useState<Record<string, unknown> | null>(null);
  const [editorText, setEditorText] = useState("");
  const [messagesText, setMessagesText] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/admin/auth/check");
    const data = await res.json();
    setAuthed(Boolean(data.authed));
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authed) return;
    fetch("/api/admin/store")
      .then((r) => r.json())
      .then(setStore)
      .catch(() => setError("Failed to load content"));
  }, [authed]);

  useEffect(() => {
    if (view.type === "store" && store) {
      setEditorText(JSON.stringify(store[view.section], null, 2));
      setError("");
      setStatus("idle");
    }
  }, [view, store]);

  useEffect(() => {
    if (view.type !== "messages") return;
    fetch(`/api/admin/messages/${view.locale}`)
      .then((r) => r.json())
      .then((data) => {
        setMessagesText(JSON.stringify(data, null, 2));
        setError("");
        setStatus("idle");
      })
      .catch(() => setError("Failed to load messages"));
  }, [view]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setLoginError("Wrong password");
      return;
    }
    setAuthed(true);
    setPassword("");
  }

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    setAuthed(false);
    setStore(null);
  }

  async function saveStoreSection() {
    if (view.type !== "store") return;
    setStatus("saving");
    setError("");
    try {
      const data = JSON.parse(editorText);
      const res = await fetch("/api/admin/store", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: view.section, data }),
      });
      if (!res.ok) throw new Error("Save failed");
      const next = await fetch("/api/admin/store").then((r) => r.json());
      setStore(next);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (e) {
      setStatus("error");
      setError(e instanceof SyntaxError ? "Invalid JSON" : "Save failed");
    }
  }

  async function saveMessages() {
    if (view.type !== "messages") return;
    setStatus("saving");
    setError("");
    try {
      const data = JSON.parse(messagesText);
      const res = await fetch(`/api/admin/messages/${view.locale}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (e) {
      setStatus("error");
      setError(e instanceof SyntaxError ? "Invalid JSON" : "Save failed");
    }
  }

  if (authed === null) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-100 text-sm text-slate-500">Loading…</div>;
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">B2U B2B Admin</h1>
          <p className="mt-2 text-sm text-slate-500">Full content management</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
          />
          {loginError && <p className="mt-2 text-sm text-red-600">{loginError}</p>}
          <button type="submit" className="mt-4 w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white">
            Sign in
          </button>
        </form>
      </div>
    );
  }

  const counts = store
    ? {
        services: (store.services as unknown[])?.length ?? 0,
        portfolio: (store.portfolioProjects as unknown[])?.length ?? 0,
        blog: (store.blogPosts as unknown[])?.length ?? 0,
        map: (store.mapProjects as unknown[])?.length ?? 0,
      }
    : null;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5">
          <p className="font-bold text-slate-900">B2U B2B CMS</p>
          <p className="text-xs text-slate-500">All languages · all content</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          <NavBtn active={view.type === "dashboard"} onClick={() => setView({ type: "dashboard" })} icon={<LayoutDashboard size={18} />}>
            Dashboard
          </NavBtn>
          <p className="mb-2 mt-4 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Content</p>
          {CMS_SECTIONS.map((s) => (
            <NavBtn
              key={s.key}
              active={view.type === "store" && view.section === s.key}
              onClick={() => setView({ type: "store", section: s.key })}
              icon={SECTION_ICONS[s.key] ?? <Briefcase size={18} />}
            >
              {s.label}
            </NavBtn>
          ))}
          <p className="mb-2 mt-4 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">UI texts</p>
          {locales.map((locale) => (
            <NavBtn
              key={locale}
              active={view.type === "messages" && view.locale === locale}
              onClick={() => setView({ type: "messages", locale })}
              icon={<MessageSquare size={18} />}
            >
              {localeNames[locale]}
            </NavBtn>
          ))}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="m-3 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <LogOut size={16} /> Log out
        </button>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              {view.type === "dashboard" && "Dashboard"}
              {view.type === "store" && CMS_SECTIONS.find((s) => s.key === view.section)?.label}
              {view.type === "messages" && `UI texts — ${localeNames[view.locale]}`}
            </h1>
            <p className="text-sm text-slate-500">
              {view.type === "messages"
                ? "Navigation, hero, about, contact labels, footer — all strings for this language"
                : "Edit JSON. Each text field supports en, ru, hy, it."}
            </p>
          </div>
          {view.type !== "dashboard" && (
            <button
              type="button"
              onClick={view.type === "messages" ? saveMessages : saveStoreSection}
              disabled={status === "saving"}
              className="flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
            >
              <Save size={16} />
              {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save"}
            </button>
          )}
        </header>

        <div className="flex-1 overflow-auto p-6">
          {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          {view.type === "dashboard" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {counts &&
                [
                  { label: "Services", value: counts.services },
                  { label: "Portfolio", value: counts.portfolio },
                  { label: "Blog posts", value: counts.blog },
                  { label: "Map projects", value: counts.map },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6">
                    <p className="text-3xl font-bold text-slate-900">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                  </div>
                ))}
              <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="font-semibold text-slate-900">How it works</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• <strong>Content</strong> — services, portfolio, blog, map, partners, testimonials</li>
                  <li>• <strong>UI texts</strong> — all page labels, hero, about, contact form, footer per language</li>
                  <li>• Localized fields use <code className="rounded bg-slate-100 px-1">{"{ en, ru, hy, it }"}</code></li>
                  <li>• Changes apply immediately after Save (site revalidates)</li>
                  <li>• Set <code className="rounded bg-slate-100 px-1">ADMIN_PASSWORD</code> on Railway for production</li>
                </ul>
              </div>
            </div>
          )}

          {view.type === "store" && (
            <EditorHelp section={view.section} />
          )}

          {view.type === "store" && (
            <textarea
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              spellCheck={false}
              className="mt-4 h-[calc(100vh-220px)] w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs leading-relaxed text-slate-800 outline-none focus:border-sky-400"
            />
          )}

          {view.type === "messages" && (
            <textarea
              value={messagesText}
              onChange={(e) => setMessagesText(e.target.value)}
              spellCheck={false}
              className="h-[calc(100vh-180px)] w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs leading-relaxed text-slate-800 outline-none focus:border-sky-400"
            />
          )}
        </div>
      </main>
    </div>
  );
}

function NavBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "mb-0.5 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
        active ? "bg-sky-50 text-sky-700" : "text-slate-600 hover:bg-slate-50",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function EditorHelp({ section }: { section: CmsSection }) {
  const hints: Partial<Record<CmsSection, string>> = {
    services: "slug, icon (briefcase|blueprint|utensils|code|megaphone|users|globe), title/description/benefits/faq with en/ru/hy/it",
    portfolioProjects: "slug, client, category, tags, title, description, works[], results[], country, city, year, gradient, featured",
    mapProjects: "id, country, countryCode, lat, lng, title, type — all localized fields need 4 languages",
    mapMarkerByProject: 'Object: { "yerevan-hq": "hq", ... } — values: hq|horeca|digital|engineering|commerce',
    blogPosts: "slug, date (YYYY-MM-DD), readTime, title, excerpt, content",
  };
  if (!hints[section]) return null;
  return (
    <p className="rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-900">
      <Globe size={14} className="mr-1 inline" />
      {hints[section]}
    </p>
  );
}
