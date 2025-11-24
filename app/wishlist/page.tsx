"use client";
import { ProductGrid } from "../components/ProductGrid";
import { useWishListContext } from "../contexts/WishListContext";

export default function WishlistPage() {
  const { items } = useWishListContext();
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <ProductGrid products={items} />
      {items.length === 0 && (
        <div className="col-span-full text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No products found
          </h3>
        </div>
      )}
    </div>
  );
}
