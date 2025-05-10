'use client';

import CartItem from './CartItem';
import { useEffect, useMemo, useState, useTransition } from 'react';
import ConfirmDialogue from '../UI/ConfirmDialogue';
import Modal from '../UI/Modal';
import { LineItem } from '@/app/_types/lineItem';
import { WishlistProvider } from '@/app/_contexts/WishlistContext';
import NavLink from '../UI/NavLink';
import { Product } from '@/app/_types/product';
import Loader from '../UI/Loader';
import { clearCartItemsAction } from '@/app/_libs/actions';
import { toast } from 'react-toastify';
import { FaCircleInfo } from 'react-icons/fa6';

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
  const [isClearCartConfirmDialogue, setIsClearCartConfirmDialogue] =
    useState(false);
  const [selectedItems, setSelectedItems] = useState<
    {
      product: string;
      variant: string;
    }[]
  >([]);
  const [pending, startTransition] = useTransition();
  const selectableItems = items
    .filter(
      (item) =>
        ((item.product as Product).variants.find((v) => v._id === item.variant)
          ?.stock ?? 0) > 0
    )
    .map((item) => ({
      product: (item.product as Product)._id as string,
      variant: item.variant as string,
    }));

  const isAllSelected =
    selectedItems.length === selectableItems.length &&
    selectableItems.length > 0;

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const variantA = (a.product as Product).variants.find(
        (v) => v._id === a.variant
      );
      const variantB = (b.product as Product).variants.find(
        (v) => v._id === b.variant
      );

      const stockA = variantA ? variantA.stock : 0;
      const stockB = variantB ? variantB.stock : 0;

      return stockB - stockA; // stock giảm dần
    });
  }, [items]);

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
    const selectableItems = items
      .filter(
        (item) =>
          ((item.product as Product).variants.find(
            (v) => v._id === item.variant
          )?.stock ?? 0) > 0
      )
      .map((item) => ({
        product: (item.product as Product)._id as string,
        variant: item.variant as string,
      }));

    if (selectedItems.length === selectableItems.length) {
      setSelectedItems([]);
      onChangeLineItems([]);
    } else {
      setSelectedItems(selectableItems);
      onChangeLineItems(selectableItems);
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

  const handleClearCart = () => {
    setSelectedItems([]);
    onChangeLineItems([]);

    startTransition(async () => {
      const result = await clearCartItemsAction();

      if (!result.success) toast.error(result.errors!.message);
      else toast.success('Xoá giỏ hàng thành công!');
    });
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

      {isClearCartConfirmDialogue && (
        <Modal onClose={() => setIsClearCartConfirmDialogue(false)}>
          <ConfirmDialogue
            onConfirm={() => setIsClearCartConfirmDialogue(false)}
            confirmText="Huỷ bỏ"
            cancelText="Xoá"
            onCancel={handleClearCart}
            message="Bạn có chắc chắn muốn xoá giỏ hàng?"
          />
        </Modal>
      )}

      {pending ? (
        <Loader />
      ) : (
        <ul className="flex flex-col divide-y divide-gray-200">
          <div className="mb-4">
            {selectableItems.length === 0 && (
              <p className="text-xs text-gray-400 mb-2 flex items-center gap-2 ml-2">
                <FaCircleInfo /> Giỏ hàng của bạn không có sản phẩm nào còn hàng
              </p>
            )}
            <div className="flex justify-between px-2">
              <div className="flex items-center gap-3">
                <input
                  id="select-all"
                  type="checkbox"
                  className="w-7 h-7 rounded-md checked:bg-primary-default checked:hover:bg-primary-300 disabled:bg-grey-100 disabled:cursor-not-allowed disabled:border-grey-200"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                  disabled={selectableItems.length === 0}
                />
                <label htmlFor="select-all" className="font-medium">
                  Chọn tất cả
                </label>
              </div>

              <NavLink
                href="#"
                onClick={() => setIsClearCartConfirmDialogue(true)}
              >
                Xoá tất cả
              </NavLink>
            </div>
          </div>
          {sortedItems.map((item) => (
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
      )}
    </WishlistProvider>
  );
}

export default CartItemsList;
