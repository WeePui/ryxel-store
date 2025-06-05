import FormAddProduct from '@/app/_components/Admin/Products/FormAddProduct';
import { getCategories } from '@/app/_libs/apiServices';
import { cookies } from 'next/headers';
import React from 'react';
import ApiErrorDisplay from '@/app/_components/UI/ApiErrorDisplay';

export default async function Page() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt')?.value || '';

  const categoriesData = await getCategories({ value: token });

  if (categoriesData.status === 'error') {
    return <ApiErrorDisplay error={categoriesData} title="Categories Error" />;
  }

  const { categories } = categoriesData.data;

  return (
    <div className="p-6">
      <FormAddProduct categories={categories} />
    </div>
  );
}
