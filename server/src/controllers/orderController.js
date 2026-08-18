import { paypalFetch } from "../config/paypal.js";
import { supabase } from "../config/supabase.js";

export async function createOrder(req, res, next) {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const productIds = items.map((item) => item.product_id);
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    if (productsError) throw productsError;

    const paypalItems = items.map((item) => {
      const product = products.find((p) => p.id === item.product_id);
      return {
        name: product.name,
        description: product.description?.substring(0, 127) || "",
        unit_amount: {
          currency_code: "USD",
          value: product.price.toFixed(2),
        },
        quantity: item.quantity.toString(),
        sku: product.slug || `prod-${product.id}`,
      };
    });

    const subtotal = items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.product_id);
      return sum + product.price * item.quantity;
    }, 0);

    const origin = req.headers.origin || "http://localhost:5173";

    const order = await paypalFetch("/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            description: "WTech Store Purchase",
            amount: {
              currency_code: "USD",
              value: subtotal.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: subtotal.toFixed(2),
                },
              },
            },
            items: paypalItems,
          },
        ],
        application_context: {
          brand_name: "WTech Store",
          landing_page: "BILLING",
          user_action: "PAY_NOW",
          return_url: `${origin}/checkout?success=true`,
          cancel_url: `${origin}/checkout?cancelled=true`,
        },
      }),
    });

    res.json({
      id: order.id,
      status: order.status,
    });
  } catch (err) {
    next(err);
  }
}

export async function captureOrder(req, res, next) {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "No order ID provided" });
    }

    const capture = await paypalFetch(
      `/v2/checkout/orders/${orderId}/capture`,
      { method: "POST" }
    );

    const purchaseUnit = capture.purchase_units?.[0];

    if (req.user && capture.status === "COMPLETED") {
      const orderItems = purchaseUnit?.items || [];
      const totalAmount = parseFloat(purchaseUnit?.amount?.value || "0");

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: req.user.id,
          status: "paid",
          subtotal: totalAmount,
          total: totalAmount,
          payment_intent_id: capture.id,
          shipping_address: purchaseUnit?.shipping?.address || null,
        })
        .select()
        .single();

      if (!orderError && order) {
        const { data: allProducts } = await supabase
          .from("products")
          .select("id, slug, price");

        const itemsToInsert = orderItems.map((item) => {
          const product = allProducts?.find(
            (p) =>
              p.slug === item.sku ||
              p.id === parseInt(item.sku?.replace("prod-", ""))
          );
          return {
            order_id: order.id,
            product_id: product?.id || null,
            quantity: parseInt(item.quantity),
            unit_price: parseFloat(item.unit_amount?.value || "0"),
          };
        });

        await supabase.from("order_items").insert(itemsToInsert);
      }
    }

    res.json({
      id: capture.id,
      status: capture.status,
      payer: capture.payer,
    });
  } catch (err) {
    next(err);
  }
}

export async function getOrders(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          *,
          products (name, image)
        )
      `
      )
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getOrder(req, res, next) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          *,
          products (name, image, price)
        )
      `
      )
      .eq("id", id)
      .eq("user_id", req.user.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
}
