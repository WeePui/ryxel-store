"use client";

import formatMoney from "@/app/_utils/formatMoney";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, {
  createContext,
  JSX,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useTransition,
  useRef,
} from "react";
import {
  FaRegCircleXmark,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaRegStar,
} from "react-icons/fa6";
import SpecsFilter from "./SpecsFilter";
import { useSafeTranslation } from "@/app/_hooks/useSafeTranslation";

interface SideFilterProps {
  brands: Array<{ value: string; count?: number }>;
  priceRanges: { min: number; max?: number }[];
  specifications: {
    [key: string]: Array<{
      value: string;
      count: number;
    }>;
  };
  isMobile?: boolean;
}

interface FilterItemProps {
  filterName: string;
  options: {
    value: string | number;
    label: string | JSX.Element;
    count?: number;
  }[];
  label: string;
}

interface Filter {
  brand: string[];
  price: {
    min: number;
    max?: number;
  };
  rating: {
    min?: number;
    max?: number;
  };
  onSale: boolean;
}

interface SideFilterContextType {
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
  onChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SideFilterContext = createContext<SideFilterContextType | undefined>(
  undefined,
);

const ratingOptions = [
  {
    value: 5,
    label: (
      <span className="flex items-center text-yellow-500">
        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
      </span>
    ),
  },
  {
    value: 4,
    label: (
      <span className="flex items-center text-yellow-500">
        <FaStar /> <FaStar /> <FaStar /> <FaStar />
        <FaRegStar />
      </span>
    ),
  },
  {
    value: 3,
    label: (
      <span className="flex items-center text-yellow-500">
        <FaStar /> <FaStar /> <FaStar />
        <FaRegStar /> <FaRegStar />
      </span>
    ),
  },
  {
    value: 2,
    label: (
      <span className="flex items-center text-yellow-500">
        <FaStar /> <FaStar />
        <FaRegStar /> <FaRegStar /> <FaRegStar />
      </span>
    ),
  },
  {
    value: 1,
    label: (
      <span className="flex items-center text-yellow-500">
        <FaStar />
        <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar />
      </span>
    ),
  },
];

function SideFilter({
  brands,
  priceRanges,
  specifications,
  isMobile = false,
}: SideFilterProps) {
  const t = useSafeTranslation();
  const brandOptions = useMemo(
    () =>
      brands.map((brand) => ({
        value: brand.value,
        label: brand.value,
        count: brand.count,
      })),
    [brands],
  );

  const priceRangeOptions = useMemo(
    () =>
      priceRanges.map((range) => ({
        value: `${range.min}-${range.max}`,
        label: range.max
          ? `${formatMoney(range.min)} - ${formatMoney(range.max)}`
          : `${formatMoney(range.min)}+`,
      })),
    [priceRanges],
  );
  const [filters, setFilters] = useState<Filter>({
    brand: [],
    price: {
      min: 0,
      max: undefined,
    },
    rating: {
      min: undefined,
      max: 5,
    },
    onSale: false,
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  // Use ref instead of state to prevent re-render loops
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced URL update function
  const updateURL = useCallback(
    (newFilters: Filter) => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      const timeout = setTimeout(() => {
        startTransition(() => {
          const params = new URLSearchParams(searchParams);
          let shouldResetPage = false;

          // Handle brand filter
          if (newFilters.brand.length > 0) {
            const currentBrand = searchParams.get("brand");
            const newBrand = newFilters.brand.join(",");
            if (currentBrand !== newBrand) {
              params.set("brand", newBrand);
              shouldResetPage = true;
            }
          } else {
            if (searchParams.has("brand")) {
              params.delete("brand");
              shouldResetPage = true;
            }
          }

          // Handle price filter
          const currentMinPrice = searchParams.get("price[gte]");
          const currentMaxPrice = searchParams.get("price[lte]");

          if (newFilters.price.min) {
            if (currentMinPrice !== newFilters.price.min.toString()) {
              params.set("price[gte]", newFilters.price.min.toString());
              shouldResetPage = true;
            }
          }
          if (newFilters.price.max) {
            if (currentMaxPrice !== newFilters.price.max.toString()) {
              params.set("price[lte]", newFilters.price.max.toString());
              shouldResetPage = true;
            }
          } else {
            if (searchParams.has("price[lte]")) {
              params.delete("price[lte]");
              shouldResetPage = true;
            }
          }
          if (
            newFilters.price.min === 0 &&
            newFilters.price.max === undefined
          ) {
            if (
              searchParams.has("price[gte]") ||
              searchParams.has("price[lte]")
            ) {
              params.delete("price[gte]");
              params.delete("price[lte]");
              shouldResetPage = true;
            }
          } // Handle rating filter
          const currentRating = searchParams.get("rating[gte]");
          if (newFilters.rating.min) {
            if (currentRating !== newFilters.rating.min.toString()) {
              params.set("rating[gte]", newFilters.rating.min.toString());
              shouldResetPage = true;
            }
          } else {
            if (searchParams.has("rating[gte]")) {
              params.delete("rating[gte]");
              shouldResetPage = true;
            }
          }

          // Handle onSale filter
          const currentOnSale = searchParams.get("onSale");
          if (newFilters.onSale) {
            if (currentOnSale !== "true") {
              params.set("onSale", "true");
              shouldResetPage = true;
            }
          } else {
            if (searchParams.has("onSale")) {
              params.delete("onSale");
              shouldResetPage = true;
            }
          }

          // Only reset page if filters actually changed
          if (shouldResetPage) {
            params.delete("page");
          }

          router.replace(`${pathname}?${params.toString()}`);
        });
      }, 300); // 300ms debounce

      updateTimeoutRef.current = timeout;
    },
    [searchParams, pathname, router],
  );
  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const brand = searchParams.get("brand")?.split(",") || [];
    const price = {
      min: Number(searchParams.get("price[gte]")) || 0,
      max: Number(searchParams.get("price[lte]")) || undefined,
    };
    const rating = {
      min: Number(searchParams.get("rating[gte]")) || undefined,
      max: 5,
    };
    const onSale = searchParams.get("onSale") === "true";

    setFilters({
      brand,
      price,
      rating,
      onSale,
    });
    setIsInitialized(true);
  }, [searchParams]);
  useEffect(() => {
    // Only update URL if filters have been initialized and this is a user interaction
    if (!isInitialized) return;

    updateURL(filters);
  }, [filters, isInitialized, updateURL]);
  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    const currentFilters = { ...filters };

    if (name === "brand") {
      if (checked) {
        currentFilters.brand.push(value);
      } else {
        currentFilters.brand = currentFilters.brand.filter(
          (brand) => brand !== value,
        );
      }
    } else if (name === "price") {
      const [min, max] = value.split("-").map(Number);
      currentFilters.price.min = min;
      currentFilters.price.max = max || undefined;
    } else if (name === "rating") {
      const newRating = checked ? Number(value) : undefined;
      // Nếu click vào rating đang được chọn -> bỏ chọn
      currentFilters.rating.min =
        currentFilters.rating.min === newRating ? undefined : newRating;
    } else if (name === "onSale") {
      currentFilters.onSale = checked;
    }

    setFilters(currentFilters);
  };
  function onClear() {
    const params = new URLSearchParams(searchParams);
    params.delete("brand");
    params.delete("price[gte]");
    params.delete("price[lte]");
    params.delete("rating[gte]");
    params.delete("onSale");
    params.delete("page");
    params.delete("specs");
    params.delete("sort");
    params.delete("search");
    params.delete("category");

    router.replace(`${pathname}?${params.toString()}`);
  }
  function handleSpecsChange(specName: string, value: string) {
    const params = new URLSearchParams(searchParams);
    const specs = params.get("specs")
      ? JSON.parse(params.get("specs") as string)
      : {};

    const currentSpecs = { ...specs };
    const hasChanged = currentSpecs[specName] !== value;

    if (currentSpecs[specName] === value) {
      delete currentSpecs[specName];
    } else {
      currentSpecs[specName] = value;
    }

    if (Object.keys(currentSpecs).length === 0) {
      params.delete("specs");
    } else {
      params.set("specs", JSON.stringify(currentSpecs));
    }

    // Only reset page if specs actually changed
    if (hasChanged) {
      params.delete("page");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }
  return (
    <SideFilterContext.Provider value={{ filters, setFilters, onChecked }}>
      <div
        className={`flex h-full flex-col gap-2 rounded-xl ${
          isMobile ? "bg-white" : "bg-grey-100"
        } px-4 pb-6 ${isPending ? "pointer-events-none opacity-75" : ""}`}
      >
        <div className="flex items-center justify-between px-4 pb-2 pt-6">
          <h3 className="text-xl font-bold text-primary-default">
            {t("products.filter.title")}
          </h3>
          <button onClick={onClear} className="flex items-center gap-2">
            <FaRegCircleXmark />
            {t("products.filter.reset")}
          </button>
        </div>
        <div className="flex flex-col gap-2 overflow-auto rounded-xl bg-white p-4 scrollbar-hide">
          <FilterItem
            filterName="brand"
            label={t("products.filter.brand")}
            options={brandOptions}
          />
          <hr className="my-1 border-t border-grey-200" />
          <FilterItem
            filterName="price"
            label={t("products.filter.price")}
            options={priceRangeOptions}
          />
          <hr className="my-1 border-t border-grey-200" />
          <FilterItem
            filterName="rating"
            label={t("products.filter.rating")}
            options={ratingOptions}
          />
          <hr className="my-1 border-t border-grey-200" />
          <FilterItem
            filterName="onSale"
            label={t("products.filter.onSale")}
            options={[{ value: "true", label: t("products.filter.onSale") }]}
          />
          <SpecsFilter
            specifications={specifications}
            onSelectSpecs={handleSpecsChange}
          />
        </div>
      </div>
    </SideFilterContext.Provider>
  );
}

function FilterItem({ filterName, options, label }: FilterItemProps) {
  const [openFilter, setOpenFilter] = useState(false);
  const context = useContext(SideFilterContext);
  const { filters, onChecked } = context!;
  const isChecked = (value: string | number) => {
    if (filterName === "brand") {
      return filters.brand.includes(value as string);
    } else if (filterName === "price") {
      const [minStr, maxStr] = (value as string).split("-");
      const min = Number(minStr);
      const max = maxStr === "undefined" ? undefined : Number(maxStr);
      return filters.price.min === min && filters.price.max === max;
    } else if (filterName === "rating") {
      return filters.rating.min === Number(value);
    } else if (filterName === "onSale") {
      return filters.onSale;
    }
    return false;
  };

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setOpenFilter((prev) => !prev)}
      >
        <h4 className="text-lg font-semibold capitalize text-primary-default">
          {label}
        </h4>
        <span className="text-grey-300">
          {openFilter ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {openFilter && (
        <div className="mt-4 flex flex-col gap-3 pl-2">
          {options.map((option, index) => (
            <label
              className="flex items-center text-primary-default"
              key={index}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  name={filterName}
                  className="hover:filter-red-500 h-6 w-6 cursor-pointer"
                  value={option.value}
                  onChange={onChecked}
                  checked={isChecked(option.value)}
                />
                {option.label}
              </div>
              <span className="ml-auto text-grey-400">
                {option.count ? `(${option.count})` : ""}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default SideFilter;
