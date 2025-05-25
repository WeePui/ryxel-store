"use client";

import { Product } from "@/app/_types/product";
import ProductCard from "../Products/ProductCard";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface RecommendedProductsProps {
  products: Product[];
  title?: string;
}

export default function RecommendedProducts({
  products,
  title,
}: RecommendedProductsProps) {
  const { t } = useLanguage();

  if (!products || products.length === 0) return null;

  // If title is provided, use it directly, otherwise use a default translation
  const displayTitle = title ? t(title) : t("products.recommendedProducts");

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-semibold">{displayTitle}</h2>
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
