import { ProductGrid } from "./components/ProductGrid";
import { Product } from "./lib/types";
import { StatsCard } from "./components/StatsCard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  try {
    console.log("🚀 Fetching products...");

    const [productsRes, categoriesRes] = await Promise.all([
      fetch("https://fakestoreapi.com/products", {
        cache: "no-store",
        next: { revalidate: 0 }, // ✅ Ajoute ça aussi
      }),
      fetch("https://fakestoreapi.com/products/categories", {
        cache: "no-store",
        next: { revalidate: 0 },
      }),
    ]);

    console.log("📊 Products response status:", productsRes.status);
    console.log("📊 Categories response status:", categoriesRes.status);

    const products: Product[] = productsRes.ok ? await productsRes.json() : [];
    const categories: string[] = categoriesRes.ok
      ? await categoriesRes.json()
      : [];

    console.log("✅ Products loaded:", products.length);
    console.log("✅ Categories loaded:", categories.length);

    if (products.length === 0) {
      console.error("❌ No products loaded!");
      return (
        <div className="max-w-7xl mx-auto p-8">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p>Failed to load products. API might be down.</p>
          <p className="text-sm text-gray-500 mt-2">
            Status: {productsRes.status} {productsRes.statusText}
          </p>
        </div>
      );
    }

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
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return (
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p>An unexpected error occurred.</p>
        <p className="text-sm text-gray-500 mt-2">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }
}
