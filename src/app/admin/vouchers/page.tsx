import VoucherFilter from '@/app/_components/Admin/Vouchers/VoucherFilter';
import VoucherTable from '@/app/_components/Admin/Vouchers/VoucherTable';
import { getDiscounts } from '@/app/_libs/apiServices';
import { cookies } from 'next/headers';
import React from 'react';
import ApiErrorDisplay from '@/app/_components/UI/ApiErrorDisplay';

export default async function Page() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt')?.value;

  if (!token) {
    throw new Error('Đăng nhập để tiếp tục');
  }

  const discountsData = await getDiscounts(token);

  if (discountsData.status === 'error') {
    return <ApiErrorDisplay error={discountsData} title="Vouchers Error" />;
  }

  const { discounts } = discountsData;

  return (
    <div className="grid grid-cols-[20fr_80fr] xl:grid-cols-[25fr_75fr] lg:grid-cols-1 gap-x-6 col-span-full p-6 gap-6">
      <div className="lg:hidden sticky top-4 max-h-[calc(100vh-2rem)] h-fit shadow-md rounded-xl overflow-auto scrollbar-hide">
        <VoucherFilter />
      </div>
      <VoucherTable data={discounts} />
    </div>
  );
}
