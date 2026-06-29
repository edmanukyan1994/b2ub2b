"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  Briefcase,
  FileText,
  Image,
  LayoutGrid,
  LogOut,
  MapPin,
  Plus,
  Save,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import type { MapMarkerCategory } from "@/lib/map-markers";
import type { CmsSection, CmsStore } from "@/lib/cms/types";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { localeFlag, getSectionList } from "@/lib/admin/utils";
import { useAdminData } from "@/components/admin/hooks/useAdminData";
import {
  AdminButton,
  AdminCard,
  AdminEmpty,
  AdminLayout,
  AdminListItem,
  AdminTabs,
  AdminToast,
} from "@/components/admin/ui";
import {
  CONTENT_MENU,
  ContentItemEditor,
  createItem,
  getItemTitle,
} from "@/components/admin/screens/ContentScreens";
import { MESSAGE_SECTIONS, MessagesSectionEditor } from "@/components/admin/screens/MessagesScreens";

type Panel = { kind: "content"; section: CmsSection } | { kind: "messages"; sectionId: string };

const SECTION_ICONS: Partial<Record<CmsSection, React.ReactNode>> = {
  services: <Briefcase size={16} />,
  portfolioProjects: <LayoutGrid size={16} />,
  blogPosts: <BookOpen size={16} />,
  mapProjects: <MapPin size={16} />,
  partners: <Users size={16} />,
  testimonials: <Star size={16} />,
  clientLogos: <Image size={16} />,
  mapMarkerByProject: <MapPin size={16} />,
};

export function AdminShell() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [panel, setPanel] = useState<Panel>({ kind: "content", section: "services" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draft, setDraft] = useState<unknown>(null);
  const [draftMarker, setDraftMarker] = useState<MapMarkerCategory | null>(null);
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [msgLocale, setMsgLocale] = useState<Locale>("ru");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [messagesReady, setMessagesReady] = useState(false);

  const { store, messages, setMessages, loading, toast, showToast, saveSection, saveAllMessages, init } =
    useAdminData(authed === true);

  useEffect(() => {
    fetch("/api/admin/auth/check")
      .then((r) => r.json())
      .then((d) => setAuthed(Boolean(d.authed)));
  }, []);

  useEffect(() => {
    if (authed) {
      setMessagesReady(false);
      void init().finally(() => setMessagesReady(true));
    }
  }, [authed, init]);

  const loadDraft = useCallback(
    (section: CmsSection, index: number) => {
      if (!store) return;
      const list = getSectionList(store, section);
      if (!list[index]) return;
      const item = structuredClone(list[index]);
      setDraft(item);
      setDirty(false);
      if (section === "mapProjects" && item && typeof item === "object") {
        const id = (item as { id: string }).id;
        setEditProjectId(id);
        setDraftMarker((store.mapMarkerByProject[id] ?? "digital") as MapMarkerCategory);
      } else {
        setEditProjectId(null);
        setDraftMarker(null);
      }
    },
    [store],
  );

  useEffect(() => {
    if (panel.kind !== "content" || !store) return;
    const list = getSectionList(store, panel.section);
    if (list.length === 0) {
      setDraft(null);
      return;
    }
    const index = Math.min(selectedIndex, list.length - 1);
    if (index !== selectedIndex) setSelectedIndex(index);
    loadDraft(panel.section, index);
  }, [panel, store, selectedIndex, loadDraft]);

  const handleDraftChange = useCallback((item: unknown) => {
    setDraft(item);
    setDirty(true);
  }, []);

  const handleMarkerChange = useCallback((m: MapMarkerCategory) => {
    setDraftMarker(m);
    setDirty(true);
  }, []);

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
  }

  async function handleSaveContent() {
    if (!store || panel.kind !== "content" || draft === null) return;
    setSaving(true);
    try {
      const list = [...getSectionList(store, panel.section)];
      list[selectedIndex] = draft;
      await saveSection(panel.section, list as CmsStore[typeof panel.section]);
      if (panel.section === "mapProjects" && draftMarker && draft && typeof draft === "object") {
        const newId = (draft as { id: string }).id;
        const markers = { ...store.mapMarkerByProject };
        if (editProjectId && editProjectId !== newId) delete markers[editProjectId];
        markers[newId] = draftMarker;
        await saveSection("mapMarkerByProject", markers);
      }
      setDirty(false);
      showToast("Сохранено", "success");
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
      setDirty(false);
      showToast("Тексты сохранены", "success");
    } catch {
      showToast("Ошибка сохранения", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!store || panel.kind !== "content") return;
    if (!confirm("Удалить этот элемент?")) return;
    const list = getSectionList(store, panel.section).filter((_, i) => i !== selectedIndex);
    await saveSection(panel.section, list as CmsStore[typeof panel.section]);
    setSelectedIndex(Math.max(0, selectedIndex - 1));
    showToast("Удалено", "success");
  }

  async function handleAdd() {
    if (!store || panel.kind !== "content") return;
    const list = [...getSectionList(store, panel.section), createItem(panel.section)];
    await saveSection(panel.section, list as CmsStore[typeof panel.section]);
    setSelectedIndex(list.length - 1);
    showToast("Добавлено — заполните поля и сохраните", "success");
  }

  function selectContent(section: CmsSection) {
    setPanel({ kind: "content", section });
    setSelectedIndex(0);
  }

  function selectMessages(sectionId: string) {
    setPanel({ kind: "messages", sectionId });
    setDirty(false);
  }

  if (authed === null) {
    return (
      <AdminLayout>
        <div className="flex min-h-screen items-center justify-center text-slate-500">Загрузка…</div>
      </AdminLayout>
    );
  }

  if (!authed) {
    return (
      <AdminLayout>
        <div className="flex min-h-screen items-center justify-center p-6">
          <AdminCard className="w-full max-w-md p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-slate-900">B2U B2B</h1>
              <p className="mt-1 text-sm text-slate-500">Панель управления сайтом</p>
            </div>
            <form onSubmit={login} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Логин</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
              {loginError && <p className="text-center text-sm text-red-600">{loginError}</p>}
              <AdminButton type="submit" className="w-full">
                Войти
              </AdminButton>
            </form>
          </AdminCard>
        </div>
      </AdminLayout>
    );
  }

  const contentLabel = panel.kind === "content" ? CONTENT_MENU.find((c) => c.key === panel.section)?.label : null;
  const messageLabel =
    panel.kind === "messages" ? MESSAGE_SECTIONS.find((s) => s.id === panel.sectionId)?.label : null;

  return (
    <AdminLayout>
      {toast && <AdminToast message={toast.message} type={toast.type} />}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h1 className="text-lg font-bold text-slate-900">B2U B2B</h1>
            <p className="text-xs text-slate-500">Управление контентом</p>
          </div>

          <nav className="flex-1 overflow-y-auto p-3">
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Разделы сайта</p>
            <div className="space-y-0.5">
              {CONTENT_MENU.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => selectContent(item.key)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition ${
                    panel.kind === "content" && panel.section === item.key
                      ? "bg-sky-50 font-medium text-sky-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {SECTION_ICONS[item.key]}
                  <span className="flex-1">{item.label}</span>
                  {store && (
                    <span className="text-xs text-slate-400">
                      {getSectionList(store, item.key).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <p className="mb-2 mt-5 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Тексты</p>
            <div className="space-y-0.5">
              {MESSAGE_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => selectMessages(section.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition ${
                    panel.kind === "messages" && panel.sectionId === section.id
                      ? "bg-sky-50 font-medium text-sky-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <FileText size={16} />
                  {section.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="border-t border-slate-200 p-3">
            <AdminButton variant="ghost" onClick={logout} className="w-full justify-start">
              <LogOut size={16} /> Выйти
            </AdminButton>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {panel.kind === "content" ? contentLabel : messageLabel}
              </h2>
              <p className="text-sm text-slate-500">
                {loading
                  ? "Загрузка…"
                  : panel.kind === "content"
                    ? CONTENT_MENU.find((c) => c.key === panel.section)?.subtitle
                    : "Редактирование текстов на 4 языках"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {panel.kind === "content" && draft !== null && (
                <>
                  <AdminButton variant="danger" size="sm" onClick={handleDelete}>
                    <Trash2 size={15} /> Удалить
                  </AdminButton>
                  <AdminButton size="sm" onClick={handleSaveContent} disabled={saving || !dirty}>
                    <Save size={15} /> {saving ? "Сохранение…" : dirty ? "Сохранить" : "Сохранено"}
                  </AdminButton>
                </>
              )}
              {panel.kind === "messages" && (
                <AdminButton size="sm" onClick={handleSaveMessages} disabled={saving}>
                  <Save size={15} /> {saving ? "Сохранение…" : "Сохранить все языки"}
                </AdminButton>
              )}
            </div>
          </header>

          {panel.kind === "content" && !store && (
            <div className="flex flex-1 items-center justify-center">
              <AdminEmpty>{loading ? "Загрузка контента…" : "Не удалось загрузить данные"}</AdminEmpty>
            </div>
          )}

          {panel.kind === "content" && store && (
            <div className="flex min-h-0 flex-1">
              {/* List */}
              <div className="flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
                <div className="border-b border-slate-100 p-3">
                  <AdminButton variant="secondary" size="sm" onClick={handleAdd} className="w-full">
                    <Plus size={15} /> Добавить
                  </AdminButton>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {getSectionList(store, panel.section).length === 0 ? (
                    <AdminEmpty>Нет элементов. Нажмите «Добавить».</AdminEmpty>
                  ) : (
                    getSectionList(store, panel.section).map((item, index) => (
                      <AdminListItem
                        key={index}
                        title={getItemTitle(panel.section, item)}
                        subtitle={panel.section === "blogPosts" ? (item as { date?: string }).date : undefined}
                        active={index === selectedIndex}
                        onClick={() => {
                          if (dirty && !confirm("Есть несохранённые изменения. Перейти без сохранения?")) return;
                          setSelectedIndex(index);
                          loadDraft(panel.section, index);
                        }}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Editor */}
              <div className="min-w-0 flex-1 overflow-y-auto p-6">
                {draft === null ? (
                  <AdminEmpty>Выберите элемент из списка или добавьте новый</AdminEmpty>
                ) : (
                  <ContentItemEditor
                    section={panel.section}
                    item={draft}
                    store={store}
                    onChange={handleDraftChange}
                    marker={draftMarker ?? undefined}
                    onMarkerChange={handleMarkerChange}
                  />
                )}
              </div>
            </div>
          )}

          {panel.kind === "messages" && !messagesReady && (
            <div className="flex flex-1 items-center justify-center">
              <AdminEmpty>Загрузка текстов…</AdminEmpty>
            </div>
          )}

          {panel.kind === "messages" && messagesReady && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium text-slate-700">Язык редактирования</p>
                <AdminTabs
                  options={locales.map((l) => ({ value: l, label: `${localeFlag(l)} ${localeNames[l]}` }))}
                  value={msgLocale}
                  onChange={setMsgLocale}
                />
              </div>
              <MessagesSectionEditor
                messages={messages as Record<Locale, Record<string, unknown>>}
                sectionId={panel.sectionId}
                locale={msgLocale}
                onChange={(m) => {
                  setMessages(m);
                  setDirty(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
