'use client';

import Input from '../../UI/Input';
import Image from 'next/image';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useTransition,
} from 'react';
import { Product } from '@/app/_types/product';
import { deleteProductAction } from '@/app/_libs/actions';
import { toast } from 'react-toastify';
import Modal from '../../UI/Modal';
import TextConfirmDialogue from '../../UI/TextConfirmDialogue';
import { useRouter } from 'next/navigation';

interface ProductInfoProps {
  product: Product;
  categories: { value: string; label: string }[];
  onSave: () => void;
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
  ({ product, categories, onSave }, ref) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [name, setName] = useState(product.name);
    const [slug, setSlug] = useState(product.slug);
    const [brand, setBrand] = useState(product.brand);
    const [category, setCategory] = useState(product.category._id);
    const [description, setDescription] = useState(product?.description);
    const [imageCover, setImageCover] = useState<string | File>(
      product.imageCover
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
          router.replace('/admin/products');
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
        className="w-full h-fit max-w-7xl mx-auto"
        titleAction={
          <div className="flex flex-col gap-2 text-sm font-medium text-grey-300">
            <span>
              Ngày tạo:{' '}
              {new Date(product!.createdAt).toLocaleDateString('vi-VN')}
            </span>
            <span>
              Cập nhật:{' '}
              {new Date(product!.updatedAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
        }
      >
        <div className="grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:flex md:flex-col gap-4">
          <Input
            type="text"
            defaultValue={product.name}
            id="name"
            name="name"
            label="Tên sản phẩm"
            className="col-span-2 sm:col-span-1"
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value) {
                setName(value);
              }
            }}
          />
          <Input
            type="text"
            defaultValue={product.slug + ''}
            id="slug"
            name="slug"
            label="Slug"
            className="col-span-2 sm:col-span-1"
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value) {
                setSlug(value);
              }
            }}
          />
          <Input
            type="text"
            defaultValue={product.brand}
            id="brand"
            name="brand"
            label="Thương hiệu"
            className="col-span-1"
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value) {
                setBrand(value);
              }
            }}
          />
          <Input
            type="text"
            defaultValue={product.sold.toString()} // Assuming sold is a number
            id="sold"
            name="sold"
            label="Đã bán"
            className="col-span-1"
            disabled={true}
          />
          <Input
            type="select"
            id="category"
            name="category"
            label="Danh mục"
            options={categories}
            className="col-span-2"
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value) {
                setCategory(value);
              }
            }}
            defaultValue={product.category._id}
          />
          <Input
            type="textarea"
            value={description}
            id="description"
            name="description"
            label="Mô tả sản phẩm"
            className="col-span-full"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="relative aspect-video w-full h-72 col-span-3">
            <Image
              src={
                typeof imageCover === 'string'
                  ? imageCover
                  : imageCover instanceof File
                  ? URL.createObjectURL(imageCover)
                  : '/no-image-placeholder.jpg'
              }
              fill
              className="object-contain rounded"
              alt={product?.name || 'Product Image'}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button
              className="h-fit w-fit"
              size="small"
              onClick={() => document.getElementById('imageCover')?.click()}
            >
              Thay đổi ảnh
            </Button>
            <p className="text-xs text-grey-200 mt-2">
              Định dạng: JPEG, JPG, PNG
            </p>
          </div>
          <input
            className="hidden"
            id="imageCover"
            name="imageCover"
            type="file"
            onChange={handleImageChange}
          />
          <div className="col-span-full flex items-center justify-end gap-4 sm:flex-col sm:col-span-1 md:self-center">
            <Button
              size="small"
              type="danger"
              className="whitespace-nowrap sm:w-full w-fit"
              onClick={() => setConfirmDelete(true)}
              disabled={pending}
              loading={pending}
            >
              Xoá sản phẩm
            </Button>
            <Button
              size="small"
              type="secondary"
              onClick={handleReset}
              className="whitespace-nowrap sm:w-full w-fit"
              disabled={pending}
              loading={pending}
            >
              Đặt lại
            </Button>
            <Button
              size="small"
              onClick={onSave}
              className="whitespace-nowrap sm:w-full w-fit"
              disabled={pending}
              loading={pending}
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
  }
);

ProductInfo.displayName = 'ProductInfo';

export default ProductInfo;
