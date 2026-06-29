import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_ASPECT = 262 / 1024;

type BrandLogoProps = {
  className?: string;
  width?: number;
  priority?: boolean;
};

/** B2U B2B wordmark */
export function BrandLogo({ className, width = 132, priority = false }: BrandLogoProps) {
  const height = Math.round(width * LOGO_ASPECT);

  return (
    <Image
      src="/logo.png"
      alt="B2U B2B"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto", className)}
      style={{ width, height: "auto", maxHeight: height }}
    />
  );
}
