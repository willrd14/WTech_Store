import { supabase } from "../config/supabase.js";

export async function getDashboardStats(req, res, next) {
  try {
    const [productsCount, ordersResult, revenueResult] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("id, total"),
      supabase.from("orders").select("total").eq("status", "paid"),
    ]);

    const totalOrders = ordersResult.data?.length || 0;
    const totalRevenue =
      revenueResult.data?.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0) || 0;

    res.json({
      totalProducts: productsCount.count || 0,
      totalOrders,
      totalRevenue,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAdminProducts(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const from = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, from + limit - 1);

    if (error) throw error;

    res.json({ data, total: count, page, limit });
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req, res, next) {
  try {
    const {
      name, slug, description, price, category, image,
      images, features, badge, in_stock,
    } = req.body;

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        slug,
        description,
        price,
        category,
        image,
        images: images || [],
        features: features || [],
        badge,
        in_stock: in_stock !== false,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.features && typeof updates.features === "string") {
      updates.features = updates.features.split(",").map((f) => f.trim()).filter(Boolean);
    }

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
}

export async function getAdminOrders(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const from = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          *,
          products (name, image)
        )
      `,
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(from, from + limit - 1);

    if (error) throw error;

    res.json({ data, total: count, page, limit });
  } catch (err) {
    next(err);
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "paid", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
}
