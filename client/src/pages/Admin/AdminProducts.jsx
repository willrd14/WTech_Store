import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const fetchProducts = (p) => {
    setLoading(true);
    api
      .getAdminProducts({ page: p, limit })
      .then((res) => {
        setProducts(res.data);
        setTotal(res.total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Eliminar "${name}"? Esta accion no se puede deshacer.`)) return;
    try {
      await api.deleteAdminProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setTotal((prev) => prev - 1);
    } catch (err) {
      alert("Error al eliminar el producto");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          <span className="text-gradient-cyan">Productos</span>
        </h1>
        <Link
          to="/admin/products/new"
          className="bg-primary-container text-on-primary font-label-caps text-label-caps px-5 py-2.5 rounded flex items-center gap-2 neon-glow neon-glow-hover transition-all font-bold uppercase tracking-wider"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Agregar Producto
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="text-primary-container font-label-caps animate-pulse">
            Cargando productos...
          </div>
        </div>
      ) : (
        <>
          <div className="glass-panel rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant/30">
                    <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Producto
                    </th>
                    <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Categoria
                    </th>
                    <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Precio
                    </th>
                    <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Stock
                    </th>
                    <th className="text-right px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-outline-variant/20 hover:bg-surface-container/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-surface-container-highest rounded flex items-center justify-center overflow-hidden">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="material-symbols-outlined text-outline-variant text-sm">
                                image
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="text-on-surface text-sm font-medium">
                              {product.name}
                            </p>
                            <p className="text-on-surface-variant text-xs">
                              {product.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant text-sm">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-primary-fixed text-sm font-medium">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-label-caps text-[10px] px-2 py-1 rounded ${
                            product.in_stock
                              ? "bg-primary-container/10 text-primary-container border border-primary-container/30"
                              : "bg-error-container/10 text-error border border-error-container/30"
                          }`}
                        >
                          {product.in_stock ? "EN STOCK" : "SIN STOCK"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/products/${product.id}/edit`}
                            className="text-on-surface-variant hover:text-primary-container transition-colors p-1.5 rounded hover:bg-primary-container/10"
                          >
                            <span className="material-symbols-outlined text-lg">
                              edit
                            </span>
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="text-on-surface-variant hover:text-error transition-colors p-1.5 rounded hover:bg-error-container/10"
                          >
                            <span className="material-symbols-outlined text-lg">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary-container disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                Pagina {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary-container disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
