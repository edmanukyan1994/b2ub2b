"use client";

import { useState } from "react";
import { blogPosts, partners, testimonials } from "@/content/site-data";
import { services } from "@/content/services";
import { portfolioProjects } from "@/content/portfolio";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "b2ub2b") {
      setAuthed(true);
    }
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-accent-light p-6">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-border bg-white p-8">
          <h1 className="text-xl font-semibold">B2U B2B Admin</h1>
          <p className="mt-2 text-sm text-muted">Content management panel</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-6 w-full rounded-xl border border-border px-4 py-3 text-sm"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-foreground py-3 text-sm font-medium text-background"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  const stats = [
    { label: "Services", count: services.length },
    { label: "Portfolio", count: portfolioProjects.length },
    { label: "Blog posts", count: blogPosts.length },
    { label: "Partners", count: partners.length },
    { label: "Testimonials", count: testimonials.length },
  ];

  return (
    <div className="min-h-screen bg-accent-light p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold">Admin Panel</h1>
        <p className="mt-2 text-muted">
          Content is managed in <code className="rounded bg-white px-1.5 py-0.5 text-sm">src/content/</code> files.
          Full CMS integration (Sanity/Payload) can be added in phase 2.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-white p-6">
              <p className="text-3xl font-semibold">{s.count}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-white p-8">
          <h2 className="text-lg font-semibold">How to edit content</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>• Services → <code>src/content/services.ts</code></li>
            <li>• Portfolio → <code>src/content/portfolio.ts</code></li>
            <li>• Blog, partners, map → <code>src/content/site-data.ts</code></li>
            <li>• UI translations → <code>messages/*.json</code></li>
            <li>• Logo → replace <code>public/logo.png</code></li>
          </ul>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-white p-8">
          <h2 className="text-lg font-semibold">Environment variables</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>• TELEGRAM_BOT_TOKEN — for contact form notifications</li>
            <li>• TELEGRAM_CHAT_ID — Telegram chat for leads</li>
            <li>• ADMIN_PASSWORD — admin panel password (server-side in v2)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
