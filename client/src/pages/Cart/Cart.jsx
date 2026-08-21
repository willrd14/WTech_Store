import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <main className="flex-grow flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="material-symbols-outlined text-7xl text-outline mb-6 block">
            shopping_cart
          </span>
          <h1 className="font-display-lg text-headline-lg text-on-surface mb-4">
            El Carrito Esta Vacio
          </h1>
          <p className="font-body-md text-on-surface-variant mb-8">
            Tu terminal no tiene pedidos activos.
          </p>
          <Link
            to="/products"
            className="bg-primary-container text-[#050B10] font-label-caps text-label-caps px-8 py-4 rounded uppercase hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 inline-flex items-center gap-2"
          >
            Ver Catalogo
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-20 py-16 lg:py-24 relative">
      <div className="w-full h-32 md:h-48 mb-12 relative flex items-center justify-center overflow-hidden rounded-lg cyber-glass cyber-border-gradient">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="relative z-10 text-center">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]">
            TERMINAL SEGURA
          </h1>
          <p className="font-label-caps text-label-caps text-primary-fixed/70 uppercase tracking-widest mt-2">
            Sesion Activa // Datos del Carrito
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px circuit-line-h" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="cyber-glass cyber-border-gradient p-6 rounded-lg flex flex-col sm:flex-row gap-6 relative group transition-all duration-300 hover:shadow-[0px_0px_20px_rgba(0,242,255,0.05)]"
            >
              <div className="w-full sm:w-48 aspect-video bg-surface-container-highest rounded flex-shrink-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10 pointer-events-none" />
                <img
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
                  alt={item.name}
                  src={item.image}
                />
              </div>
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-lg-mobile text-[24px] text-on-surface leading-tight">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-on-surface-variant hover:text-error transition-colors"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">
                    SKU: {item.category.toUpperCase()} // IN STOCK
                  </p>
                  <div className="flex gap-2">
                    {item.features.slice(0, 2).map((feat) => (
                      <span
                        key={feat}
                        className="px-2 py-1 bg-primary-container/10 text-primary border border-primary/30 font-label-caps text-[10px] rounded uppercase"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-end justify-between mt-6 border-t border-primary/10 pt-4">
                  <div className="flex items-center gap-3 bg-surface-container px-3 py-1 rounded border border-surface-variant">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="text-on-surface hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        remove
                      </span>
                    </button>
                    <span className="font-label-caps text-label-caps w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="text-on-surface hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        add
                      </span>
                    </button>
                  </div>
                  <div className="font-label-caps text-[20px] text-primary tracking-tight">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 h-fit sticky top-32">
          <div className="cyber-glass p-8 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
              <div className="absolute top-4 right-6 w-8 h-px bg-primary/40" />
              <div className="absolute top-6 right-4 w-px h-8 bg-primary/40" />
            </div>
            <h2 className="font-display-lg text-headline-lg-mobile text-on-surface mb-6 border-b border-primary/20 pb-4">
              Resumen del Pedido
            </h2>
            <div className="space-y-4 mb-8 font-label-caps text-label-caps">
              <div className="flex justify-between text-on-surface-variant">
                <span>SUBTOTAL</span>
                <span className="text-on-surface">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>ENVIO EST.</span>
                <span className="text-on-surface">
                  SE CALCULARA EN EL PAGO
                </span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>IMPUESTOS</span>
                <span className="text-on-surface">
                  SE CALCULARA EN EL PAGO
                </span>
              </div>
            </div>
            <div className="border-t border-primary/20 pt-6 mb-8 flex justify-between items-end">
              <span className="font-label-caps text-label-caps text-on-surface">
                TOTAL
              </span>
              <span className="font-display-lg text-[32px] text-primary drop-shadow-[0_0_10px_rgba(0,242,255,0.3)] leading-none">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <Link
              to="/checkout"
              className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-4 rounded uppercase tracking-widest hover:bg-primary-fixed-dim transition-all duration-300 shadow-[0px_0px_15px_rgba(0,242,255,0.2)] hover:shadow-[0px_0px_25px_rgba(0,242,255,0.5)] flex items-center justify-center gap-2 group"
            >
              Proceder al Pago
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
            <p className="text-center font-label-caps text-[10px] text-on-surface-variant mt-4 opacity-60">
              ENCRIPTACION SEGURA DE 256-BIT
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
