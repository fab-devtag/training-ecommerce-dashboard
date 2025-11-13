"use client";
import { useMemo, useState } from "react";
import { ProductGrid } from "../components/ProductGrid";
import { Searchbar } from "../components/Searchbar";
import { useProducts } from "../hooks/useProducts";
import { CategoryFilter } from "../components/CategoryFilter";

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

  if (isLoading)
    return (
      <div className="max-w-7xl mx-auto text-center py-12">
        Loading products...
      </div>
    );

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
        <div className="text-center py-12 text-gray-500">No products found</div>
      )}
    </div>
  );
}
