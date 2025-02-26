import formatCurrency from '@/app/_utils/formatCurrency';
import { Product } from '@/app/_types/product';

import Image from 'next/image';
import Link from 'next/link';
import { FaRegHeart, FaStar } from 'react-icons/fa6';

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative origin-bottom transform rounded-xl border-[1px] border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-105">
      <Link href={`/products/${product._id}`} className="flex h-full flex-col">
        <div className="relative h-32 w-full">
          <Image
            src={product.imageCover}
            alt={product.name}
            className="object-contain"
            fill
            sizes="100%"
          />
        </div>
        <div className="flex flex-col gap-2 overflow-hidden px-6 py-4 text-grey-400">
          <p className="transform-none font-bold transition-colors duration-300 group-hover:text-primary-default">
            {product.name}
          </p>
          <p className="flex items-center gap-1 text-xs">
            <span>{product.rating}</span>
            <FaStar className="text-base text-yellow-400" />
            <span className="ml-1">(Đã bán {product.sold})</span>
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-2 px-6 py-4 text-grey-400">
          <p className="font-bold transition-colors duration-300 group-hover:text-primary-default">
            {formatCurrency(product.lowestPrice)}
          </p>
          <div className="mt-auto flex items-center justify-between capitalize">
            <span className="flex items-center text-sm">
              <span className="mr-2 text-xl font-bold text-red-700">
                &#10072;
              </span>
              {product.category.name}
            </span>
            <div className="text-xl text-red-700">
              <FaRegHeart />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
