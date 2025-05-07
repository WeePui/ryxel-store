import AddAddress from '@/app/_components/Address/AddAddress';
import AddressesList from '@/app/_components/Address/AddressesList';
import Spinner from '@/app/_components/UI/Spinner';
import { Suspense } from 'react';

function Page() {
  return (
    <div className="flex h-full flex-col bg-white px-8 py-6">
      <div className="flex items-center justify-between sm:flex-col sm:gap-2 sm:items-start">
        <h1 className="text-xl font-bold">Địa chỉ giao hàng</h1>
        <AddAddress />
      </div>
      <hr className="border-t-1 my-4 border-grey-100" />
      <h2 className="text-lg font-semibold">Địa chỉ</h2>
      <Suspense fallback={<Spinner />}>
        <AddressesList />
      </Suspense>
    </div>
  );
}

export default Page;
