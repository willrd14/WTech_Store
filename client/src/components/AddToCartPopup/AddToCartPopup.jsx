import { Link } from "react-router-dom";

export default function AddToCartPopup({ show, product, onClose }) {
  if (!show || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md mx-4 glass-panel rounded-lg p-6 animate-popup-enter">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 bg-primary-container/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-container text-3xl">
              check_circle
            </span>
          </div>
          <h3 className="font-display-lg text-lg text-on-surface">
            Added to Cart
          </h3>
        </div>

        <div className="flex items-center gap-4 bg-surface-container/50 rounded-lg p-4 mb-6">
          <div className="w-16 h-16 bg-surface-container-highest rounded flex items-center justify-center overflow-hidden flex-shrink-0">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="material-symbols-outlined text-outline-variant">
                image
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-on-surface text-sm font-medium truncate">
              {product.name}
            </p>
            <p className="text-primary-fixed text-sm mt-1">
              ${product.price}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/checkout"
            onClick={onClose}
            className="bg-primary-container text-on-primary font-label-caps text-label-caps py-3 rounded text-center uppercase tracking-widest hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 font-bold"
          >
            Proceed to Checkout
          </Link>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary-container font-label-caps text-label-caps py-3 border border-outline-variant rounded hover:border-primary-container/50 transition-all uppercase tracking-wider"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
