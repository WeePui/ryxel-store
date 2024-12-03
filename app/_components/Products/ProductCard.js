import Image from 'next/image';
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa6';

function ProductCard({ product }) {
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
          <p className="text-xs">Releases 20/11/2024</p>
        </div>
        <div className="mt-auto flex flex-col gap-2 px-6 py-4 text-grey-400">
          <p className="font-bold transition-colors duration-300 group-hover:text-primary-default">
            ${product.lowestPrice}
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
