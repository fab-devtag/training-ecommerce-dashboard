import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json() as Promise<string[]>;
    },
  });
};
