export const categories = [
  {
    id: "cases",
    name: "Core Protection",
    subtitle: "Cyber-Armored Cases",
    description: "Ultra-durable cases for ultimate device protection",
    image: "/images/categories/cases.png",
  },
  {
    id: "chargers",
    name: "Power Systems",
    subtitle: "Fast-Charge Hubs",
    description: "High-speed charging solutions for all devices",
    image: "/images/categories/chargers.png",
  },
  {
    id: "screen-protectors",
    name: "Visual Shields",
    subtitle: "Tempered Glass",
    description: "Crystal-clear screen protection technology",
    image: "/images/categories/screen-protectors.png",
  },
  {
    id: "mounts",
    name: "Magnetic Mounts",
    subtitle: "Auto-Align Systems",
    description: "Precision magnetic mounting solutions",
    image: "/images/categories/mounts.png",
  },
];

export const products = [
  {
    id: 1,
    name: "Aegis Carbon Case",
    category: "cases",
    price: 60,
    rating: 4.8,
    badge: "V2.0",
    image: "/images/products/aegis-carbon.png",
    description:
      "Ultra-durable carbon fiber case with military-grade protection. MagSafe compatible with precision-cut ports.",
    features: ["MagSafe Compatible", "Military Grade", "Slim Profile"],
    inStock: true,
    discount: 0,
    createdAt: "2025-09-15T10:00:00Z",
  },
  {
    id: 2,
    name: "Plasma Charge Hub",
    category: "chargers",
    price: 85,
    rating: 4.9,
    badge: null,
    image: "/images/products/plasma-charge.png",
    description:
      "65W GaN fast charger with 4 USB-C ports. Intelligent power distribution for all your devices.",
    features: ["65W GaN", "4x USB-C", "Fast Charging"],
    inStock: true,
    discount: 0,
    createdAt: "2025-08-01T10:00:00Z",
  },
  {
    id: 3,
    name: "Ion Shield Glass",
    category: "screen-protectors",
    price: 35,
    rating: 5.0,
    badge: "NEW",
    image: "/images/products/ion-shield.png",
    description:
      "9H hardness tempered glass with anti-fingerprint nano-coation. 99.9% transparency.",
    features: ["9H Hardness", "Anti-Fingerprint", "Ultra-Clear"],
    inStock: true,
    discount: 0,
    createdAt: "2026-07-20T10:00:00Z",
  },
  {
    id: 4,
    name: "Mag-Lock Mount",
    category: "mounts",
    price: 45,
    rating: 4.5,
    badge: null,
    image: "/images/products/mag-lock.png",
    description:
      "N52 neodymium magnetic mount with 360-degree rotation. Universal compatibility.",
    features: ["N52 Magnets", "360 Rotation", "Universal"],
    inStock: true,
    discount: 20,
    createdAt: "2025-06-10T10:00:00Z",
  },
  {
    id: 5,
    name: "Titanium Frame Case",
    category: "cases",
    price: 59,
    rating: 4.9,
    badge: "IN STOCK",
    image: "/images/products/titanium-frame.png",
    description:
      "Ultra-durable, lightweight titanium case for ultimate device protection with aerospace-grade materials.",
    features: ["Titanium", "Lightweight", "Aerospace Grade"],
    inStock: true,
    discount: 0,
    createdAt: "2025-10-05T10:00:00Z",
  },
  {
    id: 6,
    name: "Super-Sonic GaN Charger",
    category: "chargers",
    price: 49,
    rating: 4.7,
    badge: null,
    image: "/images/products/sonic-gan.png",
    description:
      "High-speed, compact charging brick with dual USB-C ports. GaN technology for maximum efficiency.",
    features: ["GaN Technology", "Dual USB-C", "Compact"],
    inStock: true,
    discount: 15,
    createdAt: "2025-07-12T10:00:00Z",
  },
  {
    id: 7,
    name: "Liquid Crystal Protector",
    category: "screen-protectors",
    price: 29,
    rating: 5.0,
    badge: "NEW RELEASE",
    image: "/images/products/liquid-crystal.png",
    description:
      "Scratch-resistant, tempered glass with anti-fingerprint coating. Self-healing nano-layer.",
    features: ["Self-Healing", "Anti-Fingerprint", "Case Friendly"],
    inStock: true,
    discount: 25,
    createdAt: "2026-08-01T10:00:00Z",
  },
  {
    id: 8,
    name: "Mag-Lock Car Mount",
    category: "mounts",
    price: 35,
    rating: 4.5,
    badge: null,
    image: "/images/products/mag-lock-car.png",
    description:
      "Strong magnetic car mount with 360-degree rotation. Dashboard and windshield compatible.",
    features: ["Car Mount", "360 Rotation", "Strong Magnet"],
    inStock: true,
    discount: 0,
    createdAt: "2025-05-20T10:00:00Z",
  },
];

export function getProductsByCategory(categoryId) {
  return products.filter((p) => p.category === categoryId);
}

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

export function getFeaturedProducts() {
  return products.slice(0, 4);
}

export function getNewArrivals() {
  return products.filter((p) => p.badge === "NEW" || p.badge === "NEW RELEASE");
}
