import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All Products | Glintic",
  description:
    "Browse the full Glintic catalog — recovery & wellness gear, sports support & braces, yoga & pilates accessories, wear, and aesthetic fitness equipment.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;

  return (
    <main>
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
            The complete Glintic Sports Support & Yoga Ecosystem — engineered in
            Shanghai for brands, studios, and retailers worldwide.
          </p>
        </div>
      </section>

      <ShopGrid initialSlug={cat ?? "all"} />
    </main>
  );
}
