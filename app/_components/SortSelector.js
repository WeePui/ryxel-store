'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function SortSelector() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-end gap-4">
      <span className="font-thin">Sort by: </span>
      <select
        onChange={handleSortChange}
        className="rounded-lg border-2 border-grey-300 py-3 pl-3 pr-12 font-bold text-primary-default hover:bg-grey-50 hover:ring-[1px] hover:ring-grey-300 focus:bg-grey-50 focus:ring-[1px] focus:ring-grey-300"
      >
        <option value="createdAt">Release Date</option>
        <option value="name">Title (A - Z)</option>
        <option value="-rating">Rating (high to low)</option>
        <option value="-lowestPrice">Price (high to low)</option>
        <option value="lowestPrice">Price (low to high)</option>
      </select>
    </div>
  );
}

export default SortSelector;
