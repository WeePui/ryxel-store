"use client";

import { Category } from "@/app/_types/category";
import React, { useActionState, useEffect, useState } from "react";
import Input from "../../UI/Input";
import Image from "next/image";
import Button from "../../UI/Button";
import { addCategoryAction, updateCategoryAction } from "@/app/_libs/actions";
import AssistiveText from "../../UI/AssistiveText";
import { FaInfo } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface AddCategoryFormProps {
  category?: Category;
}

const initialState = {
  success: undefined,
  input: {
    name: "",
    slug: "",
    description: "",
    image: null,
  },
  errors: {},
};

export default function AddCategoryForm({ category }: AddCategoryFormProps) {
  const [state, action, isPending] = useActionState(
    category ? updateCategoryAction : addCategoryAction,
    category
      ? { success: undefined, input: { ...category }, slug: category.slug }
      : initialState,
  );
  const [categoryImage, setCategoryImage] = useState<string | File | null>(
    state?.input.image || null,
  );
  const router = useRouter();

  useEffect(() => {
    toast.error(state?.errors?.message);
  }, [state?.errors?.message]);

  useEffect(() => {
    if (state.success) {
      toast.success("Cập nhật thành công.");

      if (state.slug && state.slug !== category?.slug) {
        router.replace(`/admin/categories/${state.slug}`);
      }
    }
  }, [state.success, state.slug, category?.slug, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
    }
  };

  return (
    <form className="mt-4 grid grid-cols-2 gap-6" action={action}>
      <input type="hidden" name="id" value={category?._id || ""} />
      <Input
        label="Tên danh mục"
        defaultValue={state?.input.name}
        id="name"
        disabled={isPending}
        name="name"
        type="text"
        error={!!state?.errors?.name}
        errorMessage={state?.errors?.name}
        className="sm:col-span-full"
      />
      <Input
        label="Slug"
        placeholder="Slug (không bắt buộc)"
        defaultValue={state?.input.slug}
        name="slug"
        id="slug"
        type="text"
        error={!!state?.errors?.slug}
        errorMessage={state?.errors?.slug}
        disabled={isPending}
        className="sm:col-span-full"
      />
      <Input
        label="Mô tả danh mục"
        defaultValue={state?.input.description}
        id="description"
        name="description"
        type="textarea"
        error={!!state?.errors?.description}
        errorMessage={state?.errors?.description}
        disabled={isPending}
        className="col-span-full"
      />
      {state?.errors?.image && (
        <AssistiveText
          text={state?.errors?.image}
          icon={<FaInfo />}
          error={!!state?.errors?.image}
        />
      )}
      <div className="col-span-2 flex items-center justify-center gap-6">
        <div className="relative aspect-video w-1/2">
          <Image
            src={
              typeof categoryImage === "string"
                ? categoryImage
                : categoryImage instanceof File
                  ? URL.createObjectURL(categoryImage)
                  : "/no-image-placeholder.jpg"
            }
            alt="Uploaded category image"
            fill
            className="rounded object-cover"
          />
        </div>

        <div className="text-center">
          <Button
            variant="secondary"
            className="h-fit w-fit self-center"
            size="small"
            onClick={() => document.getElementById("categoryImage")?.click()}
          >
            Thay đổi ảnh
          </Button>
          <p className="mt-2 text-xs text-grey-200">
            Định dạng: JPEG, JPG, PNG
          </p>
        </div>
      </div>
      <input
        type="file"
        className="hidden"
        name="image"
        id="categoryImage"
        onChange={handleImageChange}
      />
      <input type="hidden" name="_id" value={category?._id} />
      <div className="col-span-2 flex items-center justify-end gap-4">
        <Button loading={isPending} role="submit" fullWidth>
          {category ? "Cập nhật" : "Thêm mới"}
        </Button>
      </div>
    </form>
  );
}
