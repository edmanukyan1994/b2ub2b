export type InfinityVariant =
  | "vivid"
  | "nova"
  | "shimmer"
  | "eclipse"
  | "glare"
  | "flare";

export type ShapeKind =
  | "torusKnot"
  | "icosahedron"
  | "torus"
  | "octahedron"
  | "dodecahedron"
  | "sphere";

export type ShapeConfig = {
  kind: ShapeKind;
  position: [number, number, number];
  scale: number;
  rotationSpeed: [number, number, number];
  color: string;
  emissive?: string;
  iridescence: number;
  transmission: number;
  metalness: number;
  roughness: number;
  torusArgs?: [number, number, number, number];
  torusKnotArgs?: [number, number, number, number, number, number];
};

export type VariantConfig = {
  page: string;
  shapes: ShapeConfig[];
  lights: { color: string; position: [number, number, number]; intensity: number }[];
};

export const INFINITY_VARIANTS: Record<InfinityVariant, VariantConfig> = {
  vivid: {
    page: "map",
    shapes: [
      {
        kind: "torusKnot",
        position: [2.4, 0.1, -2.5],
        scale: 0.72,
        rotationSpeed: [0.08, 0.14, 0.04],
        color: "#22d3ee",
        iridescence: 1,
        transmission: 0.35,
        metalness: 0.85,
        roughness: 0.12,
        torusKnotArgs: [1, 0.34, 128, 24, 2, 5],
      },
      {
        kind: "icosahedron",
        position: [-2.1, -0.6, -3.2],
        scale: 0.38,
        rotationSpeed: [0.05, 0.1, 0.06],
        color: "#f472b6",
        emissive: "#831843",
        iridescence: 0.85,
        transmission: 0.25,
        metalness: 0.9,
        roughness: 0.1,
      },
    ],
    lights: [
      { color: "#38bdf8", position: [4, 3, 4], intensity: 2.2 },
      { color: "#e879f9", position: [-3, -1, 3], intensity: 1.6 },
    ],
  },
  nova: {
    page: "blog",
    shapes: [
      {
        kind: "icosahedron",
        position: [2.2, 0.4, -2.8],
        scale: 0.95,
        rotationSpeed: [0.06, 0.12, 0.05],
        color: "#e0f2fe",
        emissive: "#0ea5e9",
        iridescence: 1,
        transmission: 0.2,
        metalness: 0.95,
        roughness: 0.08,
      },
      {
        kind: "sphere",
        position: [2.2, 0.4, -2.8],
        scale: 0.22,
        rotationSpeed: [0, 0.08, 0],
        color: "#ffffff",
        emissive: "#7dd3fc",
        iridescence: 0.5,
        transmission: 0,
        metalness: 0.2,
        roughness: 0.2,
      },
    ],
    lights: [
      { color: "#bae6fd", position: [5, 4, 2], intensity: 2.8 },
      { color: "#6366f1", position: [-2, 0, 4], intensity: 1.2 },
    ],
  },
  shimmer: {
    page: "contact",
    shapes: [
      {
        kind: "torus",
        position: [-2.3, 0.2, -2.6],
        scale: 1.05,
        rotationSpeed: [0.12, 0.06, 0.03],
        color: "#a5f3fc",
        iridescence: 1,
        transmission: 0.72,
        metalness: 0.4,
        roughness: 0.05,
        torusArgs: [1.1, 0.22, 64, 48],
      },
      {
        kind: "torus",
        position: [2.5, -0.3, -3],
        scale: 0.55,
        rotationSpeed: [0.08, 0.14, 0.02],
        color: "#ddd6fe",
        iridescence: 0.95,
        transmission: 0.65,
        metalness: 0.5,
        roughness: 0.06,
        torusArgs: [0.9, 0.16, 48, 32],
      },
    ],
    lights: [
      { color: "#5eead4", position: [3, 2, 5], intensity: 2 },
      { color: "#c4b5fd", position: [-4, -2, 2], intensity: 1.5 },
    ],
  },
  eclipse: {
    page: "portfolio",
    shapes: [
      {
        kind: "torus",
        position: [2.1, 0, -2.4],
        scale: 1.15,
        rotationSpeed: [0.04, 0.1, 0.02],
        color: "#312e81",
        emissive: "#1e1b4b",
        iridescence: 1,
        transmission: 0.15,
        metalness: 0.92,
        roughness: 0.18,
        torusArgs: [1.2, 0.42, 96, 48],
      },
      {
        kind: "sphere",
        position: [2.1, 0, -2.4],
        scale: 0.52,
        rotationSpeed: [0, 0.05, 0],
        color: "#0f172a",
        emissive: "#020617",
        iridescence: 0.3,
        transmission: 0,
        metalness: 0.8,
        roughness: 0.35,
      },
    ],
    lights: [
      { color: "#fbbf24", position: [6, 2, 1], intensity: 2.4 },
      { color: "#818cf8", position: [-3, -1, 4], intensity: 0.9 },
    ],
  },
  glare: {
    page: "services",
    shapes: [
      {
        kind: "octahedron",
        position: [-2.4, 0.3, -2.5],
        scale: 0.88,
        rotationSpeed: [0.1, 0.16, 0.07],
        color: "#f8fafc",
        emissive: "#38bdf8",
        iridescence: 0.9,
        transmission: 0.45,
        metalness: 0.98,
        roughness: 0.04,
      },
      {
        kind: "octahedron",
        position: [2.3, -0.5, -3.1],
        scale: 0.42,
        rotationSpeed: [0.07, 0.11, 0.09],
        color: "#bae6fd",
        iridescence: 1,
        transmission: 0.55,
        metalness: 0.92,
        roughness: 0.06,
      },
    ],
    lights: [
      { color: "#ffffff", position: [4, 5, 3], intensity: 3 },
      { color: "#0ea5e9", position: [-4, 0, 5], intensity: 1.4 },
    ],
  },
  flare: {
    page: "about",
    shapes: [
      {
        kind: "dodecahedron",
        position: [2.2, 0.15, -2.7],
        scale: 0.78,
        rotationSpeed: [0.05, 0.09, 0.04],
        color: "#fde68a",
        emissive: "#ea580c",
        iridescence: 0.85,
        transmission: 0.28,
        metalness: 0.88,
        roughness: 0.14,
      },
      {
        kind: "sphere",
        position: [-2.4, -0.35, -3],
        scale: 0.48,
        rotationSpeed: [0.03, 0.07, 0.02],
        color: "#fb7185",
        emissive: "#be123c",
        iridescence: 1,
        transmission: 0.22,
        metalness: 0.9,
        roughness: 0.1,
      },
    ],
    lights: [
      { color: "#fdba74", position: [5, 3, 2], intensity: 2.5 },
      { color: "#f472b6", position: [-3, -2, 4], intensity: 1.6 },
    ],
  },
};

export const PAGE_INFINITY_VARIANT: Record<string, InfinityVariant> = {
  map: "vivid",
  blog: "nova",
  contact: "shimmer",
  portfolio: "eclipse",
  services: "glare",
  about: "flare",
};
