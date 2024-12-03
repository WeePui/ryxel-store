import AddAddress from '@/app/_components/Address/AddAddress';
import AddressesList from '@/app/_components/Address/AddressesList';
import Spinner from '@/app/_components/UI/Spinner';
import { Suspense } from 'react';

function Page() {
  return (
    <div className="flex h-full flex-col bg-white px-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">My shipping address</h1>
        <AddAddress />
      </div>
      <hr className="border-t-1 my-4 border-grey-100" />
      <h2 className="text-lg font-semibold">Addresses</h2>
      <Suspense fallback={<Spinner />}>
        <AddressesList />
      </Suspense>
    </div>
  );
}

export default Page;
