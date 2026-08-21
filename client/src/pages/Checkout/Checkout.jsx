import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { supabase } from "../../services/supabase";
import { formatPrice, getDiscountedPrice } from "../../utils/formatPrice";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      clearCart();
      navigate("/checkout?completed=true");
    }
  }, [searchParams, clearCart, navigate]);

  useEffect(() => {
    if (profile) {
      const nameParts = (profile.name || "").split(" ");
      setShipping({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        address: profile.address_line1 || "",
        addressLine2: profile.address_line2 || "",
        city: profile.city || "",
        postalCode: profile.postal_code || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const completed = searchParams.get("completed") === "true";

  if (completed) {
    return (
      <main className="flex-grow flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="material-symbols-outlined text-7xl text-primary-container mb-6 block">
            check_circle
          </span>
          <h1 className="font-display-lg text-headline-lg text-on-surface mb-4">
            Pago Exitoso
          </h1>
          <p className="font-body-md text-on-surface-variant mb-8">
            ¡Gracias por tu compra! Tu pedido ha sido confirmado.
          </p>
          <Link
            to="/products"
            className="bg-primary-container text-[#050B10] font-label-caps text-label-caps px-8 py-4 rounded uppercase hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 inline-flex items-center gap-2"
          >
            Seguir Comprando
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex-grow flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="material-symbols-outlined text-7xl text-outline mb-6 block">
            receipt_long
          </span>
          <h1 className="font-display-lg text-headline-lg text-on-surface mb-4">
            No Hay Articulos para Pagar
          </h1>
          <Link
            to="/products"
            className="text-primary-container font-label-caps text-label-caps hover:underline"
          >
            Ver Catalogo
          </Link>
        </div>
      </main>
    );
  }

  const paypalItems = items.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
  }));

  const handleShippingChange = (field, value) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfileAddress = async () => {
    if (!user) return;
    await supabase.from("profiles").upsert({
      id: user.id,
      phone: shipping.phone || null,
      address_line1: shipping.address || null,
      address_line2: shipping.addressLine2 || null,
      city: shipping.city || null,
      postal_code: shipping.postalCode || null,
    });
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}
    >
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-20 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-8 border-b border-primary/20 pb-4">
              Pago
            </h1>

            <div className="space-y-8">
              <div className="glass-panel rounded-lg p-6">
                <h2 className="font-label-caps text-primary-container mb-6 flex items-center gap-2 text-base">
                  <span className="material-symbols-outlined text-primary-container">
                    local_shipping
                  </span>
                  DIRECCION DE ENVIO
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                      NOMBRE
                    </label>
                    <input
                      type="text"
                      value={shipping.firstName}
                      onChange={(e) => handleShippingChange("firstName", e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                      placeholder="Nombre"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                      APELLIDO
                    </label>
                    <input
                      type="text"
                      value={shipping.lastName}
                      onChange={(e) => handleShippingChange("lastName", e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                      placeholder="Apellido"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                      DIRECCION
                    </label>
                    <input
                      type="text"
                      value={shipping.address}
                      onChange={(e) => handleShippingChange("address", e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                      placeholder="Direccion"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                      DIRECCION LINEA 2
                    </label>
                    <input
                      type="text"
                      value={shipping.addressLine2}
                      onChange={(e) => handleShippingChange("addressLine2", e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                      placeholder="Apartamento, suite, etc. (opcional)"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                      CIUDAD
                    </label>
                    <input
                      type="text"
                      value={shipping.city}
                      onChange={(e) => handleShippingChange("city", e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                      placeholder="Ciudad"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                      CODIGO POSTAL
                    </label>
                    <input
                      type="text"
                      value={shipping.postalCode}
                      onChange={(e) => handleShippingChange("postalCode", e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                      placeholder="Codigo postal"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                      TELEFONO
                    </label>
                    <input
                      type="tel"
                      value={shipping.phone}
                      onChange={(e) => handleShippingChange("phone", e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                      placeholder="Numero de telefono"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-outline-variant/20" />

              <div className="glass-panel rounded-lg p-6">
                <h2 className="font-label-caps text-primary-container mb-4 flex items-center gap-2 text-base">
                  <span className="material-symbols-outlined text-primary-container">payment</span>
                  PAGO
                </h2>
                <p className="font-body-md text-on-surface-variant text-sm mb-4">
                  Completa tu compra de forma segura con PayPal.
                </p>

                {error && (
                  <div className="bg-error-container/20 border border-error/30 rounded px-4 py-3 mb-4">
                    <p className="font-body-md text-error text-sm">{error}</p>
                  </div>
                )}

                <div className="min-h-[150px]">
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      color: "silver",
                      shape: "rect",
                      label: "pay",
                    }}
                    createOrder={async () => {
                      setLoading(true);
                      setError(null);
                      try {
                        const data = await api.createPaypalOrder(paypalItems);
                        return data.id;
                      } catch (err) {
                        setError("Failed to create order. Please try again.");
                        setLoading(false);
                        throw err;
                      }
                    }}
                    onApprove={async (data) => {
                      try {
                        await api.capturePaypalOrder(data.orderID);
                        await saveProfileAddress();
                        clearCart();
                        navigate("/checkout?completed=true");
                      } catch (err) {
                        setError("Payment capture failed. Please contact support.");
                        setLoading(false);
                      }
                    }}
                    onError={(err) => {
                      setError("An error occurred with PayPal. Please try again.");
                      setLoading(false);
                    }}
                    disabled={loading}
                  />
                </div>

                {loading && (
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="w-4 h-4 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
                    <span className="font-label-caps text-label-caps text-on-surface-variant">
                      Procesando...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 h-fit sticky top-32">
            <div className="cyber-glass p-8 rounded-lg">
              <h2 className="font-display-lg text-headline-lg-mobile text-on-surface mb-6 border-b border-primary/20 pb-4">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const finalPrice = getDiscountedPrice(item);
                  return (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-surface-container-highest rounded flex items-center justify-center overflow-hidden">
                          <img
                            alt={item.name}
                            className="w-full h-full object-contain"
                            src={item.image}
                          />
                        </div>
                        <div>
                          <p className="font-body-md text-on-surface text-sm">
                            {item.name}
                          </p>
                          <p className="font-label-caps text-[10px] text-outline">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-label-caps text-on-surface">
                        {formatPrice(finalPrice * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-primary/20 pt-4 space-y-3 font-label-caps text-label-caps">
                <div className="flex justify-between text-on-surface-variant">
                  <span>SUBTOTAL</span>
                  <span className="text-on-surface">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>ENVIO</span>
                  <span className="text-on-surface">GRATIS</span>
                </div>
              </div>
              <div className="border-t border-primary/20 pt-4 mt-4 flex justify-between items-end">
                <span className="font-label-caps text-on-surface">TOTAL</span>
                <span className="font-display-lg text-[28px] text-primary drop-shadow-[0_0_10px_rgba(0,242,255,0.3)] leading-none">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-center font-label-caps text-[10px] text-on-surface-variant mt-6 opacity-60">
                PAGO SEGURO VIA PAYPAL
              </p>
            </div>
          </div>
        </div>
      </main>
    </PayPalScriptProvider>
  );
}
