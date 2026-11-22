import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ShopGrid from "@/components/ShopGrid";
import ContactCTA from "@/components/ContactCTA";
import { breadcrumbSchema, pageOpenGraph } from "@/data/site";
const description = "Explore five curated GLINTIC collections for yoga and Pilates studios, restorative practice, studio textiles and private-label retail. Inquire by series or SKU.";
export const metadata: Metadata = { title: "Studio Collections", description, alternates: { canonical: "/products" }, openGraph: pageOpenGraph("Studio Collections | GLINTIC", description, "/products") };
export default function ProductsPage() {
  return <main id="main-content"><JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Collections", path: "/products" }])} /><section className="section-space bg-glintic-linen"><div className="studio-container"><p className="overline text-glintic-sage-dark mb-5">The GLINTIC Studio Catalog</p><h1 className="display-title">Considered essentials.<br />Endless possibilities.</h1><p className="lead text-glintic-slate max-w-2xl mt-6">From the first stretch to the quiet moments in between. Explore our five collections and build a shortlist for your studio or brand.</p><p className="text-xs text-glintic-slate mt-5">Catalog references, not live inventory. Materials, specifications, MOQ and availability require confirmation.</p></div></section><ShopGrid /><ContactCTA /></main>;
}
