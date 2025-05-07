import FormAddProduct from '@/app/_components/Admin/Products/FormAddProduct';
import { getCategories } from '@/app/_libs/apiServices';
import { cookies } from 'next/headers';
import React from 'react';

export default async function Page() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt')?.value || '';

  const { categories } = await getCategories({ value: token });

  return (
    <div className="p-6">
      <FormAddProduct categories={categories} />
    </div>
  );
}
