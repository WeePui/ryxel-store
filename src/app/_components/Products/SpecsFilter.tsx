'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

interface SpecsFilterProps {
  specifications: {
    [key: string]: Array<{
      value: string;
      count: number;
    }>;
  };
  onSelectSpecs: (spec: string, value: string) => void;
}
// [key: string]: Array<{}

export default function SpecsFilter({
  specifications,
  onSelectSpecs,
}: SpecsFilterProps) {
  const specs = Object.entries(specifications).map(([key, values]) => ({
    name: key,
    values: values.map((spec) => ({
      value: spec.value,
      label: spec.value,
      count: spec.count,
    })),
  }));

  function handleSelectSpecs(spec: string, value: string) {
    onSelectSpecs(spec, value);
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        {specs.map((spec, index) => (
          <React.Fragment key={index}>
            <hr className="my-1 border-t border-grey-200" />

            <SpecsFilterItem
              key={index}
              filterName={spec.name}
              options={spec.values}
              label={spec.name}
              onSelectSpecs={handleSelectSpecs}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

interface SpecsFilterItemProps {
  filterName: string;
  options: {
    value: string | number;
    label: string;
    count?: number;
  }[];
  label: string;
  onSelectSpecs: (spec: string, value: string) => void;
}

function SpecsFilterItem({
  filterName,
  options,
  label,
  onSelectSpecs,
}: SpecsFilterItemProps) {
  const [openFilter, setOpenFilter] = useState(false);
  const searchParams = useSearchParams();

  const handleSelectSpecs = (value: string) => {
    onSelectSpecs(filterName, value);
  };

  const isChecked = (value: string) => {
    const params = searchParams.get('specs');
    if (!params) return false;
    const specs = JSON.parse(params);
    return specs[filterName]?.includes(value) || false;
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
                  onChange={(e) => handleSelectSpecs(e.target.value)}
                  checked={isChecked(option.value as string)}
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
