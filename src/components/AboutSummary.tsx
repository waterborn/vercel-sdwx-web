import Link from "next/link";
import { company, stats } from "@/data/company";
import { asset } from "@/data/images";

/* ── About summary — two-column intro with stats, links to /about ── */
export default function AboutSummary() {
  const studio = asset("/images/about-studio.jpg");

  return (
    <section className="py-16 md:py-24 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="aspect-[4/5] overflow-hidden bg-brand-white">
            <img
              src={studio.src}
              srcSet={studio.srcSet}
              sizes="(min-width: 768px) 46vw, 92vw"
              width={studio.width}
              height={studio.height}
              alt="GLINTIC studio"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Copy */}
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-ink/50 mb-4">
              About GLINTIC
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light leading-[1.12] tracking-[0.03em] text-ink mb-6">
              One Supplier,
              <br />
              Full Spectrum.
            </h2>
            <div className="space-y-4 text-sm md:text-base font-light leading-relaxed text-ink/70">
              {company.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 mt-10 pt-8 border-t border-brand-black/15">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl md:text-3xl font-light text-ink">
                    {stat.value}
                  </p>
                  <p className="text-[10px] md:text-[11px] tracking-[0.06em] uppercase text-ink/50 mt-1 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-block mt-10 bg-brand-black text-brand-white text-xs tracking-[0.14em] uppercase px-8 py-3.5 rounded-[3px] hover:bg-ink transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
