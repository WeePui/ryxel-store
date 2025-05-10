'use client';

import Input from '../../UI/Input';
import Image from 'next/image';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import { forwardRef, useImperativeHandle, useState } from 'react';

interface ProductInfoProps {
  categories: { value: string; label: string }[];
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

const AddProductInfo = forwardRef<ProductInfoHandle, ProductInfoProps>(
  ({ categories }, ref) => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imageCover, setImageCover] = useState<string | File>('');

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

    return (
      <Card title="Thông tin sản phẩm" className="w-full mb-6">
        <div className="flex gap-4 mt-8 w-full min-w-0 sm:flex-col flex-[6]">
          <div className="flex flex-col grid-cols-4 lg:grid-col-2 sm:grid-cols-1 gap-4 w-full">
            <Input
              type="text"
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
            <div className="flex sm:flex-col gap-4">
              <Input
                type="text"
                id="brand"
                name="brand"
                label="Thương hiệu"
                className="col-span-2 sm:col-span-1"
                onChange={(e) => {
                  const value = e.target.value.trim();
                  if (value) {
                    setBrand(value);
                  }
                }}
              />
              <Input
                type="select"
                id="category"
                name="category"
                label="Danh mục"
                options={categories}
                className="col-span-2 sm:col-span-1"
                onChange={(e) => {
                  const value = e.target.value.trim();
                  if (value) {
                    setCategory(value);
                  }
                }}
              />
            </div>
            <Input
              type="textarea"
              value={description}
              id="description"
              name="description"
              label="Mô tả sản phẩm"
              className="col-span-full"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-full flex-[4]">
            <div className="relative aspect-video w-full h-72 mb-6">
              <Image
                src={
                  imageCover
                    ? URL.createObjectURL(imageCover as File)
                    : '/no-image-placeholder.jpg'
                }
                fill
                className="rounded object-contain"
                alt="Product Cover Image"
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
              accept="image/jpeg, image/jpg, image/png"
            />
          </div>
        </div>
      </Card>
    );
  }
);

AddProductInfo.displayName = 'ProductInfo';

export default AddProductInfo;
