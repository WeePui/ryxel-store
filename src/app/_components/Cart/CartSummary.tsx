"use client";

import { useState } from "react";
import CartItemsList from "./CartItemsList";
import OrderSummary from "./OrderSummary";
import { LineItem } from "@/app/_types/lineItem";
import { Product } from "@/app/_types/product";

interface CartSummaryProps {
  items: LineItem[];
  error?: string | null;
}

export default function CartSummary({ items, error }: CartSummaryProps) {
  const [selectedItems, setSelectedItems] = useState<
    {
      product: string;
      variant: string;
    }[]
  >([]);

  const lineItems = selectedItems.map((item) => {
    const foundItem = items.find(
      (i) =>
        (i.product as Product)._id === item.product &&
        i.variant === item.variant,
    );
    return foundItem || null;
  });
  const subtotal = lineItems.reduce((acc, item) => {
    if (item) {
      const variant = (item.product as Product).variants.find(
        (variant) => variant._id === item.variant,
      );
      const price = variant?.finalPrice || variant?.price || 0;
      return acc + price * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <>
      <CartItemsList
        items={items}
        error={error}
        onChangeLineItems={setSelectedItems}
      />
      <div className="h-auto">
        <OrderSummary subtotal={subtotal} selectedItems={selectedItems} />
      </div>
    </>
  );
}
