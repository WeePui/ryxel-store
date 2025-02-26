'use client';

import { createContext, useContext, useState } from 'react';
import { Variant } from '../_types/variant';
import { Product } from '../_types/product';

interface ProductDetailContextType {
  currentVariant: Variant;
  setCurrentVariant: (variant: Variant) => void;
  product: Product;
}

const ProductDetailContext = createContext<
  ProductDetailContextType | undefined
>(undefined);

const ProductDetailProvider = ({
  children,
  product,
}: {
  children: React.ReactNode;
  product: Product;
}) => {
  const [currentVariant, setCurrentVariant] = useState(product.variants[0]);

  return (
    <ProductDetailContext.Provider
      value={{ currentVariant, setCurrentVariant, product }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
};

const useProductDetail = () => {
  const context = useContext(ProductDetailContext);

  if (!context) {
    throw new Error(
      'useProductDetail must be used within a ProductDetailProvider'
    );
  }

  return context;
};

export { ProductDetailProvider, useProductDetail };
