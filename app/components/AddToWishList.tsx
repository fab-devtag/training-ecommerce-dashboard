"use client";
import { useWishListContext } from "../contexts/WishListContext";
import { Product } from "../lib/types";

interface AddToWishListProps {
  product: Product;
}
export const AddToWishList = ({ product }: AddToWishListProps) => {
  const { addToWishList, items } = useWishListContext();

  // ✅ Calcule 1 seule fois
  const isInWishlist = items.some((item) => item.id === product.id);

  return (
    <button
      onClick={() => addToWishList(product)}
      className={isInWishlist ? "text-red-500" : "text-white"}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isInWishlist ? "❤️" : "🤍"} Add to wishlist
    </button>
  );
};
