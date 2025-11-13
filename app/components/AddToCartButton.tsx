"use client";
import { useState } from "react";
import { useCart, useCartActions } from "../contexts/CartContext";
import { Product } from "../lib/types";

interface AddToCartProps {
  product: Product;
}

export const AddToCartButton = ({ product }: AddToCartProps) => {
  const { addItem } = useCartActions();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer bg-gray-800 w-10 h-10 rounded-lg hover:bg-gray-900"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        >
          -
        </button>
        <span className="w-12 text-center font-semibold">{quantity}</span>
        <button
          className="cursor-pointer bg-gray-800 w-10 h-10 rounded-lg hover:bg-gray-900"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className={`grow cursor-pointer px-4 py-2 rounded-lg font-semibold transition-colors ${
          added
            ? "bg-green-600 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {added ? "✓ Added to Cart" : "Add to cart"}
      </button>
    </div>
  );
};
