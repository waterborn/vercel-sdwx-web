import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Aero Pulse Tight",
    category: "Women's Leggings",
    image: "/images/products/product-1-leggings.jpg",
  },
  {
    id: 2,
    name: "Zenith Tank",
    category: "Women's Training Top",
    image: "/images/products/product-2-tank.jpg",
  },
  {
    id: 3,
    name: "Stratos Jacket",
    category: "Men's Outerwear",
    image: "/images/products/product-3-jacket.jpg",
  },
  {
    id: 4,
    name: "Flow State Short",
    category: "Men's Training Short",
    image: "/images/products/product-4-short.jpg",
  },
  {
    id: 5,
    name: "Drift Hoodie",
    category: "Unisex Sweatshirt",
    image: "/images/products/product-5-hoodie.jpg",
  },
  {
    id: 6,
    name: "Core Flex Bra",
    category: "Women's Sports Bra",
    image: "/images/products/product-6-bra.jpg",
  },
];

export default function IconicProducts() {
  return (
    <section id="iconic-products" className="py-20 sm:py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-20">
          <p className="text-brand-warm text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4">
            The Collection
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
            Iconic Products
          </h2>
          <div className="w-12 h-0.5 bg-brand-warm mx-auto mt-6 sm:mt-8" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 stagger-children">
          {products.map((product) => (
            <div key={product.id} className="product-card group cursor-pointer">
              {/* Product Image */}
              <div className="relative aspect-[5/6] overflow-hidden bg-neutral-100 mb-4 sm:mb-5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="product-image object-cover object-top"
                  priority={product.id <= 3}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5">
                  <span className="text-white text-sm tracking-widest uppercase font-medium">
                    View
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-500 tracking-wide">
                  {product.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
