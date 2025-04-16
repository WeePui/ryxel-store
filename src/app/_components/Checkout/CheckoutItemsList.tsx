import CheckoutItem from './CheckoutItem';
import { LineItem } from '@/app/_types/lineItem';

interface CheckoutItemsListProps {
  items: LineItem[];
  isExpanded?: boolean;
}

function CheckoutItemsList({ items, isExpanded }: CheckoutItemsListProps) {
  if (items.length > 3) {
    return (
      <ul
        className={`flex flex-col divide-y divide-gray-200 transition-all duration-300`}
      >
        {isExpanded
          ? items.map((item) => (
              <li key={item.variant as string} className="py-8">
                <CheckoutItem item={item} />
              </li>
            ))
          : items.slice(0, 3).map((item) => (
              <li key={item.variant as string} className="py-8">
                <CheckoutItem item={item} />
              </li>
            ))}
      </ul>
    );
  } else {
    return (
      <ul className="flex flex-col divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.variant as string} className="py-8">
            <CheckoutItem item={item} />
          </li>
        ))}
      </ul>
    );
  }
}

export default CheckoutItemsList;
