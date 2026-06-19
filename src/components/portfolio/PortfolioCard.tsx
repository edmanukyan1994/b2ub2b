import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { PortfolioProject } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type PortfolioCardProps = {
  project: PortfolioProject;
  locale: Locale;
  size?: "default" | "featured" | "wide";
  className?: string;
};

export function PortfolioCard({ project, locale, size = "default", className }: PortfolioCardProps) {
  const isFeatured = size === "featured";

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn(
        "group relative block cursor-pointer overflow-hidden rounded-[1.25rem] bg-slate-950 shadow-md transition-all duration-500 hover:shadow-2xl md:rounded-[1.5rem]",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          isFeatured ? "aspect-[16/11] md:aspect-[16/10] lg:min-h-[520px] lg:aspect-auto lg:h-full" : "aspect-[4/3]",
          size === "wide" && "aspect-[21/9] md:aspect-[2.4/1]",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-out group-hover:scale-[1.03]",
            project.gradient,
          )}
        />

        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={project.title[locale]}
            fill
            unoptimized={project.coverAnimated}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes={
              isFeatured
                ? "(max-width: 1024px) 100vw, 55vw"
                : size === "wide"
                  ? "100vw"
                  : "(max-width: 768px) 100vw, 33vw"
            }
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5 transition-all duration-500 group-hover:from-black/85 group-hover:via-black/25" />

        <div className="absolute right-4 top-4 z-10 flex flex-wrap justify-end gap-2 md:right-5 md:top-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/20 bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md md:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.clientLogo && (
          <div className="absolute left-4 top-4 z-10 rounded-xl bg-white px-3 py-2 shadow-lg md:left-5 md:top-5">
            <Image
              src={project.clientLogo}
              alt={project.client}
              width={120}
              height={40}
              className="h-5 w-auto max-w-[100px] object-contain md:h-6 md:max-w-[120px]"
            />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 md:p-6 lg:p-8">
          <div className="min-w-0 translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60 md:text-sm">
              {project.client}
            </p>
            <h3
              className={cn(
                "mt-1 font-semibold tracking-tight text-white",
                isFeatured ? "text-2xl md:text-3xl lg:text-[2.5rem] lg:leading-tight" : "text-lg md:text-xl",
              )}
            >
              {project.title[locale]}
            </h3>
            <p
              className={cn(
                "mt-2 max-w-lg text-sm text-white/75 transition-all duration-500 md:text-base",
                isFeatured ? "line-clamp-2 opacity-90" : "line-clamp-1 opacity-0 group-hover:line-clamp-2 group-hover:opacity-90",
              )}
            >
              {project.description[locale]}
            </p>
          </div>

          <span className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-slate-900">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
