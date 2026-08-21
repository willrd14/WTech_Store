import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { formatPrice, getDiscountedPrice } from "../../utils/formatPrice";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();
  const { addItem } = useCart();

  return (
    <section className="px-5 md:px-20 py-24 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
            Ultimas Innovaciones
          </h2>
          <p className="font-label-caps text-label-caps text-outline">
            Los ultimos accesorios tecnologicos.
          </p>
        </div>
        <Link
          to="/products"
          className="text-primary-container font-label-caps text-label-caps border-b border-primary-container/30 hover:border-primary-container pb-1 transition-colors self-start md:self-auto"
        >
          Ver Todo
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product) => {
          const hasDiscount = product.discount && product.discount > 0;
          const finalPrice = getDiscountedPrice(product);

          return (
            <div
              key={product.id}
              className="glass-panel rounded-lg p-1 group flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="bg-[#000D16] rounded-md overflow-hidden relative aspect-[4/3] flex items-center justify-center p-4">
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-primary-container/20 border border-primary-container text-primary-container px-2 py-1 text-[10px] font-label-caps uppercase rounded-sm">
                    {product.badge}
                  </div>
                )}
                {hasDiscount && (
                  <div className="absolute top-2 right-2 bg-error/90 border border-error text-white px-2 py-1 text-[10px] font-label-caps rounded-sm">
                    -{product.discount}%
                  </div>
                )}
                <Link to={`/products/${product.id}`}>
                  <img
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    src={product.image}
                  />
                </Link>
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <Link
                    to={`/products/${product.id}`}
                    className="font-body-md font-semibold text-on-surface mb-1 hover:text-primary transition-colors"
                  >
                    {product.name}
                  </Link>
                  <p className="font-label-caps text-label-caps text-outline text-[10px] uppercase">
                    {product.category}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {hasDiscount && (
                      <span className="font-label-caps text-xs text-on-surface-variant line-through">
                        {formatPrice(product.price)}
                      </span>
                    )}
                    <span className="font-label-caps text-primary-container">
                      {formatPrice(finalPrice)}
                    </span>
                  </div>
                  <button
                    onClick={() => addItem(product)}
                    className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:text-primary-container hover:border-primary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      add
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
