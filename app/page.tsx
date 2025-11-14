import { ProductGrid } from "./components/ProductGrid";
import { Product } from "./lib/types";
import { StatsCard } from "./components/StatsCard";

export default async function DashboardPage() {
  let products: Product[] = [];
  let categories: string[] = [];

  try {
    const productsRes = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (productsRes.ok) {
      products = await productsRes.json();
    }
  } catch (error) {}

  try {
    const categoriesRes = await fetch(
      "https://fakestoreapi.com/products/categories",
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    if (categoriesRes.ok) {
      categories = await categoriesRes.json();
    }
  } catch (error) {
    console.error("Failed to fetch categories during build:", error);
  }

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p className="font-bold">Loading products...</p>
          <p className="text-sm">
            The page will update automatically with fresh data.
          </p>
        </div>
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
}
