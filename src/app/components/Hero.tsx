import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FlowerMark } from "./Icons";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <Image src="/images/movement-editorial.webp" alt="Yoga-inspired movement in a sunlit studio, an editorial illustration" fill preload sizes="100vw" className="hero-image" />
      <div className="hero-shade" />
      <div className="site-container hero-content">
        <p className="eyebrow hero-eyebrow"><span /> INTENTIONAL MOVEMENT. EVERY DAY.</p>
        <h1 id="hero-heading">Find your<br /><em>flow.</em></h1>
        <p className="hero-description">From the first stretch to the final exhale.<br />Essentials for the way you move.</p>
        <Link href="/collections" className="button-dark hero-button">Explore the collection <ArrowRight /></Link>
        <div className="hero-note"><span className="note-line" /> YOGA. PILATES. LIFE IN MOTION.</div>
      </div>
      <div className="hero-stamp"><FlowerMark /><span>MOVE WITH<br />INTENTION</span></div>
      <div className="hero-bottom"><span>THE CLINTIC EDIT</span><span>01 — EVERYDAY MOVEMENT</span></div>
    </section>
  );
}
