'use client';

import Button from '@/app/_components/UI/Button';
import Counter from '@components/UI/Counter';
import { FaCartShopping, FaChevronRight, FaStar } from 'react-icons/fa6';
import ImageCarousel from './ImageCarousel';
import { useProductDetail } from '@/app/_contexts/ProductDetailContext';
import { useState, useTransition } from 'react';
import Spinner from '../UI/Spinner';
import { addOrUpdateCartItemAction } from '@/app/_libs/actions';
import { toast } from 'react-toastify';
import NavLink from '../UI/NavLink';
import { useRouter } from 'next/navigation';
import formatMoney from '@/app/_utils/formatMoney';
import { Variant } from '@/app/_types/variant';
import WishlistButton from '../Wistlist/WishlistButton';
import { WishlistProvider } from '@/app/_contexts/WishlistContext';

function OverviewSection() {
  const { currentVariant, setCurrentVariant, product } = useProductDetail();
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleVariantChange(variant: Variant) {
    setCurrentVariant(variant);
  }

  function handleAddToCart() {
    startTransition(async () => {
      const result = await addOrUpdateCartItemAction(
        product._id,
        currentVariant._id!,
        quantity
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
  }

  return (
    <section className="min-h-[36rem] xl:h-full bg-grey-400">
      <div className="mx-auto grid h-full max-w-[77.5rem] lg:max-w-full translate-y-12 xl:translate-y-0 grid-cols-[65fr_35fr] xl:grid-cols-[60fr_40fr] lg:grid-cols-1 rounded-3xl xl:rounded-none bg-white px-12 lg:px-8 md:px-4 py-6 lg:py-2 shadow-lg">
        <div className="flex flex-col gap-6 min-w-0">
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-grey-400">
            <NavLink href="/">
              <span className="text-grey-400 md:truncate">Trang chủ</span>
            </NavLink>
            <FaChevronRight className="text-xs" />
            <NavLink href="/products">
              <span className="text-grey-400 md:truncate">Cửa hàng</span>
            </NavLink>
            <FaChevronRight className="text-xs" />
            <span className="text-primary-500 md:truncate">{product.name}</span>
          </div>
          <ImageCarousel
            images={currentVariant.images as string[]}
            alt={currentVariant.name}
          />
        </div>
        <div className="py-8 lg:py-4 min-w-0">
          <div className="mb-6 lg:hidden">
            <span className="flex items-center text-sm text-grey-500">
              <span className="mr-2 text-2xl font-bold text-primary-default">
                &#10072;
              </span>
              <span className="capitalize">{product.category.name}</span>
            </span>
          </div>

          <h2 className="mb-4 font-title text-3xl font-bold text-grey-default">
            {product.name}
          </h2>

          <div className="mb-8 lg:mb-4">
            <span className="flex items-center">
              <FaStar className="mr-2 text-xl text-yellow-500" />
              <span className="mr-1 font-semibold">{product.rating}</span>
              <span className="text-xs text-grey-500">
                (với {product.ratingsQuantity} đánh giá)
                <span className="ml-4 mr-2 text-grey-400">
                  Đã bán: {product.sold}
                </span>
                |
                <span className="ml-2 text-grey-400">
                  Còn lại: {currentVariant.stock}
                </span>
              </span>
            </span>
          </div>

          <p className="mb-6 lg:mb-2 text-xs text-grey-500">Chọn sản phẩm:</p>
          <div className="mb-6 flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <Button
                type="filter"
                key={variant._id}
                onClick={handleVariantChange.bind(null, variant)}
                active={currentVariant._id === variant._id}
                className="font-semibold relative overflow-hidden"
              >
                {variant.name}
                {variant.stock <
                  Number(process.env.NEXT_PUBLIC_STOCK_LIMIT) && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full relative">
                      <div className="absolute inset-0 bg-white/60 rounded-md" />
                      <div className="absolute left-0 top-1/2 w-full rotate-45 h-[1px] bg-red-500 origin-center" />
                    </div>
                  </div>
                )}
              </Button>
            ))}
          </div>

          <h2 className="flex items-center text-3xl font-bold text-grey-default">
            <span>{formatMoney(currentVariant.price)}</span>
            <div className="ml-auto">
              <WishlistProvider>
                <WishlistButton productId={product._id} />
              </WishlistProvider>
            </div>
          </h2>

          <div className="mt-6 grid grid-cols-[30fr_70fr] items-center gap-4">
            <Counter value={quantity} onSetValue={setQuantity} />
            <Button
              type="primaryLarge"
              disabled={isPending}
              onClick={handleAddToCart}
            >
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  <FaCartShopping />
                  <span className="text-base">Thêm vào giỏ hàng</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;
