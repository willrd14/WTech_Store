import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../../data/products";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

export default function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const sortNew = searchParams.get("sort") === "new";
  const dealsOnly = searchParams.get("deals") === "true";

  const [filters, setFilters] = useState({
    categories: initialCategory ? [initialCategory] : [],
    maxPrice: 500,
    features: [],
    onSale: false,
  });

  const [sortBy, setSortBy] = useState(sortNew ? "newest" : "featured");

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(p.category)
      )
        return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.onSale && (!p.discount || p.discount <= 0)) return false;
      if (sortNew && (p.badge !== "NEW" && p.badge !== "NEW RELEASE")) return false;
      if (dealsOnly && (!p.discount || p.discount <= 0)) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy, sortNew, dealsOnly]);

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-20 py-12 flex flex-col gap-12 relative">
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary-container rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-tertiary-fixed-dim rounded-full blur-[120px] opacity-30" />
      </div>

      <header className="w-full relative rounded-xl overflow-hidden glass-panel h-[250px] md:h-[300px] flex items-center justify-center group">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary-fixed mb-2 drop-shadow-md">
            {sortNew
              ? "NEW ARRIVALS"
              : dealsOnly
              ? "DEALS"
              : "ACCESSORIES CATALOG"}
          </h1>
          <p className="font-label-caps text-on-surface-variant tracking-[0.2em]">
            {sortNew
              ? "LATEST TECH ACCESSORIES"
              : dealsOnly
              ? "EXCLUSIVE DISCOUNTS"
              : "EQUIP YOUR DEVICE WITH THE BEST"}
          </p>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar filters={filters} onFilterChange={setFilters} />

        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6 border-b border-outline-variant/30 pb-4">
            <p className="font-body-md text-on-surface-variant text-sm">
              Showing {filteredProducts.length} of {products.length} results
            </p>
            <div className="flex items-center gap-2 font-label-caps text-sm">
              <span className="text-on-surface-variant">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-primary-fixed focus:ring-0 cursor-pointer p-0"
              >
                <option className="bg-surface" value="featured">
                  Featured
                </option>
                <option className="bg-surface" value="newest">
                  Newest
                </option>
                <option className="bg-surface" value="price-asc">
                  Price: Low to High
                </option>
                <option className="bg-surface" value="price-desc">
                  Price: High to Low
                </option>
                <option className="bg-surface" value="rating">
                  Rating
                </option>
              </select>
            </div>
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </main>
  );
}
