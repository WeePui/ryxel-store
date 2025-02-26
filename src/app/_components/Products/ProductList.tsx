'use client';

import { useEffect, useState } from 'react';
import Button from '@components/UI/Button';
import ProductCard from '@components/Products/ProductCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/app/_types/product';

interface ProductListProps {
  products: Product[];
  totalResults: number;
}

function ProductList({ products, totalResults }: ProductListProps) {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = Number(params.get('page')) || 1;
    if (page > 1 && displayedProducts.length > 0) {
      setDisplayedProducts((prevProducts) => [...prevProducts, ...products]);
    } else {
      setDisplayedProducts(products);
    }
  }, [searchParams, products, displayedProducts]);

  if (products.length === 0) {
    return (
      <p className="w-full text-center text-2xl">
        Không có sản phẩm nào phù hợp với bộ lọc bạn chọn. Hãy thử lại bằng cách
        đặt lại bộ lọc.
      </p>
    );
  }

  const loadMoreProducts = () => {
    const params = new URLSearchParams(searchParams);
    const currentPage = Number(params.get('page')) || 1;
    params.set('page', currentPage + 1 + '');

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-12 grid auto-rows-min grid-cols-4 gap-x-8 gap-y-12">
        {displayedProducts.length > 0 &&
          displayedProducts.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>
      {displayedProducts.length < totalResults && (
        <div className="flex items-center justify-center">
          <Button onClick={loadMoreProducts}>
            <span className="mr-2">Xem thêm</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
