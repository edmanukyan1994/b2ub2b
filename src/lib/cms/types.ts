import type {
  BlogPost,
  ClientLogo,
  MapProject,
  Partner,
  PortfolioCategory,
  PortfolioProject,
  Service,
  Testimonial,
} from "@/lib/types";
import type { MapMarkerCategory } from "@/lib/map-markers";

export type SiteSettings = {
  logoUrl: string;
};

export type CmsStore = {
  siteSettings: SiteSettings;
  services: Service[];
  portfolioProjects: PortfolioProject[];
  clientLogos: ClientLogo[];
  portfolioCategories: PortfolioCategory[];
  blogPosts: BlogPost[];
  mapProjects: MapProject[];
  partners: Partner[];
  testimonials: Testimonial[];
  mapMarkerByProject: Record<string, MapMarkerCategory>;
};

export type CmsSection = keyof CmsStore;

export const CMS_SECTIONS: { key: CmsSection; label: string }[] = [
  { key: "siteSettings", label: "Site settings" },
  { key: "services", label: "Services" },
  { key: "portfolioProjects", label: "Portfolio" },
  { key: "clientLogos", label: "Client logos" },
  { key: "blogPosts", label: "Blog" },
  { key: "mapProjects", label: "Map projects" },
  { key: "partners", label: "Partners" },
  { key: "testimonials", label: "Testimonials" },
  { key: "mapMarkerByProject", label: "Map markers" },
  { key: "portfolioCategories", label: "Portfolio categories" },
];
