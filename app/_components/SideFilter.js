'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  FaRegCircleXmark,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaRegStar,
} from 'react-icons/fa6';

const SideFilterContext = createContext();

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

function SideFilter({ brands, priceRanges }) {
  const brandOptions = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));
  const priceRangeOptions = priceRanges.map((range) => ({
    value: `${range.min}-${range.max}`,
    label: range.max ? `$${range.min} - $${range.max}` : `$${range.min}+`,
  }));

  const [filters, setFilters] = useState({
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
      if (filters[key]) {
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
          if (params.get('rating[gte]') !== filters[key]) {
            params.set('rating[gte]', filters[key]);
            hasFilterChanged = true;
          }
        } else {
          if (params.get(key) !== filters[key]) {
            params.set(key, filters[key]);
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

  const onChecked = (e) => {
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
          <h3 className="text-xl font-bold text-primary-default">Filter</h3>
          <button onClick={onClear} className="flex items-center gap-2">
            <FaRegCircleXmark />
            Clear
          </button>
        </div>
        <div className="flex flex-col gap-4 overflow-auto rounded-xl bg-white p-4">
          <FilterItem filterName="brand" options={brandOptions} />
          <hr className="my-1 border-t border-grey-200" />
          <FilterItem filterName="price" options={priceRangeOptions} />
          <hr className="my-1 border-t border-grey-200" />
          <FilterItem filterName="rating" options={ratingOptions} />
        </div>
      </div>
    </SideFilterContext.Provider>
  );
}

function FilterItem({ filterName, options }) {
  const [openFilter, setOpenFilter] = useState(false);
  const { filters, onChecked } = useContext(SideFilterContext);

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setOpenFilter((prev) => !prev)}
      >
        <h4 className="text-lg font-semibold capitalize text-primary-default">
          {filterName}
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
                checked={filters[filterName]?.includes(option.value) || false}
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
