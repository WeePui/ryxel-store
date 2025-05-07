'use client';

import Card from '../../UI/Card';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
} from '../../UI/Table';
import Image from 'next/image';
import formatMoney from '@/app/_utils/formatMoney';
import Button from '../../UI/Button';
import { mappingOrderStatus } from '@/app/_utils/mappingOrderStatus';
import NavLink from '../../UI/NavLink';
import { Order } from '@/app/_types/order';
import { Product } from '@/app/_types/product';
import { mappingPaymentMethodShortText } from '@/app/_utils/mappingPaymentMethodText';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  return (
    <Card
      title="Tổng quan đơn hàng"
      className="flex flex-col gap-6 flex-grow pb-10"
      titleAction={<NavLink href="/admin/orders">Xem tất cả</NavLink>}
    >
      {data && data.length > 0 ? (
        <Table className="w-full">
          <TableHeader className="w-full">
            <TableHeaderRow className="grid-cols-7">
              <TableHeaderCell className="col-span-2">
                Tên đơn hàng
              </TableHeaderCell>
              <TableHeaderCell className="col-span-1">
                Phương thức thanh toán
              </TableHeaderCell>
              <TableHeaderCell className="col-span-1 text-center">
                Trạng thái
              </TableHeaderCell>
              <TableHeaderCell className="col-span-1">
                Tổng tiền
              </TableHeaderCell>
              <TableHeaderCell className="col-span-1">Cập nhật</TableHeaderCell>
              <TableHeaderCell className="col-span-1 flex items-center justify-center">
                Thao tác
              </TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {data.map((order) => (
              <TableBodyRow
                key={order._id}
                className="hover:bg-gray-100 grid-cols-7"
              >
                <TableBodyCell className="col-span-2 flex items-center gap-2 md:col-span-1 md:gap-4">
                  <div className="w-16 h-16 rounded relative aspect-square overflow-hidden">
                    <Image
                      src={(order.lineItems[0].product as Product).imageCover}
                      alt={order.orderCode}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <span className="font-bold">{order.orderCode}</span>
                </TableBodyCell>
                <TableBodyCell
                  className="col-span-1 flex items-center justify-between"
                  label="Phương thức thanh toán"
                >
                  {mappingPaymentMethodShortText[order.paymentMethod]}
                </TableBodyCell>
                <TableBodyCell
                  className="col-span-1 flex items-center justify-center md:justify-between"
                  label="Trạng thái"
                >
                  {
                    <div
                      className={
                        'flex items-center justify-center w-24 rounded-full text-white font-semibold p-1 text-xs'
                      }
                      style={{
                        backgroundColor: mappingOrderStatus(order.status).color,
                      }}
                    >
                      <span className="whitespace-nowrap">
                        {mappingOrderStatus(order.status).text}
                      </span>
                    </div>
                  }
                </TableBodyCell>
                <TableBodyCell
                  className="col-span-1 flex items-center justify-between"
                  label="Tổng tiền"
                >
                  {formatMoney(order.total)}
                </TableBodyCell>
                <TableBodyCell
                  className="col-span-1 flex items-center justify-between"
                  label="Cập nhật"
                >
                  {new Date(order.updatedAt).toLocaleDateString('vi-VN')}
                </TableBodyCell>
                <TableBodyCell className="col-span-1 flex items-center justify-center">
                  <Button
                    size="small"
                    onClick={() =>
                      router.push('/admin/orders/' + order.orderCode)
                    }
                  >
                    Xem chi tiết
                  </Button>
                </TableBodyCell>
              </TableBodyRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex items-center justify-center w-full h-96 text-gray-500">
          <p className="text-lg">Không có đơn hàng nào</p>
        </div>
      )}
    </Card>
  );
}
