import type { Locale } from "@/i18n/routing";
import {
  getBlogPosts,
  getClientLogos,
  getMapMarkerByProject,
  getMapProjects,
  getPartners,
  getPortfolioProjects,
  getServices,
  getTestimonials,
} from "@/lib/content";

export async function loadHomeContent() {
  const [services, portfolioProjects, clientLogos, testimonials, partners] = await Promise.all([
    getServices(),
    getPortfolioProjects(),
    getClientLogos(),
    getTestimonials(),
    getPartners(),
  ]);
  return { services, portfolioProjects, clientLogos, testimonials, partners };
}

export async function loadMapContent() {
  const [mapProjects, markerByProject] = await Promise.all([
    getMapProjects(),
    getMapMarkerByProject(),
  ]);
  return { mapProjects, markerByProject };
}

export async function loadBlogPosts() {
  return getBlogPosts();
}

export async function loadServices() {
  return getServices();
}

export type HomeContent = Awaited<ReturnType<typeof loadHomeContent>>;
export type MapContent = Awaited<ReturnType<typeof loadMapContent>>;

export type { Locale };
