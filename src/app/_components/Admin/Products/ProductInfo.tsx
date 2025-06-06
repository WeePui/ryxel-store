"use client";

import Input from "../../UI/Input";
import Image from "next/image";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useTransition,
} from "react";
import { Product } from "@/app/_types/product";
import { deleteProductAction } from "@/app/_libs/actions";
import { toast } from "react-toastify";
import Modal from "../../UI/Modal";
import TextConfirmDialogue from "../../UI/TextConfirmDialogue";
import { useRouter } from "next/navigation";

interface ProductInfoProps {
  product: Product;
  categories: { value: string; label: string }[];
  onSave: () => void;
  validationErrors?: Record<string, string>;
  isSubmitting?: boolean;
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

const ProductInfo = forwardRef<ProductInfoHandle, ProductInfoProps>(
  (
    {
      product,
      categories,
      onSave,
      validationErrors = {},
      isSubmitting = false,
    },
    ref,
  ) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [name, setName] = useState(product.name);
    const [slug, setSlug] = useState(product.slug);
    const [brand, setBrand] = useState(product.brand);
    const [category, setCategory] = useState(product.category._id);
    const [description, setDescription] = useState(product?.description);
    const [imageCover, setImageCover] = useState<string | File>(
      product.imageCover,
    );
    useImperativeHandle(ref, () => ({
      getData() {
        return { name, slug, brand, category, description, imageCover };
      },
    }));

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];

      if (file) {
        setImageCover(file);
      }
    };

    const handleDeleteProduct = () => {
      startTransition(async () => {
        const result = await deleteProductAction(product._id);
        if (result.success) {
          toast.success(`Product deleted successfully`);
          router.replace("/admin/products");
        } else {
          toast.error(`Error deleting product: ${result.errors?.message}`);
        }
      });
    };

    const handleReset = () => {
      setName(product.name);
      setSlug(product.slug);
      setBrand(product.brand);
      setCategory(product.category._id);
      setDescription(product.description);
      setImageCover(product.imageCover);
    };

    return (
      <Card
        title="Thông tin sản phẩm"
        className="mx-auto h-fit w-full max-w-7xl"        titleAction={
          <div className="flex flex-col gap-2 text-sm font-medium text-grey-300">
            <span>
              Ngày tạo:{" "}
              {new Date(product!.createdAt).toLocaleDateString("vi-VN")}
            </span>
            <span>
              Cập nhật:{" "}
              {new Date(product!.updatedAt).toLocaleDateString("vi-VN")}
            </span>
            <span className={`font-semibold ${product.isDeleted ? 'text-red-500' : 'text-green-500'}`}>
              Trạng thái: {product.isDeleted ? 'Đã xóa' : 'Hoạt động'}
            </span>
          </div>
        }      >
        {product.isDeleted && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-700 border border-red-200">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">
              Sản phẩm này đã bị xóa và không thể được xóa lại. Chỉ có thể xem thông tin.
            </span>
          </div>
        )}
        <div className="grid grid-cols-4 gap-4 xl:grid-cols-3 lg:grid-cols-4 md:flex md:flex-col">
          {" "}          <Input
            type="text"
            defaultValue={product.name}
            id="name"
            name="name"
            label="Tên sản phẩm"
            className="col-span-2 sm:col-span-1"
            error={!!validationErrors.name}
            errorMessage={validationErrors.name}
            disabled={product.isDeleted}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value) {
                setName(value);
              }
            }}
          />          <Input
            type="text"
            defaultValue={product.slug + ""}
            id="slug"
            name="slug"
            label="Slug"
            className="col-span-2 sm:col-span-1"
            error={!!validationErrors.slug}
            errorMessage={validationErrors.slug}
            disabled={product.isDeleted}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value) {
                setSlug(value);
              }
            }}
          />{" "}
          <Input
            type="text"
            defaultValue={product.brand}
            id="brand"
            name="brand"
            label="Thương hiệu"
            className="col-span-1"
            error={!!validationErrors.brand}
            errorMessage={validationErrors.brand}
            disabled={product.isDeleted}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value) {
                setBrand(value);
              }
            }}
          />
          <Input
            type="number"
            defaultValue={product.sold.toString()} // Assuming sold is a number
            id="sold"
            name="sold"
            label="Đã bán"
            className="col-span-1"
            disabled={true}
          />{" "}          <Input
            type="select"
            id="category"
            name="category"
            label="Danh mục"
            options={categories}
            className="col-span-2"
            error={!!validationErrors.category}
            errorMessage={validationErrors.category}
            disabled={product.isDeleted}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value) {
                setCategory(value);
              }
            }}
            defaultValue={product.category._id}
          />{" "}          <Input
            type="textarea"
            value={description}
            id="description"
            name="description"
            label="Mô tả sản phẩm"
            className="col-span-full"
            error={!!validationErrors.description}
            errorMessage={validationErrors.description}
            disabled={product.isDeleted}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="relative col-span-3 aspect-video h-72 w-full">
            <Image
              src={
                typeof imageCover === "string"
                  ? imageCover
                  : imageCover instanceof File
                    ? URL.createObjectURL(imageCover)
                    : "/no-image-placeholder.jpg"
              }
              fill
              className="rounded object-contain"
              alt={product?.name || "Product Image"}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            {" "}            <Button
              size="small"
              onClick={() => document.getElementById("imageCover")?.click()}
              fullWidth={false}
              disabled={product.isDeleted}
            >
              Thay đổi ảnh
            </Button>
            <p className="mt-2 text-xs text-grey-200">
              Định dạng: JPEG, JPG, PNG
            </p>
            {validationErrors.imageCover && (
              <p className="mt-1 text-xs text-red-500">
                {validationErrors.imageCover}
              </p>
            )}
          </div>          <input
            className="hidden"
            id="imageCover"
            name="imageCover"
            type="file"
            onChange={handleImageChange}
            disabled={product.isDeleted}
          /><div className="col-span-full flex items-center justify-end gap-4 md:self-center sm:col-span-1 sm:flex-col">
            <Button
              size="small"
              variant="danger"
              className="w-fit whitespace-nowrap sm:w-full"
              onClick={() => setConfirmDelete(true)}
              loading={pending || isSubmitting}
              disabled={product.isDeleted}
            >
              {product.isDeleted ? 'Đã xóa' : 'Xoá sản phẩm'}
            </Button>
            <Button
              size="small"
              variant="secondary"
              onClick={handleReset}
              className="w-fit whitespace-nowrap sm:w-full"
              loading={pending || isSubmitting}
            >
              Đặt lại
            </Button>
            <Button
              size="small"
              onClick={onSave}
              className="w-fit whitespace-nowrap sm:w-full"
              loading={pending || isSubmitting}
            >
              Lưu thay đổi
            </Button>
          </div>
        </div>
        {confirmDelete && (
          <Modal onClose={() => setConfirmDelete(false)}>
            <TextConfirmDialogue
              onConfirm={handleDeleteProduct}
              message="Nhập slug sản phẩm để xác nhận"
              noticeText="Bạn có chắc chắn muốn xoá sản phẩm này không? Hành động này không thể hoàn tác."
              confirmText={product.slug}
              errorText="Nhập sai slug sản phẩm"
            />
          </Modal>
        )}
      </Card>
    );
  },
);

ProductInfo.displayName = "ProductInfo";

export default ProductInfo;
