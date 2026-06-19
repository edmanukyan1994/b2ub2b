import type { MapProject, Partner, Testimonial, BlogPost } from "@/lib/types";

export const mapProjects: MapProject[] = [
  {
    id: "yerevan-hq",
    country: "Armenia",
    countryCode: "AM",
    lat: 40.1776,
    lng: 44.5126,
    title: {
      en: "Headquarters & Digital Hub",
      ru: "Штаб-квартира и digital hub",
      hy: "Գլխամաս և digital hub",
      it: "Sede e digital hub",
    },
    type: {
      en: "Consulting · Digital · Engineering",
      ru: "Консалтинг · Digital · Инженерия",
      hy: "Consulting · Digital · Engineering",
      it: "Consulenza · Digital · Ingegneria",
    },
  },
  {
    id: "yerevan-medical",
    country: "Armenia",
    countryCode: "AM",
    lat: 40.1812,
    lng: 44.5089,
    title: {
      en: "Healthcare Digital Platform",
      ru: "Healthcare digital platform",
      hy: "Healthcare digital platform",
      it: "Piattaforma healthcare",
    },
    type: {
      en: "Web · UI/UX",
      ru: "Web · UI/UX",
      hy: "Web · UI/UX",
      it: "Web · UI/UX",
    },
  },
  {
    id: "yerevan-hotel",
    country: "Armenia",
    countryCode: "AM",
    lat: 40.185,
    lng: 44.515,
    title: {
      en: "Luxury Hotel Engineering",
      ru: "Luxury Hotel — инженерия",
      hy: "Luxury Hotel engineering",
      it: "Ingegneria hotel luxury",
    },
    type: {
      en: "HoReCa · HVAC · MEP",
      ru: "HoReCa · HVAC · MEP",
      hy: "HoReCa · HVAC · MEP",
      it: "HoReCa · HVAC · MEP",
    },
  },
  {
    id: "tbilisi-restaurant",
    country: "Georgia",
    countryCode: "GE",
    lat: 41.7151,
    lng: 44.8271,
    title: {
      en: "Premium Restaurant Launch",
      ru: "Premium Restaurant Launch",
      hy: "Premium Restaurant Launch",
      it: "Lancio ristorante premium",
    },
    type: {
      en: "HoReCa · Launch",
      ru: "HoReCa · Launch",
      hy: "HoReCa · Launch",
      it: "HoReCa · Launch",
    },
  },
  {
    id: "tbilisi-office",
    country: "Georgia",
    countryCode: "GE",
    lat: 41.693,
    lng: 44.8015,
    title: {
      en: "Regional Office — Tbilisi",
      ru: "Региональный офис — Тбилиси",
      hy: "Regional Office — Tbilisi",
      it: "Ufficio regionale — Tbilisi",
    },
    type: {
      en: "Consulting · B2B Commerce",
      ru: "Консалтинг · B2B Commerce",
      hy: "Consulting · B2B Commerce",
      it: "Consulenza · B2B Commerce",
    },
  },
  {
    id: "frankfurt-bank",
    country: "Germany",
    countryCode: "DE",
    lat: 50.1109,
    lng: 8.6821,
    title: {
      en: "Corporate Banking Portal",
      ru: "Corporate Banking Portal",
      hy: "Corporate Banking Portal",
      it: "Portale corporate banking",
    },
    type: {
      en: "Digital · Fintech",
      ru: "Digital · Fintech",
      hy: "Digital · Fintech",
      it: "Digital · Fintech",
    },
  },
  {
    id: "amsterdam-logistics",
    country: "Netherlands",
    countryCode: "NL",
    lat: 52.3676,
    lng: 4.9041,
    title: {
      en: "B2B Logistics Platform",
      ru: "B2B Logistics Platform",
      hy: "B2B Logistics Platform",
      it: "Piattaforma logistica B2B",
    },
    type: {
      en: "B2B Commerce · Digital",
      ru: "B2B Commerce · Digital",
      hy: "B2B Commerce · Digital",
      it: "B2B Commerce · Digital",
    },
  },
  {
    id: "paris-brand",
    country: "France",
    countryCode: "FR",
    lat: 48.8566,
    lng: 2.3522,
    title: {
      en: "Brand & Marketing Campaign",
      ru: "Brand & Marketing Campaign",
      hy: "Brand & Marketing Campaign",
      it: "Campagna brand e marketing",
    },
    type: {
      en: "Branding · Marketing",
      ru: "Branding · Marketing",
      hy: "Branding · Marketing",
      it: "Branding · Marketing",
    },
  },
  {
    id: "milan-horeca",
    country: "Italy",
    countryCode: "IT",
    lat: 45.4642,
    lng: 9.19,
    title: {
      en: "HoReCa Equipment Supply",
      ru: "Поставка HoReCa обордувания",
      hy: "HoReCa Equipment Supply",
      it: "Fornitura attrezzature HoReCa",
    },
    type: {
      en: "HoReCa · B2B Commerce",
      ru: "HoReCa · B2B Commerce",
      hy: "HoReCa · B2B Commerce",
      it: "HoReCa · B2B Commerce",
    },
  },
  {
    id: "dubai-hospitality",
    country: "UAE",
    countryCode: "AE",
    lat: 25.2048,
    lng: 55.2708,
    title: {
      en: "Hospitality Automation",
      ru: "Автоматизация hospitality",
      hy: "Hospitality Automation",
      it: "Automazione hospitality",
    },
    type: {
      en: "Engineering · Automation",
      ru: "Engineering · Automation",
      hy: "Engineering · Automation",
      it: "Ingegneria · Automazione",
    },
  },
];

export const partners: Partner[] = [
  { id: "1", name: "Bitrix24", logo: "/logos/partners/bitrix24.svg", category: { en: "CRM & Automation", ru: "CRM и автоматизация", hy: "CRM և ավտոմատացում", it: "CRM e automazione" } },
  { id: "2", name: "Autodesk", logo: "/logos/partners/autodesk.svg", category: { en: "Engineering Design", ru: "Инженерное проектирование", hy: "Ինժեներական նախագծում", it: "Progettazione ingegneristica" } },
  { id: "3", name: "Siemens", logo: "/logos/partners/siemens.svg", category: { en: "Building Automation", ru: "Автоматизация зданий", hy: "Շենքերի ավտոմատացում", it: "Automazione edifici" } },
  { id: "4", name: "Daikin", logo: "/logos/partners/daikin.svg", category: { en: "HVAC Systems", ru: "HVAC системы", hy: "HVAC համակարգեր", it: "Sistemi HVAC" } },
  { id: "5", name: "Schneider Electric", logo: "/logos/partners/schneider.svg", category: { en: "Electrical & MEP", ru: "Электрика и MEP", hy: "Էլեկտրականություն և MEP", it: "Elettrico e MEP" } },
  { id: "6", name: "Google Cloud", logo: "/logos/partners/googlecloud.svg", category: { en: "Cloud Infrastructure", ru: "Облачная инфраструктура", hy: "Cloud infrastructure", it: "Infrastruttura cloud" } },
  { id: "7", name: "AWS", logo: "/logos/partners/aws.svg", category: { en: "Cloud & DevOps", ru: "Cloud и DevOps", hy: "Cloud և DevOps", it: "Cloud e DevOps" } },
  { id: "8", name: "Microsoft", logo: "/logos/partners/microsoft.svg", category: { en: "Enterprise Software", ru: "Enterprise ПО", hy: "Enterprise software", it: "Software enterprise" } },
  { id: "9", name: "HubSpot", logo: "/logos/partners/hubspot.svg", category: { en: "Marketing Platform", ru: "Маркетинговая платформа", hy: "Marketing platform", it: "Piattaforma marketing" } },
  { id: "10", name: "Odoo", logo: "/logos/partners/odoo.svg", category: { en: "ERP Systems", ru: "ERP системы", hy: "ERP համակարգեր", it: "Sistemi ERP" } },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: { en: "David K.", ru: "David K.", hy: "David K.", it: "David K." },
    role: {
      en: "CEO, Hospitality Group",
      ru: "CEO, Hospitality Group",
      hy: "CEO, Hospitality Group",
      it: "CEO, Hospitality Group",
    },
    company: "Confidential Client",
    quote: {
      en: "B2U B2B delivered our hotel project from engineering to launch. One team, one timeline, zero compromises on quality.",
      ru: "B2U B2B реализовали наш отель от инженерии до запуска. Одна команда, один timeline, без компромиссов по качеству.",
      hy: "B2U B2B-ը մեր հյուրանոցի նախագիծը իրականացրեց ինժեներia-ից մինչև launch։",
      it: "B2U B2B ha consegnato il nostro hotel dall'ingegneria al lancio. Un team, una timeline, zero compromessi.",
    },
  },
  {
    id: "2",
    name: { en: "Anna M.", ru: "Anna M.", hy: "Anna M.", it: "Anna M." },
    role: {
      en: "Director of Digital, Financial Services",
      ru: "Director of Digital, Financial Services",
      hy: "Director of Digital, Financial Services",
      it: "Director of Digital, Financial Services",
    },
    company: "European Bank",
    quote: {
      en: "Their digital team understood enterprise security requirements while delivering a consumer-grade user experience. Exceptional work.",
      ru: "Digital-команда понимала enterprise security и при этом создала consumer-grade UX. Исключительная работа.",
      hy: "Digital թիմը enterprise security-ն հասկացավ և consumer-grade UX ստեղծեց։",
      it: "Il team digital ha capito la security enterprise e creato un UX consumer-grade. Lavoro eccezionale.",
    },
  },
  {
    id: "3",
    name: { en: "Giorgi T.", ru: "Giorgi T.", hy: "Giorgi T.", it: "Giorgi T." },
    role: {
      en: "Founder, Restaurant Chain",
      ru: "Founder, Restaurant Chain",
      hy: "Founder, Restaurant Chain",
      it: "Founder, Restaurant Chain",
    },
    company: "Georgia",
    quote: {
      en: "From concept and kitchen design to equipment supply and staff training — B2U B2B handled everything. We opened on time.",
      ru: "От концепции и проектирования кухни до поставки оборудования и обучения — B2U B2B сделали всё. Открылись в срок.",
      hy: "Concept-ից kitchen design, equipment supply և training — B2U B2B-ը ամեն ինչ արեց։",
      it: "Dal concept alla formazione del personale — B2U B2B ha gestito tutto. Aperti in tempo.",
    },
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "business-launch-armenia-2026",
    date: "2026-03-01",
    readTime: 8,
    title: {
      en: "How to Launch a Business in Armenia in 2026",
      ru: "Как открыть бизнес в Армении в 2026 году",
      hy: "Ինչպես բացել բիզնես Հայաստանում 2026-ին",
      it: "Come avviare un business in Armenia nel 2026",
    },
    excerpt: {
      en: "A practical guide to market entry, legal framework, and digital infrastructure for international entrepreneurs.",
      ru: "Практическое руководство по выходу на рынок, legal framework и digital-инфраструктуре для международных предпринимателей.",
      hy: "Practical guide market entry, legal framework և digital infrastructure-ի համար։",
      it: "Guida pratica per ingresso nel mercato, framework legale e infrastruttura digitale.",
    },
    content: {
      en: "Armenia continues to attract international businesses with its favorable tax environment, growing tech ecosystem, and strategic location between Europe and Asia. In this guide, we outline the key steps for launching a business in 2026 — from choosing the right legal structure to setting up digital infrastructure and marketing channels.\n\nWhether you're entering the HoReCa market, launching a tech startup, or expanding an existing enterprise, B2U B2B provides end-to-end support from idea to success.",
      ru: "Армения продолжает привлекать международный бизнес благоприятной налоговой средой, растущей tech-экосистемой и стратегическим расположением между Европой и Азией. В этом руководстве мы описываем ключевые шаги запуска бизнеса в 2026 году.\n\nB2U B2B обеспечивает полный цикл поддержки — от идеи до успеха.",
      hy: "Հայաստանը շարունակում է attracting international businesses favorable tax environment-ով և growing tech ecosystem-ով։",
      it: "L'Armenia continua ad attrarre business internazionali con un ambiente fiscale favorevole ed ecosistema tech in crescita.",
    },
  },
  {
    slug: "horeca-automation-trends",
    date: "2026-02-15",
    readTime: 6,
    title: {
      en: "5 HoReCa Automation Trends Shaping 2026",
      ru: "5 трендов автоматизации HoReCa в 2026",
      hy: "5 HoReCa automation trends 2026-ում",
      it: "5 trend automazione HoReCa nel 2026",
    },
    excerpt: {
      en: "Smart kitchens, energy management, and integrated POS systems are transforming hospitality operations.",
      ru: "Умные кухни, energy management и интегрированные POS-системы меняют hospitality.",
      hy: "Smart kitchens, energy management և integrated POS systems-ը փոխում են hospitality-ն։",
      it: "Cucine smart, energy management e POS integrati stanno trasformando l'hospitality.",
    },
    content: {
      en: "The hospitality industry is undergoing a digital transformation. From AI-powered inventory management to IoT-enabled HVAC systems, automation is no longer optional — it's a competitive advantage.\n\nAt B2U B2B, we integrate engineering excellence with digital innovation to deliver HoReCa solutions that reduce costs and elevate guest experience.",
      ru: "Hospitality переживает digital transformation. От AI inventory management до IoT HVAC — автоматизация стала конкурентным преимуществом.\n\nB2U B2B объединяет инженерное excellence с digital innovation.",
      hy: "Hospitality industry-ն digital transformation է անցնում։",
      it: "L'hospitality sta attraversando una trasformazione digitale.",
    },
  },
  {
    slug: "digital-transformation-sme",
    date: "2026-01-20",
    readTime: 10,
    title: {
      en: "Digital Transformation for SMEs: Where to Start",
      ru: "Цифровая трансформация для МСБ: с чего начать",
      hy: "Digital transformation SME-ների համար՝ որտեղից սկսել",
      it: "Trasformazione digitale per PMI: da dove iniziare",
    },
    excerpt: {
      en: "CRM, automation, and a modern website — the three pillars of SME digitalization in emerging markets.",
      ru: "CRM, автоматизация и современный сайт — три столпа цифровизации МСБ на emerging markets.",
      hy: "CRM, automation և modern website — SME digitalization-ի երեք столпа։",
      it: "CRM, automazione e sito moderno — i tre pilastri della digitalizzazione PMI.",
    },
    content: {
      en: "Small and medium businesses in Armenia, Georgia, and across CIS face unique digitalization challenges. Limited budgets, legacy processes, and fragmented tools often slow growth.\n\nWe recommend starting with three foundational investments: a conversion-optimized website, a CRM system aligned with your sales process, and workflow automation for repetitive tasks.",
      ru: "МСБ в Армении, Грузии и СНГ сталкиваются с уникальными вызовами цифровизации. Рекомендуем три foundational investment: conversion-optimized website, CRM и workflow automation.",
      hy: "SME-ները Armenia, Georgia և CIS-ում unique digitalization challenges ունեն։",
      it: "Le PMI in Armenia, Georgia e CIS affrontano sfide uniche di digitalizzazione.",
    },
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
