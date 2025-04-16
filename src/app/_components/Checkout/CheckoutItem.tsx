'use client';

import Image from 'next/image';
import NavLink from '../UI/NavLink';
import formatCurrency from '@/app/_utils/formatCurrency';
import { LineItem } from '@/app/_types/lineItem';
import { Product } from '@/app/_types/product';
import { WishlistProvider } from '@/app/_contexts/WishlistContext';
import WishlistButton from '../Wistlist/WishlistButton';

interface CheckoutItemProps {
  item: LineItem;
}

function CheckoutItem({ item }: CheckoutItemProps) {
  const { product, variant, quantity } = item;

  const itemVariant = (product as Product).variants.find(
    (v) => v._id === variant
  );
  if (!itemVariant) return null;

  const image = itemVariant.images[0];

  return (
    <div className="flex justify-between gap-8 md:gap-2 md:flex-col">
      <div className="flex gap-4">
        <div className="relative flex-[3] h-28 w-44 md:aspect-square flex-shrink-0 overflow-hidden rounded-xl border-2 border-grey-100 bg-white">
          <Image
            src={image}
            alt={(product as Product).name}
            className="absolute object-contain"
            fill
          />
        </div>
        <div className="flex flex-[7] flex-col gap-4 py-2">
          <p className="text-lg font-bold md:text-base">
            <NavLink
              href={`/products/${(product as Product).slug}`}
              hoverUnderline={false}
            >
              {(product as Product).name} - {itemVariant.name}
            </NavLink>
          </p>
          <WishlistProvider>
            <WishlistButton productId={(item.product as Product)._id} />
          </WishlistProvider>
        </div>
      </div>
      <div className="flex items-center gap-12 md:items-start md:justify-between">
        <p className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-grey-300 ">
          Số lượng:{' '}
          <span className="text-base font-semibold text-primary-default">
            {quantity}
          </span>
        </p>
        <div className="flex flex-col justify-between gap-4 md:gap-1 text-lg font-bold">
          <div>
            <p className="text-xs font-normal text-grey-300">Đơn giá:</p>
            <span className="text-sm">{formatCurrency(itemVariant.price)}</span>
          </div>
          <div>
            <p className="text-sm font-normal text-grey-300">Thành tiền:</p>
            <span className="">
              {formatCurrency(itemVariant.price * quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItem;
