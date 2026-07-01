import { services } from "@/content/services";
import { clientLogos, portfolioCategories, portfolioProjects } from "@/content/portfolio";
import { blogPosts, mapProjects, partners, testimonials } from "@/content/site-data";
import { MARKER_BY_PROJECT } from "@/lib/map-markers";
import type { CmsStore } from "./types";

export function buildDefaultStore(): CmsStore {
  return {
    siteSettings: { logoUrl: "/logo.png" },
    services: structuredClone(services),
    portfolioProjects: structuredClone(portfolioProjects),
    clientLogos: structuredClone(clientLogos),
    portfolioCategories: portfolioCategories.filter((c) => c !== "all") as CmsStore["portfolioCategories"],
    blogPosts: structuredClone(blogPosts),
    mapProjects: structuredClone(mapProjects),
    partners: structuredClone(partners),
    testimonials: structuredClone(testimonials),
    mapMarkerByProject: structuredClone(MARKER_BY_PROJECT),
  };
}
