import Image from 'next/image';
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa6';

function ProductCard({ product }) {
  return (
    <Link
      href="/products"
      className="rounded-lg overflow-hidden border-[1px] border-grey-200 flex flex-col h-full"
    >
      <div className="relative h-32 w-full">
        <Image
          src={product.imageCover}
          alt={product.name}
          className="object-contain"
          fill
        />
      </div>
      <div className="px-6 py-4 flex flex-col gap-2 text-grey-400">
        <p className="font-bold hover:text-primary-default transition-colors duration-300">
          {product.name}
        </p>
        <p className="text-xs">Releases 20/11/2024</p>
      </div>
      <div className="px-6 py-4 flex flex-col gap-2 text-grey-400 mt-auto">
        <p className="font-bold hover:text-primary-default transition-colors duration-300">
          ${product.lowestPrice}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="flex items-center text-sm">
            <span className="mr-2 font-bold text-red-700 text-xl">
              &#10072;
            </span>
            {product.category.name}
          </span>
          <div className="text-xl text-red-700 ">
            <FaRegHeart />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
