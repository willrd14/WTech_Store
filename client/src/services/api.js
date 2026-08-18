import { supabase } from "./supabase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function authHeaders() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    "Content-Type": "application/json",
    ...(session?.access_token && {
      Authorization: `Bearer ${session.access_token}`,
    }),
  };
}

export const api = {
  async getProducts(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category) params.append("category", filters.category);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.search) params.append("search", filters.search);

    const res = await fetch(`${API_URL}/api/products?${params}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  async getProduct(id) {
    const res = await fetch(`${API_URL}/api/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  },

  async createPaypalOrder(items) {
    const headers = await authHeaders();

    const res = await fetch(`${API_URL}/api/orders/create`, {
      method: "POST",
      headers,
      body: JSON.stringify({ items }),
    });
    if (!res.ok) throw new Error("Failed to create order");
    return res.json();
  },

  async capturePaypalOrder(orderId) {
    const headers = await authHeaders();

    const res = await fetch(`${API_URL}/api/orders/capture`, {
      method: "POST",
      headers,
      body: JSON.stringify({ orderId }),
    });
    if (!res.ok) throw new Error("Failed to capture order");
    return res.json();
  },

  async getOrders() {
    const headers = await authHeaders();

    const res = await fetch(`${API_URL}/api/orders`, { headers });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  },

  async getAdminStats() {
    const headers = await authHeaders();
    const res = await fetch(`${API_URL}/api/admin/dashboard`, { headers });
    if (!res.ok) throw new Error("Failed to fetch admin stats");
    return res.json();
  },

  async getAdminProducts(params = {}) {
    const headers = await authHeaders();
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append("page", params.page);
    if (params.limit) searchParams.append("limit", params.limit);
    const res = await fetch(`${API_URL}/api/admin/products?${searchParams}`, { headers });
    if (!res.ok) throw new Error("Failed to fetch admin products");
    return res.json();
  },

  async createAdminProduct(data) {
    const headers = await authHeaders();
    const res = await fetch(`${API_URL}/api/admin/products`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
  },

  async updateAdminProduct(id, data) {
    const headers = await authHeaders();
    const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update product");
    return res.json();
  },

  async deleteAdminProduct(id) {
    const headers = await authHeaders();
    const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return res.json();
  },

  async getAdminOrders(params = {}) {
    const headers = await authHeaders();
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append("page", params.page);
    if (params.limit) searchParams.append("limit", params.limit);
    const res = await fetch(`${API_URL}/api/admin/orders?${searchParams}`, { headers });
    if (!res.ok) throw new Error("Failed to fetch admin orders");
    return res.json();
  },

  async updateAdminOrder(id, data) {
    const headers = await authHeaders();
    const res = await fetch(`${API_URL}/api/admin/orders/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update order");
    return res.json();
  },

  async sendSupportMessage(data) {
    const res = await fetch(`${API_URL}/api/support`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || "Failed to send message");
    }
    return res.json();
  },
};
