"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { categories } from "@/data/products";

/* ── Navigation bar — white, centered wordmark, Manduka-style.
   Mobile drawer is a disclosure: collapsed content is inert (out of the tab
   order), Escape closes it and focus returns to the toggle. ── */
const NAV_ITEMS = [
  { label: "Shop All", href: "/products" },
  { label: "Categories", href: "/#categories" },
  { label: "About", href: "/about" },
  { label: "OEM / ODM", href: "/about#oem" },
];

const linkClass =
  "inline-flex items-center min-h-11 text-sm font-light tracking-[0.04em] text-ink hover:opacity-60 transition-opacity duration-300";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-brand-white/95 backdrop-blur-md border-b border-brand-black/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 grid grid-cols-3 items-center">
        {/* Left — hamburger (mobile) / menu (desktop) */}
        <div className="flex items-center">
          <button
            ref={toggleRef}
            type="button"
            className="md:hidden -ml-2 w-11 h-11 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block w-6 h-px bg-ink transition-transform duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-ink transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-ink transition-transform duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.slice(0, 2).map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Center — wordmark */}
        <Link
          href="/"
          className="justify-self-center inline-flex items-center min-h-11 font-serif text-2xl md:text-3xl font-medium tracking-[0.28em] text-ink"
        >
          GLINTIC
        </Link>

        {/* Right — links / CTA */}
        <div className="flex items-center justify-end gap-6 lg:gap-8">
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.slice(2).map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/products"
            aria-label="Browse product catalog"
            className="sm:hidden -mr-2 w-11 h-11 inline-flex items-center justify-center text-ink"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Link>
          <a
            href="mailto:contact@glintic.com"
            className="hidden sm:inline-flex items-center min-h-11 bg-brand-black text-brand-white text-xs tracking-[0.12em] uppercase px-5 hover:bg-ink transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        inert={!mobileOpen}
        className={`md:hidden overflow-y-auto no-scrollbar transition-all duration-500 bg-brand-white border-t border-brand-black/5 ${
          mobileOpen ? "max-h-[calc(100vh-3.5rem)]" : "max-h-0 border-t-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-1 pt-6 pb-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="inline-flex items-center min-h-11 text-sm tracking-[0.12em] uppercase text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Collections — six category anchors */}
        <div className="px-8 pt-4 pb-8">
          <p className="text-[10px] tracking-[0.24em] uppercase text-ink/40 text-center mb-4">
            Collections
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?cat=${category.slug}`}
                className="inline-flex items-center justify-center min-h-11 text-xs font-light text-ink/75 hover:text-ink text-center leading-snug"
                onClick={() => setMobileOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <a
              href="mailto:contact@glintic.com"
              className="inline-flex items-center min-h-11 bg-brand-black text-brand-white text-xs tracking-[0.12em] uppercase px-6 py-3"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
