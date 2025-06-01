import React from "react";
import { useSafeTranslation } from "@/app/_hooks/useSafeTranslation";

interface BlogCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function BlogCategoryFilter({
  selectedCategory,
  onCategoryChange,
}: BlogCategoryFilterProps) {
  const t = useSafeTranslation();

  // Define categories with their original values and translation keys
  const categories = [
    { value: "all", label: t("blog.categories.all") },
    { value: "Gaming Gear", label: t("blog.categoryMap.Gaming Gear") },
    { value: "Hướng dẫn", label: t("blog.categoryMap.Hướng dẫn") },
    { value: "Esports", label: t("blog.categoryMap.Esports") },
    { value: "Công nghệ", label: t("blog.categoryMap.Công nghệ") },
    { value: "Phần mềm", label: t("blog.categoryMap.Phần mềm") },
  ];

  return (
    <div className="my-4 flex max-w-full gap-4 overflow-auto whitespace-nowrap px-4 scrollbar-hide md:bg-grey-100 md:px-6 md:py-2">
      {categories.map((category) => (
        <CategoryButton
          key={category.value}
          category={category.value}
          label={category.label}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      ))}
    </div>
  );
}

function CategoryButton({
  category,
  label,
  selectedCategory,
  onCategoryChange,
}: {
  category: string;
  label?: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <button
      className={`text-primary-500 hover:text-gray-700 ${
        selectedCategory === category ? "font-bold" : ""
      }`}
      onClick={() => onCategoryChange(category)}
    >
      {label || category}
    </button>
  );
}
