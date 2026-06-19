import type { MapProject } from "@/lib/types";

export type MapMarkerCategory = "hq" | "horeca" | "digital" | "engineering" | "commerce";

const MARKER_BY_PROJECT: Record<string, MapMarkerCategory> = {
  "yerevan-hq": "hq",
  "yerevan-medical": "digital",
  "yerevan-hotel": "horeca",
  "tbilisi-restaurant": "horeca",
  "tbilisi-office": "commerce",
  "frankfurt-bank": "digital",
  "amsterdam-logistics": "commerce",
  "paris-brand": "commerce",
  "milan-horeca": "horeca",
  "dubai-hospitality": "engineering",
};

const MARKER_META: Record<
  MapMarkerCategory,
  { label: string; gradient: string; glow: string }
> = {
  hq: {
    label: "HQ",
    gradient: "linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)",
    glow: "rgba(56, 189, 248, 0.55)",
  },
  horeca: {
    label: "HoReCa",
    gradient: "linear-gradient(135deg, #fb923c 0%, #e11d48 100%)",
    glow: "rgba(251, 113, 133, 0.5)",
  },
  digital: {
    label: "Digital",
    gradient: "linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)",
    glow: "rgba(99, 102, 241, 0.5)",
  },
  engineering: {
    label: "Engineering",
    gradient: "linear-gradient(135deg, #2dd4bf 0%, #0891b2 100%)",
    glow: "rgba(45, 212, 191, 0.5)",
  },
  commerce: {
    label: "Commerce",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
    glow: "rgba(167, 139, 250, 0.5)",
  },
};

export function getMapMarkerCategory(project: MapProject): MapMarkerCategory {
  return MARKER_BY_PROJECT[project.id] ?? "digital";
}

export function buildMapMarkerHtml(category: MapMarkerCategory) {
  const meta = MARKER_META[category];

  return `
    <div class="b2-map-marker" data-category="${category}" style="--marker-gradient:${meta.gradient};--marker-glow:${meta.glow}">
      <div class="b2-map-marker__pulse"></div>
      <div class="b2-map-marker__body b2-map-marker__body--logo">
        <img src="/logo.png" alt="" width="58" height="16" loading="lazy" decoding="async" />
      </div>
      <div class="b2-map-marker__stem"></div>
      <div class="b2-map-marker__shadow"></div>
    </div>
  `;
}

export function getMapMarkerLabel(category: MapMarkerCategory) {
  return MARKER_META[category].label;
}
