import { LineItem } from '@/app/_types/lineItem';
import OrderItem from '../Order/OrderItem';

interface OrderDetailsLineItemsProps {
  lineItems: LineItem[];
}

export default function OrderDetailsLineItems({
  lineItems,
}: OrderDetailsLineItemsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl">Sản phẩm</h2>
        <p className="text-sm text-gray-500 mt-2">
          Tổng số sản phẩm: {lineItems.length}
        </p>
      </div>
      <div className="flex items-center flex-col gap-4 mt-2 justify-center px-4 divide-y-2 divide-gray-100 py-4 bg-gray-100 rounded-t-lg">
        {lineItems.map((item) => (
          <OrderItem key={item.variant as string} item={item} />
        ))}
      </div>
    </div>
  );
}
