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
import { AdminButton, AdminField, AdminSection, AdminSelect } from "@/components/admin/ui";

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
      return <p className="p-4 text-sm text-slate-500">Раздел недоступен для редактирования</p>;
  }
}

function ServiceEditor({ item, onChange }: { item: Service; onChange: (s: Service) => void }) {
  return (
    <>
      <AdminSection title="Основное">
        <AdminField label="URL (slug)" value={item.slug} onChange={(slug) => onChange({ ...item, slug: slugify(slug) })} />
        <AdminSelect
          label="Иконка"
          value={item.icon}
          onChange={(icon) => onChange({ ...item, icon })}
          options={SERVICE_ICONS.map((icon) => ({ value: icon, label: icon }))}
        />
        <AdminField
          label="Теги (через запятую)"
          value={item.tags.join(", ")}
          onChange={(v) => onChange({ ...item, tags: v.split(",").map((t) => t.trim()).filter(Boolean) })}
        />
      </AdminSection>
      <AdminSection title="Тексты">
        <LocalizedField label="Название" value={item.title} onChange={(title) => onChange({ ...item, title })} />
        <LocalizedField label="Краткое описание" value={item.shortDescription} onChange={(shortDescription) => onChange({ ...item, shortDescription })} multiline />
        <LocalizedField label="Полное описание" value={item.description} onChange={(description) => onChange({ ...item, description })} multiline />
      </AdminSection>
      <AdminSection title="Преимущества" footer="Каждый пункт — на всех языках">
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
          <AdminButton variant="secondary" onClick={() => onChange({ ...item, benefits: [...item.benefits, emptyLocalized()] })}>
            + Добавить пункт
          </AdminButton>
        </div>
      </AdminSection>
    </>
  );
}

function PortfolioEditor({ item, onChange }: { item: PortfolioProject; onChange: (p: PortfolioProject) => void }) {
  return (
    <>
      <AdminSection title="Основное">
        <AdminField label="Slug" value={item.slug} onChange={(slug) => onChange({ ...item, slug: slugify(slug) })} />
        <AdminField label="Клиент" value={item.client} onChange={(client) => onChange({ ...item, client })} />
        <AdminField label="Год" value={String(item.year)} onChange={(v) => onChange({ ...item, year: Number(v) || item.year })} type="number" />
        <AdminField label="Страна (код)" value={item.country} onChange={(country) => onChange({ ...item, country })} />
        <AdminSelect
          label="Категория"
          value={item.category}
          onChange={(category) => onChange({ ...item, category: category as PortfolioProject["category"] })}
          options={PORTFOLIO_CATS.map((c) => ({ value: c, label: c }))}
        />
        <AdminField label="Обложка (путь)" value={item.coverImage ?? ""} onChange={(coverImage) => onChange({ ...item, coverImage })} hint="/portfolio/covers/..." />
        <AdminField label="Градиент Tailwind" value={item.gradient} onChange={(gradient) => onChange({ ...item, gradient })} hint="from-sky-600 to-blue-900" />
      </AdminSection>
      <AdminSection title="Тексты">
        <LocalizedField label="Название" value={item.title} onChange={(title) => onChange({ ...item, title })} />
        <LocalizedField label="Описание" value={item.description} onChange={(description) => onChange({ ...item, description })} multiline />
        <LocalizedField label="Город" value={item.city} onChange={(city) => onChange({ ...item, city })} />
      </AdminSection>
    </>
  );
}

function BlogEditor({ item, onChange }: { item: BlogPost; onChange: (b: BlogPost) => void }) {
  return (
    <>
      <AdminSection title="Основное">
        <AdminField label="Slug" value={item.slug} onChange={(slug) => onChange({ ...item, slug: slugify(slug) })} />
        <AdminField label="Дата" value={item.date} onChange={(date) => onChange({ ...item, date })} type="date" />
        <AdminField label="Время чтения (мин)" value={String(item.readTime)} onChange={(v) => onChange({ ...item, readTime: Number(v) || 5 })} type="number" />
      </AdminSection>
      <AdminSection title="Тексты">
        <LocalizedField label="Заголовок" value={item.title} onChange={(title) => onChange({ ...item, title })} />
        <LocalizedField label="Краткое описание" value={item.excerpt} onChange={(excerpt) => onChange({ ...item, excerpt })} multiline />
        <LocalizedField label="Статья" value={item.content} onChange={(content) => onChange({ ...item, content })} multiline />
      </AdminSection>
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
      <AdminSection title="Локация">
        <AdminField label="ID" value={item.id} onChange={(id) => onChange({ ...item, id })} />
        <AdminField label="Страна" value={item.country} onChange={(country) => onChange({ ...item, country })} />
        <AdminField label="Код страны" value={item.countryCode} onChange={(countryCode) => onChange({ ...item, countryCode })} />
        <AdminField label="Широта" value={String(item.lat)} onChange={(v) => onChange({ ...item, lat: Number(v) })} type="number" />
        <AdminField label="Долгота" value={String(item.lng)} onChange={(v) => onChange({ ...item, lng: Number(v) })} type="number" />
        <AdminSelect
          label="Тип маркера"
          value={marker}
          onChange={(m) => onMarkerChange(m as MapMarkerCategory)}
          options={MARKER_TYPES.map((m) => ({ value: m, label: m }))}
        />
      </AdminSection>
      <AdminSection title="Тексты">
        <LocalizedField label="Название" value={item.title} onChange={(title) => onChange({ ...item, title })} />
        <LocalizedField label="Тип проекта" value={item.type} onChange={(type) => onChange({ ...item, type })} />
      </AdminSection>
    </>
  );
}

function PartnerEditor({ item, onChange }: { item: Partner; onChange: (p: Partner) => void }) {
  return (
    <AdminSection>
      <AdminField label="Название" value={item.name} onChange={(name) => onChange({ ...item, name })} />
      <AdminField label="Логотип (путь)" value={item.logo ?? ""} onChange={(logo) => onChange({ ...item, logo })} />
      <LocalizedField label="Категория" value={item.category} onChange={(category) => onChange({ ...item, category })} />
    </AdminSection>
  );
}

function TestimonialEditor({ item, onChange }: { item: Testimonial; onChange: (t: Testimonial) => void }) {
  return (
    <AdminSection>
      <LocalizedField label="Имя" value={item.name} onChange={(name) => onChange({ ...item, name })} />
      <LocalizedField label="Должность" value={item.role} onChange={(role) => onChange({ ...item, role })} />
      <AdminField label="Компания" value={item.company} onChange={(company) => onChange({ ...item, company })} />
      <LocalizedField label="Отзыв" value={item.quote} onChange={(quote) => onChange({ ...item, quote })} multiline />
    </AdminSection>
  );
}

function ClientLogoEditor({ item, onChange }: { item: ClientLogo; onChange: (c: ClientLogo) => void }) {
  return (
    <AdminSection>
      <AdminField label="Название" value={item.name} onChange={(name) => onChange({ ...item, name })} />
      <AdminField label="Логотип (путь)" value={item.logo} onChange={(logo) => onChange({ ...item, logo })} />
      <AdminField label="Сайт" value={item.website ?? ""} onChange={(website) => onChange({ ...item, website })} />
    </AdminSection>
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
