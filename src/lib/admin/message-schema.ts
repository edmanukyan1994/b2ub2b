export type MessageField = {
  path: string;
  label: string;
  multiline?: boolean;
  hint?: string;
};

export type MessageSection = {
  id: string;
  label: string;
  fields: MessageField[];
};

export const MESSAGE_SECTIONS: MessageSection[] = [
  {
    id: "meta",
    label: "SEO",
    fields: [
      { path: "meta.title", label: "Заголовок сайта" },
      { path: "meta.description", label: "Описание для поиска", multiline: true },
    ],
  },
  {
    id: "nav",
    label: "Меню",
    fields: [
      { path: "nav.home", label: "Главная" },
      { path: "nav.about", label: "О нас" },
      { path: "nav.services", label: "Услуги" },
      { path: "nav.portfolio", label: "Портфолио" },
      { path: "nav.map", label: "Карта" },
      { path: "nav.blog", label: "Блог" },
      { path: "nav.contact", label: "Контакты" },
      { path: "nav.getStarted", label: "Кнопка «Начать»" },
    ],
  },
  {
    id: "hero",
    label: "Главный экран",
    fields: [
      { path: "hero.tagline", label: "Слоган" },
      { path: "hero.subtitle", label: "Подзаголовок" },
      { path: "hero.description", label: "Описание", multiline: true },
      { path: "hero.ctaPrimary", label: "Кнопка 1" },
      { path: "hero.ctaSecondary", label: "Кнопка 2" },
      { path: "hero.ctaQuote", label: "Кнопка 3" },
      { path: "hero.badges.enterprise", label: "Бейдж: Enterprise" },
      { path: "hero.badges.regions", label: "Бейдж: Регионы" },
      { path: "hero.badges.partner", label: "Бейдж: Партнёр" },
      { path: "hero.miniStats.years", label: "Стат: годы (подпись)" },
      { path: "hero.miniStats.projects", label: "Стат: проекты (подпись)" },
      { path: "hero.miniStats.countries", label: "Стат: страны (подпись)" },
      { path: "hero.miniStats.services", label: "Стат: услуги (подпись)" },
    ],
  },
  {
    id: "home",
    label: "Главная страница",
    fields: [
      { path: "home.aboutLabel", label: "Блок «О нас»: метка" },
      { path: "home.aboutTitle", label: "Блок «О нас»: заголовок" },
      { path: "home.aboutText", label: "Блок «О нас»: текст", multiline: true },
      { path: "home.servicesLabel", label: "Услуги: метка" },
      { path: "home.servicesTitle", label: "Услуги: заголовок" },
      { path: "home.portfolioLabel", label: "Портфолио: метка" },
      { path: "home.portfolioTitle", label: "Портфолио: заголовок" },
      { path: "home.clientsLabel", label: "Клиенты: метка" },
      { path: "home.clientsTitle", label: "Клиенты: заголовок" },
      { path: "home.testimonialsLabel", label: "Отзывы: метка" },
      { path: "home.testimonialsTitle", label: "Отзывы: заголовок" },
      { path: "home.partnersLabel", label: "Партнёры: метка" },
      { path: "home.partnersTitle", label: "Партнёры: заголовок" },
      { path: "home.partnersText", label: "Партнёры: текст", multiline: true },
      { path: "home.ctaTitle", label: "CTA: заголовок" },
      { path: "home.ctaText", label: "CTA: текст", multiline: true },
      { path: "home.viewAll", label: "«Смотреть все»" },
      { path: "home.readMore", label: "«Подробнее»" },
    ],
  },
  {
    id: "about",
    label: "О компании",
    fields: [
      { path: "about.title", label: "Заголовок" },
      { path: "about.subtitle", label: "Подзаголовок" },
      { path: "about.missionTitle", label: "Миссия: заголовок" },
      { path: "about.missionText", label: "Миссия: текст", multiline: true },
      { path: "about.valuesTitle", label: "Ценности: заголовок" },
      { path: "about.teamTitle", label: "Команда: заголовок" },
      { path: "about.teamText", label: "Команда: текст", multiline: true },
    ],
  },
  {
    id: "contact",
    label: "Контакты",
    fields: [
      { path: "contact.title", label: "Заголовок" },
      { path: "contact.subtitle", label: "Подзаголовок" },
      { path: "contact.form.name", label: "Поле: имя" },
      { path: "contact.form.phone", label: "Поле: телефон" },
      { path: "contact.form.email", label: "Поле: email" },
      { path: "contact.form.submit", label: "Кнопка отправки" },
      { path: "contact.form.success", label: "Сообщение об успехе", multiline: true },
      { path: "contact.form.error", label: "Сообщение об ошибке" },
      { path: "contact.info.emailValue", label: "Email компании" },
      { path: "contact.info.phonePrimary", label: "Телефон 1" },
      { path: "contact.info.phoneSecondary", label: "Телефон 2 / WhatsApp" },
      { path: "contact.info.addressArmenia", label: "Адрес: Армения", multiline: true },
      { path: "contact.info.addressNetherlands", label: "Адрес: Нидерланды", multiline: true },
      { path: "contact.sidebar.title", label: "Сайдбар: заголовок" },
      { path: "contact.sidebar.text", label: "Сайдбар: текст", multiline: true },
    ],
  },
  {
    id: "footer",
    label: "Подвал",
    fields: [
      { path: "footer.tagline", label: "Слоган" },
      { path: "footer.description", label: "Описание", multiline: true },
      { path: "footer.rights", label: "Копирайт" },
      { path: "footer.services", label: "Заголовок «Услуги»" },
      { path: "footer.company", label: "Заголовок «Компания»" },
    ],
  },
  {
    id: "portfolio",
    label: "Портфолио (страница)",
    fields: [
      { path: "portfolio.title", label: "Заголовок" },
      { path: "portfolio.subtitle", label: "Подзаголовок" },
      { path: "portfolio.worksTitle", label: "«Что сделали»" },
      { path: "portfolio.resultsTitle", label: "«Результаты»" },
      { path: "portfolio.backToPortfolio", label: "«Назад»" },
    ],
  },
  {
    id: "blog",
    label: "Блог (страница)",
    fields: [
      { path: "blog.title", label: "Заголовок" },
      { path: "blog.subtitle", label: "Подзаголовок" },
      { path: "blog.readTime", label: "«мин чтения»" },
      { path: "blog.backToBlog", label: "«Назад в блог»" },
    ],
  },
  {
    id: "map",
    label: "Карта (страница)",
    fields: [
      { path: "map.title", label: "Заголовок" },
      { path: "map.subtitle", label: "Подзаголовок" },
      { path: "map.projects", label: "Слово «проекты»" },
    ],
  },
];
