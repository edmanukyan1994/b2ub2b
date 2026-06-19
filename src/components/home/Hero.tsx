"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Globe2, ShieldCheck, TrendingUp } from "lucide-react";
import { Button, Badge } from "@/components/ui/Button";
import { LiquidHeroBoard } from "@/components/ui/LiquidBackground";
import { ClientLogoMarquee } from "@/components/ui/ClientLogoMarquee";
import { clientLogos } from "@/content/portfolio";

export function Hero() {
  const t = useTranslations("hero");
  const reducedMotion = useReducedMotion();

  const stats = [
    { value: "12+", label: "Years" },
    { value: "150+", label: "Projects" },
    { value: "8+", label: "Countries" },
    { value: "7", label: "Services" },
  ];

  const fade = (delay: number) =>
    reducedMotion
      ? { initial: false as const }
      : {
          initial: false as const,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="section-liquid relative pt-24 md:pt-28">
      <div className="relative mx-auto max-w-7xl px-4 pb-8 md:px-6 lg:px-8">
        <LiquidHeroBoard className="flex flex-col justify-center">
            <motion.div {...fade(0)} className="mb-5 flex flex-wrap gap-2">
              <Badge><ShieldCheck size={14} className="mr-1.5 text-sky-500" />Enterprise-grade</Badge>
              <Badge><Globe2 size={14} className="mr-1.5 text-teal-500" />Armenia · Georgia · EU</Badge>
              <Badge><TrendingUp size={14} className="mr-1.5 text-blue-600" />Full-cycle partner</Badge>
            </motion.div>

            <motion.p {...fade(0.05)} className="mb-3 text-sm font-semibold text-secondary">
              {t("subtitle")}
            </motion.p>

            <motion.h1
              {...fade(0.1)}
              className="text-[clamp(2.25rem,5.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-primary"
            >
              {t("tagline")}
            </motion.h1>

            <motion.p {...fade(0.18)} className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {t("description")}
            </motion.p>

            <motion.div {...fade(0.26)} className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" size="lg" className="group">
                {t("ctaPrimary")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button href="/portfolio" variant="secondary" size="lg">{t("ctaSecondary")}</Button>
              <Button href="/contact?type=quote" variant="ghost" size="lg">{t("ctaQuote")} →</Button>
            </motion.div>

            <motion.div {...fade(0.34)} className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="liquid-glass-pill-nested px-3 py-2.5 text-center md:px-4 md:py-3">
                  <p className="text-xl font-bold tracking-tight text-primary md:text-2xl">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] font-semibold text-muted md:text-xs">{stat.label}</p>
                </div>
              ))}
            </motion.div>
        </LiquidHeroBoard>

        <motion.div {...fade(0.45)} className="liquid-glass-panel relative mt-4 overflow-hidden px-5 py-5 md:mt-5 md:px-8 md:py-6">
          <p className="relative z-10 mb-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-muted">
            Trusted by industry leaders
          </p>
          <div className="relative z-10">
            <ClientLogoMarquee logos={clientLogos} repeat={2} gapClassName="gap-10 md:gap-14" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
