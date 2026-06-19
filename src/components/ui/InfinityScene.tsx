"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type SceneShape = {
  id: string;
  src: string;
  className: string;
  scrollRange: [number, number];
  yRange: [number, number];
  priority?: boolean;
  floatDuration?: number;
};

const SHAPES: SceneShape[] = [
  {
    id: "luminous",
    src: "/scene/infinity/Luminous.png",
    className: "top-[-4%] -right-[12%] w-[min(400px,70vw)] md:-right-[5%] md:w-[360px]",
    scrollRange: [0, 2400],
    yRange: [0, 220],
    priority: true,
    floatDuration: 8,
  },
  {
    id: "twilight",
    src: "/scene/infinity/Twilight.png",
    className: "bottom-[2%] -left-[14%] w-[min(320px,62vw)] md:-left-[6%] md:w-[300px]",
    scrollRange: [0, 2400],
    yRange: [0, -180],
    floatDuration: 9,
  },
];

function SceneShapeItem({ shape, reducedMotion }: { shape: SceneShape; reducedMotion: boolean | null }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, shape.scrollRange, shape.yRange);

  return (
    <motion.div
      className={`absolute will-change-transform opacity-90 ${shape.className}`}
      style={reducedMotion ? undefined : { y }}
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: shape.floatDuration ?? 8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <Image
          src={shape.src}
          alt=""
          width={500}
          height={650}
          priority={shape.priority}
          sizes="(max-width: 768px) 70vw, 360px"
          className="h-auto w-full select-none drop-shadow-[0_20px_40px_rgba(15,23,42,0.15)]"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

export function InfinityScene() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {SHAPES.map((shape) => (
        <SceneShapeItem key={shape.id} shape={shape} reducedMotion={reducedMotion} />
      ))}
    </div>
  );
}
