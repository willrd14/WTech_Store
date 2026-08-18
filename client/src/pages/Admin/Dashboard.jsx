import { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getAdminStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-primary-container font-label-caps animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: "inventory_2",
      color: "primary-container",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: "receipt_long",
      color: "tertiary-fixed-dim",
    },
    {
      label: "Revenue",
      value: `$${(stats?.totalRevenue ?? 0).toFixed(2)}`,
      icon: "attach_money",
      color: "primary-fixed",
    },
  ];

  return (
    <div>
      <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-8">
        Admin <span className="text-gradient-cyan">Dashboard</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="glass-panel rounded-lg p-6 flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-lg bg-primary-container/10 flex items-center justify-center">
              <span className={`material-symbols-outlined text-${card.color} text-2xl`}>
                {card.icon}
              </span>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                {card.label}
              </p>
              <p className={`font-display-lg text-2xl text-${card.color} mt-1`}>
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
