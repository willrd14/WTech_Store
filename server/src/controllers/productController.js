import { supabase } from "../config/supabase.js";

export async function getProducts(req, res, next) {
  try {
    const { category, maxPrice, sort, search } = req.query;

    let query = supabase
      .from("products")
      .select("*")
      .eq("in_stock", true);

    if (category) {
      const categories = category.split(",");
      query = query.in("category", categories);
    }

    if (maxPrice) {
      query = query.lte("price", Number(maxPrice));
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    switch (sort) {
      case "price-asc":
        query = query.order("price", { ascending: true });
        break;
      case "price-desc":
        query = query.order("price", { ascending: false });
        break;
      case "rating":
        query = query.order("rating", { ascending: false });
        break;
      case "new":
        query = query.order("created_at", { ascending: false });
        break;
      default:
        query = query.order("id", { ascending: true });
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getProductsByCategory(req, res, next) {
  try {
    const { category } = req.params;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("in_stock", true)
      .order("id", { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getFeaturedProducts(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("in_stock", true)
      .order("rating", { ascending: false })
      .limit(4);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
}
