import { company } from "@/data/company";

/* ── Contact CTA — full-width image band ── */
export default function ContactCTA() {
  return (
    <section className="relative min-h-[52vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/contact-cta.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-brand-black/50" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center text-brand-white py-20">
        <p className="text-[11px] tracking-[0.32em] uppercase text-brand-white/80 mb-4">
          Samples Available Upon Request
        </p>
        <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.1] tracking-[0.03em] mb-5">
          Let&apos;s Build Your Line
        </h2>
        <p className="text-sm md:text-base font-light text-brand-white/85 max-w-xl mx-auto mb-9">
          Discuss your sourcing needs with our team. Low MOQs, fast prototyping,
          and reliable global fulfillment — from our Shanghai hub to your door.
        </p>
        <a
          href={`mailto:${company.email}`}
          className="inline-block bg-brand-white text-brand-black text-xs tracking-[0.14em] uppercase px-9 py-3.5 rounded-[3px] hover:bg-brand-white/85 transition-colors duration-300"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
}
