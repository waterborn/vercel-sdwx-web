import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/products";
import IconicProducts from "../components/IconicProducts";
import { FlowerMark } from "../components/Icons";

export const metadata: Metadata = {
  title: "The Collection",
  description: "Explore CLINTIC yoga mats, Pilates essentials, activewear and recovery tools. Find the right pieces for your practice and enquire about product options.",
};

export default async function CollectionsPage({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) {
  const { category } = await searchParams;
  const initialCategory = categories.find((item) => item.id === category)?.id ?? "all";

  return (
    <main id="main-content">
      <section className="catalog-intro"><div className="site-container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">The Collection</span></nav><p className="eyebrow">THE CLINTIC COLLECTION</p><h1>Your everyday.<br /><em>Elevated.</em></h1><div className="catalog-intro-description"><p>From finding your footing to taking a well-earned pause. Explore essentials for every part of your practice.</p><FlowerMark width="60" height="60" /></div></div></section>
      <IconicProducts key={initialCategory} catalog initialCategory={initialCategory} />
    </main>
  );
}
