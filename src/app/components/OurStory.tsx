export default function OurStory() {
  return (
    <section id="our-story" className="py-20 sm:py-28 lg:py-36 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* Placeholder image with warm tones */}
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-stone-700 to-neutral-900" />
              {/* Warm light overlay */}
              <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-amber-900/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-orange-900/15 rounded-full blur-[60px]" />
              {/* Subtle grain texture effect */}
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
              {/* Figure silhouette */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-4/5">
                <div className="w-full h-full bg-gradient-to-t from-neutral-900 via-neutral-700/80 to-transparent rounded-t-full" />
              </div>
              {/* Caption overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/40 text-xs tracking-[0.2em] uppercase">
                  Milan, 2026
                </p>
              </div>
            </div>
            {/* Decorative offset border */}
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full border border-brand-warm/30 -z-10" />
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2 lg:pl-4">
            <p className="text-brand-warm text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4">
              Our Story
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6 sm:mb-8 leading-tight">
              Born from
              <br />
              Intention
            </h2>
            <div className="w-12 h-0.5 bg-brand-warm mb-6 sm:mb-8" />
            <div className="space-y-4 sm:space-y-5 text-neutral-600 leading-relaxed text-base sm:text-lg">
              <p>
                In 2026, CLINTIC emerged from a simple conviction: movement
                is more than physical — it is a declaration of who we choose
                to become.
              </p>
              <p>
                Founded in Milan by a collective of athletes, designers, and
                craftspeople, we set out to create apparel that honors the
                body&apos;s intelligence. Every seam, every fiber, every
                silhouette is shaped by the belief that what you wear should
                move with you — never against you.
              </p>
              <p>
                We don&apos;t follow trends. We follow the rhythm of human
                motion. From the studio to the street, CLINTIC is designed
                for those who understand that true performance begins within.
              </p>
            </div>
            <div className="mt-8 sm:mt-10">
              <a
                href="#iconic-products"
                className="inline-block bg-neutral-900 text-white text-sm tracking-[0.2em] uppercase px-8 sm:px-10 py-3.5 sm:py-4 hover:bg-neutral-800 transition-colors duration-300"
              >
                Discover More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
