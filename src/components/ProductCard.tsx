import Link from "next/link";
import type { Product } from "@/data/products";

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

function ProductPlaceholder({ name }: { name: string }) {
  const colors: Record<string, string> = {
    Audio: "from-violet-500 to-purple-600",
    Wearables: "from-cyan-500 to-blue-600",
    Accessories: "from-amber-500 to-orange-600",
    Power: "from-emerald-500 to-green-600",
  };

  const icons: Record<string, string> = {
    Audio: "🎧",
    Wearables: "⌚",
    Accessories: "⌨️",
    Power: "🔋",
  };

  return (
    <div
      className={`flex aspect-square w-full items-center justify-center bg-gradient-to-br ${
        colors["default"] ?? "from-zinc-400 to-zinc-600"
      } ${colors["Audio"] ?? ""}`}
    >
      <div className="text-center">
        <span className="text-5xl">{icons["default"] ?? "📦"}</span>
        <p className="mt-2 text-sm font-medium text-white/80">{name}</p>
      </div>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const badgeColors: Record<string, string> = {
    "Best Seller": "bg-amber-500 text-white",
    Sale: "bg-red-500 text-white",
    New: "bg-emerald-500 text-white",
  };

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

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-lg hover:shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-zinc-900/50">
      {/* Product Image Area */}
      <Link href={`/products/${product.id}`} className="relative overflow-hidden">
        <div
          className={`flex aspect-square w-full items-center justify-center bg-gradient-to-br ${gradient} transition-transform duration-300 group-hover:scale-105`}
        >
          <div className="text-center">
            <span className="text-6xl drop-shadow-lg">{icon}</span>
            <p className="mt-2 text-sm font-medium text-white/70">
              {product.category}
            </p>
          </div>
        </div>
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
              badgeColors[product.badge] ?? "bg-zinc-800 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-base font-semibold text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400">
            {product.name}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-amber-400"
                    : "text-zinc-200 dark:text-zinc-700"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price & Buy */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-zinc-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-zinc-400 line-through dark:text-zinc-500">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 dark:bg-white dark:text-zinc-900 dark:hover:bg-blue-500 dark:hover:text-white">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
