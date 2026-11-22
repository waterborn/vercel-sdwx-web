import { type Product, type Series, seriesById } from "@/data/products";
import { asset } from "@/data/images";
import { RfqTrigger } from "@/components/RfqProvider";
export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean; }) {
  const image = asset(product.image);
  const note = product.seriesId ? seriesById[product.seriesId]?.note : undefined;
  return <article className="product-card group">
    <div className="aspect-[5/4] overflow-hidden bg-glintic-linen"><img src={image.src} srcSet={image.srcSet} sizes="(min-width:1280px) 310px, (min-width:1024px) 33vw, (min-width:640px) 46vw, 92vw" width={image.width} height={image.height} alt={product.name} loading={priority ? "eager" : "lazy"} decoding="async" className="w-full h-full object-contain mix-blend-multiply p-5 transition-transform duration-500 group-hover:scale-105" /></div>
    <div className="p-5 flex flex-col flex-1"><p className="overline text-glintic-sage-dark mb-3">{product.seriesId ?? "More From GLINTIC"}</p><h3 className="card-title">{product.name}</h3><p className="ui-copy text-glintic-muted mt-3">{product.specs}</p><p className="text-xs text-glintic-muted mt-2 break-words">SKU: {product.id}</p>{note && <details className="text-xs mt-3"><summary className="min-h-11 cursor-pointer underline underline-offset-4">Series &amp; material notes</summary><p className="text-glintic-muted pb-3">{note}</p></details>}<p className="text-xs text-glintic-muted mt-3 mb-5">Catalog reference. Specifications, MOQ and availability are confirmed by quote.</p><RfqTrigger target={product.id} className="btn btn-secondary mt-auto w-full">Inquire This Item <span aria-hidden="true">↗</span></RfqTrigger></div>
  </article>;
}
export function MadeToOrderCard({ group }: { group: Series; }) {
  return <article className="product-card bg-glintic-sage-light"><div className="aspect-[5/4] flex flex-col items-center justify-center border-b border-glintic-line p-6 bg-glintic-sage-light"><span className="font-serif text-5xl text-glintic-sage-dark">{group.id}</span><span className="overline mt-4 text-glintic-sage-dark">Made-to-Order Inquiry</span></div><div className="p-5 flex flex-col flex-1"><h3 className="card-title">{group.name}</h3><p className="text-sm text-glintic-muted mt-4">No pictured SKU in this catalog. Supply feasibility, specifications, MOQ and lead time require confirmation.</p>{group.note && <p className="text-xs text-glintic-muted mt-3">{group.note}</p>}<RfqTrigger target={group.id} className="btn btn-secondary mt-6">Inquire This Item ↗</RfqTrigger></div></article>;
}
