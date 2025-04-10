'use client';

import { Product } from '@/app/_types/product';
import formatCurrency from '@/app/_utils/formatCurrency';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../UI/Button';
import { FaFire } from 'react-icons/fa6';
import { WishlistProvider } from '@/app/_contexts/WishlistContext';
import WishlistButton from '../Wistlist/WishlistButton';
import { useTransition } from 'react';
import { addOrUpdateCartItemAction } from '@/app/_libs/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Spinner from '../UI/Spinner';

interface BestsellerItemProps {
  item: Product;
}

export default function BestsellerItem({ item }: BestsellerItemProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addOrUpdateCartItemAction(
        item._id,
        item.variants[0]._id,
        1
      );
      if (result.success) {
        toast.success('Sản phẩm đã được thêm vào giỏ hàng.');
      }
      if (result.errors) {
        if (result.errors.user) {
          toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.');
          router.push('/login');
        } else toast.error(result.errors.message);
      }
    });
  };

  return (
    <div className="min-w-[300px] bg-white/5 rounded-xl overflow-hidden shadow hover:shadow-lg hover:scale-[1.03] transition-all duration-300 relative">
      <Image
        src={item.imageCover}
        alt={item.name}
        width={300}
        height={48}
        className="object-cover transition-transform duration-300 hover:scale-105"
      />

      <div className="p-4">
        <Link
          href={`/products/${item.slug}`}
          className="font-bold text-lg line-clamp-2"
        >
          {item.name}
        </Link>
        <p className="text-primary-500 mt-1 flex items-center gap-2">
          <span>{formatCurrency(item.lowestPrice)}</span> -
          <span className="text-sm text-gray-400">Đã bán: {item.sold}</span>
        </p>

        <div className="mt-4 flex">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            disabled={pending}
          >
            {pending ? <Spinner /> : 'Thêm vào giỏ hàng'}
          </Button>
          <WishlistProvider>
            <div className="absolute top-2 right-2 z-10">
              <WishlistButton productId={item._id} />
            </div>
          </WishlistProvider>
        </div>
      </div>
      <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse flex items-center gap-1 shadow-orange-300 shadow-md">
        <FaFire /> <span>Best Seller</span>
      </div>
    </div>
  );
}
