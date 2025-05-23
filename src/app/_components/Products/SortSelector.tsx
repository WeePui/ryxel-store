'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface OrderSortSelectorProps {
  children?: React.ReactNode;
}

function SortSelector({ children }: OrderSortSelectorProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentSort = searchParams.get('sort');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex md:flex-col items-center justify-end gap-4">
      <span className="font-thin md:hidden">Sắp xếp: </span>
      <select
        onChange={handleSortChange}
        className="rounded-lg border-2 border-grey-300 py-3 pl-3 pr-12 font-bold text-primary-default hover:bg-grey-50 hover:ring-[1px] hover:ring-grey-300 focus:bg-grey-50 focus:ring-[1px] focus:ring-grey-300"
        defaultValue={(currentSort && currentSort.toString()) || 'createdAt'}
      >
        {children ? (
          children
        ) : (
          <>
            <option value="createdAt">Ngày ra mắt</option>
            <option value="name">Tên sản phẩm (A - Z)</option>
            <option value="-rating">Đánh giá (cao - thấp)</option>
            <option value="lowestPrice">Giá (thấp - cao)</option>
            <option value="-lowestPrice">Giá (cao - thấp)</option>
          </>
        )}
      </select>
    </div>
  );
}

export default SortSelector;
