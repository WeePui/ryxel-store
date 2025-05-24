"use client";

import Button from "../UI/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { MdCategory } from "react-icons/md";
import { categoryIcons, categoryNames } from "@/app/_utils/mappingCategory";

interface CategoryFilterProps {
  categories: {
    name: string;
    slug: string;
    image: string;
  }[];
}

function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const router = useRouter();

  const handleFilter = function (category: string) {
    if (!category) return router.replace("products");

    const params = new URLSearchParams();
    params.set("category", category);
    router.replace(`products?${params.toString()}`);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex h-20 w-full items-center overflow-x-auto rounded-lg bg-grey-100 lg:scrollbar-hide sm:rounded-none">
        <div className={`flex flex-shrink-0 gap-2 px-5 md:px-2`}>
          <Button
            variant="filter"
            onClick={() => handleFilter("")}
            active={!currentCategory}
            rounded="pill"
          >
            Tất cả
          </Button>
          {categories.map((category) => (
            <Button
              key={category.slug}
              variant="filter"
              onClick={() => handleFilter(category.slug)}
              active={category.slug === currentCategory}
              rounded="pill"
              icon={categoryIcons[category.slug] || <MdCategory />}
            >
              {categoryNames[category.slug] || category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
