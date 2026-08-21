export const categories = [
  {
    id: "cases",
    name: "Proteccion Central",
    subtitle: "Fundas Blindadas",
    description: "Fundas ultra-resistentes para la maxima proteccion de tu dispositivo",
    image: "/images/categories/cases.png",
  },
  {
    id: "chargers",
    name: "Sistemas de Energia",
    subtitle: "Carga Rapida",
    description: "Soluciones de carga rapida para todos tus dispositivos",
    image: "/images/categories/chargers.png",
  },
  {
    id: "screen-protectors",
    name: "Escudos Visuales",
    subtitle: "Vidrio Templado",
    description: "Tecnologia de proteccion de pantalla cristalina",
    image: "/images/categories/screen-protectors.png",
  },
  {
    id: "mounts",
    name: "Montajes Magneticos",
    subtitle: "Sistemas de Auto-Alineacion",
    description: "Soluciones de montaje magnetico de precision",
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
      "Funda de fibra de carbono ultra-resistente con proteccion de grado militar. Compatible MagSafe con puertos de precision.",
    features: ["Compatible MagSafe", "Grado Militar", "Perfil Delgado"],
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
      "Cargador rapido GaN de 65W con 4 puertos USB-C. Distribucion inteligente de energia para todos tus dispositivos.",
    features: ["GaN 65W", "4x USB-C", "Carga Rapida"],
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
      "Vidrio templado de dureza 9H con recubrimiento anti-huellas. 99.9% de transparencia.",
    features: ["Dureza 9H", "Anti-Huellas", "Ultra Claro"],
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
      "Montaje magnetico de neodimio N52 con rotacion de 360 grados. Compatibilidad universal.",
    features: ["Imanes N52", "Rotacion 360", "Universal"],
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
      "Funda de titanio ultra-resistente y ligera para la maxima proteccion de tu dispositivo con materiales de grado aeroespacial.",
    features: ["Titanio", "Ligero", "Grado Aeroespacial"],
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
      "Bloque de carga compacto de alta velocidad con doble puerto USB-C. Tecnologia GaN para maxima eficiencia.",
    features: ["Tecnologia GaN", "Doble USB-C", "Compacto"],
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
      "Vidrio templado resistente a rayones con recubrimiento anti-huellas. Capa nano auto-reparable.",
    features: ["Auto-Reparable", "Anti-Huellas", "Compatible con Funda"],
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
      "Montaje magnetico para auto con rotacion de 360 grados. Compatible con tablero y parabrisas.",
    features: ["Montaje para Auto", "Rotacion 360", "Iman Fuerte"],
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
