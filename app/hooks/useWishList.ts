"use client";
import { useEffect, useState } from "react";
import { Product } from "../lib/types";

export const useWishList = () => {
  const [wishList, setWishList] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const storage = localStorage.getItem("wishList");

      if (storage) {
        setWishList(JSON.parse(storage));
      }
    } catch (e) {
      console.error("Error localstorage", e);
      setWishList([]);
    }
  }, []);

  const saveWishList = (product: Product) => {
    const saved = localStorage.getItem("wishList");
    const currentStorage = saved ? JSON.parse(saved) : [];

    localStorage.setItem(
      "wishList",
      JSON.stringify([...currentStorage, product])
    );

    setWishList((prev) => [...prev, product]);
  };

  return { wishList, saveWishList };
};
