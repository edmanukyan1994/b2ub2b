import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_ASPECT = 450 / 2497;

type BrandLogoProps = {
  className?: string;
  width?: number;
  priority?: boolean;
};

/** B2U B2B white wordmark on dark badge (readable on light glass UI) */
export function BrandLogo({ className, width = 132, priority = false }: BrandLogoProps) {
  const height = Math.round(width * LOGO_ASPECT);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl bg-slate-900 px-3 py-1.5 shadow-sm",
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt="B2U B2B"
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-auto"
        style={{ width, height: "auto", maxHeight: height }}
      />
    </span>
  );
}
