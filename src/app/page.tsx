import Hero from "./components/Hero";
import Categories from "./components/Categories";
import IconicProducts from "./components/IconicProducts";
import OurStory from "./components/OurStory";
import Contact from "./components/Contact";
import { FlowerMark } from "./components/Icons";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <div className="brand-ribbon" aria-label="Our approach"><span>MADE FOR YOUR DAILY RITUAL</span><FlowerMark width="22" height="22" /><span>FROM STUDIO TO SLOW DAYS</span><FlowerMark width="22" height="22" /><span>MOVEMENT WITHOUT THE NOISE</span></div>
      <Categories />
      <IconicProducts />
      <OurStory />
      <section className="ritual-section site-container" aria-labelledby="ritual-heading"><p className="eyebrow">MAKE ROOM FOR YOURSELF</p><h2 id="ritual-heading">A stronger body. A quieter mind.<br /><em>Your own kind of balance.</em></h2><FlowerMark /></section>
      <Contact />
    </main>
  );
}
