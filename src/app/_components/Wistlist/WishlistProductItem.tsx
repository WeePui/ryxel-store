'use client';

import { Product } from '@/app/_types/product';
import formatCurrency from '@/app/_utils/formatCurrency';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';
import Button from '../UI/Button';
import { FaCartShopping, FaTrash } from 'react-icons/fa6';
import { useWishlist } from '@/app/_contexts/WishlistContext';
import { addOrUpdateCartItemAction } from '@/app/_libs/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Spinner from '../UI/Spinner';
import { LineItem } from '@/app/_types/lineItem';

interface WishlistProductItemProps {
  item: Product;
  onSelectVariant: (cartItem: LineItem) => void;
  isMobile?: boolean;
}

export default function WishlistProductItem({
  item,
  onSelectVariant,
  isMobile = false,
}: WishlistProductItemProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedVariant, setSelectedVariant] = useState(item.variants[0]);
  const { removeProductFromWishlist } = useWishlist();
  const router = useRouter();

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addOrUpdateCartItemAction(
        item._id,
        selectedVariant._id,
        1
      );
      if (result.success) {
        toast.success('Sản phẩm đã được thêm vào giỏ hàng.', {
          icon: <FaCartShopping className="text-primary-500" />,
        });
      }
      if (result.errors) {
        if (result.errors.user) {
          toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.');
          router.push('/login');
        } else toast.error(result.errors.message);
      }
    });
  };

  if (isMobile) {
    return (
      <div className="flex gap-4 rounded-lg border border-gray-200 p-4 sm:flex-col sm:gap-2">
        <div className="relative aspect-square w-24 h-24 sm:w-full flex-shrink-0 rounded-md overflow-hidden border border-gray-300">
          <Image
            src={selectedVariant.images[0]}
            alt={item.name}
            fill
            className="object-cover sm:object-contain"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">{item.name}</span>
            <FaTrash
              onClick={() => removeProductFromWishlist(item._id)}
              className="text-gray-400 hover:text-red-500 cursor-pointer"
            />
          </div>

          <select
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            onChange={(e) => {
              const selected = item.variants.find(
                (variant) => variant._id === e.target.value
              );
              if (selected) {
                setSelectedVariant(() => selected);
                onSelectVariant({
                  product: item._id,
                  variant: selected._id,
                  quantity: 1,
                });
              }
            }}
          >
            {item.variants.map((variant) => (
              <option key={variant._id} value={variant._id}>
                {variant.name}
              </option>
            ))}
          </select>

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-semibold">
              <span className="text-gray-400 font-normal">Giá tiền: </span>
              {formatCurrency(item.lowestPrice)}
            </span>
            <Button size="small" disabled={isPending} onClick={handleAddToCart}>
              {isPending ? <Spinner /> : 'Thêm giỏ hàng'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <tr className="p-4">
      <td className="w-1 text-center">
        <div
          className="flex justify-center items-center h-full"
          onClick={() => removeProductFromWishlist(item._id)}
        >
          <FaTrash className="text-gray-400 hover:text-red-500 cursor-pointer" />
        </div>
      </td>
      <td className="py-4 px-2">
        <div className="relative aspect-square w-20 h-20 rounded-md border-[1px] border-gray-200 overflow-hidden">
          <Image
            src={selectedVariant.images[0]}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      </td>
      <td className="text-sm font-medium whitespace-normal break-words">
        <span>{item.name}</span>
      </td>
      <td>
        <select
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
          onChange={(e) => {
            const selected = item.variants.find(
              (variant) => variant._id === e.target.value
            );
            if (selected) {
              setSelectedVariant(() => selected);
              onSelectVariant({
                product: item._id,
                variant: selected._id,
                quantity: 1,
              });
            }
          }}
        >
          {item.variants.map((variant) => (
            <option key={variant._id} value={variant._id}>
              {variant.name}
            </option>
          ))}
        </select>
      </td>
      <td className="text-center font-semibold">
        {formatCurrency(item.lowestPrice)}
      </td>
      <td>
        <Button size="small" disabled={isPending} onClick={handleAddToCart}>
          {isPending ? <Spinner /> : 'Thêm giỏ hàng'}
        </Button>
      </td>
    </tr>
  );
}
