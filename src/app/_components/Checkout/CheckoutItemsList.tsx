import { CartItem } from '@/app/_types/cart';
import CheckoutItem from './CheckoutItem';

interface CheckoutItemsListProps {
  items: CartItem[];
}

function CheckoutItemsList({ items }: CheckoutItemsListProps) {
  return (
    <ul className="flex flex-col divide-y divide-gray-200">
      {items.map((item) => (
        <li key={item.variant} className="py-8">
          <CheckoutItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default CheckoutItemsList;
