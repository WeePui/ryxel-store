"use client";

import { Product } from "@/app/_types/product";
import { Category } from "@/app/_types/category";
import ProductInfo from "./ProductInfo";
import VariantInfo from "./VariantInfo";
import { useRef, useState } from "react";
import { Variant } from "@/app/_types/variant";
import { updateProductAction } from "@/app/_libs/actions";
import { ProductInput } from "@/app/_types/validateInput";
import { validateProductForm } from "@/app/_helpers/validator";
import { toast } from "react-toastify";

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
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const productInfoRef = useRef<ProductInfoHandle>(null);
  const variantInfoRef = useRef<VariantInfoHandle>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setValidationErrors({});

    try {
      const productData = productInfoRef.current?.getData();
      const variantsData = variantInfoRef.current?.getData();

      if (!productData || !variantsData) {
        toast.error("Không thể lấy dữ liệu sản phẩm. Vui lòng thử lại.");
        return;
      }

      const productInput: ProductInput = {
        ...productData,
        variants: variantsData,
      };

      // Validate using Zod
      const validation = validateProductForm(productInput);

      if (!validation.success) {
        setValidationErrors(validation.errors);
        toast.error("Vui lòng kiểm tra lại thông tin sản phẩm.");
        return;
      }

      // Submit if validation passes
      const result = await updateProductAction(productInput, product._id);

      if (result?.success) {
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        toast.error(
          result?.errors?.message || "Có lỗi xảy ra khi cập nhật sản phẩm.",
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form className="grid grid-cols-2 gap-6 lg:grid-cols-1">
      <ProductInfo
        product={product}
        categories={categoryOptions}
        onSave={handleSubmit}
        ref={productInfoRef}
        validationErrors={validationErrors}
        isSubmitting={isSubmitting}
      />
      <VariantInfo
        variants={product.variants}
        ref={variantInfoRef}
        onSave={handleSubmit}
        validationErrors={validationErrors}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
