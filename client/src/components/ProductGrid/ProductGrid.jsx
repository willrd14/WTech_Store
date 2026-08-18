import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="material-symbols-outlined text-6xl text-outline mb-4 block">
          search_off
        </span>
        <p className="font-headline-lg-mobile text-on-surface-variant">
          No products found
        </p>
        <p className="font-body-md text-outline text-sm mt-2">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
