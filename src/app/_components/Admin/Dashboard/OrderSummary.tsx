'use client';

import Card from '../../UI/Card';
import NavLink from '../../UI/NavLink';
import { Order } from '@/app/_types/order';
import OrderTable from '../Orders/OrderTable';

// const data = [
//   {
//     _id: 1,
//     name: 'Order 1',
//     paymentMethod: 'Stripe',
//     status: 'pending',
//     orderCode: 'ORD001',
//     total: 100000,
//     updatedAt: '2023-10-01',
//     lineItems: [
//       {
//         imageCover: '/anya-so-cute.jpg',
//       },
//     ],
//   },
//   {
//     _id: 2,
//     orderCode: 'ORD002',
//     name: 'Order 2',
//     paymentMethod: 'ZaloPay',
//     status: 'shipped',
//     total: 200000,
//     updatedAt: '2023-10-02',
//     lineItems: [
//       {
//         imageCover: '/anya-so-cute.jpg',
//       },
//     ],
//   },
//   {
//     _id: 3,
//     orderCode: 'ORD003',
//     name: 'Order 3',
//     paymentMethod: 'COD',
//     status: 'delivered',
//     total: 1234567,
//     updatedAt: '2023-10-03',
//     lineItems: [
//       {
//         imageCover: '/anya-so-cute.jpg',
//       },
//     ],
//   },
// ];

interface OrderSummaryProps {
  data: Order[];
}

export default function OrderSummary({ data }: OrderSummaryProps) {
  return (
    <Card
      title="Tổng quan đơn hàng"
      className="flex flex-col gap-6 flex-grow pb-10"
      titleAction={<NavLink href="/admin/orders">Xem tất cả</NavLink>}
    >
      <OrderTable data={data} />
    </Card>
  );
}
