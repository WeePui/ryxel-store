'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import NavLink from '../UI/NavLink';
import Counter from '../UI/Counter';
import { FaRegTrashCan } from 'react-icons/fa6';
import {
  addOrUpdateCartItemAction,
  removeCartItemAction,
} from '@/app/_libs/actions';
import ConfirmDialogue from '../UI/ConfirmDialogue';
import Modal from '../UI/Modal';
import formatMoney from '@/app/_utils/formatMoney';
import Loader from '../UI/Loader';
import { toast } from 'react-toastify';
import { LineItem } from '@/app/_types/lineItem';
import WishlistButton from '../Wistlist/WishlistButton';
import { Product } from '@/app/_types/product';

interface CartItemProps {
  item: LineItem;
  selected: boolean;
  onChangeLineItems: (productId: string, variantId: string) => void;
}

function CartItem({ item, onChangeLineItems, selected }: CartItemProps) {
  const [isPending, startTransition] = useTransition();
  const [openConfirm, setOpenConfirm] = useState(false);
  const { product, variant, quantity } = item;

  const itemVariant = (product as Product).variants.find(
    (v) => v._id === variant
  )!;
  const image = itemVariant.images[0];

  function handleChangeQuality(value: number) {
    startTransition(async () => {
      const result = await addOrUpdateCartItemAction(
        (product as Product)._id,
        variant as string,
        value
      );

      if (result.errors) {
        toast.error(result.errors.message);
      }
    });
  }

  function handleRemoveItem() {
    startTransition(async () => {
      const result = await removeCartItemAction(
        (product as Product)._id,
        variant as string
      );

      if (result.errors) {
        toast.error(result.errors.message);
      }

      setOpenConfirm(false);
    });
  }

  return (
    <div className="w-full">
      {isPending ? (
        <div className="mx-auto flex w-full flex-col">
          <Loader />
        </div>
      ) : (
        <div className="flex gap-4 md:flex-col">
          <div className="flex items-center gap-2">
            <input
              id="select-item"
              type="checkbox"
              className="w-7 h-7 rounded-md checked:bg-primary-default checked:hover:bg-primary-300 disabled:bg-grey-100 disabled:cursor-not-allowed disabled:border-grey-200"
              checked={selected}
              onChange={() => {
                onChangeLineItems(
                  (item.product as Product)._id,
                  variant as string
                );
              }}
              disabled={
                itemVariant.stock < Number(process.env.NEXT_PUBLIC_STOCK_LIMIT)
              }
            />
            <label className="hidden md:block">Chọn sản phẩm</label>
          </div>
          <div className="flex xl:flex-col gap-4 md:gap-0 w-full">
            <div className="flex items-center gap-4">
              <div className="relative flex-[3] h-28 w-44 overflow-hidden rounded-xl border-2 border-grey-100 bg-white">
                <Image
                  src={image as string}
                  alt={(product as Product).name}
                  className="absolute object-contain"
                  fill
                />
              </div>
              <div className="flex flex-[7] flex-col py-2">
                <p className="text-lg font-bold">
                  <NavLink
                    href={`/products/${(product as Product).slug}`}
                    hoverUnderline={false}
                  >
                    {(product as Product).name}
                  </NavLink>
                </p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-grey-200 text-sm">
                    Phân loại: {itemVariant.name}
                  </p>
                  <div className="hidden sm:block">
                    <WishlistButton
                      productId={(product as Product)._id}
                      size="small"
                    />
                  </div>
                </div>

                <div className="sm:hidden">
                  <WishlistButton productId={(product as Product)._id} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-12 lg:gap-4 ml-auto xl:ml-2 sm:mr-0">
              {(item.product as Product).totalStock >
              Number(process.env.NEXT_PUBLIC_STOCK_LIMIT) ? (
                <div className="flex h-[4.6rem] w-28 flex-col gap-2 xl:flex-[3] md:justify-center">
                  <span className="text-sm text-grey-300 md:hidden">
                    Số lượng
                  </span>
                  <div className="xl:w-44 md:w-full">
                    <Counter
                      value={quantity}
                      onSetValue={handleChangeQuality}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-red-500 text-sm font-bold whitespace-nowrap border-2 border-red-500 rounded-full px-2 py-1 text-center xl:flex-[3] md:justify-center max-w-fit">
                  Hết hàng
                </div>
              )}
              <div className="flex h-[4.6rem] flex-col items-center justify-between gap-2 md:justify-center xl:flex-[7] xl:items-end">
                <p className="text-lg font-bold">
                  {formatMoney(itemVariant.price * quantity)}
                </p>
                <button
                  className="flex items-center gap-2 border-b-2 border-red-500 text-red-500"
                  disabled={isPending}
                  onClick={() => setOpenConfirm(true)}
                >
                  <FaRegTrashCan /> Xoá bỏ
                </button>
                {openConfirm && (
                  <Modal
                    onClose={() => setOpenConfirm(false)}
                    showCloseButton={false}
                  >
                    <ConfirmDialogue
                      message={
                        <span>
                          Bạn có chắc muốn xoá{' '}
                          <span className="font-semibold text-primary-500">
                            {(product as Product).name}
                          </span>{' '}
                          ra khỏi giỏ hàng?
                        </span>
                      }
                      onConfirm={handleRemoveItem}
                      onCancel={() => setOpenConfirm(false)}
                    />
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
