"use client";

import { useState, useEffect } from "react";

/* ── Navigation Bar ── */
const NAV_ITEMS = ["Story", "Products", "Inspiration", "Community"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-cream/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl tracking-[0.25em] uppercase font-light text-brand-matte-black">
          CLINTIC
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-sm tracking-[0.15em] uppercase text-brand-text-light hover:text-brand-matte-black transition-colors duration-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-brand-matte-black transition-transform duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[4px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-brand-matte-black transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-brand-matte-black transition-transform duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-brand-cream/95 backdrop-blur-md ${
          mobileOpen ? "max-h-64 py-6" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-sm tracking-[0.15em] uppercase text-brand-text-light hover:text-brand-matte-black transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
