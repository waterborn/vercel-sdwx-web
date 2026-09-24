import Link from "next/link";
import { ArrowUpRight } from "./Icons";
import { categories } from "@/data/products";

export default function Footer() {
  return (
    <footer id="footer" className="site-footer">
      <div className="site-container">
        <div className="footer-main"><div className="footer-brand"><Link href="/" className="wordmark" aria-label="CLINTIC home">CLINTIC<span className="wordmark-dot">.</span></Link><p>For the way you move.<br />For the way you live.</p></div><nav aria-label="Collection links"><h2>THE COLLECTION</h2>{categories.map((category) => <Link key={category.id} href={`/collections?category=${category.id}`}>{category.name}</Link>)}</nav><nav aria-label="Brand links"><h2>GET TO KNOW US</h2><Link href="/#our-story">Our philosophy</Link><Link href="/#contact">Business enquiries</Link><Link href="/collections">All essentials</Link></nav><div className="footer-note"><p>A little movement.<br /><em>A better everyday.</em></p><Link href="/collections" aria-label="Explore the CLINTIC collection"><ArrowUpRight width="28" height="28" /></Link></div></div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} CLINTIC. All rights reserved.</p><p>YOGA · PILATES · EVERYDAY WELLNESS</p><a href="#main-content">Back to top ↑</a></div>
      </div>
    </footer>
  );
}
