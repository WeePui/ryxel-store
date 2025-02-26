import { FaBagShopping } from 'react-icons/fa6';
import CheckoutItemsList from './CheckoutItemsList';
import { Cart } from '@/app/_types/cart';

interface CheckoutItemsProps {
  cart: Cart;
}

function CheckoutItems({ cart }: CheckoutItemsProps) {
  return (
    <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-8 shadow-md">
      <h2 className="flex items-center text-xl font-bold">
        <FaBagShopping />
        <span className="ml-2">Sản phẩm</span>
      </h2>
      <CheckoutItemsList items={cart.products} />
    </div>
  );
}

export default CheckoutItems;
