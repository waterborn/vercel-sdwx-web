import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";
import { ArrowUpRight } from "./Icons";

export default function Categories() {
  return (
    <section className="categories-section" aria-labelledby="categories-heading">
      <div className="site-container">
        <div className="section-heading"><div><p className="eyebrow">YOUR MOVEMENT, YOUR WAY</p><h2 id="categories-heading">A place for every <em>practice.</em></h2></div><p className="section-intro">Stretch. Strengthen. Slow down.<br />Find the essentials that meet you there.</p></div>
        <div className="category-grid">
          {categories.map((category, index) => <Link href={`/collections?category=${category.id}`} className={`category-card category-${category.id}`} key={category.id}>
            <div className="category-image"><Image src={category.image} alt="" fill sizes="(max-width: 580px) 44vw, (max-width: 900px) 45vw, 23vw" /><span className="category-number">0{index + 1}</span></div>
            <div className="category-card-label"><div><p>{category.eyebrow}</p><h3>{category.name}</h3></div><ArrowUpRight /></div>
          </Link>)}
        </div>
      </div>
    </section>
  );
}
