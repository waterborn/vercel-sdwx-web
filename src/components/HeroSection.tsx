"use client";

import { useEffect, useRef, useState } from "react";

/* ── Hero Section ── */
export default function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=80')",
          transform: `translateY(${offsetY * 0.35}px) scale(1.1)`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[0.1em] mb-6 fade-in-up">
          Practice On.
        </h1>
        <p className="text-lg md:text-xl font-light tracking-wide opacity-90 mb-10 fade-in-up" style={{ transitionDelay: "0.2s" }}>
          Where precision meets stillness — crafted for those who take their practice seriously.
        </p>
        <a
          href="#products"
          className="inline-block border border-white/70 text-white px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-brand-matte-black transition-all duration-500 fade-in-up"
          style={{ transitionDelay: "0.4s" }}
        >
          Explore Products
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
