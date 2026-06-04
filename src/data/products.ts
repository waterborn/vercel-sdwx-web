export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "wireless-headphones-pro",
    name: "Wireless Headphones Pro",
    category: "Audio",
    price: 149.99,
    originalPrice: 199.99,
    description:
      "Premium noise-canceling wireless headphones with 40-hour battery life and immersive spatial audio.",
    features: [
      "Active Noise Cancellation",
      "40-Hour Battery Life",
      "Spatial Audio",
      "Multipoint Connection",
    ],
    image: "/products/headphones.svg",
    rating: 4.8,
    reviews: 2341,
    badge: "Best Seller",
  },
  {
    id: "smart-watch-ultra",
    name: "Smart Watch Ultra",
    category: "Wearables",
    price: 399.99,
    description:
      "Advanced fitness tracking, GPS navigation, and seamless smartphone integration in a stunning titanium design.",
    features: [
      "Titanium Case",
      "Always-On Display",
      "GPS + Cellular",
      "Blood Oxygen Monitoring",
    ],
    image: "/products/watch.svg",
    rating: 4.7,
    reviews: 1856,
  },
  {
    id: "portable-speaker-x",
    name: "Portable Speaker X",
    category: "Audio",
    price: 89.99,
    originalPrice: 119.99,
    description:
      "360° surround sound with deep bass, waterproof design for any adventure.",
    features: [
      "360° Sound",
      "IP67 Waterproof",
      "24-Hour Battery",
      "Stereo Pairing",
    ],
    image: "/products/speaker.svg",
    rating: 4.6,
    reviews: 3120,
    badge: "Sale",
  },
  {
    id: "mechanical-keyboard-rgb",
    name: "Mechanical Keyboard RGB",
    category: "Accessories",
    price: 129.99,
    description:
      "Hot-swappable mechanical switches with per-key RGB lighting and aircraft-grade aluminum frame.",
    features: [
      "Hot-Swappable Switches",
      "Per-Key RGB",
      "Aluminum Frame",
      "USB-C Connection",
    ],
    image: "/products/keyboard.svg",
    rating: 4.9,
    reviews: 987,
    badge: "New",
  },
  {
    id: "webcam-4k-stream",
    name: "Webcam 4K Stream",
    category: "Accessories",
    price: 179.99,
    originalPrice: 229.99,
    description:
      "Professional-grade 4K streaming webcam with AI auto-framing and low-light correction.",
    features: [
      "4K Ultra HD",
      "AI Auto-Framing",
      "Low-Light Correction",
      "Built-in Mic Array",
    ],
    image: "/products/webcam.svg",
    rating: 4.5,
    reviews: 654,
    badge: "Sale",
  },
  {
    id: "power-bank-20000",
    name: "Power Bank 20000",
    category: "Power",
    price: 59.99,
    description:
      "Slim and lightweight 20,000mAh power bank with 65W fast charging for laptops and devices.",
    features: [
      "20,000mAh Capacity",
      "65W Fast Charging",
      "Dual USB-C Ports",
      "LED Display",
    ],
    image: "/products/powerbank.svg",
    rating: 4.7,
    reviews: 4210,
  },
];

export const categories = [
  "All",
  ...Array.from(new Set(products.map((p) => p.category))),
];
