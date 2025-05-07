import UserOrderDashboard from '@/app/_components/Order/OrdersDashboard';
import OrderSearchBar from '@/app/_components/Order/OrderSearchBar';
import { getOrders } from '@/app/_libs/apiServices';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

const description = 'Quản lí thông tin đơn hàng của bạn.';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Đơn hàng',
  description,
};

interface PageProps {
  searchParams: Promise<{
    search: string;
  }>;
}

export default async function page({ searchParams }: PageProps) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');
  let { search } = await searchParams;
  if (!search) search = '';

  const { data } = await getOrders(token!, search);
  const { orders } = data;

  return (
    <div className="flex h-full flex-col bg-white px-8 sm:px-2 py-6">
      <div className="flex items-center justify-between sm:flex-col sm:gap-4 sm:items-start">
        <div>
          <h1 className="text-xl font-bold">Đơn hàng</h1>
          <p className="text-sm text-grey-400">{description}</p>
        </div>
        <OrderSearchBar />
      </div>
      <UserOrderDashboard orders={orders} />
    </div>
  );
}
