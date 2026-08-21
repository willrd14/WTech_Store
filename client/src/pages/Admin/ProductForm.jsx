import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const categories = [
  { value: "cases", label: "Funda" },
  { value: "chargers", label: "Cargador" },
  { value: "screen-protectors", label: "Protector de Pantalla" },
  { value: "mounts", label: "Montaje" },
];

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const fileInputRef = useRef(null);

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
    discount: 0,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
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
            discount: product.discount || 0,
          });
          if (product.image) setImagePreview(product.image);
        })
        .catch(() => alert("Error al cargar el producto"))
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      if (name === "name" && !prev.slug) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }
      return updated;
    });
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const result = await api.uploadProductImage(file);
      setForm((prev) => ({ ...prev, image: result.url }));
    } catch (err) {
      alert("Error al subir la imagen");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const syntheticEvent = { target: { files: [file] } };
      handleFileSelect(syntheticEvent);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      price: parseFloat(form.price),
      discount: parseInt(form.discount) || 0,
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
      alert("Error al guardar el producto");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-primary-container font-label-caps animate-pulse">
          Cargando producto...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-8">
        {isEditing ? "Editar" : "Nuevo"}{" "}
        <span className="text-gradient-cyan">Producto</span>
      </h1>

      <form onSubmit={handleSubmit} className="glass-panel rounded-lg p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-label-caps text-on-surface mb-2 block">NOMBRE</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
              placeholder="Nombre del producto"
            />
          </div>
          <div>
            <label className="font-label-caps text-on-surface mb-2 block">SLUG</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
              placeholder="producto-slug"
            />
          </div>
        </div>

        <div>
          <label className="font-label-caps text-on-surface mb-2 block">DESCRIPCION</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors resize-none"
            placeholder="Descripcion del producto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="font-label-caps text-on-surface mb-2 block">PRECIO (RD$)</label>
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
            <label className="font-label-caps text-on-surface mb-2 block">DESCUENTO (%)</label>
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
              placeholder="0"
            />
          </div>
          <div>
            <label className="font-label-caps text-on-surface mb-2 block">CATEGORIA</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface focus:border-primary-container focus:outline-none transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="font-label-caps text-on-surface mb-2 block">IMAGEN DEL PRODUCTO</label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
              uploading
                ? "border-primary-container/50 bg-primary-container/5"
                : "border-outline-variant hover:border-primary-container/50 hover:bg-surface-container/30"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            {imagePreview ? (
              <div className="flex flex-col items-center gap-3">
                <img
                  src={imagePreview.startsWith("/") ? `${import.meta.env.VITE_API_URL}${imagePreview}` : imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-contain rounded"
                />
                <span className="font-label-caps text-xs text-on-surface-variant">
                  {uploading ? "Subiendo imagen..." : "Click o arrastra para cambiar"}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-4xl text-outline-variant">
                  cloud_upload
                </span>
                <span className="font-label-caps text-xs text-on-surface-variant">
                  {uploading ? "Subiendo..." : "Arrastra una imagen o click para seleccionar"}
                </span>
              </div>
            )}
          </div>
          <div className="mt-3">
            <label className="font-label-caps text-on-surface-variant mb-1 block text-[10px]">
              O ingresa una URL:
            </label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors text-sm"
              placeholder="https://ejemplo.com/imagen.png"
            />
          </div>
        </div>

        <div>
          <label className="font-label-caps text-on-surface mb-2 block">ETIQUETA (BADGE)</label>
          <input
            type="text"
            name="badge"
            value={form.badge}
            onChange={handleChange}
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
            placeholder="NEW, V2.0, OFERTA, etc."
          />
        </div>

        <div>
          <label className="font-label-caps text-on-surface mb-2 block">CARACTERISTICAS (separadas por coma)</label>
          <input
            type="text"
            name="features"
            value={form.features}
            onChange={handleChange}
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
            placeholder="MagSafe, Carga Rapida, Inalambrico"
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
          <label className="font-label-caps text-on-surface">EN STOCK</label>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-primary-container text-on-primary font-label-caps text-label-caps px-8 py-3 rounded uppercase tracking-widest hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 font-bold disabled:opacity-50"
          >
            {saving ? "Guardando..." : isEditing ? "Actualizar Producto" : "Crear Producto"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="text-on-surface-variant hover:text-primary-container font-label-caps text-label-caps px-6 py-3 border border-outline-variant rounded hover:border-primary-container/50 transition-all"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
