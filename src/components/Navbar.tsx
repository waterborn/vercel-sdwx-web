"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RfqTrigger, useRfq } from "@/components/RfqProvider";
import MegaMenu from "./MegaMenu";
import { mainNav, megaColumns } from "@/data/navigation";
import { products } from "@/data/products";
export default function Navbar() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen, isOpen } = useRfq();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } }
    function onResize() { if (window.innerWidth >= 1280) setMenuOpen(false); }
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [menuOpen, setMenuOpen]);
  const links = mainNav;
  return <header className="site-header sticky top-0 z-40 backdrop-blur-md">
    <div className="studio-container header-row">
      <Link href="/" aria-label="GLINTIC Studio home" className="header-logo" onClick={() => setMenuOpen(false)}>GLINTIC STUDIO</Link>
      <nav aria-label="Main navigation" className="desktop-navigation"><MegaMenu key={pathname} />{links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className="nav-link">{link.label}</Link>)}</nav>
      <div className="header-actions"><RfqTrigger type="Sample Box" className="btn btn-secondary">Order Sample Box</RfqTrigger><RfqTrigger>Request a Quote</RfqTrigger></div>
      <button ref={menuButton} type="button" className="icon-btn mobile-menu-toggle hover:bg-glintic-sage-light" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{menuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg></button>
    </div>
    {menuOpen && !isOpen && <button type="button" tabIndex={-1} className="mobile-nav-backdrop" aria-label="Close navigation" onClick={() => { setMenuOpen(false); menuButton.current?.focus(); }} />}
    <nav id="mobile-menu" aria-label="Mobile navigation" hidden={!menuOpen || isOpen} className="mobile-nav-panel">
      <p className="overline text-glintic-sage-dark mb-4">Explore 5 Collections</p>
      {megaColumns.map((column) => <details className="mobile-collection" key={column.slug}><summary>{column.number} · {column.name}</summary><a href={column.href} className="nav-link" onClick={() => setMenuOpen(false)}>Explore this collection →</a><ul>{column.items.map((item) => <li key={item.id}><a href={item.href} className="mobile-series" onClick={() => setMenuOpen(false)}>{item.id} · {item.name}{!item.skuIds.length && <span className="mega-note">Made-to-Order</span>}</a></li>)}</ul></details>)}
      <a href="/products" className="nav-link mt-3" onClick={() => setMenuOpen(false)}>Browse All {products.length} Catalog Items →</a>
      {links.map((link) => <Link key={link.href} href={link.href} className="nav-link mobile-main-link" onClick={() => setMenuOpen(false)}>{link.label}</Link>)}
      <div className="flex flex-wrap gap-3 pt-5"><RfqTrigger>Request a Quote</RfqTrigger><RfqTrigger type="Sample Box" className="btn btn-secondary">Order Sample Box</RfqTrigger></div>
    </nav>
    <noscript><nav className="studio-container flex flex-wrap gap-5 py-2 text-xs" aria-label="Navigation without JavaScript">{megaColumns.map((column) => <a key={column.slug} href={column.href}>{column.name}</a>)}{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav></noscript>
  </header>;
}
