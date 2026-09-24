import Image from "next/image";
import Link from "next/link";
import { categoryName, type Product } from "@/data/products";
import { ArrowRight, ArrowUpRight } from "./Icons";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <div className={`product-image-wrap product-tone-${product.category}`}>
        <span className="product-category">{categoryName(product.category)}</span>
        <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 580px) 90vw, (max-width: 1024px) 45vw, 23vw" className="product-image" />
        <span className="product-open"><ArrowUpRight /></span>
      </div>
      <div className="product-card-info"><h3>{product.name}</h3><p>{product.tagline}</p><span className="product-detail-link">Discover the details <ArrowRight width="15" height="15" /></span></div>
    </Link>
  );
}
