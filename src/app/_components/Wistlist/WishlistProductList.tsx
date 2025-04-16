'use client';

import { Product } from '@/app/_types/product';
import React, { useState } from 'react';
import WishlistProductItem from './WishlistProductItem';
import { WishlistProvider } from '@/app/_contexts/WishlistContext';
import { LineItem } from '@/app/_types/lineItem';
import WishlistCTA from './WishlistCTA';

interface WishlistProductListProps {
  items: Product[];
}

export default function WishlistProductList({
  items,
}: WishlistProductListProps) {
  const [cartItems, setCartItems] = useState<LineItem[]>(() =>
    items.map((item) => {
      return {
        product: item._id,
        variant: item.variants[0]._id,
        quantity: 1,
      };
    })
  );

  const handleOnUpdateCartItems = (newCartItem: LineItem) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.variant === newCartItem.variant
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = newCartItem;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, newCartItem]);
    }
  };

  return (
    <>
      <table className="w-full border-collapse border border-gray-200 table-fixed md:hidden">
        <thead className="bg-gray-100">
          <tr className="p-4">
            <th className="pl-1 text-center w-1"></th>
            <th className="py-4 text-left w-1/6"></th>
            <th className="py-4 text-left w-8 font-title text-lg">Sản phẩm</th>
            <th className="py-4 text-left w-1/6 font-title text-lg">
              Phân loại
            </th>
            <th className="py-4 text-center w-1/6 font-title text-lg">Giá</th>
            <th className="py-4 text-center w-1/6 font-title text-lg"></th>
          </tr>
        </thead>
        <WishlistProvider>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <WishlistProductItem
                key={item._id}
                item={item}
                onSelectVariant={handleOnUpdateCartItems}
              />
            ))}
          </tbody>
        </WishlistProvider>
      </table>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <WishlistProvider key={item._id}>
            <WishlistProductItem
              item={item}
              onSelectVariant={handleOnUpdateCartItems}
              isMobile={true}
            />
          </WishlistProvider>
        ))}
      </div>
      <WishlistCTA cartItems={cartItems} />
    </>
  );
}
