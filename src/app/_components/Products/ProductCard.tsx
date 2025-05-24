import formatMoney from "@/app/_utils/formatMoney";
import { Product } from "@/app/_types/product";

import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import WishlistButton from "../Wistlist/WishlistButton";
import { WishlistProvider } from "@/app/_contexts/WishlistContext";
import { categoryNames } from "@/app/_utils/mappingCategory";

function ProductCard({
  product,
  size = "default",
}: {
  product: Product;
  size?: "default" | "compact";
}) {
  const isCompact = size === "compact";

  function handleCardClick(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("button")) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <div
      className={`group relative origin-bottom transform rounded-xl border-[1px] border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-105 ${
        isCompact ? "w-[14rem]" : ""
      }`}
      onClick={handleCardClick}
    >
      <Link href={`/products/${product.slug}`} className="flex h-full flex-col">
        <div className="relative h-32 w-full">
          <Image
            src={product.imageCover}
            alt={product.name}
            className="object-contain"
            fill
            sizes="100%"
          />
        </div>
        <div className="flex flex-col gap-2 overflow-hidden px-6 py-4 text-grey-400 lg:px-3">
          <p className="transform-none font-bold transition-colors duration-300 group-hover:text-primary-default">
            {product.name}
          </p>
          <p className="flex items-center gap-1 text-xs">
            <span>{product.rating}</span>
            <FaStar className="text-base text-yellow-400" />
            <span className="ml-1">(Đã bán {product.sold})</span>
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-2 px-6 py-4 text-grey-400 lg:px-3">
          <p className="flex flex-wrap items-center gap-2 font-bold transition-colors duration-300 group-hover:text-primary-default">
            {formatMoney(product.lowestPrice)}
            {product.totalStock <
              Number(process.env.NEXT_PUBLIC_STOCK_LIMIT) && (
              <span className="text-xs text-red-500">(Hết hàng)</span>
            )}
          </p>
          <div className="mt-auto flex items-center justify-between capitalize">
            <span className="flex items-center text-sm">
              <span className="mr-2 text-xl font-bold text-primary-400">
                &#10072;
              </span>
              {categoryNames[product.category.slug] || product.category.name}
            </span>
            <WishlistProvider>
              <WishlistButton productId={product._id} size="small" />
            </WishlistProvider>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
