import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../data/products";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addItem } = useCart();

  if (!product) {
    return (
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-outline mb-4 block">
            error_outline
          </span>
          <h1 className="font-display-lg text-headline-lg text-on-surface mb-4">
            Producto No Encontrado
          </h1>
          <Link
            to="/products"
            className="text-primary-container font-label-caps text-label-caps hover:underline"
          >
            Volver al Catalogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-20 py-12">
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary-container rounded-full blur-[150px]" />
      </div>

      <nav className="mb-8 font-label-caps text-sm text-on-surface-variant">
        <Link to="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-primary transition-colors">
          Catalogo
        </Link>
        <span className="mx-2">/</span>
        <span className="text-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="glass-panel rounded-lg p-8 flex items-center justify-center min-h-[400px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <img
            alt={product.name}
            className="w-full h-full max-h-[500px] object-contain relative z-10"
            src={product.image}
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-2">
            <span className="font-label-caps text-label-caps text-outline uppercase">
              {product.category}
            </span>
          </div>

          <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1 text-primary-container">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-label-caps text-sm">{product.rating}</span>
            </div>
            <span className="text-outline">|</span>
            <span className="font-label-caps text-sm text-on-surface-variant">
              {product.inStock ? "En Stock" : "Sin Stock"}
            </span>
          </div>

          <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {product.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 bg-primary-container/10 text-primary border border-primary/30 font-label-caps text-[10px] rounded uppercase"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="border-t border-primary/10 pt-6 mt-auto">
            <div className="flex items-end justify-between mb-6">
              <span className="font-display-lg text-headline-lg text-primary drop-shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                ${product.price}
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => addItem(product)}
                className="flex-1 bg-primary-container text-[#050B10] font-label-caps text-label-caps py-4 rounded uppercase tracking-widest hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 font-bold"
              >
                <span className="material-symbols-outlined text-lg">
                  shopping_cart
                </span>
                Agregar al Carrito
              </button>
              <Link
                to="/cart"
                className="bg-transparent border border-primary-container text-primary-container font-label-caps text-label-caps py-4 px-8 rounded uppercase hover:bg-primary-container/10 transition-all duration-300 flex items-center justify-center"
              >
                Comprar Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
