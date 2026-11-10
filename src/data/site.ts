import type { Metadata } from "next";
import { company } from "./company";

/* ── Site constants for metadata, structured data and shared copy ──
   Set NEXT_PUBLIC_SITE_URL at build time once the production domain is fixed. */

export const siteName = "GLINTIC — Sports Support & Yoga Solutions";
export const siteShortName = "GLINTIC";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vercel-sdwx-web.vercel.app";
export const siteDescription =
  "GLINTIC is a Shanghai-based manufacturer of athletic support gear and technical yoga equipment — recovery tools, braces, studio props and activewear, with OEM/ODM from 7–12 day prototyping.";
export const ogImage = "/images/og.jpg";
export const themeColor = "#011F31";

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}

/* A page that declares its own openGraph loses the inherited og:image, so every
   page rebuilds the full card through this helper. */
export function pageOpenGraph(
  title: string,
  description: string,
  path: string
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: "GLINTIC",
    locale: "en_US",
    url: path,
    title,
    description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: company.brand,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/apple-touch-icon.png"),
  image: absoluteUrl(ogImage),
  description: siteDescription,
  email: company.email,
  foundingDate: company.founded,
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: company.employees,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Shanghai",
    addressCountry: "CN",
  },
  knowsAbout: [
    "Sports support braces",
    "Yoga and pilates equipment",
    "Recovery and wellness gear",
    "OEM / ODM manufacturing",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteShortName,
  url: absoluteUrl("/"),
  publisher: { "@type": "Organization", name: company.name },
  inLanguage: "en",
};

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
