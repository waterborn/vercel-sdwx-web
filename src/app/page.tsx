import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductRail from "@/components/ProductRail";
import FlagshipBanner from "@/components/FlagshipBanner";
import ProductGridSection from "@/components/ProductGridSection";
import ProcessSection from "@/components/ProcessSection";
import PartnerSection from "@/components/PartnerSection";
import AboutSummary from "@/components/AboutSummary";
import ContactCTA from "@/components/ContactCTA";
import { featured, highlights } from "@/data/products";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoryGrid />
      <ProductRail
        eyebrow="The Essentials Edit"
        title="Featured Products"
        description="A curated edit across recovery, studio, wear, and equipment — the pieces our partners reorder season after season."
        products={featured}
      />
      <FlagshipBanner
        image="/images/banner.jpg"
        eyebrow="Our Flagship Line"
        title="Recovery & Wellness Gear"
        description="Anatomically contoured supports, cork rollers, and massage balls — engineered for joint protection, muscle stabilization, and performance enhancement."
        ctaLabel="Discover More"
        ctaHref="/products?cat=recovery-wellness-gear"
      />
      <ProductGridSection
        eyebrow="Just Landed & Most Loved"
        title="Best Sellers"
        description="New arrivals and proven bestsellers — all available with OEM customization and low MOQ."
        products={highlights}
      />
      <ProcessSection />
      <PartnerSection />
      <AboutSummary />
      <ContactCTA />
    </main>
  );
}
