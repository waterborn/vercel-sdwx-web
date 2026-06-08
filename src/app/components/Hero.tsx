export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />

      {/* Decorative element */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white"
        />
      </div>

      {/* Warm accent glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-warm/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-accent/5 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <p className="hero-text text-brand-warm text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 sm:mb-8 animate-fade-in-up">
          Established 2026
        </p>
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Movement
          <br />
          <span className="text-brand-warm">Redefined</span>
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          Where performance meets purpose. Crafted for those
          <br className="hidden sm:block" />
          who move with intention.
        </p>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <a
            href="#iconic-products"
            className="inline-block border border-white/30 text-white text-sm tracking-[0.2em] uppercase px-8 sm:px-10 py-3.5 sm:py-4 hover:bg-white hover:text-neutral-900 transition-all duration-300"
          >
            Explore Collection
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
