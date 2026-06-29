"use client";

import { useCallback, useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import type { MapMarkerCategory } from "@/lib/map-markers";
import type { CmsSection, CmsStore } from "@/lib/cms/types";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { localeFlag } from "@/lib/admin/utils";
import { useAdminData } from "@/components/admin/hooks/useAdminData";
import {
  IosApp,
  IosButton,
  IosGroup,
  IosNavBar,
  IosRow,
  IosSegmented,
  IosToast,
} from "@/components/admin/ios/ui";
import {
  CONTENT_MENU,
  ContentItemEditor,
  createItem,
  getItemTitle,
} from "@/components/admin/screens/ContentScreens";
import { MESSAGE_SECTIONS, MessagesSectionEditor } from "@/components/admin/screens/MessagesScreens";

type Route =
  | { screen: "home" }
  | { screen: "content"; section: CmsSection }
  | { screen: "edit"; section: CmsSection; index: number }
  | { screen: "messages" }
  | { screen: "messages-section"; sectionId: string };

export function AdminShell() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [route, setRoute] = useState<Route>({ screen: "home" });
  const [draft, setDraft] = useState<unknown>(null);
  const [draftMarker, setDraftMarker] = useState<MapMarkerCategory | null>(null);
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [msgLocale, setMsgLocale] = useState<Locale>("ru");
  const [saving, setSaving] = useState(false);

  const {
    store,
    setStore,
    messages,
    setMessages,
    loading,
    toast,
    showToast,
    saveSection,
    saveAllMessages,
    init,
  } = useAdminData(authed === true);

  useEffect(() => {
    fetch("/api/admin/auth/check")
      .then((r) => r.json())
      .then((d) => setAuthed(Boolean(d.authed)));
  }, []);

  useEffect(() => {
    if (authed) void init();
  }, [authed, init]);

  useEffect(() => {
    if (route.screen === "edit" && store) {
      const list = store[route.section] as unknown[];
      const item = structuredClone(list[route.index]);
      setDraft(item);
      if (route.section === "mapProjects" && item && typeof item === "object") {
        const id = (item as { id: string }).id;
        setEditProjectId(id);
        setDraftMarker((store.mapMarkerByProject[id] ?? "digital") as MapMarkerCategory);
      } else {
        setEditProjectId(null);
        setDraftMarker(null);
      }
    }
  }, [route, store]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      setLoginError("Неверный логин или пароль");
      return;
    }
    setAuthed(true);
    setUsername("");
    setPassword("");
  }

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    setAuthed(false);
    setRoute({ screen: "home" });
  }

  const goBack = useCallback(() => {
    setRoute((r) => {
      if (r.screen === "edit") return { screen: "content", section: r.section };
      if (r.screen === "messages-section") return { screen: "messages" };
      if (r.screen === "content" || r.screen === "messages") return { screen: "home" };
      return { screen: "home" };
    });
  }, []);

  async function handleSaveEdit() {
    if (!store || route.screen !== "edit" || draft === null) return;
    setSaving(true);
    try {
      const list = [...(store[route.section] as unknown[])];
      list[route.index] = draft;
      await saveSection(route.section, list as CmsStore[typeof route.section]);
      if (route.section === "mapProjects" && draftMarker && draft && typeof draft === "object") {
        const newId = (draft as { id: string }).id;
        const markers = { ...store.mapMarkerByProject };
        if (editProjectId && editProjectId !== newId) delete markers[editProjectId];
        markers[newId] = draftMarker;
        await saveSection("mapMarkerByProject", markers);
      }
      showToast("Сохранено", "success");
      setRoute({ screen: "content", section: route.section });
    } catch {
      showToast("Ошибка сохранения", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveMessages() {
    if (!messages.en || !messages.ru || !messages.hy || !messages.it) return;
    setSaving(true);
    try {
      await saveAllMessages(messages as Record<Locale, Record<string, unknown>>);
      showToast("Тексты сохранены", "success");
    } catch {
      showToast("Ошибка сохранения", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!store || route.screen !== "edit") return;
    if (!confirm("Удалить этот элемент?")) return;
    const list = (store[route.section] as unknown[]).filter((_, i) => i !== route.index);
    await saveSection(route.section, list as CmsStore[typeof route.section]);
    showToast("Удалено", "success");
    setRoute({ screen: "content", section: route.section });
  }

  async function handleAdd(section: CmsSection) {
    if (!store) return;
    const list = [...(store[section] as unknown[]), createItem(section)];
    await saveSection(section, list as CmsStore[typeof section]);
    setRoute({ screen: "content", section });
    showToast("Добавлено", "success");
  }

  if (authed === null) {
    return (
      <IosApp>
        <div className="flex min-h-screen items-center justify-center text-[#8E8E93]">Загрузка…</div>
      </IosApp>
    );
  }

  if (!authed) {
    return (
      <IosApp>
        <div className="flex min-h-[100dvh] flex-col justify-center px-6">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#007AFF] text-2xl font-bold text-white">
              B2
            </div>
            <h1 className="text-[28px] font-bold">B2U B2B</h1>
            <p className="mt-1 text-[15px] text-[#8E8E93]">Управление сайтом</p>
          </div>
          <form onSubmit={login} className="space-y-3">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Логин"
              autoComplete="username"
              className="w-full rounded-[12px] bg-white px-4 py-3.5 text-[17px] outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              autoComplete="current-password"
              className="w-full rounded-[12px] bg-white px-4 py-3.5 text-[17px] outline-none"
            />
            {loginError && <p className="text-center text-[15px] text-[#FF3B30]">{loginError}</p>}
            <IosButton type="submit">Войти</IosButton>
          </form>
        </div>
      </IosApp>
    );
  }

  const navTitle =
    route.screen === "home"
      ? "Управление"
      : route.screen === "content"
        ? CONTENT_MENU.find((c) => c.key === route.section)?.label ?? ""
        : route.screen === "edit"
          ? "Редактирование"
          : route.screen === "messages"
            ? "Тексты сайта"
            : MESSAGE_SECTIONS.find((s) => s.id === route.sectionId)?.label ?? "";

  return (
    <IosApp>
      {toast && <IosToast message={toast.message} type={toast.type} />}

      <IosNavBar
        title={navTitle}
        subtitle={loading ? "Загрузка…" : "B2U B2B CMS"}
        onBack={route.screen !== "home" ? goBack : undefined}
        action={
          route.screen === "edit"
            ? handleSaveEdit
            : route.screen === "messages-section"
              ? handleSaveMessages
              : undefined
        }
        actionLabel={saving ? "…" : "Готово"}
        actionDisabled={saving}
      />

      <main className="overflow-y-auto px-0 pb-24 pt-2" style={{ maxHeight: "calc(100dvh - 120px)" }}>
        {route.screen === "home" && (
          <>
            <IosGroup title="Контент">
              {CONTENT_MENU.map((item) => (
                <IosRow
                  key={item.key}
                  label={item.label}
                  value={store ? String((store[item.key] as unknown[])?.length ?? 0) : "…"}
                  onClick={() => setRoute({ screen: "content", section: item.key })}
                />
              ))}
            </IosGroup>
            <IosGroup title="Интерфейс">
              <IosRow
                label="Тексты сайта"
                value="4 языка"
                onClick={() => setRoute({ screen: "messages" })}
              />
            </IosGroup>
            <div className="mx-4 mt-2">
              <IosButton variant="destructive" onClick={logout}>
                <span className="flex items-center justify-center gap-2">
                  <LogOut size={18} /> Выйти
                </span>
              </IosButton>
            </div>
          </>
        )}

        {route.screen === "content" && store && (
          <>
            <IosGroup>
              {(store[route.section] as unknown[]).map((item, index) => (
                <IosRow
                  key={index}
                  label={getItemTitle(route.section, item)}
                  onClick={() => setRoute({ screen: "edit", section: route.section, index })}
                />
              ))}
            </IosGroup>
            <div className="mx-4 mt-4">
              <IosButton onClick={() => handleAdd(route.section)}>+ Добавить</IosButton>
            </div>
          </>
        )}

        {route.screen === "edit" && store && draft !== null && (
          <>
            <ContentItemEditor
              section={route.section}
              item={draft}
              store={store}
              onChange={setDraft}
              marker={draftMarker ?? undefined}
              onMarkerChange={setDraftMarker}
            />
            <div className="mx-4 mt-6 mb-8">
              <IosButton variant="destructive" onClick={handleDelete}>
                Удалить
              </IosButton>
            </div>
          </>
        )}

        {route.screen === "messages" && (
          <IosGroup title="Разделы">
            {MESSAGE_SECTIONS.map((section) => (
              <IosRow
                key={section.id}
                label={section.label}
                value={`${section.fields.length} полей`}
                onClick={() => setRoute({ screen: "messages-section", sectionId: section.id })}
              />
            ))}
          </IosGroup>
        )}

        {route.screen === "messages-section" && messages.ru && (
          <>
            <IosSegmented
              options={locales.map((l) => ({ value: l, label: `${localeFlag(l)} ${localeNames[l]}` }))}
              value={msgLocale}
              onChange={setMsgLocale}
            />
            <MessagesSectionEditor
              messages={messages as Record<Locale, Record<string, unknown>>}
              sectionId={route.sectionId}
              locale={msgLocale}
              onChange={setMessages}
            />
          </>
        )}
      </main>
    </IosApp>
  );
}
