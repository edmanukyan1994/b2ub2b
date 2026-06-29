"use client";

import type {
  BlogPost,
  ClientLogo,
  MapProject,
  Partner,
  PortfolioProject,
  Service,
  Testimonial,
} from "@/lib/types";
import type { CmsSection, CmsStore } from "@/lib/cms/types";
import type { MapMarkerCategory } from "@/lib/map-markers";
import { emptyLocalized, slugify } from "@/lib/admin/utils";
import { LocalizedField } from "@/components/admin/shared/LocalizedField";
import { IosButton, IosField, IosGroup } from "@/components/admin/ios/ui";

const SERVICE_ICONS = ["briefcase", "blueprint", "utensils", "code", "megaphone", "users", "globe"];
const PORTFOLIO_CATS = ["hotels", "restaurants", "commercial", "manufacturing", "malls", "web", "automation"];
const MARKER_TYPES: MapMarkerCategory[] = ["hq", "horeca", "digital", "engineering", "commerce"];

export function getItemTitle(section: CmsSection, item: unknown, locale: "ru" | "en" = "ru"): string {
  if (!item || typeof item !== "object") return "Без названия";
  const obj = item as Record<string, unknown>;
  if (section === "clientLogos") return String(obj.name ?? "Логотип");
  if (section === "partners") return String(obj.name ?? "Партнёр");
  if (section === "testimonials") return String((obj.name as { ru?: string })?.ru ?? "Отзыв");
  if (section === "mapMarkerByProject") return String(obj);
  const title = obj.title as { ru?: string; en?: string } | undefined;
  return title?.[locale] || title?.en || String(obj.slug ?? obj.id ?? "Элемент");
}

export function createItem(section: CmsSection): unknown {
  switch (section) {
    case "services":
      return {
        slug: "new-service",
        icon: "briefcase",
        title: emptyLocalized(),
        shortDescription: emptyLocalized(),
        description: emptyLocalized(),
        benefits: [],
        faq: [],
        tags: [],
      } satisfies Service;
    case "portfolioProjects":
      return {
        slug: "new-project",
        client: "Client",
        category: "web",
        tags: [],
        title: emptyLocalized(),
        description: emptyLocalized(),
        works: [],
        results: [],
        country: "AM",
        city: emptyLocalized(),
        year: new Date().getFullYear(),
        gradient: "from-sky-600 to-blue-900",
      } satisfies PortfolioProject;
    case "blogPosts":
      return {
        slug: "new-post",
        date: new Date().toISOString().slice(0, 10),
        readTime: 5,
        title: emptyLocalized(),
        excerpt: emptyLocalized(),
        content: emptyLocalized(),
      } satisfies BlogPost;
    case "mapProjects":
      return {
        id: "new-project",
        country: "Armenia",
        countryCode: "AM",
        lat: 40.18,
        lng: 44.51,
        title: emptyLocalized(),
        type: emptyLocalized(),
      } satisfies MapProject;
    case "partners":
      return { id: String(Date.now()), name: "Partner", category: emptyLocalized() } satisfies Partner;
    case "testimonials":
      return {
        id: String(Date.now()),
        name: emptyLocalized(),
        role: emptyLocalized(),
        company: "Company",
        quote: emptyLocalized(),
      } satisfies Testimonial;
    case "clientLogos":
      return { id: slugify("new-client"), name: "Client", logo: "/logos/clients/placeholder.png" } satisfies ClientLogo;
    default:
      return {};
  }
}

type EditorProps = {
  section: CmsSection;
  item: unknown;
  store: CmsStore;
  onChange: (item: unknown) => void;
  marker?: MapMarkerCategory;
  onMarkerChange?: (m: MapMarkerCategory) => void;
};

export function ContentItemEditor({ section, item, store, onChange, marker, onMarkerChange }: EditorProps) {
  switch (section) {
    case "services":
      return <ServiceEditor item={item as Service} onChange={onChange as (s: Service) => void} />;
    case "portfolioProjects":
      return <PortfolioEditor item={item as PortfolioProject} onChange={onChange as (p: PortfolioProject) => void} />;
    case "blogPosts":
      return <BlogEditor item={item as BlogPost} onChange={onChange as (b: BlogPost) => void} />;
    case "mapProjects":
      return (
        <MapEditor
          item={item as MapProject}
          marker={marker ?? ((store.mapMarkerByProject[(item as MapProject).id] ?? "digital") as MapMarkerCategory)}
          onMarkerChange={onMarkerChange ?? (() => {})}
          onChange={onChange as (m: MapProject) => void}
        />
      );
    case "partners":
      return <PartnerEditor item={item as Partner} onChange={onChange as (p: Partner) => void} />;
    case "testimonials":
      return <TestimonialEditor item={item as Testimonial} onChange={onChange as (t: Testimonial) => void} />;
    case "clientLogos":
      return <ClientLogoEditor item={item as ClientLogo} onChange={onChange as (c: ClientLogo) => void} />;
    default:
      return <p className="p-4 text-[15px] text-[#8E8E93]">Раздел недоступен для редактирования</p>;
  }
}

function ServiceEditor({ item, onChange }: { item: Service; onChange: (s: Service) => void }) {
  return (
    <>
      <IosGroup title="Основное">
        <IosField label="URL (slug)" value={item.slug} onChange={(slug) => onChange({ ...item, slug: slugify(slug) })} />
        <div className="border-b border-[#C6C6C8]/40 px-4 py-3">
          <label className="mb-2 block text-[13px] text-[#8E8E93]">Иконка</label>
          <select
            value={item.icon}
            onChange={(e) => onChange({ ...item, icon: e.target.value })}
            className="w-full rounded-lg bg-[#F2F2F7] px-3 py-2.5 text-[17px]"
          >
            {SERVICE_ICONS.map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </div>
        <IosField
          label="Теги (через запятую)"
          value={item.tags.join(", ")}
          onChange={(v) => onChange({ ...item, tags: v.split(",").map((t) => t.trim()).filter(Boolean) })}
        />
      </IosGroup>
      <IosGroup title="Тексты">
        <LocalizedField label="Название" value={item.title} onChange={(title) => onChange({ ...item, title })} />
        <LocalizedField label="Краткое описание" value={item.shortDescription} onChange={(shortDescription) => onChange({ ...item, shortDescription })} multiline />
        <LocalizedField label="Полное описание" value={item.description} onChange={(description) => onChange({ ...item, description })} multiline />
      </IosGroup>
      <IosGroup title="Преимущества" footer="Каждый пункт — на всех языках">
        {item.benefits.map((benefit, i) => (
          <LocalizedField
            key={i}
            label={`Пункт ${i + 1}`}
            value={benefit}
            onChange={(v) => {
              const benefits = [...item.benefits];
              benefits[i] = v;
              onChange({ ...item, benefits });
            }}
            multiline
          />
        ))}
        <div className="p-3">
          <IosButton variant="secondary" onClick={() => onChange({ ...item, benefits: [...item.benefits, emptyLocalized()] })}>
            + Добавить пункт
          </IosButton>
        </div>
      </IosGroup>
    </>
  );
}

function PortfolioEditor({ item, onChange }: { item: PortfolioProject; onChange: (p: PortfolioProject) => void }) {
  return (
    <>
      <IosGroup title="Основное">
        <IosField label="Slug" value={item.slug} onChange={(slug) => onChange({ ...item, slug: slugify(slug) })} />
        <IosField label="Клиент" value={item.client} onChange={(client) => onChange({ ...item, client })} />
        <IosField label="Год" value={String(item.year)} onChange={(v) => onChange({ ...item, year: Number(v) || item.year })} type="number" />
        <IosField label="Страна (код)" value={item.country} onChange={(country) => onChange({ ...item, country })} />
        <div className="border-b border-[#C6C6C8]/40 px-4 py-3">
          <label className="mb-2 block text-[13px] text-[#8E8E93]">Категория</label>
          <select
            value={item.category}
            onChange={(e) => onChange({ ...item, category: e.target.value as PortfolioProject["category"] })}
            className="w-full rounded-lg bg-[#F2F2F7] px-3 py-2.5 text-[17px]"
          >
            {PORTFOLIO_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <IosField label="Обложка (путь)" value={item.coverImage ?? ""} onChange={(coverImage) => onChange({ ...item, coverImage })} hint="/portfolio/covers/..." />
        <IosField label="Градиент Tailwind" value={item.gradient} onChange={(gradient) => onChange({ ...item, gradient })} hint="from-sky-600 to-blue-900" />
      </IosGroup>
      <IosGroup title="Тексты">
        <LocalizedField label="Название" value={item.title} onChange={(title) => onChange({ ...item, title })} />
        <LocalizedField label="Описание" value={item.description} onChange={(description) => onChange({ ...item, description })} multiline />
        <LocalizedField label="Город" value={item.city} onChange={(city) => onChange({ ...item, city })} />
      </IosGroup>
    </>
  );
}

function BlogEditor({ item, onChange }: { item: BlogPost; onChange: (b: BlogPost) => void }) {
  return (
    <>
      <IosGroup title="Основное">
        <IosField label="Slug" value={item.slug} onChange={(slug) => onChange({ ...item, slug: slugify(slug) })} />
        <IosField label="Дата" value={item.date} onChange={(date) => onChange({ ...item, date })} type="date" />
        <IosField label="Время чтения (мин)" value={String(item.readTime)} onChange={(v) => onChange({ ...item, readTime: Number(v) || 5 })} type="number" />
      </IosGroup>
      <IosGroup title="Тексты">
        <LocalizedField label="Заголовок" value={item.title} onChange={(title) => onChange({ ...item, title })} />
        <LocalizedField label="Краткое описание" value={item.excerpt} onChange={(excerpt) => onChange({ ...item, excerpt })} multiline />
        <LocalizedField label="Статья" value={item.content} onChange={(content) => onChange({ ...item, content })} multiline />
      </IosGroup>
    </>
  );
}

function MapEditor({
  item,
  marker,
  onMarkerChange,
  onChange,
}: {
  item: MapProject;
  marker: MapMarkerCategory;
  onMarkerChange: (m: MapMarkerCategory) => void;
  onChange: (m: MapProject) => void;
}) {
  return (
    <>
      <IosGroup title="Локация">
        <IosField label="ID" value={item.id} onChange={(id) => onChange({ ...item, id })} />
        <IosField label="Страна" value={item.country} onChange={(country) => onChange({ ...item, country })} />
        <IosField label="Код страны" value={item.countryCode} onChange={(countryCode) => onChange({ ...item, countryCode })} />
        <IosField label="Широта" value={String(item.lat)} onChange={(v) => onChange({ ...item, lat: Number(v) })} type="number" />
        <IosField label="Долгота" value={String(item.lng)} onChange={(v) => onChange({ ...item, lng: Number(v) })} type="number" />
        <div className="border-b border-[#C6C6C8]/40 px-4 py-3">
          <label className="mb-2 block text-[13px] text-[#8E8E93]">Тип маркера</label>
          <select
            value={marker}
            onChange={(e) => onMarkerChange(e.target.value as MapMarkerCategory)}
            className="w-full rounded-lg bg-[#F2F2F7] px-3 py-2.5 text-[17px]"
          >
            {MARKER_TYPES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </IosGroup>
      <IosGroup title="Тексты">
        <LocalizedField label="Название" value={item.title} onChange={(title) => onChange({ ...item, title })} />
        <LocalizedField label="Тип проекта" value={item.type} onChange={(type) => onChange({ ...item, type })} />
      </IosGroup>
    </>
  );
}

function PartnerEditor({ item, onChange }: { item: Partner; onChange: (p: Partner) => void }) {
  return (
    <IosGroup>
      <IosField label="Название" value={item.name} onChange={(name) => onChange({ ...item, name })} />
      <IosField label="Логотип (путь)" value={item.logo ?? ""} onChange={(logo) => onChange({ ...item, logo })} />
      <LocalizedField label="Категория" value={item.category} onChange={(category) => onChange({ ...item, category })} />
    </IosGroup>
  );
}

function TestimonialEditor({ item, onChange }: { item: Testimonial; onChange: (t: Testimonial) => void }) {
  return (
    <IosGroup>
      <LocalizedField label="Имя" value={item.name} onChange={(name) => onChange({ ...item, name })} />
      <LocalizedField label="Должность" value={item.role} onChange={(role) => onChange({ ...item, role })} />
      <IosField label="Компания" value={item.company} onChange={(company) => onChange({ ...item, company })} />
      <LocalizedField label="Отзыв" value={item.quote} onChange={(quote) => onChange({ ...item, quote })} multiline />
    </IosGroup>
  );
}

function ClientLogoEditor({ item, onChange }: { item: ClientLogo; onChange: (c: ClientLogo) => void }) {
  return (
    <IosGroup>
      <IosField label="Название" value={item.name} onChange={(name) => onChange({ ...item, name })} />
      <IosField label="Логотип (путь)" value={item.logo} onChange={(logo) => onChange({ ...item, logo })} />
      <IosField label="Сайт" value={item.website ?? ""} onChange={(website) => onChange({ ...item, website })} />
    </IosGroup>
  );
}

export const CONTENT_MENU: { key: CmsSection; label: string; subtitle: string }[] = [
  { key: "services", label: "Услуги", subtitle: "Направления компании" },
  { key: "portfolioProjects", label: "Портфолио", subtitle: "Кейсы и проекты" },
  { key: "blogPosts", label: "Блог", subtitle: "Статьи" },
  { key: "mapProjects", label: "Карта", subtitle: "Точки на карте" },
  { key: "partners", label: "Партнёры", subtitle: "Логотипы партнёров" },
  { key: "testimonials", label: "Отзывы", subtitle: "Цитаты клиентов" },
  { key: "clientLogos", label: "Клиенты", subtitle: "Логотипы клиентов" },
];
