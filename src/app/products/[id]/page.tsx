import Link from "next/link";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const categoryGradients: Record<string, string> = {
    Audio: "from-violet-500 to-purple-600",
    Wearables: "from-cyan-500 to-blue-600",
    Accessories: "from-amber-500 to-orange-600",
    Power: "from-emerald-500 to-green-600",
  };

  const categoryIcons: Record<string, string> = {
    Audio: "🎧",
    Wearables: "⌚",
    Accessories: "⌨️",
    Power: "🔋",
  };

  const gradient = categoryGradients[product.category] ?? "from-zinc-400 to-zinc-600";
  const icon = categoryIcons[product.category] ?? "📦";

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="transition-colors hover:text-zinc-900 dark:hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/#products" className="transition-colors hover:text-zinc-900 dark:hover:text-white">
            Products
          </Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className={`flex aspect-square w-full items-center justify-center bg-gradient-to-br ${gradient}`}
            >
              <div className="text-center">
                <span className="text-9xl drop-shadow-lg">{icon}</span>
                <p className="mt-4 text-lg font-medium text-white/70">
                  {product.category}
                </p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {product.category}
              </span>
              {product.badge && (
                <span className="ml-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-white">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-amber-400"
                        : "text-zinc-200 dark:text-zinc-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-zinc-900 dark:text-white">
                {product.rating}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-zinc-400 line-through dark:text-zinc-500">
                    ${product.originalPrice}
                  </span>
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
              {product.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">
                Key Features
              </h3>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 shrink-0 text-emerald-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <button className="flex-1 rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 dark:bg-white dark:text-zinc-900 dark:hover:bg-blue-500 dark:hover:text-white">
                Add to Cart
              </button>
              <button className="rounded-full border-2 border-zinc-900 px-8 py-3.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-zinc-900">
                Buy Now
              </button>
            </div>

            {/* Shipping Info */}
            <div className="mt-2 flex flex-col gap-2 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
              {[
                { icon: "🚚", text: "Free shipping on orders over $99" },
                { icon: "🔄", text: "30-day easy return policy" },
                { icon: "🛡️", text: "2-year warranty included" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
