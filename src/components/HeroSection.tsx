import Link from "next/link";

/* ── Hero — full-bleed image with overlaid headline, Manduka-style ── */
export default function HeroSection() {
  return (
    <section className="relative min-h-[78vh] md:min-h-[88vh] flex items-end md:items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/55 via-brand-black/25 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16 md:pb-0">
        <div className="max-w-xl text-brand-white">
          <p className="text-[11px] md:text-xs tracking-[0.32em] uppercase text-brand-white/80 mb-5">
            Sports Support & Yoga Solutions
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-light leading-[1.05] tracking-[0.02em] mb-6">
            Support Engineered.
            <br />
            Performance Delivered.
          </h1>
          <p className="text-sm md:text-base font-light leading-relaxed text-brand-white/85 max-w-md mb-9">
            A one-stop Sports Support & Yoga Ecosystem — from recovery gear and
            studio essentials to technical activewear, engineered in Shanghai
            for brands worldwide.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="bg-brand-white text-brand-black text-xs tracking-[0.14em] uppercase px-8 py-3.5 rounded-[3px] hover:bg-brand-white/85 transition-colors duration-300"
            >
              Shop Now
            </Link>
            <Link
              href="/about#oem"
              className="border border-brand-white/70 text-brand-white text-xs tracking-[0.14em] uppercase px-8 py-3.5 rounded-[3px] hover:bg-brand-white hover:text-brand-black transition-colors duration-300"
            >
              OEM / ODM
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
