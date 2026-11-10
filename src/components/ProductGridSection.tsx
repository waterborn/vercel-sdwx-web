"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { Product } from "@/data/products";

/* ── Full-bleed product grid section with scroll-in animation ── */
export default function ProductGridSection({
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
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10 md:mb-14 fade-in-up">
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

      {/* Full-row grid: four per row (2 rows of 8), inset 32px from both edges */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-3 gap-y-10 md:gap-y-14 px-8">
        {products.map((product, i) => (
          <div
            key={product.id}
            className="fade-in-up"
            style={{ transitionDelay: `${(i % 4) * 0.1}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center mt-10 md:mt-12">
        <Link href={viewAllHref} className="link-underline text-sm tracking-[0.06em] text-ink">
          Shop All Products
        </Link>
      </div>
    </section>
  );
}
