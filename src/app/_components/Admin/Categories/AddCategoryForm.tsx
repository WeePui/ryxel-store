'use client';

import { Category } from '@/app/_types/category';
import React, { useActionState, useEffect, useState } from 'react';
import Input from '../../UI/Input';
import Image from 'next/image';
import Button from '../../UI/Button';
import { addCategoryAction, updateCategoryAction } from '@/app/_libs/actions';
import AssistiveText from '../../UI/AssistiveText';
import { FaInfo } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Spinner from '../../UI/Spinner';
import { useRouter } from 'next/navigation';

interface AddCategoryFormProps {
  category?: Category;
}

const initialState = {
  success: undefined,
  input: {
    name: '',
    slug: '',
    description: '',
    image: null,
  },
};

export default function AddCategoryForm({ category }: AddCategoryFormProps) {
  const [state, action, isPending] = useActionState(
    category ? updateCategoryAction : addCategoryAction,
    category
      ? { success: undefined, input: { ...category }, slug: category.slug }
      : initialState
  );
  const [categoryImage, setCategoryImage] = useState<string | File | null>(
    state?.input.image || null
  );
  const router = useRouter();

  useEffect(() => {
    toast.error(state?.errors?.message);
  }, [state?.errors?.message]);

  useEffect(() => {
    if (state.success) {
      toast.success('Cập nhật thành công.');

      if (state.slug && state.slug !== category?.slug) {
        router.replace(`/admin/categories/${state.slug}`);
      }
    }
  }, [state.success, state.slug]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
    }
  };

  return (
    <form className="grid grid-cols-2 gap-6 mt-4" action={action}>
      <input type="hidden" name="id" value={category?._id || ''} />
      <div className="col-span-1 md:col-span-full">
        {state?.errors?.name && (
          <AssistiveText
            text={state?.errors?.name}
            icon={<FaInfo />}
            error={!!state?.errors?.name}
          />
        )}
        <Input
          label="Tên danh mục"
          defaultValue={state?.input.name}
          id="name"
          disabled={isPending}
          name="name"
          type="text"
          error={!!state?.errors?.name}
        />
      </div>
      <div className="col-span-1 md:col-span-full">
        {state?.errors?.slug && (
          <AssistiveText
            text={state?.errors?.slug}
            icon={<FaInfo />}
            error={!!state?.errors?.slug}
          />
        )}
        <Input
          label="Slug (không bắt buộc)"
          defaultValue={state?.input.slug}
          name="slug"
          id="slug"
          type="text"
          error={!!state?.errors?.slug}
          disabled={isPending}
        />
      </div>
      <div className="col-start-1 col-span-2">
        {state?.errors?.description && (
          <AssistiveText
            text={state?.errors?.description}
            icon={<FaInfo />}
            error={!!state?.errors?.description}
          />
        )}
        <Input
          label="Mô tả danh mục"
          defaultValue={state?.input.description}
          id="description"
          name="description"
          type="textarea"
          error={!!state?.errors?.description}
          disabled={isPending}
        />
      </div>
      {state?.errors?.image && (
        <AssistiveText
          text={state?.errors?.image}
          icon={<FaInfo />}
          error={!!state?.errors?.image}
        />
      )}
      <div className="col-span-2 flex items-center gap-6 justify-center">
        <div className="relative aspect-video w-1/2">
          <Image
            src={
              typeof categoryImage === 'string'
                ? categoryImage
                : categoryImage instanceof File
                ? URL.createObjectURL(categoryImage)
                : '/no-image-placeholder.jpg'
            }
            alt="Uploaded category image"
            fill
            className="object-cover rounded"
          />
        </div>

        <div className="text-center">
          <Button
            type="secondary"
            className="h-fit w-fit self-center"
            size="small"
            onClick={() => document.getElementById('categoryImage')?.click()}
          >
            Thay đổi ảnh
          </Button>
          <p className="text-xs text-grey-200 mt-2">
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
      <div className="flex items-center justify-end gap-4 col-span-2">
        <Button disabled={isPending} role="submit">
          {isPending ? <Spinner /> : category ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </div>
    </form>
  );
}
