"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories, categoryBySlug, type Category } from "@/data/products";

/* ── Shop grid with category filtering ── */
export default function ShopGrid({ initialSlug = "all" }: { initialSlug?: string }) {
  const initialCategory = categoryBySlug[initialSlug];
  const [active, setActive] = useState<Category | "all">(initialCategory ?? "all");

  const visible =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter bar */}
      <div className="border-b border-brand-black/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={() => setActive("all")}
            className={`text-xs md:text-sm tracking-[0.08em] uppercase px-4 py-2 border transition-colors duration-300 ${
              active === "all"
                ? "bg-brand-black text-brand-white border-brand-black"
                : "border-brand-black/20 text-ink hover:border-brand-black"
            }`}
          >
            All ({products.length})
          </button>
          {categories.map((category) => {
            const count = products.filter((p) => p.category === category.name).length;
            return (
              <button
                key={category.slug}
                onClick={() => setActive(category.name)}
                className={`text-xs md:text-sm tracking-[0.08em] uppercase px-4 py-2 border transition-colors duration-300 ${
                  active === category.name
                    ? "bg-brand-black text-brand-white border-brand-black"
                    : "border-brand-black/20 text-ink hover:border-brand-black"
                }`}
              >
                {category.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <p className="text-xs tracking-[0.18em] uppercase text-ink/50 mb-8">
          {active === "all" ? "All Products" : active} — {visible.length} items
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* OEM note */}
        <div className="mt-16 md:mt-24 bg-soft-gray px-8 py-12 text-center">
          <h3 className="font-serif text-2xl md:text-3xl font-light text-ink mb-3">
            Looking for custom products?
          </h3>
          <p className="text-sm font-light text-ink/65 max-w-lg mx-auto mb-7">
            Every product on this page can be customized — logos, colors,
            sizing, and packaging. Low MOQs with 7–12 day prototyping.
          </p>
          <a
            href="mailto:contact@glintic.com?subject=OEM%20Inquiry"
            className="inline-block bg-brand-black text-brand-white text-xs tracking-[0.14em] uppercase px-8 py-3.5 hover:bg-ink transition-colors duration-300"
          >
            Start an OEM Project
          </a>
        </div>
      </div>
    </div>
  );
}
