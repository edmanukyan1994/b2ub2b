"use client";

import Image from "next/image";
import type { ClientLogo } from "@/lib/types";
import { cn } from "@/lib/utils";

type ClientLogoMarqueeProps = {
  logos: ClientLogo[];
  className?: string;
  /** Repeat logos for seamless loop */
  repeat?: number;
  gapClassName?: string;
};

export function ClientLogoMarquee({
  logos,
  className,
  repeat = 3,
  gapClassName = "gap-14 md:gap-20",
}: ClientLogoMarqueeProps) {
  const items = Array.from({ length: repeat }, () => logos).flat();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white/50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white/50 to-transparent" />
      <div className={cn("animate-marquee flex w-max shrink-0 items-center", gapClassName)}>
        {items.map((client, i) => (
          <ClientLogoItem key={`${client.id}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}

function ClientLogoItem({ client }: { client: ClientLogo }) {
  const inner = (
    <div className="group flex h-12 w-[140px] shrink-0 items-center justify-center md:h-14 md:w-[160px]">
      <Image
        src={client.logo}
        alt={client.name}
        width={160}
        height={56}
        className="h-8 w-auto max-w-[140px] object-contain object-center opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-9 md:max-w-[150px]"
        unoptimized
      />
    </div>
  );

  if (client.website) {
    return (
      <a
        href={client.website}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 cursor-pointer"
        title={client.name}
      >
        {inner}
      </a>
    );
  }

  return <div className="shrink-0" title={client.name}>{inner}</div>;
}
