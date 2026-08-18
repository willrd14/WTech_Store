import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice, getDiscountedPrice } from "../../utils/formatPrice";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const hasDiscount = product.discount && product.discount > 0;
  const finalPrice = getDiscountedPrice(product);

  return (
    <article className="glass-panel rounded-lg overflow-hidden flex flex-col group relative transition-transform duration-300 hover:-translate-y-1">
      {product.inStock && (
        <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-primary-container/10 border border-primary-container/50 text-primary-container font-label-caps text-[10px] rounded backdrop-blur-sm shadow-[0_0_8px_rgba(0,242,255,0.3)]">
          IN STOCK
        </div>
      )}
      {product.badge && product.badge !== "IN STOCK" && (
        <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-tertiary/10 border border-tertiary/50 text-tertiary font-label-caps text-[10px] rounded backdrop-blur-sm">
          {product.badge}
        </div>
      )}
      {hasDiscount && (
        <div className="absolute bottom-3 left-3 z-10 px-2 py-1 bg-error/90 border border-error text-white font-label-caps text-[10px] rounded backdrop-blur-sm">
          -{product.discount}%
        </div>
      )}
      <div className="h-48 w-full bg-[#000D16] relative overflow-hidden flex items-center justify-center p-4">
        <Link to={`/products/${product.id}`}>
          <img
            className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 group-hover:scale-105 transition-all duration-500"
            alt={product.name}
            src={product.image}
          />
        </Link>
      </div>
      <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-transparent to-surface-container-lowest/80">
        <div className="flex justify-between items-start mb-2">
          <Link
            to={`/products/${product.id}`}
            className="font-headline-lg-mobile text-lg text-on-surface leading-tight hover:text-primary transition-colors"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-1 text-primary-container text-xs">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span>{product.rating}</span>
          </div>
        </div>
        <p className="font-body-md text-on-surface-variant text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <span className="font-label-caps text-sm text-on-surface-variant line-through">
                {formatPrice(product.price)}
              </span>
            )}
            <span className="font-label-caps text-lg text-primary-container">
              {formatPrice(finalPrice)}
            </span>
          </div>
          <button
            onClick={() => addItem(product)}
            className="bg-primary-container text-black px-4 py-2 rounded font-label-caps text-xs flex items-center gap-2 neon-glow neon-glow-hover transition-all font-bold"
          >
            ADD{" "}
            <span className="material-symbols-outlined text-[16px]">
              shopping_cart
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
