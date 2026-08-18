import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const categories = ["cases", "chargers", "screen-protectors", "mounts"];

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "cases",
    image: "",
    badge: "",
    in_stock: true,
    features: "",
  });
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      api
        .getProduct(id)
        .then((product) => {
          setForm({
            name: product.name || "",
            slug: product.slug || "",
            description: product.description || "",
            price: product.price || "",
            category: product.category || "cases",
            image: product.image || "",
            badge: product.badge || "",
            in_stock: product.in_stock !== false,
            features: (product.features || []).join(", "),
          });
        })
        .catch(() => alert("Failed to load product"))
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      price: parseFloat(form.price),
      features: form.features
        ? form.features.split(",").map((f) => f.trim()).filter(Boolean)
        : [],
    };

    try {
      if (isEditing) {
        await api.updateAdminProduct(id, payload);
      } else {
        await api.createAdminProduct(payload);
      }
      navigate("/admin/products");
    } catch (err) {
      alert("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-primary-container font-label-caps animate-pulse">
          Loading product...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-8">
        {isEditing ? "Edit" : "New"}{" "}
        <span className="text-gradient-cyan">Product</span>
      </h1>

      <form onSubmit={handleSubmit} className="glass-panel rounded-lg p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-label-caps text-on-surface mb-2 block">
              NAME
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
              placeholder="Product name"
            />
          </div>

          <div>
            <label className="font-label-caps text-on-surface mb-2 block">
              SLUG
            </label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
              placeholder="product-slug"
            />
          </div>
        </div>

        <div>
          <label className="font-label-caps text-on-surface mb-2 block">
            DESCRIPTION
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors resize-none"
            placeholder="Product description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-label-caps text-on-surface mb-2 block">
              PRICE
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="font-label-caps text-on-surface mb-2 block">
              CATEGORY
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface focus:border-primary-container focus:outline-none transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="font-label-caps text-on-surface mb-2 block">
            IMAGE URL
          </label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
            placeholder="https://example.com/image.png"
          />
        </div>

        <div>
          <label className="font-label-caps text-on-surface mb-2 block">
            BADGE
          </label>
          <input
            type="text"
            name="badge"
            value={form.badge}
            onChange={handleChange}
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
            placeholder="NEW, V2.0, SALE, etc."
          />
        </div>

        <div>
          <label className="font-label-caps text-on-surface mb-2 block">
            FEATURES (comma separated)
          </label>
          <input
            type="text"
            name="features"
            value={form.features}
            onChange={handleChange}
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
            placeholder="MagSafe, Fast Charging, Wireless"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="in_stock"
            checked={form.in_stock}
            onChange={handleChange}
            className="w-4 h-4 accent-primary-container"
          />
          <label className="font-label-caps text-on-surface">IN STOCK</label>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary-container text-on-primary font-label-caps text-label-caps px-8 py-3 rounded uppercase tracking-widest hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 font-bold disabled:opacity-50"
          >
            {saving ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="text-on-surface-variant hover:text-primary-container font-label-caps text-label-caps px-6 py-3 border border-outline-variant rounded hover:border-primary-container/50 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
