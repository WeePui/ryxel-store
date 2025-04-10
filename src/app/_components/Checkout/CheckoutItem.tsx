'use client';

import Image from 'next/image';
import NavLink from '../UI/NavLink';
import { FaRegHeart } from 'react-icons/fa';
import formatCurrency from '@/app/_utils/formatCurrency';
import { CartItem } from '@/app/_types/cart';

interface CheckoutItemProps {
  item: CartItem;
}

function CheckoutItem({ item }: CheckoutItemProps) {
  const { product, variant, quantity } = item;

  const itemVariant = product.variants.find((v) => v._id === variant);
  if (!itemVariant) return null;

  const image = itemVariant.images[0];

  return (
    <div className="flex justify-between gap-8">
      <div className="flex gap-4">
        <div className="relative h-28 w-44 flex-shrink-0 overflow-hidden rounded-xl border-2 border-grey-100 bg-white">
          <Image
            src={image}
            alt={product.name}
            className="absolute object-contain"
            fill
          />
        </div>
        <div className="flex flex-col gap-4 py-2">
          <p className="text-lg font-bold">
            <NavLink href={`/products/${product.slug}`} hoverUnderline={false}>
              {product.name} - {itemVariant.name}
            </NavLink>
          </p>
          <FaRegHeart className="stroke-[14px] text-2xl text-red-500" />
        </div>
      </div>
      <div className="flex items-center gap-12">
        <p className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-grey-300">
          Số lượng:{' '}
          <span className="text-base font-semibold text-primary-default">
            {quantity}
          </span>
        </p>
        <div className="flex flex-col justify-between gap-4 text-lg font-bold">
          <div>
            <p className="text-xs font-normal text-grey-300">Đơn giá:</p>
            <span className="text-sm">{formatCurrency(itemVariant.price)}</span>
          </div>
          <div>
            <p className="text-sm font-normal text-grey-300">Thành tiền:</p>
            {formatCurrency(itemVariant.price * quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItem;
