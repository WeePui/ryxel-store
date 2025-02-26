import { CartItem as CartItemType } from '@/app/_types/cart';
import CartItem from './CartItem';

interface CartItemsListProps {
  items: CartItemType[];
}

function CartItemsList({ items }: CartItemsListProps) {
  return (
    <ul className="flex flex-col divide-y divide-gray-200">
      {items.map((item) => (
        <li key={item.variant} className="py-8">
          <CartItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default CartItemsList;
