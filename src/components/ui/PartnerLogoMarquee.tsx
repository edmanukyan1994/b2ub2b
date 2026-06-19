"use client";

import Image from "next/image";
import type { Partner } from "@/lib/types";
import { cn } from "@/lib/utils";

type PartnerLogoMarqueeProps = {
  partners: Partner[];
  className?: string;
  reverse?: boolean;
};

export function PartnerLogoMarquee({ partners, className, reverse }: PartnerLogoMarqueeProps) {
  const items = [...partners, ...partners];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white/20 to-transparent" />
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-16 md:gap-24",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {items.map((partner, i) => (
          <div
            key={`${partner.id}-${i}`}
            className="group flex h-14 w-[130px] shrink-0 items-center justify-center md:h-16 md:w-[150px]"
            title={partner.name}
          >
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={150}
                height={48}
                className="h-7 w-auto max-w-[130px] object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-90 group-hover:grayscale-0 md:h-8 md:max-w-[150px]"
                unoptimized
              />
            ) : (
              <span className="text-sm font-bold text-slate-600">{partner.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
