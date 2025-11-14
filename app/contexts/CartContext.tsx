"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import { CartItem, Product } from "../lib/types";
import { Toast } from "../components/Toast";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity: number }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "CLEAR_CART" };

interface CartStateContextType {
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface CartActionContextType {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id
      );
      if (!existingItem)
        return {
          ...state,
          items: [
            ...state.items,
            { product: action.product, quantity: action.quantity },
          ],
        };
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + (action.quantity || 1) }
            : item
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.productId
        ),
      };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0)
        return cartReducer(state, {
          type: "REMOVE_ITEM",
          productId: action.productId,
        });

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

const CartStateContext = createContext<CartStateContextType | null>(null);
const CartActionContext = createContext<CartActionContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initialState = { items: [] };
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [notification, setNotification] = useState<string | null>(null);

  /*  const addItem = useCallback((product: Product, quantity: number = 1) => {
    dispatch({ type: "ADD_ITEM", product: product, quantity: quantity });
  }, []);

  const removeItem = useCallback((productId: number) => {
    dispatch({ type: "REMOVE_ITEM", productId: productId });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      productId: productId,
      quantity: quantity,
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);
 */
  /*   const total = useMemo(() => {
    return state.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [state.items]); */

  const cartState = useMemo(() => {
    const total = state.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    return { items: state.items, total, itemCount };
  }, [state.items]);

  const cartActions = useMemo(
    () => ({
      addItem: (product: Product, quantity: number = 1) => {
        dispatch({ type: "ADD_ITEM", product: product, quantity: quantity });
        setNotification(`${product.title} added to cart!`);
        setTimeout(() => setNotification(null), 3000);
      },
      removeItem: (productId: number) => {
        dispatch({ type: "REMOVE_ITEM", productId: productId });
      },
      updateQuantity: (productId: number, quantity: number) => {
        dispatch({
          type: "UPDATE_QUANTITY",
          productId: productId,
          quantity: quantity,
        });
      },
      clearCart: () => {
        dispatch({ type: "CLEAR_CART" });
      },
    }),
    []
  );
  return (
    <CartStateContext.Provider value={cartState}>
      <CartActionContext.Provider value={cartActions}>
        {notification && (
          <Toast message={notification} onClose={() => setNotification(null)} />
        )}
        {children}
      </CartActionContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const context = useContext(CartStateContext);

  if (!context) throw new Error("useCartState must be use within CartProvider");

  return context;
};

export const useCartActions = () => {
  const context = useContext(CartActionContext);

  if (!context)
    throw new Error("useCartAction must be use within CartProvider");

  return context;
};

export const useCart = () => {
  return {
    ...useCartState(),
    ...useCartActions(),
  };
};
