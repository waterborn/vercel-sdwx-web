import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ShopGrid from "@/components/ShopGrid";
import { products } from "@/data/products";
import { breadcrumbSchema, pageOpenGraph } from "@/data/site";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse the full GLINTIC catalog — recovery & wellness gear, sports support & braces, yoga & pilates accessories, wear, and aesthetic fitness equipment.",
  alternates: { canonical: "/products" },
  openGraph: pageOpenGraph(
    "Shop All Products — GLINTIC Catalog",
    "66 catalog items across six product lines: recovery gear, support braces, yoga props, studio wear and fitness equipment. Low MOQ, OEM ready.",
    "/products"
  ),
};

export default function ProductsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />

      {/* Page header */}
      <section className="bg-soft-gray py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-ink/50 mb-4">
            {products.length} Products · Low MOQ · OEM Ready
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.04em] text-ink">
            Shop All
          </h1>
          <p className="mt-5 text-sm md:text-base font-light leading-relaxed text-ink/65 max-w-xl mx-auto">
            The complete GLINTIC Sports Support &amp; Yoga Ecosystem —
            engineered in Shanghai for brands, studios, and retailers worldwide.
          </p>
        </div>
      </section>

      <ShopGrid />
    </main>
  );
}
