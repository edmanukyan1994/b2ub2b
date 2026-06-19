"use client";

import dynamic from "next/dynamic";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import type { InfinityVariant } from "@/lib/infinity-variants";
import { cn } from "@/lib/utils";

const InfinityShape3D = dynamic(
  () => import("@/components/ui/InfinityShape3D").then((m) => m.InfinityShape3D),
  { ssr: false },
);

type PageSceneLayoutProps = {
  variant: InfinityVariant;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function PageSceneLayout({
  variant,
  children,
  className,
  contentClassName,
}: PageSceneLayoutProps) {
  return (
    <div className={cn("section-liquid relative min-h-screen", className)}>
      <div aria-hidden className={cn("page-scene-tint pointer-events-none fixed inset-0 z-0", `page-scene-${variant}`)} />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <LiquidBackground variant="hero" />
      </div>
      <InfinityShape3D variant={variant} />
      <div className={cn("page-content relative z-[2] pt-28 md:pt-32", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
