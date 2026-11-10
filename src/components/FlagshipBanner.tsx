import Link from "next/link";
import { asset } from "@/data/images";

/* ── Flagship banner — full-width image with overlaid copy ──
   The photograph is scenery behind a dark overlay, so it renders as a lazy
   <img> with a width ladder instead of a CSS background: a background image is
   discovered only after the stylesheet parses and always downloads the largest
   variant, which was the single heaviest asset on the homepage. */
export default function FlagshipBanner({
  image,
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const cover = asset(image, 1280);

  return (
    <section className="relative min-h-[60vh] md:min-h-[72vh] flex items-center overflow-hidden">
      <img
        src={cover.src}
        srcSet={cover.srcSet}
        sizes="100vw"
        width={cover.width}
        height={cover.height}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-brand-black/45" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center text-brand-white py-24">
        <p className="text-[11px] md:text-xs tracking-[0.32em] uppercase text-brand-white/80 mb-4">
          {eyebrow}
        </p>
        <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.1] tracking-[0.03em] mb-5">
          {title}
        </h2>
        <p className="text-sm md:text-base font-light text-brand-white/85 leading-relaxed max-w-xl mx-auto mb-9">
          {description}
        </p>
        <Link
          href={ctaHref}
          className="inline-block bg-brand-white text-brand-black text-xs tracking-[0.14em] uppercase px-8 py-3.5 rounded-[3px] hover:bg-brand-white/85 transition-colors duration-300"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
