import { ProductGrid } from "./components/ProductGrid";
import { Product } from "./lib/types";
import { StatsCard } from "./components/StatsCard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch("https://fakestoreapi.com/products", { cache: "no-store" }),
      fetch("https://fakestoreapi.com/products/categories", {
        cache: "no-store",
      }),
    ]);

    const products: Product[] = productsRes.ok ? await productsRes.json() : [];
    const categories: string[] = categoriesRes.ok
      ? await categoriesRes.json()
      : [];

    if (products.length === 0) {
      return (
        <div className="max-w-7xl mx-auto p-8">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p>Failed to load products. Please try again later.</p>
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
    return (
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p>An error occurred. Please try again.</p>
      </div>
    );
  }
}
