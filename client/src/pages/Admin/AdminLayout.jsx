import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const sidebarLinks = [
  { label: "Panel", path: "/admin", icon: "dashboard", exact: true },
  { label: "Productos", path: "/admin/products", icon: "inventory_2" },
  { label: "Pedidos", path: "/admin/orders", icon: "receipt_long" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-primary-container font-label-caps animate-pulse">
          Cargando...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-background">
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-surface/80 backdrop-blur-xl border-r border-outline-variant/30 transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-outline-variant/30">
          {sidebarOpen && (
            <h2 className="font-display-lg text-primary-container text-lg uppercase tracking-wider">
              Admin
            </h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-on-surface-variant hover:text-primary-container transition-colors"
          >
            <span className="material-symbols-outlined">
              {sidebarOpen ? "chevron_left" : "chevron_right"}
            </span>
          </button>
        </div>

        <nav className="flex-1 py-4">
          {sidebarLinks.map((link) => {
            const isActive = link.exact
              ? location.pathname === link.path
              : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 font-label-caps text-label-caps transition-all duration-200 ${
                  isActive
                    ? "text-primary-container bg-primary-container/10 border-r-2 border-primary-container"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container/50"
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {link.icon}
                </span>
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-outline-variant/30">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">home</span>
            {sidebarOpen && <span>Volver a la Tienda</span>}
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
