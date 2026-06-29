import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  width?: number;
  priority?: boolean;
};

/** Wordmark — slate + brand blue, tuned for light glass UI */
export function BrandLogo({ className, width = 132, priority = false }: BrandLogoProps) {
  const height = Math.round(width * (80 / 420));

  return (
    <Image
      src="/logo.svg"
      alt="B2U B2B"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto", className)}
      style={{ width, height: "auto", maxHeight: height }}
    />
  );
}
