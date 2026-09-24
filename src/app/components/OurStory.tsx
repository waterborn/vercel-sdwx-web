import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { ArrowRight, FlowerMark } from "./Icons";

export default function OurStory() {
  const foundation = products[0];
  return (
    <section id="our-story" className="story-section" aria-labelledby="story-heading">
      <div className="site-container story-grid">
        <div className="story-visual">
          <p className="eyebrow">THE EVERYDAY FOUNDATION</p>
          <div className="story-product"><Image src={foundation.image} alt={foundation.imageAlt} fill sizes="(max-width: 900px) 90vw, 45vw" /></div>
          <div className="story-image-caption"><span>LESS, BUT MORE INTENTIONAL.</span><FlowerMark width="36" height="36" /></div>
        </div>
        <div className="story-copy">
          <p className="eyebrow">THE CLINTIC PHILOSOPHY</p>
          <h2 id="story-heading">Not just a workout.<br /><em>A way to feel.</em></h2>
          <p>We believe movement belongs in everyday life. Not just in the studio. Not just when you have an hour. In the small moments you make for yourself.</p>
          <p>CLINTIC brings together yoga and Pilates wear, training essentials and recovery tools in one considered collection. Less searching. More time for your practice.</p>
          <Link href="/collections" className="text-link">Find what moves you <ArrowRight /></Link>
          <div className="story-signature">Move with intention.<span>CLINTIC</span></div>
        </div>
      </div>
    </section>
  );
}
