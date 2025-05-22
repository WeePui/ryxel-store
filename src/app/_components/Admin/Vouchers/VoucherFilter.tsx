'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, {
  createContext,
  JSX,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FaRegCircleXmark, FaChevronDown, FaChevronUp } from 'react-icons/fa6';

interface VoucherFilterProps {
  isMobile?: boolean;
}

interface FilterItemProps {
  filterName: string;
  options: {
    value: string | number | boolean;
    label: string | JSX.Element;
    count?: number;
  }[];
  label: string;
}

interface Filter {
  isActive: boolean[];
  remainingUses: {
    min: number;
    max?: number;
  };
  date: {
    startDate?: Date;
    endDate?: Date;
  };
}

interface VoucherFilterContextType {
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
  onChecked: (
    filterName: keyof Filter,
    value: string | number | boolean,
    checked: boolean
  ) => void;
  onDateChange?: (from?: Date, to?: Date) => void;
  onClear: () => void;
}

const VoucherFilterContext = createContext<
  VoucherFilterContextType | undefined
>(undefined);

const activeOptions = [
  { value: true, label: 'Đang kích hoạt' },
  { value: false, label: 'Không kích hoạt' },
];

const remainingUsesOptions = [
  { value: '0-0', label: 'Hết lượt' },
  { value: '1-10', label: '1 - 10 lượt' },
  { value: '11-50', label: '11 - 50 lượt' },
  { value: '51-100', label: '51 - 100 lượt' },
  { value: '101-', label: '> 100 lượt' },
];

function VoucherFilter({ isMobile = false }: VoucherFilterProps) {
  const [filters, setFilters] = useState<Filter>({
    isActive: [],
    remainingUses: {
      min: 0,
      max: undefined,
    },
    date: {
      startDate: undefined,
      endDate: undefined,
    },
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isActiveParam = searchParams.get('isActive');
    const remainingUsesParam = searchParams.get('remainingUses');
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    setFilters((prev) => ({
      ...prev,
      isActive: isActiveParam
        ? isActiveParam.split(',').map((val) => val === 'true')
        : [],
      remainingUses: remainingUsesParam
        ? (() => {
            const [minStr, maxStr] = remainingUsesParam.split('-');
            return {
              min: parseInt(minStr) || 0,
              max: maxStr ? parseInt(maxStr) : undefined,
            };
          })()
        : { min: 0, max: undefined },
      date: {
        startDate: startDateParam
          ? new Date(Date.parse(startDateParam))
          : undefined,
        endDate: endDateParam ? new Date(Date.parse(endDateParam)) : undefined,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChecked = (
    filterName: keyof Filter | 'remainingUses',
    value: string | number | boolean,
    checked: boolean
  ) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (filterName === 'isActive') {
        const array = next[filterName] as boolean[];
        if (checked) {
          next[filterName] = [...array, Boolean(value)];
        } else {
          next[filterName] = array.filter((v) => v !== value);
        }
      } else if (filterName === 'remainingUses') {
        if (checked) {
          const [minStr, maxStr] = String(value).split('-');
          next.remainingUses.min = parseInt(minStr);
          next.remainingUses.max = maxStr ? parseInt(maxStr) : undefined;
        } else {
          next.remainingUses = { min: 0, max: undefined }; // reset lại
        }
      }
      return next;
    });
  };

  const onDateChange = (startDate?: Date, endDate?: Date) => {
    setFilters((prev) => ({
      ...prev,
      date: { startDate, endDate },
    }));
  };

  const onClear = () => {
    setFilters({
      isActive: [],
      remainingUses: {
        min: 0,
        max: undefined,
      },
      date: {
        startDate: undefined,
        endDate: undefined,
      },
    });
  };

  // Sync filters -> URL searchParams
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString()); // clone từ URL hiện tại

    // Trạng thái kích hoạt
    if (filters.isActive.length > 0) {
      params.set('isActive', filters.isActive.join(','));
    } else {
      params.delete('isActive');
    }

    // Số lượt sử dụng còn lại
    if (
      filters.remainingUses.min > 0 ||
      filters.remainingUses.max !== undefined
    ) {
      params.set(
        'remainingUses',
        `${filters.remainingUses.min}-${filters.remainingUses.max ?? ''}`
      );
    } else {
      params.delete('remainingUses');
    }

    // Ngày bắt đầu và kết thúc
    if (filters.date.startDate) {
      params.set('startDate', filters.date.startDate.toISOString());
    } else {
      params.delete('startDate');
    }
    if (filters.date.endDate) {
      params.set('endDate', filters.date.endDate.toISOString());
    } else {
      params.delete('endDate');
    }

    router.replace(`${pathname}?${params.toString()}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pathname, router]);

  return (
    <VoucherFilterContext.Provider
      value={{ filters, setFilters, onChecked, onClear, onDateChange }}
    >
      <div
        className={`flex h-full flex-col gap-2 rounded-xl ${
          isMobile ? 'bg-white' : 'bg-grey-100'
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
          <FilterItem
            filterName="isActive"
            label="Trạng thái kích hoạt"
            options={activeOptions}
          />
          <hr className="my-1 border-t border-grey-200" />
          <FilterItem
            filterName="remainingUses"
            label="Số lượt sử dụng còn lại"
            options={remainingUsesOptions}
          />
          <hr className="my-1 border-t border-grey-200" />
          <DateRangeFilter label="Thời gian khả dụng" />
        </div>
      </div>
    </VoucherFilterContext.Provider>
  );
}

function FilterItem({ filterName, options, label }: FilterItemProps) {
  const [openFilter, setOpenFilter] = useState(true);
  const context = useContext(VoucherFilterContext);
  if (!context)
    throw new Error('FilterItem must be used within VoucherFilterContext');
  const { filters, onChecked } = context;

  const isChecked = (value: string | number | boolean) => {
    if (filterName === 'isActive') {
      return filters.isActive.includes(Boolean(value));
    } else if (filterName === 'remainingUses') {
      const [minStr, maxStr] = String(value).split('-');
      const min = parseInt(minStr);
      const max = maxStr ? parseInt(maxStr) : undefined;
      return (
        filters.remainingUses.min === min &&
        (filters.remainingUses.max ?? null) === (max ?? null)
      );
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
                  className="h-5 w-5 cursor-pointer accent-primary-default"
                  value={String(option.value)}
                  checked={isChecked(option.value)}
                  onChange={(e) =>
                    onChecked(
                      filterName as keyof Filter,
                      option.value,
                      e.target.checked
                    )
                  }
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

function DateRangeFilter({ label }: { label: string }) {
  const context = useContext(VoucherFilterContext);
  if (!context) throw new Error('DateRangeFilter must be used within context');
  const { filters, onDateChange } = context;
  const [open, setOpen] = useState(true);

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h4 className="text-lg font-semibold capitalize text-primary-default">
          {label}
        </h4>
        <span className="text-grey-300">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {open && (
        <div className="mt-4 flex flex-col gap-2 pl-2">
          <div className="flex items-center gap-2">
            <label className="w-10 text-sm text-grey-500">Từ:</label>
            <input
              type="date"
              className="flex-1 rounded border border-grey-300 px-2 py-1 text-sm"
              value={filters.date.startDate?.toISOString().split('T')[0] || ''}
              onChange={(e) =>
                onDateChange?.(
                  e.target.value ? new Date(e.target.value) : undefined,
                  filters.date.endDate
                )
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-10 text-sm text-grey-500">Đến:</label>
            <input
              type="date"
              className="flex-1 rounded border border-grey-300 px-2 py-1 text-sm"
              value={filters.date.endDate?.toISOString().split('T')[0] || ''}
              onChange={(e) =>
                onDateChange?.(
                  filters.date.startDate,
                  e.target.value ? new Date(e.target.value) : undefined
                )
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VoucherFilter;
