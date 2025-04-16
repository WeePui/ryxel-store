'use client';

import CartItem from './CartItem';
import { useEffect, useMemo, useState } from 'react';
import ConfirmDialogue from '../UI/ConfirmDialogue';
import Modal from '../UI/Modal';
import { LineItem } from '@/app/_types/lineItem';
import { WishlistProvider } from '@/app/_contexts/WishlistContext';
import NavLink from '../UI/NavLink';
import { Product } from '@/app/_types/product';

interface CartItemsListProps {
  items: LineItem[];
  error?: string | null;
  onChangeLineItems: (
    items: {
      product: string;
      variant: string;
    }[]
  ) => void;
}

function CartItemsList({
  items,
  error,
  onChangeLineItems,
}: CartItemsListProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    {
      product: string;
      variant: string;
    }[]
  >([]);

  const errorDetails = useMemo(
    () =>
      error === 'unpaidOrder'
        ? {
            text: 'unpaidOrder',
            message:
              'Bạn có đơn hàng chưa thanh toán để có thể tiếp tục đặt hàng vui lòng thanh toán hoặc huỷ đơn hàng.',
          }
        : error === 'verifiedNeeded'
        ? {
            text: 'verifiedNeeded',
            message: 'Bạn cần xác thực tài khoản của mình để tiếp tục.',
          }
        : null,
    [error]
  );

  useEffect(() => {
    if (errorDetails) {
      setIsOpened(true);
    }
  }, [errorDetails]);

  const toggleSelectItem = (productId: string, variantId: string) => {
    setSelectedItems((prev) =>
      prev.some(
        (item) => item.product === productId && item.variant === variantId
      )
        ? prev.filter(
            (item) =>
              !(item.product === productId && item.variant === variantId)
          )
        : [...prev, { product: productId, variant: variantId }]
    );

    onChangeLineItems(
      selectedItems.some(
        (item) => item.product === productId && item.variant === variantId
      )
        ? selectedItems.filter(
            (item) =>
              !(item.product === productId && item.variant === variantId)
          )
        : [...selectedItems, { product: productId, variant: variantId }]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
      onChangeLineItems([]);
    } else {
      const allItems = items.map((item) => ({
        product: (item.product as Product)._id as string,
        variant: item.variant as string,
      }));
      setSelectedItems(allItems);
      onChangeLineItems(allItems);
    }
  };

  const onConfirm = () => {
    setIsOpened(false);

    if (errorDetails?.text === 'unpaidOrder') {
      window.location.href = '/account/orders';
      return;
    } else if (errorDetails?.text === 'verifiedNeeded') {
      window.location.href = '/account/profile';
      return;
    }
  };

  return (
    <WishlistProvider>
      {isOpened && (
        <Modal onClose={() => setIsOpened(false)}>
          <ConfirmDialogue
            onConfirm={onConfirm}
            confirmText="Xác nhận"
            message={errorDetails?.message || ''}
          />
        </Modal>
      )}

      <ul className="flex flex-col divide-y divide-gray-200">
        <div className="flex justify-between mb-4 px-2">
          <div className="flex items-center gap-3">
            <input
              id="select-all"
              type="checkbox"
              className="w-7 h-7 rounded-md checked:bg-primary-default checked:hover:bg-primary-300"
              checked={selectedItems.length === items.length}
              onChange={toggleSelectAll}
            />
            <label htmlFor="select-all" className="font-medium">
              Chọn tất cả
            </label>
          </div>
          <NavLink href="#">Xoá tất cả</NavLink>
        </div>
        {items.map((item) => (
          <li key={item.variant as string} className="py-8 flex">
            <CartItem
              item={item}
              onChangeLineItems={toggleSelectItem}
              selected={selectedItems.some(
                (selected) =>
                  selected.product === (item.product as Product)._id &&
                  selected.variant === item.variant
              )}
            />
          </li>
        ))}
      </ul>
    </WishlistProvider>
  );
}

export default CartItemsList;
