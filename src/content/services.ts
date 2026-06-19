import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "business-consulting",
    icon: "briefcase",
    pillar: true,
    title: {
      en: "Business Consulting",
      ru: "Бизнес-консалтинг",
      hy: "Բիզնես կոնսալտինգ",
      it: "Consulenza aziendale",
    },
    shortDescription: {
      en: "From business idea to scalable international operations.",
      ru: "От идеи бизнеса до масштабируемых международных операций.",
      hy: "Բիզնեսի գաղափարից մինչև մասշտաբային միջազգային գործունեություն։",
      it: "Dall'idea di business alle operazioni internazionali scalabili.",
    },
    description: {
      en: "We guide entrepreneurs and companies through every stage of business development — from market entry and business model design to financial planning, crisis management, and international expansion across Armenia, Georgia, Europe, and CIS markets.",
      ru: "Мы сопровождаем предпринимателей и компании на каждом этапе развития — от выхода на рынок и разработки бизнес-модели до финансового планирования, антикризисного управления и международной экспансии в Армении, Грузии, Европе и странах СНГ.",
      hy: "Մենք ուղեկցում ենք ձեռնարկատերերին և ընկերություններին բիզնեսի զարգացման բոլոր փուլերում՝ շուկայի մուտքից և բիզնես մոդելի մշակումից մինչև ֆինանսական պլանավորում, antikrizis կառավարում և միջազգային ընդլայնում։",
      it: "Accompagniamo imprenditori e aziende in ogni fase dello sviluppo — dall'ingresso nel mercato alla pianificazione finanziaria, gestione delle crisi ed espansione internazionale.",
    },
    benefits: [
      {
        en: "Turnkey business launch with legal and operational framework",
        ru: "Запуск бизнеса под ключ с юридической и операционной базой",
        hy: "Բիզնեսի «կлючով» մեկնարկ իրավական և գործառնական հիմքով",
        it: "Avvio business chiavi in mano con base legale e operativa",
      },
      {
        en: "Data-driven business models and financial forecasts",
        ru: "Бизнес-модели и финансовые прогнозы на основе данных",
        hy: "Տվյալների վրա հիմնված բիզնես մոդելներ և ֆինանսական прогнозներ",
        it: "Modelli di business e previsioni finanziarie basate sui dati",
      },
      {
        en: "Process optimization and scalable growth strategies",
        ru: "Оптимизация процессов и стратегии масштабирования",
        hy: "Գործընթացների օպտիմալացում և մասշտաբավորման стратегии",
        it: "Ottimizzazione dei processi e strategie di crescita scalabile",
      },
    ],
    faq: [
      {
        question: {
          en: "Which markets do you cover?",
          ru: "Какие рынки вы покрываете?",
          hy: "Որ շուկաներն եք охватում?",
          it: "Quali mercati coprite?",
        },
        answer: {
          en: "Armenia, Georgia, EU countries, UAE, and CIS region with local partner networks.",
          ru: "Армения, Грузия, страны ЕС, ОАЭ и регион СНГ с локальными партнёрскими сетями.",
          hy: "Հայաստան, Վրաստան, ԵՄ երկրներ, ԱՄԷ և ԱՊՀ տարածաշրջան։",
          it: "Armenia, Georgia, paesi UE, UAE e regione CIS.",
        },
      },
    ],
    tags: ["Strategy", "Finance", "Growth"],
  },
  {
    slug: "engineering",
    icon: "blueprint",
    pillar: true,
    title: {
      en: "Engineering & Design",
      ru: "Проектирование и инженерия",
      hy: "Նախագծում և ինժեներիա",
      it: "Progettazione e ingegneria",
    },
    shortDescription: {
      en: "Architecture, MEP, HVAC, and smart building automation.",
      ru: "Архитектура, инженерные системы, HVAC и автоматизация зданий.",
      hy: "Արխիտեկտուրա, ինժեներական համակարգեր, HVAC և ավտոմատացում։",
      it: "Architettura, impianti, HVAC e automazione intelligente.",
    },
    description: {
      en: "Full-cycle engineering design for commercial and hospitality projects: architectural planning, electrical systems, low-current networks, HVAC, ventilation, heating, and energy-efficient building automation.",
      ru: "Полный цикл инженерного проектирования для коммерческих и hospitality-объектов: архитектурное проектирование, электроснабжение, слаботочные системы, HVAC, вентиляция, отопление и энергоэффективная автоматизация зданий.",
      hy: "Ինժեներական նախագծման ամբողջական цикл՝ архитектura, электrosnabjenie, слаbotочные системы, HVAC и энергоэффективная автоматизация.",
      it: "Progettazione ingegneristica completa: architettura, impianti elettrici, HVAC, ventilazione e automazione energetica.",
    },
    benefits: [
      {
        en: "International engineering standards and certifications",
        ru: "Международные инженерные стандарты и сертификации",
        hy: "Միջազգային ինժեներական стандарты",
        it: "Standard ingegneristici internazionali",
      },
      {
        en: "Integrated MEP and architectural coordination",
        ru: "Комплексная координация MEP и архитектуры",
        hy: "MEP և архитектurakan koordinatsia",
        it: "Coordinamento integrato MEP e architettura",
      },
      {
        en: "Energy-efficient and smart building solutions",
        ru: "Энергоэффективные и умные решения для зданий",
        hy: "Էներգաարդյունավետ և smart լուծումներ",
        it: "Soluzioni smart ed energeticamente efficienti",
      },
    ],
    faq: [
      {
        question: {
          en: "Do you handle project supervision?",
          ru: "Вы ведёте авторский надзор?",
          hy: "Կատարում ե՞ք հեղինակային վերահսկում",
          it: "Gestite la supervisione di cantiere?",
        },
        answer: {
          en: "Yes — from design documentation to commissioning and handover.",
          ru: "Да — от проектной документации до пусконаладки и сдачи объекта.",
          hy: "Այո — նախագծից մինչև հանձնում։",
          it: "Sì — dalla documentazione al collaudo finale.",
        },
      },
    ],
    tags: ["HVAC", "MEP", "Automation"],
  },
  {
    slug: "horeca",
    icon: "utensils",
    pillar: true,
    title: {
      en: "HoReCa Solutions",
      ru: "HoReCa Solutions",
      hy: "HoReCa լուծումներ",
      it: "Soluzioni HoReCa",
    },
    shortDescription: {
      en: "Hotels, restaurants, and hospitality venues — concept to launch.",
      ru: "Отели, рестораны, HoReCa — от концепции до запуска.",
      hy: "Հյուրանոցներ, ռեստորաններ — գաղափարից մինչև գործարկում։",
      it: "Hotel e ristoranti — dal concept al lancio.",
    },
    description: {
      en: "Comprehensive solutions for hotels, restaurants, cafés, bars, food courts, resorts, and apart-hotels: concept development, design, equipment selection, supply, installation, automation, staff training, and operational launch.",
      ru: "Комплексные решения для гостиниц, ресторанов, кафе, баров, фуд-кортов, курортов и апарт-отелей: концепция, проектирование, подбор оборудования, поставка, монтаж, автоматизация, обучение персонала и запуск.",
      hy: "Համակարգային լուծումներ հյուրանոցների, ռեստորանների և կафեների համար՝ концепцияից մինչև գործարկում։",
      it: "Soluzioni complete per hotel, ristoranti e resort: concept, design, attrezzature, installazione e avvio operativo.",
    },
    benefits: [
      {
        en: "End-to-end project delivery under one contract",
        ru: "Полный цикл реализации в одном контракте",
        hy: "Ամբողջական цикл մեկ պայմանագրով",
        it: "Consegna end-to-end con un unico contratto",
      },
      {
        en: "Kitchen and front-of-house workflow optimization",
        ru: "Оптимизация кухни и зала",
        hy: "Խոհանոցի և դահլիճի workflow օպտիմալացում",
        it: "Ottimizzazione flussi cucina e sala",
      },
      {
        en: "Equipment sourcing from global manufacturers",
        ru: "Поставка оборудования от мировых производителей",
        hy: "Գլոբալ արտադրողներից սարքավորում",
        it: "Fornitura attrezzature da produttori globali",
      },
    ],
    faq: [
      {
        question: {
          en: "Can you manage a full hotel opening?",
          ru: "Можете ли вы открыть отель под ключ?",
          hy: "Կարո՞ղ եք հյուրանոց բացել «կлючով»",
          it: "Potete gestire l'apertura completa di un hotel?",
        },
        answer: {
          en: "Yes — we handle concept, engineering, procurement, installation, training, and launch.",
          ru: "Да — концепция, инженерия, закупки, монтаж, обучение и запуск.",
          hy: "Այո — concept-ից մինչև launch։",
          it: "Sì — concept, ingegneria, approvvigionamento e avvio.",
        },
      },
    ],
    tags: ["Hotels", "Restaurants", "Launch"],
  },
  {
    slug: "digital",
    icon: "code",
    title: {
      en: "Digital Solutions",
      ru: "Digital Solutions",
      hy: "Թվային լուծումներ",
      it: "Soluzioni digitali",
    },
    shortDescription: {
      en: "Websites, apps, CRM, ERP, AI, and business automation.",
      ru: "Сайты, приложения, CRM, ERP, AI и автоматизация бизнеса.",
      hy: "Կայքեր, հավելվածներ, CRM, ERP, AI և ավտոմատացում։",
      it: "Siti, app, CRM, ERP, AI e automazione.",
    },
    description: {
      en: "We build high-performance digital products: corporate websites, e-commerce, portals, CRM and ERP systems, mobile apps, AI integrations, chatbots, and complex third-party integrations tailored to your business processes.",
      ru: "Создаём высокопроизводительные digital-продукты: корпоративные сайты, интернет-магазины, порталы, CRM и ERP, мобильные приложения, AI-интеграции, чат-боты и сложные интеграции под ваши бизнес-процессы.",
      hy: "Ստեղծում ենք high-performance цифровые продукты՝ կայքեր, e-commerce, CRM/ERP, mobile apps և AI։",
      it: "Prodotti digitali ad alte prestazioni: siti corporate, e-commerce, CRM, ERP, app mobile e AI.",
    },
    benefits: [
      {
        en: "Mobile-first, SEO-ready, cloud-native architecture",
        ru: "Mobile-first, SEO-ready, облачная архитектура",
        hy: "Mobile-first, SEO-ready, cloud-native",
        it: "Architettura mobile-first, SEO-ready, cloud-native",
      },
      {
        en: "Custom CRM/ERP aligned with your workflows",
        ru: "CRM/ERP под ваши процессы",
        hy: "CRM/ERP ձեր workflow-ին համապատասխան",
        it: "CRM/ERP allineati ai vostri processi",
      },
      {
        en: "AI-powered automation and intelligent assistants",
        ru: "AI-автоматизация и интelligentные ассистенты",
        hy: "AI ավտոմատացում և intelligent assistants",
        it: "Automazione AI e assistenti intelligenti",
      },
    ],
    faq: [
      {
        question: {
          en: "What tech stack do you use?",
          ru: "Какой стек технологий вы используете?",
          hy: "Որ tech stack-ն եք օգտագործում?",
          it: "Quale stack tecnologico usate?",
        },
        answer: {
          en: "Next.js, React, Node.js, cloud infrastructure — selected per project requirements.",
          ru: "Next.js, React, Node.js, облачная инфраструктура — под задачи проекта.",
          hy: "Next.js, React, Node.js, cloud — ըստ նախագծի։",
          it: "Next.js, React, Node.js, cloud — in base al progetto.",
        },
      },
    ],
    tags: ["Web", "Apps", "AI"],
  },
  {
    slug: "marketing",
    icon: "megaphone",
    title: {
      en: "Marketing & Branding",
      ru: "Маркетинг и брендинг",
      hy: "Մարքեթինգ և брендинг",
      it: "Marketing e branding",
    },
    shortDescription: {
      en: "Brand identity, strategy, SMM, SEO, and performance ads.",
      ru: "Брендинг, стратегия, SMM, SEO и performance-реклама.",
      hy: "Брендинг, стратегия, SMM, SEO և performance գովազդ։",
      it: "Brand identity, strategia, SMM, SEO e ads.",
    },
    description: {
      en: "From brand strategy and visual identity to full-funnel marketing: rebranding, logo design, SMM, SEO, Google Ads, Meta Ads, content marketing, and PR for B2B and B2C audiences.",
      ru: "От бренд-стратегии и фирменного стиля до full-funnel маркетинга: ребрендинг, логотипы, SMM, SEO, Google Ads, Meta Ads, контент-маркетинг и PR для B2B и B2C.",
      hy: "Brand strategy-ից մինչև full-funnel marketing՝ rebranding, SMM, SEO, ads և PR։",
      it: "Dalla strategia di brand al marketing full-funnel: rebranding, SMM, SEO, ads e PR.",
    },
    benefits: [
      {
        en: "Premium brand systems that scale globally",
        ru: "Премиальные бренд-системы для глобального масштаба",
        hy: "Premium brand systems глобального масштаба",
        it: "Sistemi di brand premium scalabili globalmente",
      },
      {
        en: "Performance marketing with measurable ROI",
        ru: "Performance-маркетинг с измеримым ROI",
        hy: "Performance marketing չափվող ROI-ով",
        it: "Performance marketing con ROI misurabile",
      },
      {
        en: "Integrated content and creative production",
        ru: "Интегрированное контент- и креатив-производство",
        hy: "Интegrirovannoe kontent- և creative արտադրություն",
        it: "Produzione integrata di contenuti e creatività",
      },
    ],
    faq: [],
    tags: ["Branding", "SEO", "Ads"],
  },
  {
    slug: "outsourcing",
    icon: "users",
    title: {
      en: "Business Outsourcing",
      ru: "Аутсорсинг",
      hy: "Աутսորսինգ",
      it: "Outsourcing aziendale",
    },
    shortDescription: {
      en: "Full business support: IT, marketing, sales, and operations.",
      ru: "Полное сопровождение: IT, маркетинг, продажи, операции.",
      hy: "Ամբողջական աջակցություն՝ IT, marketing, sales, operations։",
      it: "Supporto completo: IT, marketing, vendite e operazioni.",
    },
    description: {
      en: "Outsource entire business functions: IT support, marketing teams, project management, sales departments, technical support, procurement, and contractor management — so you focus on growth.",
      ru: "Аутсорсинг бизнес-функций: IT, маркетинг, управление проектами, отдел продаж, техподдержка, закупки и управление подрядчиками.",
      hy: "Բիզնես ֆունկցիաների аутсорсинг՝ IT, marketing, PM, sales, support, procurement։",
      it: "Outsourcing di funzioni aziendali: IT, marketing, PM, vendite e supporto.",
    },
    benefits: [
      {
        en: "Dedicated teams embedded in your operations",
        ru: "Выделенные команды в ваших процессах",
        hy: "Выделенные команды в ваших процессах",
        it: "Team dedicati integrati nelle vostre operazioni",
      },
      {
        en: "Flexible engagement models and SLAs",
        ru: "Гибкие модели и SLA",
        hy: "Гибкие модели и SLA",
        it: "Modelli flessibili e SLA",
      },
      {
        en: "Cost-efficient scaling without hiring overhead",
        ru: "Масштабирование без overhead найма",
        hy: "Масштабирование без overhead найма",
        it: "Scaling efficiente senza overhead di assunzioni",
      },
    ],
    faq: [],
    tags: ["IT", "Sales", "Support"],
  },
  {
    slug: "b2b-commerce",
    icon: "globe",
    title: {
      en: "B2B Commerce",
      ru: "B2B Commerce",
      hy: "B2B Commerce",
      it: "B2B Commerce",
    },
    shortDescription: {
      en: "Wholesale, import/export, logistics, and supply chain.",
      ru: "Опт, импорт/экспорт, логистика и снабжение.",
      hy: "Մեծածախ, import/export, logistics և supply chain։",
      it: "Wholesale, import/export, logistica e supply chain.",
    },
    description: {
      en: "International B2B trade operations: wholesale sales, cross-border logistics, manufacturer sourcing, import and export, and enterprise supply for manufacturing and retail.",
      ru: "Международная B2B торговля: оптовые продажи, трансграничная логистика, поиск производителей, импорт, экспорт и снабжение предприятий.",
      hy: "Միջազգային B2B առևտուր՝ wholesale, logistics, import/export և enterprise supply։",
      it: "Commercio B2B internazionale: wholesale, logistica, import/export e supply chain.",
    },
    benefits: [
      {
        en: "Global supplier and manufacturer network",
        ru: "Глобальная сеть поставщиков и производителей",
        hy: "Глобальная сеть поставщиков",
        it: "Rete globale di fornitori e produttori",
      },
      {
        en: "End-to-end logistics and customs support",
        ru: "Логистика и таможенное сопровождение",
        hy: "Logistics և customs support",
        it: "Logistica e supporto doganale end-to-end",
      },
      {
        en: "Enterprise procurement at scale",
        ru: "Корпоративные закупки в масштабе",
        hy: "Enterprise procurement масштабе",
        it: "Approvvigionamento enterprise su larga scala",
      },
    ],
    faq: [],
    tags: ["Trade", "Logistics", "Supply"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
