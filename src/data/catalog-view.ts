import { collections, products, series } from "./products";
export const PAGE_SIZE = 24;
export const legacyCategories: Readonly<Record<string, string>> = {
  "yoga-pilates-essentials": "yoga-essentials",
  "pilates-props-resistance": "pilates-sculpt",
  "restorative-meditation": "restorative",
  "studio-hygiene-textiles": "studio-retail",
  "retail-merchandise": "studio-retail",
};
export const sortOptions = [{ value: "curated", label: "Collection order" }, { value: "name-asc", label: "Name: A–Z" }, { value: "name-desc", label: "Name: Z–A" }] as const;
export type CatalogView = { cat: string; sort: string; limit: number; series: string; };
export const initialView: CatalogView = { cat: "all", sort: "curated", limit: PAGE_SIZE, series: "" };
export function parseView(search: string): CatalogView {
  const params = new URLSearchParams(search);
  const requestedCat = params.get("cat") ?? "all";
  const legacy = Object.hasOwn(legacyCategories, requestedCat);
  const cat = legacy ? legacyCategories[requestedCat] : requestedCat;
  const sort = params.get("sort") ?? "curated";
  const group = series.find((entry) => entry.id === params.get("series"));
  // 旧集合中的系列可能已迁出；有合法系列时保留用户原本的选择。
  const validCat = legacy && group ? group.collection : cat === "all" || cat === "more" || collections.some((entry) => entry.slug === cat) ? cat : "all";
  const requestedLimit = Number(params.get("limit") ?? PAGE_SIZE);
  return { cat: validCat, sort: sortOptions.some((entry) => entry.value === sort) ? sort : "curated", limit: Number.isSafeInteger(requestedLimit) && requestedLimit >= PAGE_SIZE ? Math.min(Math.ceil(requestedLimit / PAGE_SIZE) * PAGE_SIZE, 72) : PAGE_SIZE, series: group && (validCat === "all" || validCat === group.collection) ? group.id : "" };
}
export function viewUrl(view: CatalogView, href: string): string {
  const url = new URL(href);
  url.searchParams.delete("price");
  if (view.cat === "all") url.searchParams.delete("cat"); else url.searchParams.set("cat", view.cat);
  if (view.sort === "curated") url.searchParams.delete("sort"); else url.searchParams.set("sort", view.sort);
  if (view.limit === PAGE_SIZE) url.searchParams.delete("limit"); else url.searchParams.set("limit", String(view.limit));
  if (view.series) url.searchParams.set("series", view.series); else url.searchParams.delete("series");
  return `${url.pathname}${url.search}${url.hash}`;
}
export function catalogResults(view: CatalogView) {
  const filtered = products.filter((product) => (view.cat === "all" || product.collection === view.cat) && (!view.series || product.seriesId === view.series));
  return [...filtered].sort((a, b) => {
    if (view.cat === "all" && (a.collection === "more") !== (b.collection === "more")) return a.collection === "more" ? 1 : -1;
    if (view.sort === "name-asc") return a.name.localeCompare(b.name, "en");
    if (view.sort === "name-desc") return b.name.localeCompare(a.name, "en");
    return (a.seriesId ?? "ZZ").localeCompare(b.seriesId ?? "ZZ", "en");
  });
}
