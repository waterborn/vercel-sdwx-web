"use client";

import Link from "next/link";
import { categories } from "@/data/products";
import { asset } from "@/data/images";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ── Category grid — "Explore by Category", edge-to-edge image tiles.
   One link per tile (image + name + tagline) so tab order stays clean. ── */
export default function CategoryGrid() {
  const ref = useScrollAnimation();

  return (
    <section id="categories" ref={ref} className="py-16 md:py-24">
      <div className="text-center mb-10 md:mb-16 px-6 fade-in-up">
        <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[0.04em] text-ink">
          Explore by Category
        </h2>
      </div>

      {/* Full-row grid: inset 32px from both edges, hairline seams between tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-1 md:gap-x-2 gap-y-8 md:gap-y-10 px-8">
        {categories.map((category, i) => {
          const image = asset(category.image);
          return (
            <Link
              key={category.slug}
              href={`/products?cat=${category.slug}`}
              className="group text-center fade-in-up focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
            >
              <span className="block aspect-square overflow-hidden bg-soft-gray">
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes="(min-width: 1024px) 200px, 45vw"
                  width={image.width}
                  height={image.height}
                  alt={category.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </span>
              <span className="block mt-4 md:mt-5 px-2">
                <span className="link-underline text-sm md:text-base font-light tracking-[0.02em] text-ink">
                  {category.name}
                </span>
                <span className="hidden md:block mt-2 text-xs font-light text-ink/50">
                  {category.tagline}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
