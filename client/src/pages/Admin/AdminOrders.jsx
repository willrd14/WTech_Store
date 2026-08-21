import { useState, useEffect } from "react";
import { api } from "../../services/api";

const statuses = ["pending", "paid", "shipped", "delivered", "cancelled"];

const statusLabels = {
  pending: "PENDIENTE",
  paid: "PAGADO",
  shipped: "ENVIADO",
  delivered: "ENTREGADO",
  cancelled: "CANCELADO",
};

const statusColors = {
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  paid: "text-primary-container bg-primary-container/10 border-primary-container/30",
  shipped: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  delivered: "text-green-400 bg-green-400/10 border-green-400/30",
  cancelled: "text-error bg-error-container/10 border-error-container/30",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const fetchOrders = (p) => {
    setLoading(true);
    api
      .getAdminOrders({ page: p, limit })
      .then((res) => {
        setOrders(res.data);
        setTotal(res.total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.updateAdminOrder(orderId, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      alert("Error al actualizar el estado del pedido");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-8">
        <span className="text-gradient-cyan">Pedidos</span>
      </h1>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="text-primary-container font-label-caps animate-pulse">
            Cargando pedidos...
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="glass-panel rounded-lg p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-outline-variant mb-4 block">
            receipt_long
          </span>
          <p className="text-on-surface-variant font-body-md">No hay pedidos aun</p>
        </div>
      ) : (
        <>
          <div className="glass-panel rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant/30">
                    <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                      ID Pedido
                    </th>
                    <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Articulos
                    </th>
                    <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Total
                    </th>
                    <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Fecha
                    </th>
                    <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-outline-variant/20 hover:bg-surface-container/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-on-surface text-sm font-mono">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant text-sm">
                        {order.order_items?.length || 0} articulo
                        {order.order_items?.length !== 1 ? "s" : ""}
                      </td>
                      <td className="px-6 py-4 text-primary-fixed text-sm font-medium">
                        ${parseFloat(order.total).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant text-sm">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className={`font-label-caps text-[10px] px-3 py-1.5 rounded border cursor-pointer bg-transparent focus:outline-none ${
                            statusColors[order.status] || statusColors.pending
                          }`}
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s} className="bg-surface">
                              {statusLabels[s]}
                            </option>
                          ))}
                        </select>
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
