import { cn } from "@/lib/utils";

const LOGO_ASPECT = 450 / 2497;

type BrandLogoProps = {
  className?: string;
  width?: number;
  priority?: boolean;
};

/** B2U B2B white wordmark from `B2U B2B.png` — transparent background only. */
export function BrandLogo({ className, width = 168, priority = false }: BrandLogoProps) {
  const height = Math.round(width * LOGO_ASPECT);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png?v=3"
      alt="B2U B2B"
      width={width}
      height={height}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn(
        "block h-auto w-auto",
        "[filter:drop-shadow(0_1px_2px_rgba(15,23,42,0.45))]",
        className,
      )}
      style={{ width, height: "auto", maxHeight: height }}
    />
  );
}
