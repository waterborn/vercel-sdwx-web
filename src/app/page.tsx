import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-violet-600 to-purple-700">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              New Arrivals 2026
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Premium Tech,{" "}
              <span className="text-blue-200">Unmatched Value</span>
            </h1>
            <p className="mt-4 text-lg leading-8 text-blue-100">
              Discover cutting-edge electronics at prices you&apos;ll love. Free
              shipping on orders over $99.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="#products"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md"
              >
                Shop Now
              </a>
              <a
                href="#products"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                View Deals
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center divide-x divide-zinc-200 px-4 sm:px-6 dark:divide-zinc-800">
          {[
            { label: "Free Shipping", value: "Orders $99+" },
            { label: "Easy Returns", value: "30-Day Policy" },
            { label: "Secure Payment", value: "256-bit SSL" },
            { label: "24/7 Support", value: "Always On" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-6 py-4 sm:px-10"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </span>
              <span className="mt-0.5 text-sm font-bold text-zinc-900 dark:text-white">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Handpicked tech essentials for every lifestyle
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  cat === "All"
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Stay Updated
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Get exclusive deals and new product alerts delivered to your inbox.
            </p>
            <div className="mt-6 flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
              />
              <button className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 dark:bg-white dark:text-zinc-900 dark:hover:bg-blue-500 dark:hover:text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="text-sm font-bold text-zinc-900 dark:text-white">
              TechVault
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              &copy; 2026 TechVault. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
