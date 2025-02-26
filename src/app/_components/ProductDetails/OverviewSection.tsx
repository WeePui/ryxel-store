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
import formatCurrency from '@/app/_utils/formatCurrency';
import { Variant } from '@/app/_types/variant';

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
        currentVariant._id,
        quantity
      );
      if (result.success) {
        toast.success('Product added to cart');
      }
      if (result.errors) {
        if (result.errors.user) router.push('/login');
        else toast.error(result.errors.message);
      }
    });
  }

  return (
    <section className="h-[36rem] bg-grey-400">
      <div className="mx-auto grid h-full max-w-[77.5rem] translate-y-12 grid-cols-[65fr_35fr] overflow-hidden rounded-3xl bg-white px-12 py-6 shadow-lg">
        <div className="flex flex-col gap-6">
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-grey-400">
            <NavLink href="/">
              <span className="text-grey-400">Trang chủ</span>
            </NavLink>
            <FaChevronRight className="text-xs" />
            <NavLink href="/products">
              <span className="text-grey-400">Cửa hàng</span>
            </NavLink>
            <FaChevronRight className="text-xs" />
            <span className="text-primary-500">{product.name}</span>
          </div>
          <ImageCarousel
            images={currentVariant.images}
            alt={currentVariant.name}
          />
        </div>
        <div className="py-8">
          <div className="mb-6">
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

          <div className="mb-8">
            <span className="flex items-center">
              <FaStar className="mr-2 text-xl text-yellow-500" />
              <span className="mr-1 font-semibold">{product.rating}</span>
              <span className="text-xs text-grey-500">
                (với {product.ratingsQuantity} đánh giá)
              </span>
            </span>
          </div>

          <p className="mb-6 text-xs text-grey-500">Chọn sản phẩm:</p>
          <div className="mb-6 flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <Button
                type="filter"
                key={variant._id}
                onClick={handleVariantChange.bind(null, variant)}
                active={currentVariant._id === variant._id}
              >
                {variant.name}
              </Button>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-grey-default">
            {formatCurrency(product.variants[0].price)}
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
