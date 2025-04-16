'use client';

import { FaBagShopping, FaChevronDown } from 'react-icons/fa6';
import CheckoutItemsList from './CheckoutItemsList';
import { useState } from 'react';
import { LineItem } from '@/app/_types/lineItem';

interface CheckoutItemsProps {
  items: LineItem[];
}

function CheckoutItems({ items }: CheckoutItemsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex w-full flex-col gap-6 md:gap-2 rounded-xl bg-white p-8 md:px-4 md:pb-2 shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="flex items-center text-xl font-bold">
          <FaBagShopping />
          <span className="ml-2">Sản phẩm</span>
        </h2>
        {items.length > 3 && (
          <div
            className="flex items-center gap-4"
            role="button"
            onClick={toggleExpand}
          >
            {isExpanded ? 'Thu gọn' : 'Xem toàn bộ'}
            <FaChevronDown
              className={`font-extrabold duration-200 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>
        )}
      </div>
      <CheckoutItemsList items={items} isExpanded={isExpanded} />
    </div>
  );
}

export default CheckoutItems;
