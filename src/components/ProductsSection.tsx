"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ── Iconic Products Section ── */
const PRODUCTS = [
  {
    name: "PRO® Mat",
    description: "The legendary mat trusted by teachers worldwide for over 20 years.",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf2b1f?w=600&q=80",
  },
  {
    name: "Cork Yoga Block",
    description: "Sustainably harvested cork for stable, grounded support in every pose.",
    image: "https://images.unsplash.com/photo-1545080782-13e0c6bf1519?w=600&q=80",
  },
  {
    name: "Organic Yoga Strap",
    description: "Organic cotton strap to deepen your practice with gentle resistance.",
    image: "https://images.unsplash.com/photo-1592439057355-655e6219f5b1?w=600&q=80",
  },
];

export default function ProductsSection() {
  const ref = useScrollAnimation();

  return (
    <section
      id="products"
      ref={ref}
      className="py-24 md:py-36 bg-brand-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 fade-in-up">
          <p className="text-xs tracking-[0.3em] uppercase text-brand-text-light mb-4">
            Curated Collection
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-wide text-brand-matte-black">
            Iconic Products
          </h2>
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.name}
              className="group fade-in-up"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Product image */}
              <div className="aspect-[3/4] overflow-hidden mb-6 bg-brand-beige">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Product info */}
              <h3 className="text-xl md:text-2xl font-extralight tracking-wide mb-2 text-brand-matte-black">
                {product.name}
              </h3>
              <p className="text-brand-text-light font-light leading-relaxed">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
