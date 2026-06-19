import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const glossColors = {
  cyan: "from-sky-300 via-sky-500 to-blue-700 shadow-[0_12px_32px_rgba(14,165,233,0.45)]",
  violet: "from-violet-300 via-purple-500 to-indigo-700 shadow-[0_12px_32px_rgba(139,92,246,0.4)]",
  teal: "from-teal-300 via-emerald-500 to-teal-800 shadow-[0_12px_32px_rgba(20,184,166,0.4)]",
  blue: "from-blue-300 via-blue-500 to-blue-800 shadow-[0_12px_32px_rgba(37,99,235,0.4)]",
  orange: "from-amber-300 via-orange-500 to-red-600 shadow-[0_12px_32px_rgba(249,115,22,0.38)]",
  slate: "from-slate-200 via-slate-400 to-slate-700 shadow-[0_12px_28px_rgba(51,65,85,0.35)]",
};

type GlossIconProps = {
  children: ReactNode;
  color?: keyof typeof glossColors;
  size?: "md" | "lg";
  className?: string;
};

export function GlossIcon({ children, color = "cyan", size = "md", className }: GlossIconProps) {
  return (
    <div
      className={cn(
        "gloss-icon relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl text-white",
        size === "md" ? "h-14 w-14" : "h-16 w-16",
        className,
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", glossColors[color])} />
      <div className="gloss-icon-shine absolute inset-0" />
      <div className="relative z-10 drop-shadow-sm">{children}</div>
    </div>
  );
}
