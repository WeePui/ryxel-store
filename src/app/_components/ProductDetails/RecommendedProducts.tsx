"use client";

import { Product } from "@/app/_types/product";
import ProductCard from "../Products/ProductCard";

interface RecommendedProductsProps {
  products: Product[];
  title?: string;
}

export default function RecommendedProducts({
  products,
  title = "Sản phẩm liên quan",
}: RecommendedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex w-max gap-4">
          {products.map((product) => (
            <ProductCard product={product} size="compact" key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
