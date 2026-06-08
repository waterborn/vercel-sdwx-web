"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="text-xl lg:text-2xl font-bold tracking-[0.2em] uppercase text-neutral-900">
            CLINTIC
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#iconic-products" className="nav-link text-sm tracking-widest uppercase text-neutral-600 hover:text-neutral-900 transition-colors">
              Products
            </a>
            <a href="#our-story" className="nav-link text-sm tracking-widest uppercase text-neutral-600 hover:text-neutral-900 transition-colors">
              Our Story
            </a>
            <a href="#footer" className="nav-link text-sm tracking-widest uppercase text-neutral-600 hover:text-neutral-900 transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-neutral-900"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100">
          <nav className="flex flex-col px-6 py-4 gap-4">
            <a
              href="#iconic-products"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Products
            </a>
            <a
              href="#our-story"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Our Story
            </a>
            <a
              href="#footer"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
