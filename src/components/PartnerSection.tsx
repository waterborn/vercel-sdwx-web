import Link from "next/link";
import { oemCapabilities } from "@/data/company";
import { asset } from "@/data/images";

/* ── Partner With Us — full-bleed OEM/ODM capability tiles ── */
const IMAGES = [
  "/images/oem-logos.jpg",
  "/images/oem-packaging.jpg",
  "/images/oem-private-label.jpg",
  "/images/oem-moq.jpg",
];

export default function PartnerSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="px-6 text-center mb-10 md:mb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[0.04em] text-ink mb-5">
            Partner With GLINTIC
          </h2>
          <p className="text-sm md:text-base font-light leading-relaxed text-ink/65">
            There are many ways to work with us. Whether you are launching a new
            brand or scaling an existing line, our flexible C2M workflow is
            designed for brand empowerment.
          </p>
        </div>
      </div>

      {/* Full-row tiles: inset 32px from both edges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-1 md:gap-x-2 gap-y-8 px-8">
        {oemCapabilities.map((capability, i) => {
          const image = asset(IMAGES[i]);
          return (
          <div key={capability.title} className="group text-center">
            <Link
              href="/about#oem"
              className="block aspect-[4/5] overflow-hidden bg-soft-gray"
            >
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes="(min-width: 768px) 25vw, 45vw"
                width={image.width}
                height={image.height}
                alt={capability.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            <div className="mt-4 md:mt-5 px-2">
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
          );
        })}
      </div>
    </section>
  );
}
