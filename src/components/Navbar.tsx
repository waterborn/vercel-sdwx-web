"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RfqTrigger, useRfq } from "@/components/RfqProvider";
export default function Navbar() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen, isOpen } = useRfq();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } }
    function onResize() { if (window.innerWidth >= 1024) setMenuOpen(false); }
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [menuOpen, setMenuOpen]);
  const links = [{ label: "Collections", href: "/products" }, { label: "Customization", href: "/about#oem" }, { label: "Our Story", href: "/about" }];
  return <header className="sticky top-0 z-40 border-b border-glintic-line bg-glintic-cream/85 backdrop-blur-xl">
    <div className="studio-container flex items-center justify-between gap-3 min-h-20">
      <Link href="/" aria-label="GLINTIC Studio home" className="leading-none py-4 shrink-0" onClick={() => setMenuOpen(false)}><span className="block text-[24px] lg:text-[28px] font-medium tracking-[.15em]">GLINTIC</span><span className="block mt-2 text-[9px] tracking-[.35em] uppercase text-glintic-muted">Studio Supply &amp; Private Label</span></Link>
      <nav aria-label="Main navigation" className="hidden lg:flex gap-7 text-[13px]">{links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className="min-h-11 inline-flex items-center hover:text-glintic-sage-dark">{link.label}</Link>)}</nav>
      <div className="hidden sm:flex gap-2"><RfqTrigger type="Sample Box" className="btn btn-secondary">Sample Box</RfqTrigger><RfqTrigger>Request a Quote</RfqTrigger></div>
      <button ref={menuButton} type="button" className="icon-btn mobile-menu-toggle hover:bg-glintic-sage-light" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{menuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg></button>
    </div>
    <nav id="mobile-menu" aria-label="Mobile navigation" hidden={!menuOpen || isOpen} className="lg:hidden border-t border-glintic-line bg-glintic-cream px-6 py-5 max-h-[calc(100dvh-80px)] overflow-y-auto">
      {links.map((link) => <Link key={link.href} href={link.href} className="block py-3 text-base" onClick={() => setMenuOpen(false)}>{link.label}</Link>)}
      <div className="flex flex-wrap gap-3 pt-4"><RfqTrigger>Request a Quote</RfqTrigger><RfqTrigger type="Sample Box" className="btn btn-secondary">Sample Box</RfqTrigger></div>
    </nav>
    <noscript><nav className="studio-container flex flex-wrap gap-5 py-2 text-xs" aria-label="Navigation without JavaScript">{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}<Link href="/#contact">Contact</Link></nav></noscript>
  </header>;
}
