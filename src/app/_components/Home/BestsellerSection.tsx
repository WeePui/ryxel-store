import { getBestsellers } from '@/app/_libs/apiServices';
import React from 'react';
import BestsellerList from './BestsellerList';

export default async function BestsellerSection() {
  const { data } = await getBestsellers();
  const bestsellers = data.products;

  return (
    <section className="flex w-full flex-col items-center justify-center py-10 max-w-7xl mx-auto px-4 mb-12 ">
      <p className="font-semibold self-start text-3xl font-title mb-10">
        Sản phẩm bán chạy
      </p>
      <BestsellerList products={bestsellers} />
    </section>
  );
}
