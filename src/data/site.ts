import type { Metadata } from "next";
import { company } from "./company";
export const siteName = "GLINTIC Studio — Yoga & Pilates Studio Supply";
export const siteShortName = "GLINTIC Studio";
// 正式 canonical 根域或 www 由部署环境配置；本地不更改 DNS 或重定向。
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://glinticstudio.com").replace(/\/$/, "");
export const siteDescription = "GLINTIC Studio is your one-stop yoga and Pilates studio supply and private-label sourcing partner. Explore five curated collections, request samples and build a product brief for your space or brand.";
export const ogImage = "/images/og.jpg";
export const themeColor = "#FAF8F5";
export function absoluteUrl(path = "/"): string { return new URL(path, siteUrl).toString(); }
export function pageOpenGraph(title: string, description: string, path: string): NonNullable<Metadata["openGraph"]> {
  return { type: "website", siteName: "GLINTIC Studio", locale: "en_US", url: path, title, description, images: [{ url: ogImage, width: 1200, height: 630, alt: title }] };
}
export const organizationSchema = {
  "@context": "https://schema.org", "@type": "Organization", name: company.legalName || company.name, alternateName: company.brand,
  url: absoluteUrl("/"), logo: absoluteUrl("/apple-touch-icon.png"), image: absoluteUrl(ogImage), description: siteDescription,
  ...(company.email ? { email: company.email } : {}),
  knowsAbout: ["Yoga and Pilates studio supplies", "Private-label studio accessories", "Restorative props", "Studio textiles"],
};
export const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: siteShortName, url: absoluteUrl("/"), publisher: { "@type": "Organization", name: company.name }, inLanguage: "en" };
export function breadcrumbSchema(items: { name: string; path: string; }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })) };
}
export function faqSchema(faqs: { question: string; answer: string; }[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
}
