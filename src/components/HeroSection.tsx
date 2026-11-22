import Link from "next/link";
import { asset } from "@/data/images";
import { RfqTrigger } from "@/components/RfqProvider";
export default function HeroSection() {
  const image = asset("/images/hero.png", 1280);
  return <section className="hero-panel relative overflow-hidden">
    <div className="studio-container grid lg:grid-cols-12 items-center gap-10 lg:gap-4 py-12 lg:py-16">
      <div className="lg:col-span-5 lg:pr-8 relative z-10"><p className="overline text-glintic-sage-dark mb-6">For spaces that inspire movement</p><h1 className="display-title">One-Stop Yoga &amp; Pilates Studio Supply &amp; Private Label Partner</h1><p className="lead text-glintic-slate mt-6 max-w-lg">Considered essentials. Your studio’s signature. A sourcing conversation that brings it all together.</p><div className="flex flex-wrap gap-3 mt-8"><Link href="/products" className="btn btn-primary">Explore the Collections <span aria-hidden="true">↗</span></Link><RfqTrigger className="btn btn-secondary">Request a Quote</RfqTrigger></div><div className="flex flex-wrap gap-2 mt-8" aria-label="Catalog features">{["5 Curated Collections", "SKU-Based Inquiries", "Sample Box Requests"].map((badge) => <span key={badge} className="overline text-glintic-sage-dark bg-glintic-sage-light rounded-full px-3 py-2.5 inline-flex gap-2"><span aria-hidden="true">✓</span>{badge}</span>)}</div></div>
      <figure className="lg:col-span-7 relative"><div className="overflow-hidden rounded-t-[100px] rounded-b-xl lg:rounded-tl-[160px] lg:rounded-tr-xl aspect-[4/3] lg:aspect-[5/6]"><img src={image.src} srcSet={image.srcSet} sizes="(min-width:1280px) 760px, (min-width:1024px) 58vw, 100vw" width={image.width} height={image.height} alt="A quiet yoga practice in warm natural light" loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover object-[72%_center]" /></div><figcaption className="absolute bottom-5 left-5 right-5 bg-glintic-cream/95 backdrop-blur-md rounded-lg p-5 flex items-center justify-between gap-4"><span className="font-serif text-2xl lg:text-3xl">A practice. A place. A feeling.</span><span className="overline text-glintic-sage-dark hidden sm:block">The Studio Edit</span></figcaption></figure>
    </div>
    <div className="border-t border-glintic-line-dark"><div className="studio-container flex flex-wrap justify-between gap-4 py-5 text-xs text-glintic-slate"><span>For independent studios, wellness spaces &amp; brands</span><span>Yoga · Pilates · Restorative · Studio Textiles · Retail</span></div></div>
  </section>;
}
