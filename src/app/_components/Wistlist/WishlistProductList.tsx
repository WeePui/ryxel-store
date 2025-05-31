"use client";

import { Product } from "@/app/_types/product";
import React, { useState } from "react";
import WishlistProductItem from "./WishlistProductItem";
import { WishlistProvider } from "@/app/_contexts/WishlistContext";
import { LineItem } from "@/app/_types/lineItem";
import WishlistCTA from "./WishlistCTA";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface WishlistProductListProps {
  items: Product[];
}

export default function WishlistProductList({
  items,
}: WishlistProductListProps) {
  const { t } = useLanguage();
  const [cartItems, setCartItems] = useState<LineItem[]>(() =>
    items.map((item) => {
      return {
        product: item._id,
        variant: item.variants[0]._id,
        quantity: 1,
      } as LineItem;
    }),
  );

  const handleOnUpdateCartItems = (newCartItem: LineItem) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.variant === newCartItem.variant,
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
      <table className="w-full table-fixed border-collapse border border-gray-200 md:hidden">
        {" "}
        <thead className="bg-gray-100">
          <tr className="p-4">
            <th className="w-1 pl-1 text-center"></th>
            <th className="w-1/6 py-4 text-left"></th>
            <th className="w-8 py-4 text-left font-title text-lg">
              {t("account.wishlist.productName")}
            </th>
            <th className="w-1/6 py-4 text-left font-title text-lg">
              {t("account.wishlist.category")}
            </th>
            <th className="w-1/6 py-4 text-center font-title text-lg">
              {t("account.wishlist.price")}
            </th>
            <th className="w-1/6 py-4 text-center font-title text-lg"></th>
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
      <div className="hidden flex-col gap-4 md:flex">
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
