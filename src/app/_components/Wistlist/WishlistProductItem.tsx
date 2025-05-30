"use client";

import { Product } from "@/app/_types/product";
import formatMoney from "@/app/_utils/formatMoney";
import Image from "next/image";
import { useState, useTransition } from "react";
import Button from "../UI/Button";
import { FaCartShopping, FaTrash } from "react-icons/fa6";
import { useWishlist } from "@/app/_contexts/WishlistContext";
import { addOrUpdateCartItemAction } from "@/app/_libs/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "../UI/Spinner";
import { LineItem } from "@/app/_types/lineItem";
import { useLanguage } from "@/app/_contexts/LanguageContext";

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
  const { t } = useLanguage();
  const [isPending, startTransition] = useTransition();
  const [selectedVariant, setSelectedVariant] = useState(item.variants[0]);
  const { removeProductFromWishlist } = useWishlist();
  const router = useRouter();

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addOrUpdateCartItemAction(
        item._id,
        selectedVariant._id!,
        1,
      );
      if (result.success) {
        toast.success("Sản phẩm đã được thêm vào giỏ hàng.", {
          icon: <FaCartShopping className="text-primary-500" />,
        });
      }
      if (result.errors) {
        if (result.errors.user) {
          toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
          router.push("/login");
        } else toast.error(result.errors.message);
      }
    });
  };

  if (isMobile) {
    return (
      <div className="flex gap-4 rounded-lg border border-gray-200 p-4 sm:flex-col sm:gap-2">
        <div className="relative aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-300 sm:w-full">
          <Image
            src={selectedVariant.images[0] as string}
            alt={item.name}
            fill
            className="object-cover sm:object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{item.name}</span>
            <FaTrash
              onClick={() => removeProductFromWishlist(item._id)}
              className="cursor-pointer text-gray-400 hover:text-red-500"
            />
          </div>

          <select
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
            onChange={(e) => {
              const selected = item.variants.find(
                (variant) => variant._id === e.target.value,
              );
              if (selected) {
                setSelectedVariant(() => selected);
                onSelectVariant({
                  product: item._id,
                  variant: selected._id!,
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

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-semibold">
              <span className="font-normal text-gray-400">Giá tiền: </span>
              {formatMoney(item.lowestPrice)}
            </span>
            <Button size="small" loading={isPending} onClick={handleAddToCart}>
              Thêm giỏ hàng
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
          className="flex h-full items-center justify-center"
          onClick={() => removeProductFromWishlist(item._id)}
        >
          <FaTrash className="cursor-pointer text-gray-400 hover:text-red-500" />
        </div>
      </td>
      <td className="px-2 py-4">
        <div className="relative aspect-square h-20 w-20 overflow-hidden rounded-md border-[1px] border-gray-200">
          <Image
            src={selectedVariant.images[0] as string}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      </td>
      <td className="whitespace-normal break-words text-sm font-medium">
        <span>{item.name}</span>
      </td>
      <td>
        <select
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          onChange={(e) => {
            const selected = item.variants.find(
              (variant) => variant._id === e.target.value,
            );
            if (selected) {
              setSelectedVariant(() => selected);
              onSelectVariant({
                product: item._id,
                variant: selected._id!,
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
        {formatMoney(item.lowestPrice)}
      </td>
      <td>
        <Button size="small" disabled={isPending} onClick={handleAddToCart}>
          {isPending ? <Spinner /> : t("account.wishlist.addToCart")}
        </Button>
      </td>
    </tr>
  );
}
