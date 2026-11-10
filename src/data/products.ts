import rawProducts from "../../scripts/products.json";

/* ── Product catalog — sourced from the Alibaba supplier storefront ── */

export type Category =
  | "Recovery & Wellness Gear"
  | "Sports Support & Braces"
  | "Yoga & Pilates Accessories"
  | "Yoga & Pilates Wear"
  | "Aesthetic Fitness Equipment"
  | "Studio Essentials";

export type Product = {
  id: string;
  name: string;
  category: Category;
  priceMin: number;
  priceMax: number | null;
  image: string;
  badge?: string;
  /** Supplier storefront product page; null when no listing could be matched. */
  url: string | null;
};

export const products: Product[] = rawProducts.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category as Category,
  priceMin: p.priceMin,
  priceMax: p.priceMax,
  image: p.file,
  badge: p.badge ?? undefined,
  url: p.detailUrl ?? null,
}));

export const categories: {
  name: Category;
  slug: string;
  image: string;
  tagline: string;
}[] = [
  {
    name: "Recovery & Wellness Gear",
    slug: "recovery-wellness-gear",
    image: "/products/eva-foam-roller-53.jpg",
    tagline: "Flagship line — rollers, massage balls & fascia care",
  },
  {
    name: "Sports Support & Braces",
    slug: "sports-support-braces",
    image: "/products/knee-compression-sleeve.png",
    tagline: "Joint protection engineered for movement",
  },
  {
    name: "Yoga & Pilates Accessories",
    slug: "yoga-pilates-accessories",
    image: "/products/iyengar-yoga-strap.png",
    tagline: "Straps, towels, blocks & balance tools",
  },
  {
    name: "Yoga & Pilates Wear",
    slug: "yoga-pilates-wear",
    image: "/products/women-tennis-skort.png",
    tagline: "Grip socks, skorts & studio apparel",
  },
  {
    name: "Aesthetic Fitness Equipment",
    slug: "aesthetic-fitness-equipment",
    image: "/products/push-up-board-14in1.jpg",
    tagline: "Dumbbells, bands & sculpted training tools",
  },
  {
    name: "Studio Essentials",
    slug: "studio-essentials",
    image: "/products/iyengar-yoga-bolster.png",
    tagline: "Bolsters, zafus & meditation props",
  },
];

export const categoryBySlug = Object.fromEntries(
  categories.map((c) => [c.slug, c.name])
) as Record<string, Category>;

export function formatPrice(product: Product): string {
  const fmt = (n: number) =>
    `$${n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  return product.priceMax && product.priceMax !== product.priceMin
    ? `${fmt(product.priceMin)} - ${fmt(product.priceMax)}`
    : fmt(product.priceMin);
}

export function productsByCategory(name: Category): Product[] {
  return products.filter((p) => p.category === name);
}

export const bestSellers = products.filter((p) => p.badge === "Best Seller");
export const newArrivals = products.filter((p) => p.badge === "New");

/** Curated 10-product edit for the homepage featured rail */
export const featured = [
  "eva-foam-roller-53",
  "silicone-peanut-ball",
  "iyengar-yoga-bolster",
  "women-yoga-socks",
  "eva-yoga-blocks",
  "latex-resistance-bands-set",
  "women-tennis-skort",
  "pilates-bar-set",
  "cork-balance-board-set",
  "microfiber-mat-towel",
]
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is Product => Boolean(p));

/** Badge-bearing products for the full-row homepage grid (4 × 2 rows) */
export const highlights = [...bestSellers, ...newArrivals].slice(0, 8);
