import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PurposeSection from "@/components/PurposeSection";
import ProductsSection from "@/components/ProductsSection";
import StorySection from "@/components/StorySection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PurposeSection />
        <ProductsSection />
        <StorySection />
        <CommunitySection />
      </main>
      <Footer />
    </>
  );
}
