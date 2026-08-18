import { useState } from "react";
import { categories } from "../../data/products";

const features = [
  { label: "MagSafe Compatible", value: "magsafe" },
  { label: "Fast Charging", value: "fast-charging" },
  { label: "Wireless", value: "wireless" },
];

export default function FilterSidebar({ filters, onFilterChange }) {
  const [priceRange, setPriceRange] = useState(filters.maxPrice || 500);

  const handleCategoryChange = (categoryId) => {
    const current = filters.categories || [];
    const updated = current.includes(categoryId)
      ? current.filter((c) => c !== categoryId)
      : [...current, categoryId];
    onFilterChange({ ...filters, categories: updated });
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange({ ...filters, maxPrice: value });
  };

  const handleFeatureChange = (feature) => {
    const current = filters.features || [];
    const updated = current.includes(feature)
      ? current.filter((f) => f !== feature)
      : [...current, feature];
    onFilterChange({ ...filters, features: updated });
  };

  const handleOnSaleChange = () => {
    onFilterChange({ ...filters, onSale: !filters.onSale });
  };

  return (
    <aside className="w-full md:w-1/4 glass-panel rounded-lg p-6 h-fit sticky top-[100px]">
      <h2 className="font-label-caps text-primary-container border-b border-primary/20 pb-4 mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">tune</span>{" "}
        FILTERS
      </h2>

      <div className="mb-8">
        <h3 className="font-label-caps text-on-surface mb-4">DEVICE TYPE</h3>
        <div className="space-y-3 font-body-md text-sm text-on-surface-variant">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={(filters.categories || []).includes(cat.id)}
                onChange={() => handleCategoryChange(cat.id)}
                className="form-checkbox bg-surface border-outline-variant text-primary-container rounded-[2px] focus:ring-primary-container focus:ring-offset-0 focus:ring-1 cursor-pointer"
              />
              <span
                className={`group-hover:text-primary transition-colors ${
                  (filters.categories || []).includes(cat.id)
                    ? "text-primary"
                    : ""
                }`}
              >
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-label-caps text-on-surface mb-4">PRICE RANGE</h3>
        <input
          type="range"
          min="0"
          max="500"
          value={priceRange}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-primary-container bg-surface-variant h-1 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2 font-label-caps text-[10px] text-on-surface-variant">
          <span>$0</span>
          <span>${priceRange}+</span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-label-caps text-on-surface mb-4">ON SALE</h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.onSale || false}
            onChange={handleOnSaleChange}
            className="form-checkbox bg-surface border-outline-variant text-primary-container rounded-[2px] focus:ring-primary-container focus:ring-offset-0 focus:ring-1 cursor-pointer"
          />
          <span
            className={`group-hover:text-primary transition-colors ${
              filters.onSale ? "text-primary" : ""
            }`}
          >
            Show discounted only
          </span>
        </label>
      </div>

      <div>
        <h3 className="font-label-caps text-on-surface mb-4">FEATURE</h3>
        <div className="space-y-3 font-body-md text-sm text-on-surface-variant">
          {features.map((feat) => (
            <label
              key={feat.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={(filters.features || []).includes(feat.value)}
                onChange={() => handleFeatureChange(feat.value)}
                className="form-checkbox bg-surface border-outline-variant text-primary-container rounded-[2px] focus:ring-primary-container focus:ring-offset-0 focus:ring-1 cursor-pointer"
              />
              <span
                className={`group-hover:text-primary transition-colors ${
                  (filters.features || []).includes(feat.value)
                    ? "text-primary"
                    : ""
                }`}
              >
                {feat.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
