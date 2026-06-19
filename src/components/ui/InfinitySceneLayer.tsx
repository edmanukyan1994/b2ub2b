"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SceneShape } from "@/lib/infinity-scenes";

export function SceneShapeItem({
  shape,
  reducedMotion,
}: {
  shape: SceneShape;
  reducedMotion: boolean | null;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, shape.scrollRange, shape.yRange);

  return (
    <motion.div
      className={cn(
        "absolute will-change-transform opacity-[0.88]",
        shape.className,
        shape.mobile === false && "hidden md:block",
      )}
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
          sizes="(max-width: 768px) 75vw, 340px"
          className="h-auto w-full select-none drop-shadow-[0_24px_48px_rgba(15,23,42,0.18)]"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

export function InfinitySceneLayer({ shapes }: { shapes: SceneShape[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {shapes.map((shape) => (
        <SceneShapeItem key={shape.id} shape={shape} reducedMotion={reducedMotion} />
      ))}
    </div>
  );
}
