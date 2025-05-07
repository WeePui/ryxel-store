import { cookies } from 'next/headers';
import {
  getAddresses,
  getCart,
  getOrderByOrderCode,
} from '../../_libs/apiServices';
import { Metadata } from 'next';
import CheckoutPage from '../../_components/Checkout/CheckoutPage';
import { LineItem } from '../../_types/lineItem';
import { Product } from '../../_types/product';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Đặt hàng',
  description: 'Đặt hàng',
};

async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    orderCode: string;
    buyAgain: string;
    processPayment: string;
    fromCart: string;
  }>;
}) {
  const { orderCode, buyAgain, processPayment, fromCart } = await searchParams;
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return null;
  }

  const { data: addressData } = await getAddresses(token);
  const { addresses } = addressData;

  let items: LineItem[] = [];
  let subtotal = 0;

  if (!orderCode) {
    const { data: cartData } = await getCart(token);
    const { cart } = cartData;

    items = cart.lineItems;
    subtotal = cart.subtotal;

    if (fromCart && fromCart === '1') {
      console.log('fromCart', fromCart);

      const cookiesStore = await cookies();
      const selectedCartItems = cookiesStore.get('selectedCartItems');

      if (selectedCartItems) {
        const selectedItems = JSON.parse(selectedCartItems.value);
        items = items.filter((item) =>
          selectedItems.some(
            (selectedItem: { product: string; variant: string }) =>
              (item.product as Product)._id === selectedItem.product &&
              item.variant === selectedItem.variant
          )
        );
        subtotal = items.reduce((acc, item) => {
          const price = (item.product as Product).variants.find(
            (variant) => variant._id === item.variant
          )?.price;
          return acc + (price || 0) * item.quantity;
        }, 0);
      }
    }
  } else {
    if (
      (buyAgain && buyAgain === '1') ||
      (processPayment && processPayment === '1')
    ) {
      const { data: orderData } = await getOrderByOrderCode(orderCode, token);
      const { order } = orderData;
      items = order.lineItems;
      subtotal = order.subtotal;
    }
  }

  if (items.length === 0) {
    redirect('/cart');
  }

  return (
    <CheckoutPage addresses={addresses} lineItems={items} subtotal={subtotal} />
  );
}

export default Page;
