import type { Metadata } from "next";
import { company } from "@/data/company";
import { pageOpenGraph } from "@/data/site";
const description = "GLINTIC Studio inquiry privacy notice, catalog terms, sample requests and shipping information.";
export const metadata: Metadata = { title: "Privacy & Catalog Terms", description, alternates: { canonical: "/legal" }, openGraph: pageOpenGraph("Privacy & Catalog Terms | GLINTIC", description, "/legal") };
const sections = [
  {
    id: "privacy", title: "Inquiry Privacy Notice", body: [
      "This B2B catalog does not create customer accounts, take online payments or subscribe you to marketing messages. Information you submit is used to handle your sourcing inquiry and related correspondence.",
      "The inquiry form collects your name, business email, company or studio, destination country and postal information, selected products, quantities, customization preferences and any notes you provide. Please do not include passwords, payment-card details or sensitive personal information.",
      "Requests are processed by this website’s server and sent to the configured business inbox through Resend. The website is hosted on Vercel. Hosting, email delivery and mailbox providers may process technical logs and message data under their applicable arrangements. The application does not maintain its own inquiry database.",
      "A failed delivery or timeout is reported in the form; a successful response means the email service accepted the administrator message, not that it has reached the inbox or that an order has been accepted. No automatic marketing or buyer receipt is sent.",
      "Your form draft is kept in page memory while you navigate this website; it is not saved to local storage and is lost when the page is reloaded or closed. Server-side security controls may temporarily count requests without retaining the form body.",
      "The operating entity, legal basis, retention periods, processing regions and cross-border safeguards require business confirmation before public launch. This implementation notice is not a substitute for a finalized jurisdiction-specific privacy policy.",
    ]
  },
  {
    id: "terms", title: "Catalog Terms of Use", body: [
      "The catalog is a sourcing reference, not live inventory or a binding offer. Material descriptions and dimensions are based on existing catalog records and require SKU-specific verification. Product availability, MOQ, pricing, lead time and commercial terms are confirmed in a written quotation.",
      "Series groupings organize sourcing discussions; a candidate SKU may not match every material or construction in the series brief. Read the series notes and specify the option you require. Made-to-Order means there is no pictured SKU in the current catalog; it does not guarantee production feasibility or stock.",
      "The website does not display blanket certification, antibacterial, organic or environmental guarantees. Relevant claims require valid evidence and permission for the specific product, material or facility.",
      "Editorial studio imagery is inspiration, not proof of a GLINTIC facility or product specification. Catalog imagery and third-party product identifiers must be checked for display rights before public launch. Content is not licensed for reuse in commercial listings or advertising without authorization.",
    ]
  },
  {
    id: "shipping", title: "Samples, Shipping & Commercial Terms", body: [
      "Sample Box requests start with the inquiry form. The proposed box reference price is US$39. Contents, availability, destination, shipping charges and payment details are confirmed before a PayPal invoice is issued offline. There is no checkout or card processing on this website.",
      "The proposed contents are a mini foldable mat sample, an engraved cork block sample, a five-color resistance-band swatch set, one pair of grip socks and a printed material and craft handbook. Final contents and packaging require supplier confirmation; no substitution is implied by the catalog.",
      "Any fully refundable-on-bulk-order benefit is pending confirmation. Eligibility, time limits, shipping treatment and refund method must be agreed in writing. A refund is not automatically replaced by a first-order credit, and no automatic entitlement is granted by this page.",
      "Freight and Incoterms are quoted manually after destination and product details are reviewed. DDP and CIF are different arrangements: CIF normally relates to delivery to a named destination port and is not a door-to-door duty-paid service. Coverage, customs responsibilities, insurance and duties must be confirmed in the quotation.",
    ]
  },
  {
    id: "cookies", title: "Cookies & External Links", body: [
      "This implementation does not include advertising pixels, marketing cookies or newsletter tracking. Fonts and catalog imagery are served from the site’s own assets. Hosting providers may collect ordinary technical request information.",
      "An enabled WhatsApp contact link opens a third-party service governed by its own policies. Product inquiry buttons stay on this website; they do not redirect to an external marketplace.",
    ]
  },
];
export default function LegalPage() {
  return <main id="main-content"><section className="section-space bg-glintic-linen"><div className="studio-container"><p className="overline text-glintic-sage-dark mb-5">GLINTIC Studio · Transparency</p><h1 className="display-title">Privacy &amp; Catalog Terms</h1><p className="lead text-glintic-slate mt-6 max-w-3xl">How the inquiry experience works. Commercial and legal details marked as pending must be finalized before public launch.</p><nav className="flex flex-wrap gap-3 mt-7" aria-label="Policy sections">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className="btn btn-secondary">{section.title}</a>)}</nav></div></section><section className="section-space"><div className="studio-container"><div className="max-w-3xl space-y-12">{sections.map((section) => <article id={section.id} key={section.id}><h2 className="section-title mb-6">{section.title}</h2><div className="space-y-4 text-glintic-muted">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>)}<article className="border-t border-glintic-line-dark pt-8"><h2 className="card-title">Operating Entity &amp; Contact</h2><p className="mt-4 text-glintic-muted">{company.legalName ? `Operating entity: ${company.legalName}.` : "Formal operating-entity details are pending business confirmation."}</p>{company.email ? <a href={`mailto:${company.email}`} className="link-underline mt-3">{company.email}</a> : <p className="text-glintic-muted mt-3">A verified public contact email must be configured before launch.</p>}</article></div></div></section></main>;
}
