"use client";
import { useEffect, useState } from "react";
import { collections, madeToOrder, series } from "@/data/products";
import { catalogResults, initialView, PAGE_SIZE, parseView, sortOptions, viewUrl, type CatalogView } from "@/data/catalog-view";
import ProductCard, { MadeToOrderCard } from "@/components/ProductCard";
import { RfqTrigger } from "@/components/RfqProvider";
export default function ShopGrid() {
  // 初始 SSR 始终输出首批 24 张真实卡片，URL 在水合后同步。
  const [view, setView] = useState<CatalogView>(initialView);
  useEffect(() => {
    function restore() { const next = parseView(window.location.search); setView(next); window.history.replaceState(window.history.state, "", viewUrl(next, window.location.href)); }
    const timer = window.setTimeout(restore, 0);
    window.addEventListener("popstate", restore);
    return () => { window.clearTimeout(timer); window.removeEventListener("popstate", restore); };
  }, []);
  function change(patch: Partial<CatalogView>) { const next = { ...view, ...patch }; setView(next); window.history.replaceState(window.history.state, "", viewUrl(next, window.location.href)); }
  const results = catalogResults(view);
  const visible = results.slice(0, view.limit);
  const main = visible.filter((product) => product.collection !== "more");
  const more = visible.filter((product) => product.collection === "more");
  const custom = madeToOrder.filter((group) => (view.cat === "all" || group.collection === view.cat) && (!view.series || view.series === group.id));
  const groups = series.filter((group) => view.cat === "all" || group.collection === view.cat);
  const selectedCollection = collections.find((collection) => collection.slug === view.cat);
  return <section className="section-space pt-8!" id="catalog"><div className="studio-container">
    <nav aria-label="Filter by collection" className="flex flex-wrap gap-2 mb-7">{[{ slug: "all", shortName: "All Collections" }, ...collections, { slug: "more", shortName: "More From GLINTIC" }].map((collection) => <button key={collection.slug} type="button" aria-pressed={view.cat === collection.slug} onClick={() => change({ cat: collection.slug, series: "", limit: PAGE_SIZE })} className={`btn border ${view.cat === collection.slug ? "bg-glintic-charcoal text-glintic-surface border-glintic-charcoal" : "bg-glintic-surface text-glintic-charcoal border-glintic-sage hover:bg-glintic-sage-light"}`}>{collection.shortName}</button>)}</nav>
    <div className="flex flex-col sm:flex-row justify-between gap-5 border-y border-glintic-line-dark py-5 items-start sm:items-center"><p className="text-sm" role="status" aria-live="polite">{results.length} catalog items{custom.length ? ` · ${custom.length} made-to-order series` : ""}</p><div className="flex flex-wrap gap-3 w-full sm:w-auto">{groups.length > 0 && <label className="field flex-1 sm:flex-none">Series<select value={view.series} onChange={(event) => change({ series: event.target.value, limit: PAGE_SIZE })}><option value="">All series</option>{groups.map((group) => <option key={group.id} value={group.id}>{group.id} · {group.name}</option>)}</select></label>}<label className="field flex-1 sm:flex-none">Sort by<select value={view.sort} onChange={(event) => change({ sort: event.target.value, limit: PAGE_SIZE })}>{sortOptions.map((sort) => <option value={sort.value} key={sort.value}>{sort.label}</option>)}</select></label></div></div>
    {selectedCollection && <div className="py-8"><h2 className="card-title">{selectedCollection.name}</h2><p className="text-glintic-muted mt-2">{selectedCollection.tagline}</p></div>}
    {main.length > 0 && <div className="product-grid mt-8">{main.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} />)}</div>}
    {more.length > 0 && <div className="mt-12"><h2 className="section-title mb-3">More From GLINTIC</h2><p className="text-glintic-muted mb-7">Additional sports supports, apparel and training tools retained from our wider catalog.</p><div className="product-grid">{more.map((product) => <ProductCard key={product.id} product={product} />)}</div></div>}
    {visible.length < results.length && <div className="text-center mt-10"><button type="button" className="btn btn-secondary" onClick={() => change({ limit: view.limit + PAGE_SIZE })}>Load {Math.min(PAGE_SIZE, results.length - visible.length)} more</button><p className="text-xs text-glintic-muted mt-4">{visible.length} of {results.length} catalog items shown</p></div>}
    {custom.length > 0 && <div className="mt-14"><p className="overline text-glintic-sage-dark mb-3">A conversation, not a stock promise</p><h2 className="section-title">Made-to-Order Inquiries</h2><p className="text-glintic-muted mt-4 mb-8 max-w-3xl">These series do not have a pictured SKU in the current catalog. Ask about feasibility, materials and sampling. No unverified product imagery is used.</p><div className="product-grid">{custom.map((group) => <MadeToOrderCard key={group.id} group={group} />)}</div></div>}
    {!results.length && !custom.length && <div className="text-center py-14"><h2 className="card-title">No items in this selection.</h2><button type="button" className="btn btn-secondary mt-5" onClick={() => change(initialView)}>Reset filters</button></div>}
    <div className="mt-14 p-7 sm:p-10 bg-glintic-linen rounded-xl text-center"><h2 className="section-title">A collection with your signature.</h2><p className="text-glintic-slate max-w-2xl mx-auto mt-4 mb-7">Bring your quantities, color palette and packaging brief. We’ll confirm the available options and build a written proposal around your project.</p><RfqTrigger type="OEM Project">Start an OEM Project ↗</RfqTrigger></div>
  </div></section>;
}
