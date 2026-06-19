import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  width?: number;
  priority?: boolean;
};

/** Official wordmark — B2U B2B (602×161 source) */
export function BrandLogo({ className, width = 132, priority = false }: BrandLogoProps) {
  const height = Math.round(width * (161 / 602));

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
