'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@components/Products/ProductCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/app/_types/product';
import Pagination from '../UI/Pagination';

interface ProductListProps {
  products: Product[];
  totalResults: number;
  resultsPerPage: number;
}

function ProductList({
  products,
  totalResults,
  resultsPerPage,
}: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = Number(params.get('page')) || 1;

    setCurrentPage(page);
  }, [searchParams, products]);

  if (products.length === 0) {
    return (
      <div className="flex h-full items-center justify-center py-8 text-lg font-semibold text-grey-400">
        Không có sản phẩm nào phù hợp với bộ lọc của bạn. Vui lòng đặt lại bộ
        lọc.
      </div>
    );
  }

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page + '');

    router.replace(`${pathname}?${params.toString()}`);
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <div className="mb-12 grid auto-rows-min grid-cols-4 gap-x-8 gap-y-12">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalResults / resultsPerPage)}
            onPageChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
}

export default ProductList;
