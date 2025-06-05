"use client";

import Input from "../../UI/Input";
import Image from "next/image";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import AssistiveText from "../../UI/AssistiveText";
import { forwardRef, useImperativeHandle, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

interface ProductInfoProps {
  categories: { value: string; label: string }[];
  validationErrors?: Record<string, string>;
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
  ({ categories, validationErrors = {} }, ref) => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [imageCover, setImageCover] = useState<string | File>("");
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
      <Card title="Thông tin sản phẩm" className="mb-6 w-full">
        <div className="mt-8 flex w-full min-w-0 flex-[6] gap-4 lg:flex-col">
          <div className="lg:grid-col-2 flex w-full grid-cols-4 flex-col gap-4 sm:grid-cols-1">
            {" "}
            <Input
              type="text"
              id="name"
              name="name"
              label="Tên sản phẩm"
              className="col-span-2 sm:col-span-1"
              value={name}
              error={!!validationErrors.name}
              errorMessage={validationErrors.name}
              onChange={(e) => {
                const value = e.target.value.trim();
                setName(value);
              }}
            />{" "}
            <Input
              type="text"
              id="slug"
              name="slug"
              label="Slug"
              className="col-span-2 sm:col-span-1"
              value={slug}
              error={!!validationErrors.slug}
              errorMessage={validationErrors.slug}
              onChange={(e) => {
                const value = e.target.value.trim();
                setSlug(value);
              }}
            />
            <div className="flex gap-4 sm:flex-col">
              {" "}
              <Input
                type="text"
                id="brand"
                name="brand"
                label="Thương hiệu"
                className="col-span-2 sm:col-span-1"
                value={brand}
                error={!!validationErrors.brand}
                errorMessage={validationErrors.brand}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  setBrand(value);
                }}
              />{" "}
              <Input
                type="select"
                id="category"
                name="category"
                label="Danh mục"
                options={categories}
                className="col-span-2 sm:col-span-1"
                value={category}
                error={!!validationErrors.category}
                errorMessage={validationErrors.category}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  setCategory(value);
                }}
                defaultValue={categories[0]?.value}
              />
            </div>
            <Input
              type="textarea"
              value={description}
              id="description"
              name="description"
              label="Mô tả sản phẩm"
              className="col-span-full"
              error={!!validationErrors.description}
              errorMessage={validationErrors.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>{" "}
          <div className="w-full flex-[4]">
            {validationErrors.imageCover && (
              <AssistiveText
                text={validationErrors.imageCover}
                icon={<FaInfoCircle />}
                error={true}
                className="mb-2"
              />
            )}
            <div className="relative mb-6 aspect-video h-72 w-full">
              <Image
                src={
                  imageCover
                    ? URL.createObjectURL(imageCover as File)
                    : "/no-image-placeholder.jpg"
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
                onClick={() => document.getElementById("imageCover")?.click()}
              >
                Thay đổi ảnh
              </Button>
              <p className="mt-2 text-xs text-grey-200">
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
  },
);

AddProductInfo.displayName = "ProductInfo";

export default AddProductInfo;
