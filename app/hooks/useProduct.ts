import { useQuery } from "@tanstack/react-query";
import { Product } from "../lib/types";

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json() as Promise<Product>;
    },
    enabled: !!id,
  });
};
