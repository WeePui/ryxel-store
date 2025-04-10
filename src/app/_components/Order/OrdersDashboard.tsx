'use client';

import React, { useState } from 'react';
import OrderStatusTabs from './OrderStatusTabs';
import { Order } from '@/app/_types/order';
import OrderList from './OrderList';

interface UserOrderDashboardProps {
  orders: Order[];
}

export default function UserOrderDashboard({
  orders,
}: UserOrderDashboardProps) {
  const [status, setStatus] = useState('all');

  const filterOrders =
    status === 'all'
      ? orders
      : orders.filter((order) => order.status === status);

  return (
    <div>
      <hr className="border-t-1 my-4 border-grey-100" />
      <OrderStatusTabs onChangeTab={setStatus} />
      <hr className="border-t-1 my-4 border-grey-100" />
      {filterOrders.length > 0 ? (
        <OrderList orders={filterOrders} />
      ) : (
        <div className="flex h-full items-center justify-center py-8 text-lg font-semibold text-grey-400">
          Không có đơn hàng nào trong danh sách của bạn.
        </div>
      )}
    </div>
  );
}
