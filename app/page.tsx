// app/page.tsx
"use client";

import { useProducts } from "./hooks/useProducts";
import { useCategories } from "./hooks/useCategories";
import { ProductGrid } from "./components/ProductGrid";
import { StatsCard } from "./components/StatsCard";

export default function DashboardPage() {
  const { data: products, isLoading, error } = useProducts();
  const { data: categories } = useCategories();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error || !products) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p>Failed to load products.</p>
      </div>
    );
  }

  const front4Products = products.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Products" value={products.length} icon="📦" />
        <StatsCard
          title="Categories"
          value={categories?.length || 0}
          icon="🏷️"
        />
        <StatsCard title="In Stock" value={products.length} icon="✅" />
      </div>

      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <ProductGrid products={front4Products} />
    </div>
  );
}
