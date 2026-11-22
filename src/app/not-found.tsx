import Link from "next/link";
export default function NotFound() {
  return <main id="main-content" className="section-space"><div className="studio-container text-center"><p className="overline text-glintic-sage-dark mb-5">404 · A little off the mat</p><h1 className="display-title">Let’s find your way back.</h1><p className="lead text-glintic-muted mt-6">This page is not in our collection. Your next studio inspiration is still a click away.</p><div className="flex flex-wrap justify-center gap-3 mt-8"><Link href="/products" className="btn btn-primary">Explore the Collections</Link><Link href="/" className="btn btn-secondary">Back to GLINTIC Studio</Link></div></div></main>;
}
