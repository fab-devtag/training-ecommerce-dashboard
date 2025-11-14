"use client";
import { useMemo, useState } from "react";
import { ProductGrid } from "../components/ProductGrid";
import { Searchbar } from "../components/Searchbar";
import { useProducts } from "../hooks/useProducts";
import { CategoryFilter } from "../components/CategoryFilter";
import { ProductSkeleton } from "../components/ProductSkeleton";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const searched = products.filter((product) =>
      product.title.toLowerCase().trim().includes(search.toLowerCase())
    );

    return searched.filter((product) => {
      if (!category) return true;
      return product.category === category;
    });
  }, [search, products, category]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="max-w-7xl mx-auto text-center py-12 text-red-600">
        Error loading products: {error.message}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <Searchbar onSearch={setSearch} />
      <CategoryFilter
        selectedCategory={category}
        onSelectCategory={setCategory}
      />
      <div className="mb-4 text-sm text-gray-300">
        Showing {filteredProducts.length} products
      </div>
      <ProductGrid products={filteredProducts} />
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search or filters
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory(null);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
