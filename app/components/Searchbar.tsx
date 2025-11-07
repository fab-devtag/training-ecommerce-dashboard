"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchbarProps {
  onSearch: (query: string) => void;
}

export const Searchbar = ({ onSearch }: SearchbarProps) => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced]);

  return (
    <div className="mb-6">
      <input
        className="bg-white text-black w-full px-4 py-2 border border-gray-700 rounded-lg focus:ring-blue-500 focus:ring-2 focus:border-transparent"
        placeholder="Search products..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
