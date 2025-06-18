"use client";

import { Category } from "@/app/_types/category";
import { useRef, useState } from "react";
import Button from "../../UI/Button";
import AddProductInfo from "./AddProductInfo";
import AddVariantInfo from "./AddVariantInfo";
import { Variant } from "@/app/_types/variant";
import { addProductAction } from "@/app/_libs/actions";
import { ProductInput } from "@/app/_types/validateInput";
import { validateProductForm } from "@/app/_helpers/validator";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const productInfoRef = useRef<ProductInfoHandle>(null);
  const variantInfoRef = useRef<VariantInfoHandle>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationErrors({});

    try {
      const productData = productInfoRef.current?.getData();
      const variantsData = variantInfoRef.current?.getData();

      if (!productData || !variantsData) {
        toast.error("Không thể lấy dữ liệu sản phẩm. Vui lòng thử lại.");
        return;
      }

      // Pre-process to ensure all numeric fields are properly handled
      const processedVariants = variantsData.map((v) => ({
        ...v,
        price: Number(v.price) || 0,
        cost: Number(v.cost) || 0,
        stock: Number(v.stock) || 0,
        weight: Number(v.weight) || 0,
        sold: Number(v.sold) || 0,
        dimension: {
          length: Number(v.dimension?.length) || 0,
          width: Number(v.dimension?.width) || 0,
          height: Number(v.dimension?.height) || 0,
        },
        saleOff: {
          startDate: v.saleOff?.startDate || "",
          endDate: v.saleOff?.endDate || "",
          percentage: Number(v.saleOff?.percentage) || 0,
        },
      }));

      const productInput: ProductInput = {
        ...productData,
        variants: processedVariants,
      };

      // Validate using Zod
      const validation = validateProductForm(productInput);

      if (!validation.success) {
        setValidationErrors(validation.errors);
        console.error("Validation errors:", validation.errors);

        // Display detailed error messages
        const errorMessages = [];
        for (const [field, error] of Object.entries(validation.errors)) {
          if (error) {
            errorMessages.push(`${field}: ${error}`);
          }
        }

        if (errorMessages.length > 0) {
          toast.error(`Validation errors: ${errorMessages.join(", ")}`);
        } else {
          toast.error("Vui lòng kiểm tra lại thông tin sản phẩm.");
        }
        return;
      }

      // Submit if validation passes
      const result = await addProductAction(productInput);

      if (result?.success) {
        toast.success("Thêm sản phẩm thành công!");
        router.replace(`/admin/products/${result.product.slug}`);
        // Reset form or redirect
      } else {
        toast.error(
          result?.errors?.message || "Có lỗi xảy ra khi thêm sản phẩm.",
        );
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <AddProductInfo
        categories={categoryOptions}
        ref={productInfoRef}
        validationErrors={validationErrors}
      />
      <AddVariantInfo
        ref={variantInfoRef}
        validationErrors={validationErrors}
      />
      <div className="mt-6 text-right">
        <Button role="submit" fullWidth={false} disabled={isSubmitting}>
          {isSubmitting ? "Đang thêm..." : "Thêm sản phẩm"}
        </Button>
      </div>
    </form>
  );
}
