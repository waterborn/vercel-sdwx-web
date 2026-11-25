import { collections, seriesById, type CollectionSlug } from "./products";

const orderedSeries: Readonly<Record<CollectionSlug, readonly string[]>> = {
  "yoga-essentials": ["G-01", "G-02", "G-10"],
  "pilates-sculpt": ["G-05", "G-06", "G-07", "G-09", "G-04"],
  restorative: ["G-11", "G-12", "G-13", "G-14"],
  "fascia-recovery": ["G-03", "G-08"],
  "studio-retail": ["G-15", "G-16", "G-17", "G-19", "G-20"],
};

export const megaColumns = collections.map((collection, index) => ({
  ...collection,
  number: `0${index + 1}`,
  href: `/products?cat=${collection.slug}`,
  items: orderedSeries[collection.slug].map((id) => ({
    ...seriesById[id],
    href: `/products?cat=${collection.slug}&series=${id}`,
  })),
}));

export const mainNav = [
  { label: "Custom Branding", href: "/about#custom" },
  { label: "Sample Box ($39)", href: "/#sample-box" },
  { label: "About & QA", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;
