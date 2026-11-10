import { company } from "./company";

/* ── Frequently asked sourcing questions — rendered on /about#faq and emitted
   as FAQPage structured data. Answers stay inside what the storefront states. ── */
export const faqs = [
  {
    question: "What are your minimum order quantities?",
    answer:
      "MOQs are deliberately low across all six product lines so that emerging brands can start without over-committing. The exact figure depends on the item and the level of customization — send us the product you are interested in and we confirm the MOQ in the same reply.",
  },
  {
    question: "Can I order samples before committing to production?",
    answer:
      "Yes. Samples are available upon request for every catalog item. Stock samples let you check material, stitching and compression before a bulk order; bespoke samples move from your design file to a physical unit in 7–12 days.",
  },
  {
    question: "What level of OEM / ODM customization do you support?",
    answer:
      "Custom logo placement, bespoke color matching, branded packaging and full private labeling are standard. Send design files in AI, PDF or PSD format and our in-house customization team handles everything from artwork adaptation to complete bespoke development.",
  },
  {
    question: "How long does production and shipping take?",
    answer:
      "Rapid prototyping runs 7–12 days. Production time is quoted per order based on line and quantity, and fulfillment is arranged by express, air or sea freight through our established export network. Our main markets are North America, Northern Europe and Eastern Europe.",
  },
  {
    question: "How is quality controlled?",
    answer:
      "We operate an ISO 14001 certified facility and use SGS tested materials. Every unit is inspected before shipment, covering stitching, compression consistency and structural durability.",
  },
  {
    question: "How do I get a quote for the full catalog?",
    answer:
      `Email ${company.email} with the products, quantities and destination port. We reply within ${company.responseTime.replace(
        /^≤\s*/,
        "under "
      )} during business hours, with unit pricing, MOQ and lead time in the same message.`,
  },
];
