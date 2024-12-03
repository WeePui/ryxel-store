'use client';

import { useEffect, useState } from 'react';
import Button from '@components/UI/Button';
import ProductCard from '@components/Products/ProductCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function ProductList({ products, totalResults }) {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = params.get('page') || 1;
    if (page > 1 && displayedProducts.length > 0) {
      setDisplayedProducts((prevProducts) => [...prevProducts, ...products]);
    } else {
      setDisplayedProducts(products);
    }
  }, [searchParams]);

  if (products.length === 0) {
    return (
      <p className="w-full text-center text-2xl">
        No products found with your current filter. Try to clear filter
      </p>
    );
  }

  const loadMoreProducts = () => {
    const params = new URLSearchParams(searchParams);
    const currentPage = parseInt(params.get('page') || 1, 10);
    params.set('page', currentPage + 1);

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
            <span className="mr-2">Load More</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
