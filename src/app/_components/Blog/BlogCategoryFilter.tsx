import React from 'react';

interface BlogCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function BlogCategoryFilter({
  selectedCategory,
  onCategoryChange,
}: BlogCategoryFilterProps) {
  return (
    <div className="flex gap-4 my-4 whitespace-nowrap overflow-auto max-w-full scrollbar-hide px-4 md:bg-grey-100 md:px-6 md:py-2">
      <CategoryButton
        category="Tất cả"
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
      <CategoryButton
        category="Gaming Gear"
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
      <CategoryButton
        category="Hướng dẫn"
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      <CategoryButton
        category="Esports"
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
      <CategoryButton
        category="Phần mềm"
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </div>
  );
}

function CategoryButton({
  category,
  selectedCategory,
  onCategoryChange,
}: {
  category: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <button
      className={`text-primary-500 hover:text-gray-700 ${
        selectedCategory === category ? 'font-bold' : ''
      }`}
      onClick={() => onCategoryChange(category)}
    >
      {category}
    </button>
  );
}
