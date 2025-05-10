'use client';

import { Product } from '@/app/_types/product';
import ProductCard from '../Products/ProductCard';

interface RecommendedProductsProps {
  products: Product[];
  title?: string;
}

export default function RecommendedProducts({
  products,
  title = 'Sản phẩm liên quan',
}: RecommendedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="max-w-7xl px-4 py-8 w-full">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 w-max">
          {products.map((product) => (
            <ProductCard product={product} size="compact" key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
