'use client';

import { Product } from '@/app/_types/product';
import { Category } from '@/app/_types/category';
import ProductInfo from './ProductInfo';
import VariantInfo from './VariantInfo';
import { useRef } from 'react';
import { Variant } from '@/app/_types/variant';

interface FormUpdateProductProps {
  product: Product;
  categories: Category[];
}

interface ProductInfoHandle {
  getData: () => {
    name: string;
    slug: string;
    brand: string;
    category: string;
    description: string;
    imageCover: string | File;
  };
}

interface VariantInfoHandle {
  getData: () => Variant[];
}

export default function FormUpdateProduct({
  product,
  categories,
}: FormUpdateProductProps) {
  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const productInfoRef = useRef<ProductInfoHandle>(null);
  const variantInfoRef = useRef<VariantInfoHandle>(null);

  const handleSubmit = () => {
    const productData = productInfoRef.current?.getData(); // từ ProductInfo
    const variantsData = variantInfoRef.current?.getData(); // từ VariantInfo

    const updatedProductData = {
      ...productData,
      variants: variantsData,
    };

    console.log('Updated Product Data:', updatedProductData);
  };

  return (
    <form className="grid grid-cols-2 gap-6">
      <ProductInfo
        product={product}
        categories={categoryOptions}
        onSave={handleSubmit}
        ref={productInfoRef}
      />
      <VariantInfo
        variants={product.variants}
        ref={variantInfoRef}
        onSave={handleSubmit}
      />
    </form>
  );
}
