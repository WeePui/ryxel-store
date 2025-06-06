"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSafeTranslation } from "@/app/_hooks/useSafeTranslation";
import { useCallback, useTransition } from "react";

interface OrderSortSelectorProps {
  children?: React.ReactNode;
}

function SortSelector({ children }: OrderSortSelectorProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentSort = searchParams.get("sort");
  const t = useSafeTranslation();
  const [isPending, startTransition] = useTransition();

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const sortValue = e.target.value;

      startTransition(() => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", sortValue);
        // Reset page when changing sort
        params.delete("page");
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [searchParams, pathname, router],
  );
  return (
    <div className="flex items-center justify-end gap-4 md:flex-col">
      <span className="font-thin md:hidden">{t("products.sortBy")} </span>
      <select
        onChange={handleSortChange}
        className={`rounded-lg border-2 border-grey-300 py-3 pl-3 pr-12 font-bold text-primary-default hover:bg-grey-50 hover:ring-[1px] hover:ring-grey-300 focus:bg-grey-50 focus:ring-[1px] focus:ring-grey-300 ${
          isPending ? "cursor-wait opacity-50" : ""
        }`}
        defaultValue={(currentSort && currentSort.toString()) || "createdAt"}
        disabled={isPending}
      >
        {children ? (
          children
        ) : (
          <>
            <option value="createdAt">
              {t("products.sortOptions.newest")}
            </option>
            <option value="-price">
              {t("products.sortOptions.priceHighToLow")}
            </option>
            <option value="price">
              {t("products.sortOptions.priceLowToHigh")}
            </option>
            <option value="-sold">
              {t("products.sortOptions.bestSelling")}
            </option>
            <option value="-rating">
              {t("products.sortOptions.topRated")}
            </option>
          </>
        )}
      </select>
    </div>
  );
}

export default SortSelector;
