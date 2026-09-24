"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "./Icons";

const navigation = [
  { label: "The Collection", href: "/collections" },
  { label: "Our Philosophy", href: "/#our-story" },
  { label: "For Your Business", href: "/#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="announcement">A LITTLE MOVEMENT. A BETTER EVERYDAY.</div>
      <div className="site-container header-inner">
        <Link href="/" className="wordmark" aria-label="CLINTIC home" onClick={() => setMenuOpen(false)}>CLINTIC<span className="wordmark-dot">.</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <Link key={item.label} href={item.href} className="nav-link" aria-current={pathname === "/collections" && item.href === "/collections" ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <Link href="/collections" className="header-cta">Find your essentials <ArrowUpRight width="17" height="17" /></Link>
        <button ref={menuButton} className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d={menuOpen ? "m6 6 12 12M6 18 18 6" : "M3 8h18M3 16h18"} /></svg>
        </button>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-nav site-container" aria-label="Mobile navigation">
        {navigation.map((item) => <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight /></Link>)}
      </nav>}
    </header>
  );
}
