export type InfinityVariant =
  | "vivid"
  | "nova"
  | "shimmer"
  | "eclipse"
  | "glare"
  | "flare";

export type SceneShape = {
  id: string;
  src: string;
  className: string;
  scrollRange: [number, number];
  yRange: [number, number];
  priority?: boolean;
  floatDuration?: number;
  mobile?: boolean;
};

export const HOME_SCENES: SceneShape[] = [
  {
    id: "luminous",
    src: "/scene/infinity/Luminous.png",
    className: "top-[-4%] -right-[12%] w-[min(400px,70vw)] md:-right-[5%] md:w-[360px]",
    scrollRange: [0, 2400],
    yRange: [0, 220],
    priority: true,
    floatDuration: 8,
    mobile: true,
  },
  {
    id: "twilight",
    src: "/scene/infinity/Twilight.png",
    className: "bottom-[2%] -left-[14%] w-[min(320px,62vw)] md:-left-[6%] md:w-[300px]",
    scrollRange: [0, 2400],
    yRange: [0, -180],
    floatDuration: 9,
    mobile: true,
  },
];

export const PAGE_SCENES: Record<InfinityVariant, SceneShape[]> = {
  vivid: [
    {
      id: "vivid-main",
      src: "/scene/infinity/Vivid.png",
      className: "top-[4%] -right-[16%] w-[min(380px,78vw)] md:-right-[4%] md:w-[340px]",
      scrollRange: [0, 2000],
      yRange: [0, 160],
      priority: true,
      floatDuration: 8,
      mobile: true,
    },
    {
      id: "vivid-accent",
      src: "/scene/infinity/Prism.png",
      className: "bottom-[8%] -left-[18%] hidden w-[240px] md:block md:-left-[5%] md:w-[220px]",
      scrollRange: [0, 2000],
      yRange: [0, -120],
      floatDuration: 9,
    },
  ],
  nova: [
    {
      id: "nova-main",
      src: "/scene/infinity/Nova.png",
      className: "top-[2%] -right-[14%] w-[min(360px,76vw)] md:-right-[3%] md:w-[320px]",
      scrollRange: [0, 2000],
      yRange: [0, 140],
      priority: true,
      floatDuration: 7,
      mobile: true,
    },
    {
      id: "nova-accent",
      src: "/scene/infinity/Radiance.png",
      className: "bottom-[10%] -left-[16%] hidden w-[220px] md:block md:-left-[4%] md:w-[200px]",
      scrollRange: [0, 2000],
      yRange: [0, -100],
      floatDuration: 8,
    },
  ],
  shimmer: [
    {
      id: "shimmer-main",
      src: "/scene/infinity/Shimmer.png",
      className: "top-[6%] -left-[14%] w-[min(340px,74vw)] md:-left-[2%] md:w-[300px]",
      scrollRange: [0, 2000],
      yRange: [0, 130],
      priority: true,
      floatDuration: 8,
      mobile: true,
    },
    {
      id: "shimmer-accent",
      src: "/scene/infinity/Glimmer.png",
      className: "bottom-[6%] -right-[16%] hidden w-[230px] md:block md:-right-[4%] md:w-[210px]",
      scrollRange: [0, 2000],
      yRange: [0, -110],
      floatDuration: 9,
    },
  ],
  eclipse: [
    {
      id: "eclipse-main",
      src: "/scene/infinity/Eclipse.png",
      className: "top-[3%] -right-[15%] w-[min(370px,77vw)] md:-right-[4%] md:w-[330px]",
      scrollRange: [0, 2000],
      yRange: [0, 150],
      priority: true,
      floatDuration: 8,
      mobile: true,
    },
    {
      id: "eclipse-accent",
      src: "/scene/infinity/Twilight.png",
      className: "bottom-[8%] -left-[15%] hidden w-[250px] md:block md:-left-[5%] md:w-[230px]",
      scrollRange: [0, 2000],
      yRange: [0, -130],
      floatDuration: 9,
    },
  ],
  glare: [
    {
      id: "glare-main",
      src: "/scene/infinity/Glare.png",
      className: "top-[5%] -left-[13%] w-[min(350px,75vw)] md:-left-[3%] md:w-[310px]",
      scrollRange: [0, 2000],
      yRange: [0, 140],
      priority: true,
      floatDuration: 7,
      mobile: true,
    },
    {
      id: "glare-accent",
      src: "/scene/infinity/Flash.png",
      className: "bottom-[10%] -right-[14%] hidden w-[220px] md:block md:-right-[4%] md:w-[200px]",
      scrollRange: [0, 2000],
      yRange: [0, -100],
      floatDuration: 8,
    },
  ],
  flare: [
    {
      id: "flare-main",
      src: "/scene/infinity/Flare.png",
      className: "top-[2%] -right-[14%] w-[min(360px,76vw)] md:-right-[4%] md:w-[320px]",
      scrollRange: [0, 2000],
      yRange: [0, 150],
      priority: true,
      floatDuration: 8,
      mobile: true,
    },
    {
      id: "flare-accent",
      src: "/scene/infinity/Glow.png",
      className: "bottom-[6%] -left-[16%] hidden w-[240px] md:block md:-left-[5%] md:w-[220px]",
      scrollRange: [0, 2000],
      yRange: [0, -120],
      floatDuration: 9,
    },
  ],
};

export const PAGE_INFINITY_VARIANT: Record<string, InfinityVariant> = {
  map: "vivid",
  blog: "nova",
  contact: "shimmer",
  portfolio: "eclipse",
  services: "glare",
  about: "flare",
};
