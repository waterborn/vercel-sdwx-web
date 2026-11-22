// 未核验的主体、工厂产权、认证、交期与供应商评分不进入公开宣传。
export const company = {
  name: "GLINTIC Studio",
  brand: "GLINTIC",
  tagline: "One-Stop Yoga & Pilates Studio Supply & Private Label Partner",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME?.trim() ?? "",
  intro: [
    "A studio is more than a place to move. It is a feeling, a rhythm, a community. The objects you choose become part of that experience.",
    "GLINTIC brings yoga and Pilates essentials, restorative props, textiles and retail ideas into one considered sourcing conversation. From a first sample to a private-label brief, start with what your space needs.",
  ],
};
export const oemCapabilities = [
  { title: "Your mark", description: "Discuss laser engraving, silk screen, woven labels or silicone branding. Suitability is confirmed for your selected product." },
  { title: "Your palette", description: "Share Pantone references and your preferred materials. Color and finish options are agreed through sampling." },
  { title: "Your packaging", description: "Bring together boxes, hangtags, labels and inserts around your studio or retail brief." },
  { title: "Your specification", description: "Tell us the quantities, dimensions and destinations you have in mind. MOQ and lead times are quoted per project." },
];
export const qualityPoints = [
  { code: "IQC", title: "Incoming materials", description: "Define raw-material safety requirements, colorfastness and the relevant test evidence for each SKU." },
  { code: "IPQC", title: "In-process checks", description: "Agree thickness, rebound and surface-grip checks suited to the selected materials and construction." },
  { code: "FQC", title: "Finished-product review", description: "Review appearance, logo adhesion and odor requirements against approved samples." },
  { code: "OQC", title: "Outgoing shipment", description: "Set packaging-drop, barcode and moisture-protection checks before dispatch." },
];
export const faqs = [
  { question: "What is the minimum order quantity?", answer: "MOQ depends on the product, material and customization. Select your items and quantity range in the quote request; availability, MOQ and lead time will be confirmed in writing." },
  { question: "Can I add my studio logo or a custom color?", answer: "Include your branding preferences in the inquiry. Laser engraving, silk screen, custom colorways, packaging and full ODM can be discussed; the suitable process is confirmed per product. Send design files by email after the initial inquiry." },
  { question: "How do I request a Sample Box?", answer: "Choose Request a Sample Box. The proposed box is US$39; contents, shipping and availability are confirmed before a PayPal invoice is issued offline. There is no online checkout on this website." },
  { question: "Is the Sample Box refundable on a bulk order?", answer: "A bulk-order refund benefit is under review. Eligibility, timing, shipping exclusions and the refund method must be confirmed in writing before you purchase; no automatic refund or credit is promised here." },
  { question: "What does Made-to-Order mean?", answer: "The series has no pictured SKU in this catalog. It is an inquiry option, not a stock or production guarantee. Supply feasibility, materials, MOQ and timing must be confirmed before ordering." },
  { question: "Do you arrange DDP or CIF shipping?", answer: "Please provide the destination country and postal code. Shipping options and Incoterms are quoted manually for each destination. DDP includes agreed destination duties; CIF is port-based and does not mean door-to-door delivery. Global DDP coverage is not guaranteed." },
  { question: "Can you provide test reports and certificates?", answer: "Tell us which standards your project requires. Reports, certificate validity, holder, scope and relevance to the selected SKU must be checked before an order. No blanket certification claim applies to this catalog." },
];
