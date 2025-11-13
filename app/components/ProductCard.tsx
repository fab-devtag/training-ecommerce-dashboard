"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../contexts/CartContext";
import { Product } from "../lib/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddItem = () => {
    addItem(product);
  };

  return (
    <div className="bg-black rounded-lg shadow-white shadow-md hover:shadow-lg transition-shadow p-4">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 mb-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-blue-600">
          {product.title}
        </h3>
      </Link>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xl font-bold text-blue-600">
          {product.price.toFixed(2)}
        </span>
        <button
          onClick={handleAddItem}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
