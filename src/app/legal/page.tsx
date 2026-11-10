import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Legal & Policies",
  description:
    "Privacy, terms of use, shipping and cookie statements for the GLINTIC product catalog site.",
  alternates: { canonical: "/legal" },
};

const SECTIONS = [
  {
    id: "privacy",
    title: "Privacy Policy",
    body: [
      "This site is a product and company catalog. It does not create user accounts, process payments, or run marketing trackers. We do not sell or rent personal information.",
      "When you email us — for a quote, a sample, or a partnership — we receive the message content you send plus your contact details, and we use them only to answer that enquiry and manage the resulting business relationship.",
      "Product data shown here is served from our own static files. Fonts are self-hosted at build time, so no request is made to a third-party font provider when you browse.",
      `Pages are served through standard web infrastructure that may log technical data such as request path, timestamp and country-level region for security and capacity purposes.`,
      `You may ask us to confirm what we hold about you or to delete it by writing to ${company.email}. We keep enquiry correspondence only as long as the commercial relationship requires.`,
    ],
  },
  {
    id: "terms",
    title: "Terms of Use",
    body: [
      "Product names, specifications, images and price ranges published here come from our Alibaba International storefront and are shown for sourcing reference. Listed prices are indicative ranges, not binding offers; unit pricing, MOQ and lead time are confirmed in a written quotation.",
      "Product cards link to the corresponding supplier listing on alibaba.com. Once you leave this site, the marketplace's own terms and privacy policy apply.",
      "Content may not be republished, scraped for commercial listings, or used in advertising without written permission. Product and brand names belonging to third parties remain the property of their respective owners.",
      "The catalog is provided \"as is\". We do not warrant that every listed item is in production at all times; discontinued tools are replaced by their current equivalents in the same line.",
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Fulfillment",
    body: [
      "Orders are produced in and around Shanghai and shipped internationally by express courier, air freight or sea freight, depending on volume and destination.",
      "Our main markets are North America, Northern Europe and Eastern Europe. Freight method, Incoterms, packaging specifications and the shipping schedule are agreed per order in the proforma invoice.",
      "Import duties, customs clearance charges and taxes at destination are the responsibility of the buyer unless your quotation states otherwise.",
      `Every shipment is covered by our pre-shipment inspection process — stitching, compression consistency and structural durability are checked unit by unit before goods leave the facility.`,
    ],
  },
  {
    id: "cookies",
    title: "Cookie Statement",
    body: [
      "This catalog site does not set advertising, analytics or personalization cookies, so there is no consent banner and nothing to opt out of.",
      "Your browser may still store ordinary technical data such as cached images. If you follow a product card, the destination marketplace may use its own cookies under its policy.",
      "If we later introduce any third-party measurement on this domain, this statement and the site footer will be updated first.",
    ],
  },
];

export default function LegalPage() {
  return (
    <main>
      {/* Page header */}
      <section className="bg-soft-gray py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-ink/50 mb-4">
            {company.name}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-[0.04em] text-ink mb-5">
            Legal &amp; Policies
          </h1>
          <p className="text-sm md:text-base font-light leading-relaxed text-ink/65">
            Plain statements about how this catalog site handles data, pricing
            and fulfillment. Last updated November 2026.
          </p>

          {/* In-page index */}
          <nav aria-label="Sections" className="mt-8 flex flex-wrap justify-center gap-2">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-xs font-light tracking-[0.06em] border border-brand-black/20 px-4 py-2.5 text-ink/75 hover:text-ink hover:border-brand-black/50 transition-colors"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 space-y-16">
          {SECTIONS.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="font-serif text-2xl md:text-3xl font-light tracking-[0.03em] text-ink mb-6">
                {section.title}
              </h2>
              <div className="space-y-4 text-sm md:text-[15px] font-light leading-relaxed text-ink/70">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}

          <div className="pt-12 border-t border-brand-black/10 text-sm font-light text-ink/70">
            Questions about anything on this page?{" "}
            <Link
              href={`mailto:${company.email}`}
              className="link-underline text-ink font-normal"
            >
              Email {company.email}
            </Link>{" "}
            or return to the{" "}
            <Link href="/about" className="link-underline text-ink font-normal">
              company profile
            </Link>
            .
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
