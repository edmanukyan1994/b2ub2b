import { cn } from "@/lib/utils";

const DEFAULT_LOGO = "/logo.png";
const DEFAULT_ASPECT = 450 / 2497;

type BrandLogoProps = {
  className?: string;
  width?: number;
  priority?: boolean;
  logoUrl?: string;
};

/** Site wordmark — URL from CMS siteSettings or default public/logo.png */
export function BrandLogo({ className, width = 168, priority = false, logoUrl = DEFAULT_LOGO }: BrandLogoProps) {
  const height = Math.round(width * DEFAULT_ASPECT);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoUrl}
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
