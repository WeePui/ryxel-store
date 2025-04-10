'use client';

import CartItem from './CartItem';
import { useEffect, useMemo, useState } from 'react';
import ConfirmDialogue from '../UI/ConfirmDialogue';
import Modal from '../UI/Modal';
import { LineItem } from '@/app/_types/lineItem';
import { WishlistProvider } from '@/app/_contexts/WishlistContext';

interface CartItemsListProps {
  items: LineItem[];
  error?: string | null;
}

function CartItemsList({ items, error }: CartItemsListProps) {
  const [isOpened, setIsOpened] = useState(false);

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
        {items.map((item) => (
          <li key={item.variant as string} className="py-8">
            <CartItem item={item} />
          </li>
        ))}
      </ul>
    </WishlistProvider>
  );
}

export default CartItemsList;
