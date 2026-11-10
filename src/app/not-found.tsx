import Link from "next/link";

/* ── Brand-styled 404 ── */
export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-24 md:py-32">
      <div className="max-w-xl text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-ink/50 mb-5">
          Error 404
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-light leading-[1.1] tracking-[0.03em] text-ink mb-6">
          This page rolled out of the studio.
        </h1>
        <p className="text-sm md:text-base font-light leading-relaxed text-ink/65 mb-10">
          The link you followed no longer exists. The catalog and our company
          profile are both a click away.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="bg-brand-black text-brand-white text-xs tracking-[0.14em] uppercase px-8 py-3.5 rounded-[3px] hover:bg-ink transition-colors duration-300"
          >
            Browse Products
          </Link>
          <Link
            href="/"
            className="border border-brand-black/30 text-ink text-xs tracking-[0.14em] uppercase px-8 py-3.5 rounded-[3px] hover:bg-brand-black hover:text-brand-white transition-colors duration-300"
          >
            Back Home
          </Link>
          <Link
            href="/about"
            className="link-underline text-sm tracking-[0.04em] text-ink"
          >
            About GLINTIC
          </Link>
        </div>
      </div>
    </main>
  );
}
