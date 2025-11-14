import { ProductGrid } from "./components/ProductGrid";
import { Product } from "./lib/types";
import { notFound } from "next/navigation";
import { StatsCard } from "./components/StatsCard";

export default async function DashboardPage() {
  // ✅ Fetch avec vérification res.ok
  const productsRes = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });

  if (!productsRes.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await productsRes.json();

  // ✅ Pareil pour categories
  const categoriesRes = await fetch(
    "https://fakestoreapi.com/products/categories",
    {
      next: { revalidate: 60 },
    }
  );

  if (!categoriesRes.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: string[] = await categoriesRes.json();

  const front4Products = products.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Products" value={products.length} icon="📦" />
        <StatsCard title="Categories" value={categories.length} icon="🏷️" />
        <StatsCard title="In Stock" value={products.length} icon="✅" />
      </div>

      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <ProductGrid products={front4Products} />
    </div>
  );
}
