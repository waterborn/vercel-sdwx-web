import { type Product, formatPrice } from "@/data/products";

/* ── Product card — Manduka-style: 5:6 image, badge, name, category, price ── */
export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <div className="relative aspect-[5/6] overflow-hidden bg-soft-gray">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-brand-white text-brand-black text-[11px] tracking-[0.06em] px-2.5 py-1">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <p className="text-sm font-light text-ink/55 mt-1">
          {product.category}
        </p>
        <p className="mt-1.5 text-sm font-black tracking-[0.05em] text-ink">
          {formatPrice(product)}
        </p>
      </div>
    </article>
  );
}
