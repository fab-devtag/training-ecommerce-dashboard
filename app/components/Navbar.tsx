"use client";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";

export const Navbar = () => {
  const { itemCount } = useCart();
  return (
    <nav className="bg-black shadow-md shadow-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              E-Shop
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-blue-600 px-3 py-2 rounded-md"
              >
                Dashboard
              </Link>
              <Link
                href="/products"
                className="text-gray-300 hover:text-blue-600 px-3 py-2 rounded-md"
              >
                Products
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/cart"
              className="relative text-gray-300 hover:text-blue-600 px-3 py-2"
            >
              <span className="text-lg">🛒 Cart</span>
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
