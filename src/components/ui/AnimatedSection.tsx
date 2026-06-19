"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={reducedMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 20 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({ label, title, description, className, align = "left" }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cta">{label}</p>
      <h2 className="text-3xl font-semibold tracking-[-0.02em] text-primary md:text-5xl md:leading-[1.08]">{title}</h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
