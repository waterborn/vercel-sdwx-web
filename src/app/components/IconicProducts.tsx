"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, products, type CategoryId } from "@/data/products";
import { ArrowRight, SearchIcon } from "./Icons";
import ProductCard from "./ProductCard";

export default function IconicProducts({ catalog = false, initialCategory = "all" }: { catalog?: boolean; initialCategory?: CategoryId | "all" }) {
  const [category, setCategory] = useState<CategoryId | "all">(initialCategory);
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();
  const matchingProducts = products.filter((product) => (category === "all" || product.category === category) && (!query || `${product.name} ${product.tagline} ${product.description}`.toLowerCase().includes(query)));
  const visibleProducts = catalog ? matchingProducts : matchingProducts.slice(0, 4);

  return (
    <section id="iconic-products" className={`collection-section ${catalog ? "catalog-section" : ""}`} aria-labelledby="collection-heading">
      <div className="site-container">
        {!catalog && <div className="section-heading"><div><p className="eyebrow">CONSIDERED ESSENTIALS</p><h2 id="collection-heading">Small rituals. <em>Everyday favourites.</em></h2></div><Link href="/collections" className="text-link">View the collection <ArrowRight /></Link></div>}
        {catalog && <h2 id="collection-heading" className="sr-only">Browse all essentials</h2>}
        <div className="collection-toolbar">
          <div className="category-filters" role="group" aria-label="Filter products by category">
            <button type="button" onClick={() => setCategory("all")} aria-pressed={category === "all"}>All essentials</button>
            {categories.map((item) => <button type="button" key={item.id} onClick={() => setCategory(item.id)} aria-pressed={category === item.id}>{item.name}</button>)}
          </div>
          {catalog && <label className="product-search"><SearchIcon /><span className="sr-only">Search products</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find your essentials" maxLength={100} /></label>}
        </div>
        {catalog && <p className="results-count" role="status">{matchingProducts.length} {matchingProducts.length === 1 ? "essential" : "essentials"}{query ? ` matching “${search.trim()}”` : " to make your own"}</p>}
        <div className="product-grid" aria-live={catalog ? undefined : "polite"}>
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        {visibleProducts.length === 0 && <div className="empty-products"><p className="eyebrow">LET’S TRY SOMETHING ELSE</p><h3>No essentials found.</h3><p>Try another word or explore the whole collection.</p><button className="button-dark" type="button" onClick={() => { setCategory("all"); setSearch(""); }}>Reset filters <ArrowRight /></button></div>}
        {!catalog && <div className="collection-bottom"><span>Chosen for your practice. Ready for your everyday.</span><Link href={category === "all" ? "/collections" : `/collections?category=${category}`} className="text-link">Explore {category === "all" ? "all" : "this collection"} <ArrowRight /></Link></div>}
      </div>
    </section>
  );
}
