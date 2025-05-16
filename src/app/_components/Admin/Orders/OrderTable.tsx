'use client';

import { Order } from '@/app/_types/order';
import {
  Table,
  TableHeader,
  TableHeaderRow,
  TableBodyCell,
  TableBody,
  TableBodyRow,
  TableHeaderCell,
} from '../../UI/Table';
import { mappingPaymentMethodShortText } from '@/app/_utils/mappingPaymentMethodText';
import Image from 'next/image';
import { mappingOrderStatus } from '@/app/_utils/mappingOrderStatus';
import formatMoney from '@/app/_utils/formatMoney';
import Button from '../../UI/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/app/_types/product';
import Pagination from '../../UI/Pagination';
import { useEffect, useState } from 'react';

interface OrderTableProps {
  data: Order[];
  totalResults?: number;
  resultsPerPage?: number;
}

export default function OrderTable({
  data,
  totalResults = 0,
  resultsPerPage = 10,
}: OrderTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = Number(params.get('page')) || 1;

    setCurrentPage(page);
  }, [searchParams, data]);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page + '');

    router.replace(`${pathname}?${params.toString()}`);
    setCurrentPage(page);
  };

  return (
    <>
      {data && data.length > 0 ? (
        <div className="flex flex-col">
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
                <TableHeaderCell className="col-span-1">
                  Cập nhật
                </TableHeaderCell>
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
                          backgroundColor: mappingOrderStatus(order.status)
                            .color,
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
          <div className="flex justify-center mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handleChangePage}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-96 text-gray-500">
          <p className="text-lg">Không có đơn hàng nào</p>
        </div>
      )}
    </>
  );
}
