import type { Metadata } from "next";
import ContactCTA from "@/components/ContactCTA";
import {
  company,
  productLines,
  oemCapabilities,
  qualityPoints,
  stats,
} from "@/data/company";

export const metadata: Metadata = {
  title: "About Us | Glintic",
  description:
    "Glintic is a Shanghai-based manufacturer specializing in athletic support gear and technical yoga equipment. ISO 14001 certified, SGS tested materials, OEM/ODM ready.",
};

const WHY_PARTNER = [
  {
    title: "One supplier, full spectrum",
    description:
      "Source supports, mats, props, bands, socks, and apparel from a single trusted partner.",
  },
  {
    title: "Agile production",
    description:
      "Low minimums and fast turnaround make us ideal for both startup brands and scaling retailers.",
  },
  {
    title: "Proven export experience",
    description:
      "An established global logistics network with reliable on-time delivery across express, air, and sea freight.",
  },
  {
    title: "Design flexibility",
    description:
      "An in-house customization team handles everything from logo placement to full bespoke product development.",
  },
];

const LINE_IMAGES = [
  "/products/eva-foam-roller-53.jpg",
  "/products/iyengar-yoga-bolster.png",
  "/products/latex-resistance-bands-set.jpg",
  "/products/women-yoga-socks.jpg",
  "/products/women-tennis-skort.png",
  "/products/mat-carrier-strap.png",
];

const FACTS = [
  { label: "Location", value: company.location },
  { label: "Founded", value: company.founded },
  { label: "Business Type", value: company.businessType },
  { label: "Employees", value: `${company.employees} people` },
  { label: "Supplier Rating", value: company.rating },
  { label: "Response Time", value: company.responseTime },
];

export default function AboutPage() {
  return (
    <main>
      {/* Page header */}
      <section className="bg-soft-gray py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-ink/50 mb-4">
            About Glintic
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.04em] text-ink mb-5">
            Support Engineered.
            <br />
            Performance Delivered.
          </h1>
          <p className="text-sm md:text-base font-light leading-relaxed text-ink/65 max-w-2xl mx-auto">
            {company.name} — a Shanghai-based manufacturer building a one-stop
            Sports Support & Yoga Ecosystem for global brands.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="aspect-[4/5] overflow-hidden bg-soft-gray md:sticky md:top-24">
              <img
                src="/images/about-studio.jpg"
                alt="Glintic studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-light leading-[1.15] tracking-[0.03em] text-ink mb-6">
                A One-Stop Sports Support & Yoga Ecosystem
              </h2>
              <div className="space-y-5 text-sm md:text-base font-light leading-relaxed text-ink/70">
                {company.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
                <p>
                  Every brace is designed for secure fit during movement without
                  restricting natural range of motion. Sustainable cork surfaces
                  bond to a natural tree rubber base with sweat-activated grip
                  technology, and antimicrobial properties keep practice hygienic
                  session after session.
                </p>
                <p>
                  We operate a flexible C2M workflow designed for brand
                  empowerment — custom logos, bespoke color matching, branded
                  packaging, and full private labeling. Design files in AI, PDF,
                  or PSD format are welcome, with low MOQs across all product
                  lines.
                </p>
              </div>

              {/* Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6 mt-10 pt-8 border-t border-brand-black/10">
                {FACTS.map((fact) => (
                  <div key={fact.label}>
                    <p className="text-[10px] tracking-[0.18em] uppercase text-ink/45 mb-1">
                      {fact.label}
                    </p>
                    <p className="text-sm font-semibold text-ink">{fact.value}</p>
                  </div>
                ))}
              </div>

              {/* Markets */}
              <div className="mt-8">
                <p className="text-[10px] tracking-[0.18em] uppercase text-ink/45 mb-3">
                  Main Markets
                </p>
                <div className="flex flex-wrap gap-2">
                  {company.markets.map((market) => (
                    <span
                      key={market.region}
                      className="text-xs font-light border border-brand-black/20 px-3 py-1.5 text-ink/70"
                    >
                      {market.region} · {market.share}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product lines */}
      <section className="py-16 md:py-24 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-[11px] tracking-[0.28em] uppercase text-ink/50 mb-3">
              What We Make
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[0.04em] text-ink">
              Six Product Lines
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {productLines.map((line, i) => (
              <div key={line.title} className="group bg-brand-white">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={LINE_IMAGES[i]}
                    alt={line.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7 md:p-9">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-serif text-3xl font-light text-ink/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {line.lead && (
                      <span className="text-[10px] tracking-[0.14em] uppercase bg-brand-black text-brand-white px-2.5 py-1">
                        Flagship
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-light text-ink mb-3">
                    {line.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-ink/65">
                    {line.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section id="quality" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <p className="text-[11px] tracking-[0.28em] uppercase text-ink/50 mb-3">
              Quality Assurance
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[0.04em] text-ink mb-5">
              Every Unit, Checked
            </h2>
            <p className="text-sm md:text-base font-light leading-relaxed text-ink/65">
              {company.certifications.join(" · ")} — quality is a process, not a
              promise.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {qualityPoints.map((point, i) => (
              <div key={point.title} className="text-center">
                <div className="w-12 h-12 mx-auto mb-5 border border-brand-black/20 flex items-center justify-center font-serif text-lg text-ink">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base font-semibold text-ink mb-2">
                  {point.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-ink/60">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OEM / ODM */}
      <section id="oem" className="py-16 md:py-24 bg-brand-black text-brand-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <p className="text-[11px] tracking-[0.28em] uppercase text-brand-white/60 mb-3">
              Customization
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[0.04em] mb-5">
              OEM / ODM, Made Simple
            </h2>
            <p className="text-sm md:text-base font-light leading-relaxed text-brand-white/75">
              A flexible C2M workflow for brand empowerment — from your first
              sketch to palletized export, with 7–12 day rapid prototyping.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {oemCapabilities.map((capability, i) => (
              <div
                key={capability.title}
                className="border border-brand-white/20 p-7 md:p-8"
              >
                <span className="font-serif text-3xl font-light text-brand-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold mt-4 mb-2">
                  {capability.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-brand-white/65">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>

          {/* Why partner */}
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mt-16 md:mt-20 pt-12 border-t border-brand-white/15">
            {WHY_PARTNER.map((reason) => (
              <div key={reason.title} className="flex gap-4">
                <svg
                  className="w-5 h-5 shrink-0 mt-0.5 text-brand-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="text-base font-semibold mb-1">{reason.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-brand-white/60">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-14 md:py-20 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-4xl md:text-5xl font-light text-ink">
                {stat.value}
              </p>
              <p className="text-[10px] md:text-xs tracking-[0.14em] uppercase text-ink/50 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
