'use client';

import formatCurrency from '@/app/_utils/formatCurrency';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { createContext, JSX, useContext, useEffect, useState } from 'react';
import {
  FaRegCircleXmark,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaRegStar,
} from 'react-icons/fa6';

interface SideFilterProps {
  brands: string[];
  priceRanges: { min: number; max?: number }[];
}

interface FilterItemProps {
  filterName: string;
  options: { value: string; label: string | JSX.Element }[];
  label: string;
}

interface Filter {
  brand: string;
  price: string;
}

interface SideFilterContextType {
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
  onChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SideFilterContext = createContext<SideFilterContextType | undefined>(
  undefined
);

const ratingOptions = [
  {
    value: '5',
    label: (
      <span className="flex items-center text-yellow-500">
        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
      </span>
    ),
  },
  {
    value: '4',
    label: (
      <span className="flex items-center text-yellow-500">
        <FaStar /> <FaStar /> <FaStar /> <FaStar />
        <FaRegStar />
      </span>
    ),
  },
  {
    value: '3',
    label: (
      <span className="flex items-center text-yellow-500">
        <FaStar /> <FaStar /> <FaStar />
        <FaRegStar /> <FaRegStar />
      </span>
    ),
  },
  {
    value: '2',
    label: (
      <span className="flex items-center text-yellow-500">
        <FaStar /> <FaStar />
        <FaRegStar /> <FaRegStar /> <FaRegStar />
      </span>
    ),
  },
  {
    value: '1',
    label: (
      <span className="flex items-center text-yellow-500">
        <FaStar />
        <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar />
      </span>
    ),
  },
];

function SideFilter({ brands, priceRanges }: SideFilterProps) {
  const brandOptions = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));
  const priceRangeOptions = priceRanges.map((range) => ({
    value: `${range.min}-${range.max}`,
    label: range.max
      ? `${formatCurrency(range.min)} - ${formatCurrency(range.max)}`
      : `${formatCurrency(range.min)}+`,
  }));

  const [filters, setFilters] = useState<Filter>({
    brand: '',
    price: '',
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let hasFilterChanged = false;

    Object.keys(filters).forEach((key) => {
      if (filters[key as keyof Filter]) {
        if (key === 'price') {
          const [min, max] = filters.price.split('-');
          if (
            params.get('price[lte]') !== max ||
            params.get('price[gte]') !== min
          ) {
            params.set('price[lte]', max);
            params.set('price[gte]', min);
            hasFilterChanged = true;
          }
        } else if (key === 'rating') {
          if (params.get('rating[gte]') !== filters[key as keyof Filter]) {
            params.set('rating[gte]', filters[key as keyof Filter]);
            hasFilterChanged = true;
          }
        } else {
          if (params.get(key) !== filters[key as keyof Filter]) {
            params.set(key, filters[key as keyof Filter]);
            hasFilterChanged = true;
          }
        }
      } else {
        if (key === 'price') {
          if (params.has('price[lte]') || params.has('price[gte]')) {
            params.delete('price[lte]');
            params.delete('price[gte]');
            hasFilterChanged = true;
          }
        } else if (key === 'rating') {
          if (params.has('rating[gte]')) {
            params.delete('rating[gte]');
            hasFilterChanged = true;
          }
        } else if (params.has(key)) {
          params.delete(key);
          hasFilterChanged = true;
        }
      }
    });

    if (hasFilterChanged) {
      params.delete('page');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [filters, searchParams, pathname, router]);

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: checked ? value : '',
    }));
  };

  function onClear() {
    setFilters(() => ({
      brand: '',
      price: '',
      rating: '',
    }));
    router.replace(pathname);
  }

  return (
    <SideFilterContext.Provider value={{ filters, setFilters, onChecked }}>
      <div className="flex h-full flex-col gap-2 rounded-xl bg-grey-50 px-4">
        <div className="flex items-center justify-between px-4 pb-2 pt-6">
          <h3 className="text-xl font-bold text-primary-default">Bộ lọc</h3>
          <button onClick={onClear} className="flex items-center gap-2">
            <FaRegCircleXmark />
            Đặt lại
          </button>
        </div>
        <div className="flex flex-col gap-4 overflow-auto rounded-xl bg-white p-4">
          <FilterItem filterName="brand" label="Hãng" options={brandOptions} />
          <hr className="my-1 border-t border-grey-200" />
          <FilterItem
            filterName="price"
            label="Giá"
            options={priceRangeOptions}
          />
          <hr className="my-1 border-t border-grey-200" />
          <FilterItem
            filterName="rating"
            label="Đánh giá"
            options={ratingOptions}
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
              className="flex items-center gap-4 text-primary-default"
              key={index}
            >
              <input
                type="checkbox"
                name={filterName}
                className="hover:filter-red-500 h-6 w-6 cursor-pointer"
                value={option.value}
                onChange={onChecked}
                checked={
                  filters[filterName as keyof Filter]?.includes(option.value) ||
                  false
                }
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default SideFilter;
