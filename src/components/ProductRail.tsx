"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

/* ── Product rail — edge-to-edge horizontal snap scroll with arrows + dots ── */
export default function ProductRail({
  eyebrow,
  title,
  description,
  products,
  viewAllHref = "/products",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllHref?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measure = () => {
      if (!rail.clientWidth) return;
      const count = Math.min(
        products.length,
        Math.max(1, Math.round(rail.scrollWidth / rail.clientWidth) || 1)
      );
      setDots(count);
      setPage(
        Math.min(count - 1, Math.round(rail.scrollLeft / rail.clientWidth) || 0)
      );
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [products.length]);

  const scrollBy = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.85, behavior: "smooth" });
  };

  const goTo = (index: number) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({ left: index * rail.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    setPage(
      Math.min(dots - 1, Math.round(rail.scrollLeft / rail.clientWidth))
    );
  };

  return (
    <section className="py-16 md:py-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-10 md:mb-14">
        {eyebrow && (
          <p className="text-[11px] tracking-[0.28em] uppercase text-ink/50 mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[0.04em] text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-sm md:text-base font-light text-ink/65 max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Rail — inset 32px from both edges, five cards per view on desktop.
          The inset lives on a wrapper: padding on the scroll container itself is
          swallowed by scroll-snap alignment. */}
      <div className="relative">
        <div className="px-8">
          <div
            ref={railRef}
            onScroll={onScroll}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
          >
            {products.map((product, i) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[72%] sm:w-[46%] md:w-[31%] lg:w-[calc((100%-96px)/5)]"
              >
                <ProductCard product={product} priority={i < 5} />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Arrows */}
          <div className="hidden md:flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous products"
              className="w-11 h-11 border border-brand-black/25 flex items-center justify-center hover:bg-brand-black hover:text-brand-white transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next products"
              className="w-11 h-11 border border-brand-black/25 flex items-center justify-center hover:bg-brand-black hover:text-brand-white transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dot indicators — real buttons with a 44px hit area */}
          <div className="flex items-center justify-center gap-1 mt-6">
            {Array.from({ length: dots }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to product page ${i + 1} of ${dots}`}
                aria-current={i === page ? "true" : undefined}
                className="flex items-center justify-center w-8 h-11 -my-[13px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === page ? "w-6 bg-brand-black" : "w-1.5 bg-brand-black/25"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center mt-8">
        <Link href={viewAllHref} className="link-underline text-sm tracking-[0.06em] text-ink">
          View All Products
        </Link>
      </div>
    </section>
  );
}
