import { readCmsStore } from "@/lib/cms/store";
import type { Locale } from "@/i18n/routing";
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

export async function getServices(): Promise<Service[]> {
  return (await readCmsStore()).services;
}

export async function getService(slug: string): Promise<Service | undefined> {
  return (await getServices()).find((s) => s.slug === slug);
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return (await readCmsStore()).portfolioProjects;
}

export async function getProject(slug: string): Promise<PortfolioProject | undefined> {
  return (await getPortfolioProjects()).find((p) => p.slug === slug);
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  return (await readCmsStore()).clientLogos;
}

export async function getPortfolioCategories(): Promise<readonly PortfolioCategory[]> {
  return (await readCmsStore()).portfolioCategories;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return (await readCmsStore()).blogPosts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  return (await getBlogPosts()).find((p) => p.slug === slug);
}

export async function getMapProjects(): Promise<MapProject[]> {
  return (await readCmsStore()).mapProjects;
}

export async function getPartners(): Promise<Partner[]> {
  return (await readCmsStore()).partners;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return (await readCmsStore()).testimonials;
}

export async function getMapMarkerByProject(): Promise<Record<string, MapMarkerCategory>> {
  return (await readCmsStore()).mapMarkerByProject;
}

export function pickLocalized<T extends Record<Locale, string>>(value: T, locale: Locale) {
  return value[locale] ?? value.en;
}
