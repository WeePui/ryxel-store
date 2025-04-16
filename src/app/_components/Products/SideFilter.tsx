'use client';

import formatCurrency from '@/app/_utils/formatCurrency';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, {
  createContext,
  JSX,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  FaRegCircleXmark,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaRegStar,
} from 'react-icons/fa6';
import SpecsFilter from './SpecsFilter';

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
  const brandOptions = brands.map((brand) => ({
    value: brand.value,
    label: brand.value,
    count: brand.count,
  }));
  const priceRangeOptions = priceRanges.map((range) => ({
    value: `${range.min}-${range.max}`,
    label: range.max
      ? `${formatCurrency(range.min)} - ${formatCurrency(range.max)}`
      : `${formatCurrency(range.min)}+`,
  }));

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
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const brand = searchParams.get('brand')?.split(',') || [];
    const price = {
      min: Number(searchParams.get('price[gte]')) || 0,
      max: Number(searchParams.get('price[lte]')) || undefined,
    };
    const rating = {
      min: Number(searchParams.get('rating[gte]')) || undefined,
      max: 5,
    };

    setFilters({
      brand,
      price,
      rating,
    });
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (filters.brand.length > 0) {
      params.set('brand', filters.brand.join(','));
      params.delete('page');
    } else {
      params.delete('brand');
    }
    if (filters.price.min) {
      params.set('price[gte]', filters.price.min.toString());
      params.delete('page');
    }
    if (filters.price.max) {
      params.set('price[lte]', filters.price.max.toString());
      params.delete('page');
    }
    if (filters.price.min === 0 && filters.price.max === undefined) {
      params.delete('price[gte]');
      params.delete('price[lte]');
    }
    if (filters.price.max === undefined) {
      params.delete('price[lte]');
    }
    if (filters.rating.min) {
      params.set('rating[gte]', filters.rating.min.toString());
      params.delete('page');
    }
    if (typeof filters.rating.min === 'number') {
      params.set('rating[gte]', filters.rating.min.toString());
      params.delete('page');
    } else {
      params.delete('rating[gte]'); // Xóa param nếu không có rating
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [filters, pathname, router, searchParams]);

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    const currentFilters = { ...filters };

    if (name === 'brand') {
      if (checked) {
        currentFilters.brand.push(value);
      } else {
        currentFilters.brand = currentFilters.brand.filter(
          (brand) => brand !== value
        );
      }
    } else if (name === 'price') {
      const [min, max] = value.split('-').map(Number);
      currentFilters.price.min = min;
      currentFilters.price.max = max || undefined;
    } else if (name === 'rating') {
      const newRating = checked ? Number(value) : undefined;
      // Nếu click vào rating đang được chọn -> bỏ chọn
      currentFilters.rating.min =
        currentFilters.rating.min === newRating ? undefined : newRating;
    }

    setFilters(currentFilters);
  };

  function onClear() {
    router.push(`${pathname}`);

    setFilters({
      brand: [],
      price: {
        min: 0,
        max: undefined,
      },
      rating: {
        min: undefined,
        max: 5,
      },
    });
  }

  function handleSpecsChange(specName: string, value: string) {
    const params = new URLSearchParams(searchParams);
    const specs = params.get('specs')
      ? JSON.parse(params.get('specs') as string)
      : {};

    const currentSpecs = { ...specs };
    if (currentSpecs[specName] === value) {
      delete currentSpecs[specName];
    } else {
      currentSpecs[specName] = value;
    }

    if (Object.keys(currentSpecs).length === 0) {
      params.delete('specs');
    } else {
      params.set('specs', JSON.stringify(currentSpecs));
      params.delete('page');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <SideFilterContext.Provider value={{ filters, setFilters, onChecked }}>
      <div
        className={`flex h-full flex-col gap-2 rounded-xl ${
          isMobile ? 'bg-white' : 'bg-grey-50'
        } px-4 pb-6`}
      >
        <div className="flex items-center justify-between px-4 pb-2 pt-6">
          <h3 className="text-xl font-bold text-primary-default">Bộ lọc</h3>
          <button onClick={onClear} className="flex items-center gap-2">
            <FaRegCircleXmark />
            Đặt lại
          </button>
        </div>
        <div className="flex flex-col gap-2 overflow-auto rounded-xl bg-white p-4 scrollbar-hide">
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
    if (filterName === 'brand') {
      return filters.brand.includes(value as string);
    } else if (filterName === 'price') {
      const [min, max] = (value as string).split('-').map(Number);
      return (
        filters.price.min === min && (filters.price.max || undefined) === max
      );
    } else if (filterName === 'rating') {
      return filters.rating.min === Number(value);
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
                {option.count ? `(${option.count})` : ''}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default SideFilter;
