"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/data/products";

/* ── Navigation bar — white, centered wordmark, Manduka-style ── */
const NAV_ITEMS = [
  { label: "Shop All", href: "/products" },
  { label: "Categories", href: "/#categories" },
  { label: "About", href: "/about" },
  { label: "OEM / ODM", href: "/about#oem" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-brand-white/95 backdrop-blur-md border-b border-brand-black/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 grid grid-cols-3 items-center">
        {/* Left — hamburger (mobile) / menu (desktop) */}
        <div className="flex items-center">
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
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
          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.slice(0, 2).map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-light tracking-[0.04em] text-ink hover:opacity-60 transition-opacity duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Center — wordmark */}
        <Link
          href="/"
          className="justify-self-center font-serif text-2xl md:text-3xl font-medium tracking-[0.32em] lowercase text-ink"
        >
          glintic
        </Link>

        {/* Right — links / CTA */}
        <div className="flex items-center justify-end gap-8">
          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.slice(2).map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-light tracking-[0.04em] text-ink hover:opacity-60 transition-opacity duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/products"
            aria-label="Search products"
            className="sm:hidden p-2 -mr-2 text-ink"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
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
            className="hidden sm:inline-block bg-brand-black text-brand-white text-xs tracking-[0.12em] uppercase px-5 py-2.5 hover:bg-ink transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-y-auto no-scrollbar transition-all duration-500 bg-brand-white border-t border-brand-black/5 ${
          mobileOpen ? "max-h-[calc(100vh-3.5rem)]" : "max-h-0 border-t-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 pt-8 pb-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-sm tracking-[0.12em] uppercase text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Collections — six category anchors */}
        <div className="px-8 pt-6 pb-8">
          <p className="text-[10px] tracking-[0.24em] uppercase text-ink/40 text-center mb-4">
            Collections
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?cat=${category.slug}`}
                className="text-xs font-light text-ink/75 hover:text-ink text-center leading-snug"
                onClick={() => setMobileOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-7">
            <a
              href="mailto:contact@glintic.com"
              className="inline-block bg-brand-black text-brand-white text-xs tracking-[0.12em] uppercase px-6 py-3"
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
