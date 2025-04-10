import { cookies } from 'next/headers';
import { getAddresses, getCart, getOrderById } from '../_libs/apiServices';
import { Metadata } from 'next';
import CheckoutPage from '../_components/Checkout/CheckoutPage';
import { LineItem } from '../_types/lineItem';

export const metadata: Metadata = {
  title: 'Đặt hàng',
  description: 'Đặt hàng',
};

async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    orderId: string;
    buyAgain: string;
    processPayment: string;
  }>;
}) {
  const { orderId, buyAgain, processPayment } = await searchParams;
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return null;
  }

  const { data: addressData } = await getAddresses(token);
  const { addresses } = addressData;

  let items: LineItem[] = [];
  let subtotal = 0;

  if (!orderId) {
    const { data: cartData } = await getCart(token);
    const { cart } = cartData;

    items = cart.lineItems;
    subtotal = cart.subtotal;
  } else {
    if (
      (buyAgain && buyAgain === '1') ||
      (processPayment && processPayment === '1')
    ) {
      const { data: orderData } = await getOrderById(orderId, token);
      const { order } = orderData;
      items = order.lineItems;
      subtotal = order.subtotal;
    }
  }

  return (
    <CheckoutPage addresses={addresses} lineItems={items} subtotal={subtotal} />
  );
}

export default Page;
