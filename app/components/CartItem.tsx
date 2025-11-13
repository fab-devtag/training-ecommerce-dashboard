import Image from "next/image";
import { CartItem as CartItemTypes } from "../lib/types";
import { useCart } from "../contexts/CartContext";

interface CartItemProps {
  item: CartItemTypes;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { removeItem, updateQuantity } = useCart();

  const subTotal = item.product.price * item.quantity;

  return (
    <div className="flex items-center gap-4 bg-black p-4 rounded-lg shadow-white shadow">
      <div className="relative h-20 w-20 shrink-0">
        <Image
          src={item.product.image}
          alt={item.product.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="grow">
        <h3 className="font-semibold text-gray-100">{item.product.title}</h3>
        <p className="text-sm text-gray-400">
          ${item.product.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 bg-gray-800 rounded-full hover:bg-gray-700 flex items-center justify-center"
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
        >
          -
        </button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <button
          className="w-8 h-8 bg-gray-800 rounded-full hover:bg-gray-700 flex items-center justify-center"
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg">${subTotal.toFixed(2)}</p>
        <button
          className="text-sm text-red-600 hover:text-red-700"
          onClick={() => removeItem(item.product.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
