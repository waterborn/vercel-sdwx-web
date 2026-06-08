import Header from "./components/Header";
import Hero from "./components/Hero";
import IconicProducts from "./components/IconicProducts";
import OurStory from "./components/OurStory";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <IconicProducts />
        <OurStory />
      </main>
      <Footer />
    </>
  );
}
