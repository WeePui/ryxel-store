'use client';

import OrderItem from './OrderItem';
import { Order } from '@/app/_types/order';
import { mappingOrderStatus } from '@/app/_utils/mappingOrderStatus';
import OrderDetailsCTA from '../OrderDetails/OrderDetailsCTA';
import formatCurrency from '@/app/_utils/formatCurrency';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const orderStatus = mappingOrderStatus(order.status);

  return (
    <div className="border-2 flex flex-col divide-y-2 divide-gray-100 gap-2 rounded-lg">
      <div className="flex items-center px-5 pt-4">
        <div className={`flex items-center gap-2`}>
          <span className={`${orderStatus.textColor}`}>{orderStatus.icon}</span>
          <span className={`${orderStatus.textColor} `}>
            {orderStatus.text}
          </span>
          <span className="text-sm text-gray-400">
            {new Date(order.updatedAt).toLocaleString('vi-VN')}
          </span>
        </div>
      </div>
      <div className="flex items-center flex-col gap-4 mt-2 justify-center px-4 divide-y-2 divide-gray-100 py-4">
        {order.lineItems.map((item) => (
          <OrderItem key={item.variant as string} item={item} />
        ))}
      </div>
      <div className="flex items-end flex-col bg-primary-50 px-4 pt-2 pb-8">
        <p className="text-right text-sm text-grey-300 my-4">
          Tổng tiền:{' '}
          <span className="text-xl font-bold text-primary-default">
            {formatCurrency(order.total)}
          </span>
        </p>
        <OrderDetailsCTA order={order} />
      </div>
    </div>
  );
}
