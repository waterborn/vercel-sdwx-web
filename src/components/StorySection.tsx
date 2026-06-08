"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ── Our Story Section ── */
export default function StorySection() {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-36 bg-brand-beige">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="fade-in-up">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                alt="Our Story"
                className="w-full h-full object-cover grayscale-[30%] sepia-[10%]"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="fade-in-up" style={{ transitionDelay: "0.2s" }}>
            <p className="text-xs tracking-[0.3em] uppercase text-brand-text-light mb-4">
              Our Story
            </p>
            <h2 className="text-3xl md:text-5xl font-extralight tracking-wide text-brand-matte-black mb-8">
              Born from Practice
            </h2>
            <div className="space-y-5 text-brand-text-light font-light leading-relaxed">
              <p>
                In 2026, CLINTIC was born from a simple belief: that the tools of
                practice should be as intentional as the practice itself.
              </p>
              <p>
                What started as a quiet pursuit of perfection in a small workshop has
                grown into a movement — one that honors the ancient discipline of yoga
                while embracing the possibilities of modern craftsmanship.
              </p>
              <p>
                Every product we create carries the weight of that origin: meticulous,
                purposeful, and designed to endure. This is not just equipment. This is
                the foundation of your practice.
              </p>
            </div>
            <a
              href="#community"
              className="inline-block mt-10 border border-brand-matte-black text-brand-matte-black px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-brand-matte-black hover:text-brand-cream transition-all duration-500"
            >
              Join Our Community
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
