import { Order } from '@/app/_types/order';
import React from 'react';
import OrderCard from './OrderCard';

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  return (
    <div className="flex flex-col gap-8">
      {orders.map((order: Order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
