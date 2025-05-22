import TopCustomers from '@/app/_components/Admin/Dashboard/TopCustomers';
import TopCustomersByProvince from '@/app/_components/Admin/Users/TopCustomersByProvince';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt')?.value;

  if (!token) {
    throw new Error('Đăng nhập để tiếp tục');
  }

  return (
    <div className="grid grid-cols-4 xl:grid-cols-2 md:grid-cols-1 p-6 gap-6">
      <div className="col-span-1">
        <TopCustomersByProvince cookies={token} />
      </div>
      <div className="col-span-1">
        <TopCustomers cookies={token} />
      </div>
    </div>
  );
}
