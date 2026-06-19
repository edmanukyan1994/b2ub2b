"use client";

import { cn } from "@/lib/utils";

type LiquidBackgroundProps = {
  className?: string;
  variant?: "hero" | "section" | "subtle";
};

export function LiquidBackground({ className, variant = "section" }: LiquidBackgroundProps) {
  const scale = variant === "hero" ? 0.5 : variant === "subtle" ? 0.35 : 0.4;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity: scale }}
    >
      <div
        className="liquid-blob-1 absolute -right-[5%] top-[0%] h-[500px] w-[500px] rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.45) 0%, transparent 65%)" }}
      />
      <div
        className="liquid-blob-2 absolute -left-[10%] top-[25%] h-[450px] w-[450px] rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 65%)" }}
      />
    </div>
  );
}

export function LiquidPanel({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "liquid-glass-panel relative hidden min-h-[360px] overflow-hidden p-6 lg:block lg:p-8",
        className,
      )}
    >
      <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between">
        <div className="flex gap-3">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 liquid-glow-blue shadow-lg" />
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-300 to-emerald-500 liquid-glow-teal shadow-lg" />
          <div
            className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-300 to-purple-500 shadow-lg"
            style={{ boxShadow: "0 12px 32px rgba(167,139,250,0.4)" }}
          />
        </div>

        <div className="liquid-glass-pill-nested mx-auto w-fit px-6 py-4 text-center">
          <p className="relative z-10 text-xs font-bold uppercase tracking-[0.25em] text-blue-600">B2UB2B</p>
          <p className="relative z-10 mt-1 text-xl font-bold tracking-tight text-primary">From Idea to Success</p>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {["Consulting", "Engineering", "Digital"].map((label) => (
            <div key={label} className="liquid-glass-pill-nested py-2.5 text-center md:py-3">
              <span className="relative z-10 text-[10px] font-bold uppercase tracking-wide text-secondary md:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LiquidHeroBoard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("liquid-glass-panel relative overflow-hidden p-6 md:p-10 lg:p-12", className)}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
