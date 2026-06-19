import type { Locale } from "@/i18n/routing";

export type LocalizedString = Record<Locale, string>;

export type Service = {
  slug: string;
  icon: string;
  pillar?: boolean;
  title: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  benefits: LocalizedString[];
  faq: { question: LocalizedString; answer: LocalizedString }[];
  tags: string[];
};

export type PortfolioCategory =
  | "hotels"
  | "restaurants"
  | "commercial"
  | "manufacturing"
  | "malls"
  | "web"
  | "automation";

export type ClientLogo = {
  id: string;
  name: string;
  /** Path under /public, e.g. /logos/clients/meta.svg */
  logo: string;
  website?: string;
};

export type PortfolioProject = {
  slug: string;
  client: string;
  /** Path under /public, e.g. /logos/clients/meta.svg */
  clientLogo?: string;
  /** Path under /public, e.g. /portfolio/covers/meta-enterprise-portal.jpg */
  coverImage?: string;
  /** GIF/WebM preview — keeps animation (Clay-style) */
  coverAnimated?: boolean;
  category: PortfolioCategory;
  tags: string[];
  title: LocalizedString;
  description: LocalizedString;
  works: LocalizedString[];
  results: LocalizedString[];
  country: string;
  city: LocalizedString;
  year: number;
  gradient: string;
  featured?: boolean;
};

export type MapProject = {
  id: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  title: LocalizedString;
  type: LocalizedString;
};

export type BlogPost = {
  slug: string;
  date: string;
  readTime: number;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
};

export type Testimonial = {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  company: string;
  quote: LocalizedString;
};

export type Partner = {
  id: string;
  name: string;
  /** Path under /public, e.g. /logos/partners/bitrix24.svg */
  logo?: string;
  category: LocalizedString;
};
