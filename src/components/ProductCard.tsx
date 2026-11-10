import { type Product, formatPrice } from "@/data/products";
import { asset } from "@/data/images";

/* ── Product card — Manduka-style: 5:6 image, badge, name, category, price.
   Cards with a matched storefront URL are clickable; unmatched ones stay plain. ── */
export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  /** First above-the-fold rail cards skip lazy decoding. */
  priority?: boolean;
}) {
  const image = asset(product.image);

  const body = (
    <>
      <div className="relative aspect-[5/6] overflow-hidden bg-soft-gray">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-brand-white text-brand-black text-[11px] tracking-[0.06em] px-2.5 py-1">
            {product.badge}
          </span>
        )}
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1024px) 290px, (min-width: 640px) 33vw, 45vw"
          width={image.width}
          height={image.height}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3
          className={`text-sm font-semibold leading-snug text-ink ${
            product.url
              ? "group-hover:underline group-hover:underline-offset-4"
              : ""
          }`}
        >
          {product.name}
        </h3>
        <p className="text-sm font-light text-ink/55 mt-1">{product.category}</p>
        <p className="mt-1.5 text-sm font-black tracking-[0.05em] text-ink">
          {formatPrice(product)}
        </p>
      </div>
    </>
  );

  return (
    <article className="group">
      {product.url ? (
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {body}
          <span className="sr-only">
            Opens the supplier listing in a new tab.
          </span>
        </a>
      ) : (
        body
      )}
    </article>
  );
}
