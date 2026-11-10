"use client";

import { useCallback, useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import {
  categories,
  categoryBySlug,
  products,
  type Category,
} from "@/data/products";

/* ── Shop grid — category / price filtering, sorting and progressive loading.
   The view lives in React state and is mirrored into the query string with
   history.replaceState, so the page stays statically prerendered (the first 24
   cards ship in the HTML) while deep links, refresh and back/forward all work. ── */
const PAGE_SIZE = 24;

const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "name", label: "Name: A to Z" },
] as const;

type SortKey = (typeof SORTS)[number]["key"];

type View = { cat: string; sort: SortKey; price: string; unknown: boolean };

const DEFAULT_VIEW: View = {
  cat: "all",
  sort: "featured",
  price: "all",
  unknown: false,
};

function parseView(search: string): View {
  const params = new URLSearchParams(search);
  const rawCat = params.get("cat");
  const known = Boolean(rawCat) && rawCat !== "all" && Boolean(categoryBySlug[rawCat!]);
  const sort = params.get("sort") as SortKey | null;

  return {
    cat: known ? rawCat! : "all",
    // a hand-typed or retired ?cat= still gets an honest message
    unknown: Boolean(rawCat) && rawCat !== "all" && !known,
    sort: SORTS.some((option) => option.key === sort) ? sort! : "featured",
    price: params.get("price") ?? "all",
  };
}

function serializeView(view: View): string {
  const params = new URLSearchParams();
  if (view.cat !== "all") params.set("cat", view.cat);
  if (view.sort !== "featured") params.set("sort", view.sort);
  if (view.price !== "all") params.set("price", view.price);
  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

const PRICE_BANDS = [
  { key: "u1", label: "Under $1", min: 0, max: 1 },
  { key: "1-3", label: "$1 – $3", min: 1, max: 3 },
  { key: "3-6", label: "$3 – $6", min: 3, max: 6 },
  { key: "6p", label: "$6 & above", min: 6, max: Number.POSITIVE_INFINITY },
];

export default function ShopGrid() {
  const [view, setView] = useState<View>(DEFAULT_VIEW);
  const [limit, setLimit] = useState(PAGE_SIZE);

  /* Adopt the incoming URL after hydration (deep links, refresh, back/forward). */
  useEffect(() => {
    const sync = () => setView(parseView(window.location.search));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const update = useCallback((changes: Partial<Record<keyof View, string | null>>) => {
    setView((current) => {
      const next: View = { ...current, unknown: false };
      if ("cat" in changes) next.cat = changes.cat ?? "all";
      if ("price" in changes) next.price = changes.price ?? "all";
      if ("sort" in changes) next.sort = (changes.sort as SortKey) ?? "featured";
      return next;
    });
  }, []);

  /* Mirror the view into the address bar; an unknown ?cat= disappears here too. */
  useEffect(() => {
    window.history.replaceState(null, "", serializeView(view));
  }, [view]);

  const viewKey = `${view.cat}|${view.sort}|${view.price}`;
  // Reset the paging window whenever the view changes (render-phase adjust, no cascade).
  const [lastViewKey, setLastViewKey] = useState(viewKey);
  if (viewKey !== lastViewKey) {
    setLastViewKey(viewKey);
    setLimit(PAGE_SIZE);
  }

  const sortKey = view.sort;
  const priceKey = view.price;
  const unknownSlug = view.unknown;
  const matched = categoryBySlug[view.cat] as Category | undefined;
  const activeCategory: Category | "all" = matched ?? "all";

  const band = PRICE_BANDS.find((b) => b.key === priceKey);

  const filtered = products.filter((product) => {
    if (activeCategory !== "all" && product.category !== activeCategory) return false;
    if (band && !(product.priceMin < band.max && (product.priceMax ?? product.priceMin) >= band.min))
      return false;
    return true;
  });

  const sorted = [...filtered];
  if (sortKey === "price-asc") sorted.sort((a, b) => a.priceMin - b.priceMin);
  if (sortKey === "price-desc") sorted.sort((a, b) => b.priceMin - a.priceMin);
  if (sortKey === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));

  const visible = sorted.slice(0, limit);
  const heading = activeCategory === "all" ? "All Products" : activeCategory;

  return (
    <div>
      {/* Filter bar */}
      <div className="border-b border-brand-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div
            role="group"
            aria-label="Filter by category"
            className="flex flex-wrap gap-2 md:gap-3"
          >
            <button
              type="button"
              onClick={() => update({ cat: null })}
              aria-pressed={activeCategory === "all" && !unknownSlug}
              className={`min-h-11 text-xs md:text-sm tracking-[0.08em] uppercase px-4 py-2 border transition-colors duration-300 ${
                activeCategory === "all"
                  ? "bg-brand-black text-brand-white border-brand-black"
                  : "border-brand-black/20 text-ink hover:border-brand-black"
              }`}
            >
              All ({products.length})
            </button>
            {categories.map((category) => {
              const count = products.filter(
                (p) => p.category === category.name
              ).length;
              return (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => update({ cat: category.slug })}
                  aria-pressed={activeCategory === category.name}
                  className={`min-h-11 text-xs md:text-sm tracking-[0.08em] uppercase px-4 py-2 border transition-colors duration-300 ${
                    activeCategory === category.name
                      ? "bg-brand-black text-brand-white border-brand-black"
                      : "border-brand-black/20 text-ink hover:border-brand-black"
                  }`}
                >
                  {category.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Price band + sort */}
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div
              role="group"
              aria-label="Filter by price"
              className="flex flex-wrap items-center gap-2"
            >
              <span className="text-[10px] tracking-[0.18em] uppercase text-ink/45 mr-1">
                Price
              </span>
              <button
                type="button"
                onClick={() => update({ price: null })}
                aria-pressed={!band}
                className={`min-h-11 px-3 py-1.5 text-xs font-light border transition-colors duration-300 ${
                  !band
                    ? "border-brand-black text-ink"
                    : "border-brand-black/15 text-ink/60 hover:border-brand-black/50"
                }`}
              >
                Any
              </button>
              {PRICE_BANDS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() =>
                    update({ price: band?.key === option.key ? null : option.key })
                  }
                  aria-pressed={band?.key === option.key}
                  className={`min-h-11 px-3 py-1.5 text-xs font-light border transition-colors duration-300 ${
                    band?.key === option.key
                      ? "border-brand-black text-ink"
                      : "border-brand-black/15 text-ink/60 hover:border-brand-black/50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 ml-auto">
              <span className="text-[10px] tracking-[0.18em] uppercase text-ink/45">
                Sort
              </span>
              <select
                value={sortKey}
                onChange={(event) => update({ sort: event.target.value })}
                className="min-h-11 border border-brand-black/20 bg-transparent px-3 py-2 text-xs font-light text-ink focus:border-brand-black"
              >
                {SORTS.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div aria-live="polite">
          {unknownSlug && (
            <p className="mb-5 border border-brand-black/20 bg-soft-gray px-4 py-3 text-xs font-light text-ink/70">
              That collection is not in the catalog — showing all products
              instead.
            </p>
          )}
          <h2 className="text-xs tracking-[0.18em] uppercase text-ink/50 mb-8">
            {heading} — showing {visible.length} of {sorted.length} items
          </h2>
        </div>

        {sorted.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-serif text-2xl md:text-3xl font-light text-ink mb-4">
              No products match those filters.
            </p>
            <button
              type="button"
              onClick={() => update({ cat: null, price: null, sort: null })}
              className="min-h-11 border border-brand-black/30 text-xs tracking-[0.14em] uppercase px-7 py-3 hover:bg-brand-black hover:text-brand-white transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
              {visible.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={i < 8}
                />
              ))}
            </div>

            {visible.length < sorted.length && (
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={() => setLimit((current) => current + PAGE_SIZE)}
                  className="min-h-11 inline-flex items-center border border-brand-black/30 text-xs tracking-[0.14em] uppercase px-9 py-3.5 hover:bg-brand-black hover:text-brand-white transition-colors duration-300"
                >
                  Load {Math.min(PAGE_SIZE, sorted.length - visible.length)} more
                </button>
                <p className="mt-4 text-xs font-light text-ink/50">
                  {visible.length} of {sorted.length} products loaded
                </p>
              </div>
            )}
          </>
        )}

        {/* OEM note */}
        <div className="mt-16 md:mt-24 bg-soft-gray px-8 py-12 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-ink mb-3">
            Looking for custom products?
          </h2>
          <p className="text-sm font-light text-ink/65 max-w-lg mx-auto mb-7">
            Every product on this page can be customized — logos, colors,
            sizing, and packaging. Low MOQs with 7–12 day prototyping.
          </p>
          <a
            href="mailto:contact@glintic.com?subject=OEM%20Inquiry"
            className="inline-flex items-center min-h-11 bg-brand-black text-brand-white text-xs tracking-[0.14em] uppercase px-8 py-3.5 hover:bg-ink transition-colors duration-300"
          >
            Start an OEM Project
          </a>
        </div>
      </div>
    </div>
  );
}
