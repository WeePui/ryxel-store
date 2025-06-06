"use client";

import Button from "../UI/Button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MdCategory } from "react-icons/md";
import { categoryIcons } from "@/app/_utils/mappingCategory";
import { categoryNamesMultilingual } from "@/app/_utils/mappingCategoryMultilingual";
import { useContext, useCallback, useEffect, useTransition, useRef } from "react";
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
  const pathname = usePathname();
  const t = useSafeTranslation();
  const { language } = useSafeLanguage();  const [isPending, startTransition] = useTransition();
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced URL update function
  const updateURL = useCallback((category: string) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    const timeout = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams);
        
        if (category) {
          params.set("category", category);
        } else {
          params.delete("category");
        }
        
        // Reset page when category changes
        params.delete("page");
        
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 300); // 300ms debounce

    updateTimeoutRef.current = timeout;
  }, [searchParams, pathname, router]);
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  const handleFilter = useCallback((category: string) => {
    updateURL(category);
  }, [updateURL]);
  return (
    <div className={`w-full overflow-hidden ${isPending ? "opacity-75" : ""}`}>
      <div className="flex h-20 w-full items-center overflow-x-auto rounded-lg bg-grey-100 lg:scrollbar-hide sm:rounded-none">
        <div className={`flex flex-shrink-0 gap-2 px-5 md:px-2`}>
          <Button
            variant="filter"
            onClick={() => handleFilter("")}
            active={!currentCategory}
            rounded="pill"
            disabled={isPending}
          >
            {t("products.filter.all")}
          </Button>
          {categories.map((category) => (
            <Button
              key={category.slug}
              variant="filter"
              onClick={() => handleFilter(category.name)}
              active={category.slug === currentCategory}
              rounded="pill"
              icon={categoryIcons[category.name] || <MdCategory />}
              disabled={isPending}
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
