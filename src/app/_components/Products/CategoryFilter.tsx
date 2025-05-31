"use client";

import Button from "../UI/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { MdCategory } from "react-icons/md";
import { categoryIcons } from "@/app/_utils/mappingCategory";
import { categoryNamesMultilingual } from "@/app/_utils/mappingCategoryMultilingual";
import { useContext } from "react";
import { LanguageContext } from "@/app/_contexts/LanguageContext";
import { useSafeTranslation } from "@/app/_hooks/useSafeTranslation";

// Safe language hook that falls back to Vietnamese when not in provider
const useSafeLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    // Fallback to Vietnamese when not in LanguageProvider context
    return { language: "vi" as const };
  }

  return { language: context.language };
};

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
  const t = useSafeTranslation();
  const { language } = useSafeLanguage();

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
            {t("products.filter.all")}
          </Button>
          {categories.map((category) => (
            <Button
              key={category.slug}
              variant="filter"
              onClick={() => handleFilter(category.slug)}
              active={category.slug === currentCategory}
              rounded="pill"
              icon={categoryIcons[category.name] || <MdCategory />}
            >
              {categoryNamesMultilingual[category.name]
                ? categoryNamesMultilingual[category.name][language]
                : category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
