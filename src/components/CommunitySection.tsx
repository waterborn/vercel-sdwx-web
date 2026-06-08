"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ── Inspiration / Community Section ── */
const QUOTES = [
  {
    text: "The mat is a mirror. What you see in practice is what you carry into the world.",
    author: "Elena Brower",
    role: "Yoga Teacher, New York",
  },
  {
    text: "Yoga is not about touching your toes. It is about what you learn on the way down.",
    author: "Jigar Gor",
    role: "Yoga Teacher, Mumbai",
  },
  {
    text: "The very heart of yoga practice is abhyasa — steady effort in the direction you want to go.",
    author: "Sally Kempton",
    role: "Meditation Teacher, California",
  },
];

export default function CommunitySection() {
  const ref = useScrollAnimation();

  return (
    <section
      id="inspiration"
      ref={ref}
      className="py-24 md:py-36 bg-brand-cream"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 fade-in-up">
          <p className="text-xs tracking-[0.3em] uppercase text-brand-text-light mb-4">
            Voices of Practice
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-wide text-brand-matte-black">
            Inspiration
          </h2>
        </div>

        {/* Quotes */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-12 mb-20">
          {QUOTES.map((q, i) => (
            <blockquote
              key={q.author}
              className="fade-in-up"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="text-5xl font-extralight text-brand-warm mb-4 leading-none">
                &ldquo;
              </div>
              <p className="text-brand-text leading-relaxed font-light mb-6">
                {q.text}
              </p>
              <footer className="text-sm">
                <span className="font-medium text-brand-matte-black">{q.author}</span>
                <span className="text-brand-text-light"> — {q.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Community / Social proof band */}
        <div id="community" className="fade-in-up" style={{ transitionDelay: "0.3s" }}>
          <div className="bg-brand-matte-black text-white py-16 md:py-24 px-8 text-center">
            <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-4">
              Community
            </p>
            <h3 className="text-3xl md:text-4xl font-extralight tracking-wide mb-6">
              Yoga for All
            </h3>
            <p className="max-w-xl mx-auto opacity-70 font-light leading-relaxed mb-10">
              From studios in Tokyo to rooftops in Brooklyn, our community of
              practitioners spans the globe. Join the movement.
            </p>
            {/* Placeholder social images row */}
            <div className="flex justify-center gap-3 overflow-hidden">
              {[
                "https://images.unsplash.com/photo-1545389336-cf090694435e?w=200&q=70",
                "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=70",
                "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=200&q=70",
                "https://images.unsplash.com/photo-1601925260368-ae2f83cf2b1f?w=200&q=70",
                "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=70",
              ].map((src, i) => (
                <div
                  key={i}
                  className="hidden sm:block w-20 h-20 md:w-28 md:h-28 overflow-hidden flex-shrink-0"
                >
                  <img
                    src={src}
                    alt={`Community ${i + 1}`}
                    className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
