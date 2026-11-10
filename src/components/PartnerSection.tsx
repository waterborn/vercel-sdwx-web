import Link from "next/link";
import { oemCapabilities } from "@/data/company";

/* ── Partner With Us — OEM/ODM capability cards, Manduka partner style ── */
const IMAGES = [
  "/images/oem-logos.jpg",
  "/images/oem-packaging.jpg",
  "/images/oem-private-label.jpg",
  "/images/oem-moq.jpg",
];

export default function PartnerSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[0.04em] text-ink mb-5">
            Partner With Glintic
          </h2>
          <p className="text-sm md:text-base font-light leading-relaxed text-ink/65">
            There are many ways to work with us. Whether you are launching a new
            brand or scaling an existing line, our flexible C2M workflow is
            designed for brand empowerment.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {oemCapabilities.map((capability, i) => (
            <div key={capability.title} className="group text-center">
              <Link
                href="/about#oem"
                className="block aspect-[4/5] overflow-hidden bg-soft-gray"
              >
                <img
                  src={IMAGES[i]}
                  alt={capability.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="mt-5 px-1">
                <Link
                  href="/about#oem"
                  className="link-underline text-sm md:text-base font-light text-ink"
                >
                  {capability.title}
                </Link>
                <p className="hidden md:block mt-2 text-xs font-light leading-relaxed text-ink/50">
                  {capability.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
