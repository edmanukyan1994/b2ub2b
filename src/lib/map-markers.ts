import type { MapProject } from "@/lib/types";

export type MapMarkerCategory = "hq" | "horeca" | "digital" | "engineering" | "commerce";

export const MARKER_BY_PROJECT: Record<string, MapMarkerCategory> = {
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
  { label: string; gradient: string; glow: string; icon: string }
> = {
  hq: {
    label: "HQ",
    gradient: "linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)",
    glow: "rgba(56, 189, 248, 0.55)",
    icon: `<path d="M12 3l8 4v6c0 4.5-3.5 8.5-8 9.5C7.5 21.5 4 17.5 4 13V7l8-4z" fill="none" stroke="white" stroke-width="1.75" stroke-linejoin="round"/><circle cx="12" cy="11" r="2.25" fill="white"/>`,
  },
  horeca: {
    label: "HoReCa",
    gradient: "linear-gradient(135deg, #fb923c 0%, #e11d48 100%)",
    glow: "rgba(251, 113, 133, 0.5)",
    icon: `<path d="M8 7V5a4 4 0 018 0v2" fill="none" stroke="white" stroke-width="1.75" stroke-linecap="round"/><path d="M6 7h12l-1 11H7L6 7z" fill="none" stroke="white" stroke-width="1.75" stroke-linejoin="round"/><path d="M10 11h4" stroke="white" stroke-width="1.75" stroke-linecap="round"/>`,
  },
  digital: {
    label: "Digital",
    gradient: "linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)",
    glow: "rgba(99, 102, 241, 0.5)",
    icon: `<rect x="5" y="6" width="14" height="10" rx="1.5" fill="none" stroke="white" stroke-width="1.75"/><path d="M9 20h6" stroke="white" stroke-width="1.75" stroke-linecap="round"/><path d="M10 10l2 2 3-3" fill="none" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  engineering: {
    label: "Engineering",
    gradient: "linear-gradient(135deg, #2dd4bf 0%, #0891b2 100%)",
    glow: "rgba(45, 212, 191, 0.5)",
    icon: `<path d="M12 3l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9L8 14l.7-4L5.8 7.2l4-.6L12 3z" fill="none" stroke="white" stroke-width="1.75" stroke-linejoin="round"/><circle cx="12" cy="12" r="2" fill="white"/>`,
  },
  commerce: {
    label: "Commerce",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
    glow: "rgba(167, 139, 250, 0.5)",
    icon: `<path d="M6 8h12l-1 10H7L6 8z" fill="none" stroke="white" stroke-width="1.75" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 016 0v2" fill="none" stroke="white" stroke-width="1.75" stroke-linecap="round"/><path d="M9 13h6" stroke="white" stroke-width="1.75" stroke-linecap="round"/>`,
  },
};

export function getMapMarkerCategory(
  project: MapProject,
  mapping: Record<string, MapMarkerCategory> = MARKER_BY_PROJECT,
): MapMarkerCategory {
  return mapping[project.id] ?? "digital";
}

export function buildMapMarkerHtml(category: MapMarkerCategory) {
  const meta = MARKER_META[category];

  return `
    <div class="b2-map-marker" data-category="${category}" style="--marker-gradient:${meta.gradient};--marker-glow:${meta.glow}">
      <div class="b2-map-marker__pulse"></div>
      <div class="b2-map-marker__body">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">${meta.icon}</svg>
      </div>
      <div class="b2-map-marker__stem"></div>
      <div class="b2-map-marker__shadow"></div>
    </div>
  `;
}

export function getMapMarkerLabel(category: MapMarkerCategory) {
  return MARKER_META[category].label;
}
