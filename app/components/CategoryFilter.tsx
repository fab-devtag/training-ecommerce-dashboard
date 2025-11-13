import { ChangeEvent } from "react";
import { useCategories } from "../hooks/useCategories";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (value: string | null) => void;
}

export const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        className={`px-4 py-2 rounded-lg ${
          selectedCategory === null
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        }`}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>
      {categories?.map((category) => (
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
          key={category}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
