"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import NavLink from "../UI/NavLink";
import Counter from "../UI/Counter";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  addOrUpdateCartItemAction,
  removeCartItemAction,
} from "@/app/_libs/actions";
import ConfirmDialogue from "../UI/ConfirmDialogue";
import Modal from "../UI/Modal";
import formatMoney from "@/app/_utils/formatMoney";
import Loader from "../UI/Loader";
import { toast } from "react-toastify";
import { LineItem } from "@/app/_types/lineItem";
import WishlistButton from "../Wistlist/WishlistButton";
import { Product } from "@/app/_types/product";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { isSaleOfferActive } from "@/app/_utils/saleValidation";

interface CartItemProps {
  item: LineItem;
  selected: boolean;
  onChangeLineItems: (productId: string, variantId: string) => void;
}

function CartItem({ item, onChangeLineItems, selected }: CartItemProps) {
  const { t } = useLanguage();
  const [isPending, startTransition] = useTransition();
  const [openConfirm, setOpenConfirm] = useState(false);
  const { product, variant, quantity } = item;

  const itemVariant = (product as Product).variants.find(
    (v) => v._id === variant,
  )!;
  const image = itemVariant.images[0];

  function handleChangeQuality(value: number) {
    startTransition(async () => {
      const result = await addOrUpdateCartItemAction(
        (product as Product)._id,
        variant as string,
        value,
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
        variant as string,
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
              className="h-7 w-7 rounded-md checked:bg-primary-default checked:hover:bg-primary-300 disabled:cursor-not-allowed disabled:border-grey-200 disabled:bg-grey-100"
              checked={selected}
              onChange={() => {
                onChangeLineItems(
                  (item.product as Product)._id,
                  variant as string,
                );
              }}
              disabled={
                itemVariant.stock < Number(process.env.NEXT_PUBLIC_STOCK_LIMIT)
              }
            />
            <label className="hidden md:block">{t("cart.selectProduct")}</label>
          </div>
          <div className="flex w-full gap-4 xl:flex-col md:gap-0">
            <div className="flex items-center gap-4">
              <div className="relative h-28 w-44 flex-[3] overflow-hidden rounded-xl border-2 border-grey-100 bg-white">
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
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-grey-200">
                    {t("cart.variant")}: {itemVariant.name}
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
            <div className="ml-auto flex items-center gap-12 xl:ml-2 lg:gap-4 sm:mr-0">
              {(item.product as Product).totalStock >
              Number(process.env.NEXT_PUBLIC_STOCK_LIMIT) ? (
                <div className="flex h-[4.6rem] w-28 flex-col gap-2 xl:flex-[3] md:justify-center">
                  <span className="text-sm text-grey-300 md:hidden">
                    {t("cart.quantity")}
                  </span>
                  <div className="xl:w-44 md:w-full">
                    <Counter
                      value={quantity}
                      onSetValue={handleChangeQuality}
                    />
                  </div>
                </div>
              ) : (
                <div className="max-w-fit whitespace-nowrap rounded-full border-2 border-red-500 px-2 py-1 text-center text-sm font-bold text-red-500 xl:flex-[3] md:justify-center">
                  {t("cart.outOfStock")}
                </div>
              )}
              <div className="flex h-[4.6rem] flex-col items-center justify-between gap-2 xl:flex-[7] xl:items-end md:justify-center">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold">
                      {formatMoney(
                        (itemVariant.finalPrice || itemVariant.price) *
                          quantity,
                      )}
                    </p>
                    {isSaleOfferActive(itemVariant.saleOff) &&
                      itemVariant.saleOff && (
                        <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                          -{itemVariant.saleOff.percentage}%
                        </span>
                      )}
                  </div>
                  {itemVariant.finalPrice &&
                    itemVariant.finalPrice < itemVariant.price && (
                      <p className="text-sm text-gray-500 line-through">
                        {formatMoney(itemVariant.price * quantity)}
                      </p>
                    )}
                </div>
                <button
                  className="flex items-center gap-2 self-end border-b-2 border-red-500 text-red-500"
                  disabled={isPending}
                  onClick={() => setOpenConfirm(true)}
                >
                  <FaRegTrashCan /> {t("cart.remove")}
                </button>
                {openConfirm && (
                  <Modal
                    onClose={() => setOpenConfirm(false)}
                    showCloseButton={false}
                  >
                    <ConfirmDialogue
                      message={
                        <span>
                          {t("cart.confirmations.removeItem").replace(
                            "{productName}",
                            (product as Product).name,
                          )}
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
