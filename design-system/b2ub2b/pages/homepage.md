# Homepage Design Overrides

> Overrides `design-system/b2ub2b/MASTER.md` for the homepage only.

## Layout Order (Enterprise Gateway)

1. Hero with trust badges + stats + logo marquee
2. About with capability checklist
3. Three pillars (Business Launch / Engineering / Digital)
4. Services grid
5. Portfolio highlights
6. Client logo carousel (dark band)
7. Geography
8. Testimonials
9. Partners
10. CTA band

## Homepage-Specific Rules

- Hero headline: max tracking `-0.03em`, clamp sizing
- Primary CTA: `#0369A1` only — no black buttons on hero
- Dark bands: `#0F172A` background for clients + footer + final CTA
- No scale transforms on hover — shadow/border only
- Logo marquee: 40s linear, respect `prefers-reduced-motion`
