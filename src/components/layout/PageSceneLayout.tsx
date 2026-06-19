"use client";

import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { PageInfinityScene } from "@/components/ui/PageInfinityScene";
import type { InfinityVariant } from "@/lib/infinity-scenes";
import { cn } from "@/lib/utils";

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
      <PageInfinityScene variant={variant} />
      <div className={cn("page-content relative z-[2] pt-28 md:pt-32", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
