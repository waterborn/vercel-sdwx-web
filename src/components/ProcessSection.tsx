import Link from "next/link";

/* ── Insights / process section — article cards, Manduka magazine style ── */
const ARTICLES = [
  {
    category: "OEM & ODM",
    title: "From Concept to Sample in 7–12 Days",
    excerpt:
      "Design files in AI, PDF, or PSD. Our in-house customization team handles everything from logo placement to full bespoke product development.",
    image: "/images/process-sample.jpg",
    href: "/about#oem",
  },
  {
    category: "Quality Assurance",
    title: "100% Inspection Before Every Shipment",
    excerpt:
      "Stitching, compression consistency, and structural durability — every unit is checked, in an ISO 14001 certified facility with SGS-tested materials.",
    image: "/images/process-quality.jpg",
    href: "/about#quality",
  },
  {
    category: "Materials",
    title: "Cork, Neoprene & Second-Skin Knit",
    excerpt:
      "Sweat-activated grip cork surfaces, anatomically contoured neoprene supports, and Nylon 66 grip socks — materials chosen for performance, not price.",
    image: "/images/process-materials.jpg",
    href: "/products",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10 md:mb-16">
        <p className="text-[11px] tracking-[0.28em] uppercase text-ink/50 mb-3">
          The Glintic Method
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[0.04em] text-ink">
          Built on Process
        </h2>
      </div>

      {/* Full-row cards: inset 32px from both edges */}
      <div className="grid md:grid-cols-3 gap-x-1 md:gap-x-2 gap-y-8 px-8">
        {ARTICLES.map((article) => (
          <article key={article.title} className="group bg-brand-white">
            <Link href={article.href} className="block aspect-[4/3] overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            <div className="p-6 md:p-7">
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-ink/55 mb-3">
                {article.category}
              </p>
              <h3 className="font-serif text-xl md:text-2xl font-light leading-snug text-ink mb-3">
                <Link href={article.href} className="hover:opacity-70 transition-opacity">
                  {article.title}
                </Link>
              </h3>
              <p className="text-sm font-light leading-relaxed text-ink/65 mb-5">
                {article.excerpt}
              </p>
              <Link
                href={article.href}
                className="link-underline text-xs tracking-[0.12em] uppercase text-ink"
              >
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
