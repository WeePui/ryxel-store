import Image from 'next/image';
import React from 'react';

import NavLink from '../UI/NavLink';
import formatCurrency from '@/app/_utils/formatCurrency';
import { LineItem } from '@/app/_types/lineItem';
import { Variant } from '@/app/_types/variant';
import { Product } from '@/app/_types/product';

interface OrderItemProps {
  item: LineItem;
}

export default function OrderItem({ item }: OrderItemProps) {
  const itemVariant = (item.product as Product).variants.find(
    (variant: Variant) => variant._id === item.variant
  );
  const subtotal = item.unitPrice! * item.quantity;

  return (
    <div className="flex justify-between gap-8 w-full pt-4">
      <div className="flex gap-4">
        <div className="relative h-22 w-36 flex-shrink-0 overflow-hidden rounded-xl border-2 border-grey-100 bg-white">
          <Image
            src={itemVariant?.images[0] || '/product-placeholder.jpg'}
            alt={itemVariant!.name!}
            className="absolute object-contain"
            fill
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <p className="text-lg font-bold">
            <NavLink
              href={`/products/${(item.product as Product).slug}`}
              hoverUnderline={false}
            >
              {(item.product as Product).name}
            </NavLink>
          </p>{' '}
          <p className="text-sm text-grey-300">
            Phân loại: {itemVariant?.name}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-12">
        <p className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-grey-300">
          Số lượng:{' '}
          <span className="text-base font-semibold text-primary-default">
            {item.quantity}
          </span>
        </p>
        <div className="font-semibold">
          <p className="text-sm font-normal text-grey-300">Thành tiền:</p>
          {formatCurrency(subtotal)}
        </div>
      </div>
    </div>
  );
}
