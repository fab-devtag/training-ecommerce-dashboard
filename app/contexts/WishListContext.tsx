"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Product } from "../lib/types";

interface WishListState {
  items: Product[];
}

type WishListAction =
  | { type: "ADD_TO_WISHLIST"; product: Product }
  | { type: "LOAD_FROM_STORAGE"; products: Product[] }
  | { type: "REMOVE_FROM_WISHLIST"; productId: number };

interface WishListContextType {
  items: Product[];
  addToWishList: (product: Product) => void;
  wishCount: number;
}

const wishListReducer = (state: WishListState, action: WishListAction) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      const exists = state.items.find((item) => item.id === action.product.id);
      if (exists)
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.product.id),
        };
      return { ...state, items: [...state.items, action.product] };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.productId),
      };
    case "LOAD_FROM_STORAGE":
      return { ...state, items: action.products };
    default:
      return state;
  }
};

const WishListContext = createContext<WishListContextType | null>(null);

export const WishListProvider = ({ children }: { children: ReactNode }) => {
  const initialState = { items: [] };
  const [state, dispatch] = useReducer(wishListReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishList");
      if (saved) {
        const products = JSON.parse(saved);
        dispatch({ type: "LOAD_FROM_STORAGE", products });
      }
    } catch (e) {
      console.error("Error loading wishlist", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(state.items));
  }, [state.items]);

  const addToWishList = (product: Product) => {
    dispatch({ type: "ADD_TO_WISHLIST", product: product });
  };

  const { items } = state;

  const wishCount = items.length;
  const values = { items, addToWishList, wishCount };
  return (
    <WishListContext.Provider value={values}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishListContext = () => {
  const context = useContext(WishListContext);

  if (!context)
    throw new Error("useWishListContext must be used within WishList Provider");

  return context;
};
