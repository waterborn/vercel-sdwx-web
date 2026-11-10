import Link from "next/link";

/* ── Footer — Manduka-style: subscribe, link groups, socials ── */
const LINK_GROUPS = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Recovery & Wellness", href: "/products?cat=recovery-wellness-gear" },
      { label: "Yoga & Pilates Wear", href: "/products?cat=yoga-pilates-wear" },
      { label: "Aesthetic Equipment", href: "/products?cat=aesthetic-fitness-equipment" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact Us", href: "mailto:contact@glintic.com" },
      { label: "Request a Sample", href: "mailto:contact@glintic.com?subject=Sample%20Request" },
      { label: "Shipping & Logistics", href: "/about#quality" },
      { label: "FAQ", href: "/about#faq" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Company Profile", href: "/about" },
      { label: "Quality Assurance", href: "/about#quality" },
      { label: "OEM / ODM", href: "/about#oem" },
      { label: "Partner With Us", href: "mailto:contact@glintic.com?subject=Partnership" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Shipping Policy", href: "/about#quality" },
      { label: "Cookie Preferences", href: "#" },
    ],
  },
];

const SOCIALS = [
  {
    name: "Instagram",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "Facebook",
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "LinkedIn",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Subscribe */}
        <div className="py-14 md:py-20 text-center border-b border-brand-white/15">
          <p className="font-serif text-2xl md:text-3xl font-light tracking-[0.12em] lowercase mb-3">
            stay in the loop
          </p>
          <p className="text-sm font-light text-brand-white/70 mb-8 max-w-xl mx-auto">
            New product drops, material guides, and OEM insights — straight to
            your inbox. No spam, unsubscribe anytime.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full sm:flex-1 bg-transparent border border-brand-white/40 px-4 py-3 text-sm font-light placeholder:text-brand-white/50 focus:outline-none focus:border-brand-white transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-brand-white text-brand-black text-xs tracking-[0.12em] uppercase px-8 py-3.5 hover:bg-brand-white/85 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Link groups */}
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2 md:col-span-2">
            <Link
              href="/"
              className="font-serif text-2xl tracking-[0.3em] lowercase font-medium"
            >
              glintic
            </Link>
            <p className="mt-4 text-sm font-light text-brand-white/60 leading-relaxed max-w-xs">
              Support Engineered. Performance Delivered. A one-stop Sports
              Support & Yoga Ecosystem from Shanghai.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="text-brand-white/60 hover:text-brand-white transition-colors duration-300"
                >
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-brand-white/50 mb-5">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-brand-white/75 hover:text-brand-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className="py-6 border-t border-brand-white/15 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs font-light text-brand-white/45">
            © 2026 Shanghai Shandong Wuxian Technology Co., Ltd. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-light text-brand-white/45">
            <a href="#" className="hover:text-brand-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
