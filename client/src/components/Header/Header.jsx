import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../services/supabase";

const navLinks = [
  { label: "Catalogo", path: "/products" },
  { label: "Novedades", path: "/products?sort=new" },
  { label: "Ofertas", path: "/products?deals=true" },
  { label: "Soporte", path: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const location = useLocation();
  const { cartCount } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setRole(null);
      return;
    }

    supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        setRole(data?.role || null);
      });
  }, [user]);

  return (
    <nav className="bg-surface/60 backdrop-blur-xl docked full-width top-0 sticky border-b border-primary/20 shadow-[0px_0px_15px_rgba(0,242,255,0.1)] z-50">
      <div className="flex justify-between items-center w-full px-5 md:px-20 py-4 max-w-[1440px] mx-auto">
        <Link to="/" className="flex items-center gap-4">
          <span className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-primary dark:text-primary-fixed tracking-tighter uppercase">
            WTech
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`font-label-caps text-label-caps transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-[#000D16] border-b border-outline-variant focus-within:border-primary-container transition-colors duration-300 px-3 py-1">
            <span className="material-symbols-outlined text-outline-variant text-sm mr-2">
              search
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 text-on-surface font-label-caps text-label-caps placeholder-outline-variant w-40 outline-none"
              placeholder="Buscar tecnologia..."
              type="text"
            />
          </div>

          {role === "admin" && (
            <Link
              to="/admin"
              className="text-primary dark:text-primary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300"
              title="Panel Admin"
            >
              <span className="material-symbols-outlined">shield_person</span>
            </Link>
          )}

          <Link
            to="/cart"
            className="text-primary dark:text-primary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300 relative group"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-on-primary font-label-caps text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow-[0px_0px_10px_rgba(0,242,255,0.5)]">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="text-primary dark:text-primary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </Link>

          <button
            className="md:hidden text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface-container border-t border-primary/10 px-5 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block py-3 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors border-b border-outline-variant/20"
            >
              {link.label}
            </Link>
          ))}
          {role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="block py-3 font-label-caps text-label-caps text-primary-container hover:text-primary transition-colors"
            >
              Panel Admin
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
