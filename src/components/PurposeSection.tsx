"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ── Products With Purpose Section ── */
export default function PurposeSection() {
  const ref = useScrollAnimation();

  return (
    <section
      id="story"
      ref={ref}
      className="py-24 md:py-36 bg-brand-cream"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 fade-in-up">
          <p className="text-xs tracking-[0.3em] uppercase text-brand-text-light mb-4">
            Our Philosophy
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-wide text-brand-matte-black">
            Products With Purpose
          </h2>
        </div>

        {/* Two-card layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Card 1 — Precision & Passion */}
          <div className="group relative overflow-hidden bg-brand-beige fade-in-up" style={{ transitionDelay: "0.15s" }}>
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80"
                alt="Precision craftsmanship"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-extralight tracking-wide mb-4 text-brand-matte-black">
                Precision & Passion
              </h3>
              <p className="text-brand-text-light leading-relaxed font-light">
                No other yoga equipment is built with the precision and passion of
                CLINTIC. Every detail is considered, every material is chosen with
                intention — because your practice deserves nothing less.
              </p>
            </div>
          </div>

          {/* Card 2 — Sustainability */}
          <div className="group relative overflow-hidden bg-brand-beige fade-in-up" style={{ transitionDelay: "0.3s" }}>
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
                alt="Sustainable materials"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-extralight tracking-wide mb-4 text-brand-matte-black">
                Sustainability
              </h3>
              <p className="text-brand-text-light leading-relaxed font-light">
                Our design approach is rooted in principles of conservancy — creating
                responsibly sourced products while minimizing environmental waste. We
                believe luxury and sustainability are not mutually exclusive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
