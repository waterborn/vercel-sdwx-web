import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProcessSection from "@/components/ProcessSection";
import SampleBox from "@/components/SampleBox";
import PartnerSection from "@/components/PartnerSection";
import AboutSummary from "@/components/AboutSummary";
import ContactCTA from "@/components/ContactCTA";
export default function Home() {
  return <main id="main-content"><HeroSection /><CategoryGrid /><ProcessSection /><SampleBox /><PartnerSection /><AboutSummary /><ContactCTA /></main>;
}
