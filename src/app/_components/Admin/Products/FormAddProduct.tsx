"use client";

import { Category } from "@/app/_types/category";
import { useRef } from "react";
import Button from "../../UI/Button";
import AddProductInfo from "./AddProductInfo";
import AddVariantInfo from "./AddVariantInfo";
import { Variant } from "@/app/_types/variant";
import { addProductAction } from "@/app/_libs/actions";
import { ProductInput } from "@/app/_types/validateInput";

interface FormAddProductProps {
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

export default function FormAddProduct({ categories }: FormAddProductProps) {
  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const productInfoRef = useRef<ProductInfoHandle>(null);
  const variantInfoRef = useRef<VariantInfoHandle>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData = productInfoRef.current?.getData(); // từ ProductInfo
    const variantsData = variantInfoRef.current?.getData(); // từ VariantInfo

    const updatedProductData = {
      ...productData,
      variants: variantsData,
    };

    addProductAction(updatedProductData as ProductInput);
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <AddProductInfo categories={categoryOptions} ref={productInfoRef} />
      <AddVariantInfo ref={variantInfoRef} />
      <div className="mt-6 text-right">
        <Button role="submit" fullWidth={false}>
          Thêm sản phẩm
        </Button>
      </div>
    </form>
  );
}
