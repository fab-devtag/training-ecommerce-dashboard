"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "../lib/types";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json() as Promise<Product[]>;
    },
  });
};
