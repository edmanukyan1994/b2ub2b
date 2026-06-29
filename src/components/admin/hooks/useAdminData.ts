"use client";

import { useCallback, useState } from "react";
import type { CmsSection, CmsStore } from "@/lib/cms/types";
import type { Locale } from "@/i18n/routing";

export function useAdminData(authed: boolean) {
  const [store, setStore] = useState<CmsStore | null>(null);
  const [messages, setMessages] = useState<Partial<Record<Locale, Record<string, unknown>>>>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2200);
  }, []);

  const loadStore = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/store");
      if (!res.ok) throw new Error();
      setStore(await res.json());
    } catch {
      showToast("Не удалось загрузить контент", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const saveSection = useCallback(
    async (section: CmsSection, data: CmsStore[CmsSection]) => {
      const res = await fetch("/api/admin/store", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data }),
      });
      if (!res.ok) throw new Error();
      const next = await fetch("/api/admin/store").then((r) => r.json());
      setStore(next);
    },
    [],
  );

  const loadAllMessages = useCallback(async () => {
    const locales: Locale[] = ["en", "ru", "hy", "it"];
    const entries = await Promise.all(
      locales.map(async (locale) => {
        const res = await fetch(`/api/admin/messages/${locale}`);
        return [locale, await res.json()] as const;
      }),
    );
    setMessages(Object.fromEntries(entries));
  }, []);

  const saveAllMessages = useCallback(async (data: Record<Locale, Record<string, unknown>>) => {
    await Promise.all(
      (["en", "ru", "hy", "it"] as Locale[]).map((locale) =>
        fetch(`/api/admin/messages/${locale}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data[locale]),
        }),
      ),
    );
    setMessages(data);
  }, []);

  const init = useCallback(async () => {
    if (!authed) return;
    await Promise.all([loadStore(), loadAllMessages()]);
  }, [authed, loadStore, loadAllMessages]);

  return {
    store,
    setStore,
    messages,
    setMessages,
    loading,
    toast,
    showToast,
    loadStore,
    saveSection,
    loadAllMessages,
    saveAllMessages,
    init,
  };
}
