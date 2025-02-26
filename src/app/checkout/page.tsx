import { cookies } from 'next/headers';
import SelectAddress from '../_components/Checkout/SelectAddress';
import { getAddresses, getCart } from '../_libs/apiServices';
import CheckoutItems from '../_components/Checkout/CheckoutItems';
import CheckoutSummary from '../_components/Checkout/CheckoutSummary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đặt hàng',
  description: 'Đặt hàng',
};

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ code: string }>;
}) {
  const { code } = await searchParams;
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return null;
  }

  const { data: addressData } = await getAddresses(token);
  const { data: cartData } = await getCart(token);
  const { cart } = cartData;
  const { addresses } = addressData;

  return (
    <div className="mx-auto mt-14 grid w-full max-w-7xl grid-cols-[70fr_30fr] gap-10">
      <h1 className="col-span-full self-start font-title text-3xl font-semibold text-primary-500">
        Đặt hàng
      </h1>
      <SelectAddress addresses={addresses} />
      <CheckoutItems cart={cart} />
      <div className="col-start-2 row-span-3 row-start-2">
        <CheckoutSummary subtotal={cart.subtotal} code={code || ''} />
      </div>
    </div>
  );
}

export default Page;
