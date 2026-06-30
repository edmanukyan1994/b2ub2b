import { cn } from "@/lib/utils";

const LOGO_ASPECT = 450 / 2497;

type BrandLogoProps = {
  className?: string;
  width?: number;
  priority?: boolean;
};

/** B2U B2B white wordmark — served directly from `B2U B2B.png` without image optimizer. */
export function BrandLogo({ className, width = 168, priority = false }: BrandLogoProps) {
  const height = Math.round(width * LOGO_ASPECT);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl bg-slate-900 px-3 py-1.5 shadow-sm",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png?v=2"
        alt="B2U B2B"
        width={width}
        height={height}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="block h-auto max-h-full w-auto"
        style={{ width, height: "auto", maxHeight: height }}
      />
    </span>
  );
}
