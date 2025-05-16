'use client';

import { formatMoneyCompact } from '@/app/_utils/formatMoney';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, {
  createContext,
  JSX,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FaRegCircleXmark, FaChevronDown, FaChevronUp } from 'react-icons/fa6';

interface OrderFilterProps {
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
  status: string[];
  paymentMethod: string[];
  date: {
    startDate?: Date;
    endDate?: Date;
  };
  total: {
    min: number;
    max?: number;
  };
}
interface OrderFilterContextType {
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
  onChecked: (
    filterName: keyof Filter,
    value: string | number,
    checked: boolean
  ) => void;
  onDateChange?: (from?: Date, to?: Date) => void;
  onClear: () => void;
}

const OrderFilterContext = createContext<OrderFilterContextType | undefined>(
  undefined
);

const statusOptions = [
  { value: 'pending', label: 'Chờ xác nhận' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'shipped', label: 'Đang vận chuyển' },
  { value: 'delivered', label: 'Đã giao hàng' },
  { value: 'cancelled', label: 'Đã hủy' },
  { value: 'unpaid', label: 'Chưa thanh toán' },
];
const paymentMethodOptions = [
  { value: 'cod', label: 'Thanh toán khi nhận hàng' },
  { value: 'zalopay', label: 'ZaloPay' },
  { value: 'stripe', label: 'Stripe' },
];
const valueRangeOptions = [
  { value: '0-5000000', label: `< ${formatMoneyCompact(5_000_000)}` },
  {
    value: '5000000-10000000',
    label: `${formatMoneyCompact(5_000_000)} - ${formatMoneyCompact(
      10_000_000
    )}`,
  },
  { value: '10000000-', label: `> ${formatMoneyCompact(10_000_000)}` },
];

function OrderFilter({ isMobile = false }: OrderFilterProps) {
  const [filters, setFilters] = useState<Filter>({
    status: [],
    paymentMethod: [],
    date: {
      startDate: undefined,
      endDate: undefined,
    },
    total: {
      min: 0,
      max: undefined,
    },
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const statusParam = searchParams.get('status');
    const paymentMethodParam = searchParams.get('paymentMethod');
    const totalParam = searchParams.get('total');
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    setFilters((prev) => ({
      ...prev,
      status: statusParam ? statusParam.split(',') : [],
      paymentMethod: paymentMethodParam ? paymentMethodParam.split(',') : [],
      total: totalParam
        ? (() => {
            const [minStr, maxStr] = totalParam.split('-');
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
    filterName: keyof Filter | 'total',
    value: string | number,
    checked: boolean
  ) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (filterName === 'status' || filterName === 'paymentMethod') {
        const array = next[filterName] as string[];
        if (checked) {
          next[filterName] = [...array, String(value)];
        } else {
          next[filterName] = array.filter((v) => v !== value);
        }
      } else if (filterName === 'total') {
        if (checked) {
          const [minStr, maxStr] = String(value).split('-');
          next.total.min = parseInt(minStr);
          next.total.max = maxStr ? parseInt(maxStr) : undefined;
        } else {
          next.total = { min: 0, max: undefined }; // reset lại
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
      status: [],
      paymentMethod: [],
      date: {
        startDate: undefined,
        endDate: undefined,
      },
      total: {
        min: 0,
        max: undefined,
      },
    });
  };

  // Sync filters -> URL searchParams
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString()); // clone từ URL hiện tại

    // Trạng thái
    if (filters.status.length > 0) {
      params.set('status', filters.status.join(','));
    } else {
      params.delete('status');
    }

    // Phương thức thanh toán
    if (filters.paymentMethod.length > 0) {
      params.set('paymentMethod', filters.paymentMethod.join(','));
    } else {
      params.delete('paymentMethod');
    }

    // Tổng tiền
    if (filters.total.min > 0 || filters.total.max !== undefined) {
      params.set('total', `${filters.total.min}-${filters.total.max ?? ''}`);
    } else {
      params.delete('total');
    }

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
    <OrderFilterContext.Provider
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
            filterName="status"
            label="Trạng thái"
            options={statusOptions}
          />
          <hr className="my-1 border-t border-grey-200" />
          <FilterItem
            filterName="paymentMethod"
            label="Phương thức thanh toán"
            options={paymentMethodOptions}
          />
          <hr className="my-1 border-t border-grey-200" />
          <FilterItem
            filterName="total"
            label="Giá trị đơn hàng"
            options={valueRangeOptions}
          />
          <hr className="my-1 border-t border-grey-200" />
          <DateRangeFilter label="Ngày tạo đơn" />
        </div>
      </div>
    </OrderFilterContext.Provider>
  );
}

function FilterItem({ filterName, options, label }: FilterItemProps) {
  const [openFilter, setOpenFilter] = useState(true);
  const context = useContext(OrderFilterContext);
  if (!context)
    throw new Error('FilterItem must be used within OrderFilterContext');
  const { filters, onChecked } = context;

  const isChecked = (value: string | number) => {
    if (filterName === 'status' || filterName === 'paymentMethod') {
      return filters[filterName].includes(String(value));
    } else if (filterName === 'total') {
      const [minStr, maxStr] = String(value).split('-');
      const min = parseInt(minStr);
      const max = maxStr ? parseInt(maxStr) : undefined;
      return (
        filters.total.min === min &&
        (filters.total.max ?? null) === (max ?? null)
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
                  value={option.value}
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
  const context = useContext(OrderFilterContext);
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

export default OrderFilter;
