"use client";

import { Order } from "@/app/_types/order";
import { mappingPaymentMethodShortText } from "@/app/_utils/mappingPaymentMethodText";
import Image from "next/image";
import { mappingOrderStatus } from "@/app/_utils/mappingOrderStatus";
import formatMoney from "@/app/_utils/formatMoney";
import Button from "../../UI/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/app/_types/product";
import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import SearchBar from "../../Header/SearchBar";
import { Table, TableColumn } from "../../UI/Table";

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

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = Number(params.get("page")) || 1;

    setCurrentPage(page);
  }, [searchParams, data]);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page + "");

    router.replace(`${pathname}?${params.toString()}`);
    setCurrentPage(page);
  };
  // Define the columns for the EnhancedTable
  const columns: TableColumn<Order>[] = [
    {
      title: "Tên đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
      render: (_, order) => (
        <div className="flex items-center gap-2">
          <div className="relative aspect-square h-16 w-16 overflow-hidden rounded">
            <Image
              src={(order.lineItems[0].product as Product).imageCover}
              alt={order.orderCode}
              fill
              className="rounded object-cover"
            />
          </div>
          <span className="font-bold">{order.orderCode}</span>
        </div>
      ),
      csvRender: (_, order) => order.orderCode,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod) =>
        mappingPaymentMethodShortText[paymentMethod as string],
      csvRender: (paymentMethod) =>
        mappingPaymentMethodShortText[paymentMethod as string],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div className="flex w-full items-center justify-center">
          <div
            className="flex w-24 items-center justify-center rounded-full p-1 text-xs font-semibold text-white"
            style={{
              backgroundColor: mappingOrderStatus(status as string).color,
            }}
          >
            <span className="whitespace-nowrap">
              {mappingOrderStatus(status as string).text}
            </span>
          </div>
        </div>
      ),
      csvRender: (status) => mappingOrderStatus(status as string).text,
      align: "center",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => formatMoney(total as number),
      csvRender: (total) => formatMoney(total as number),
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) =>
        new Date(updatedAt as string).toLocaleDateString("vi-VN"),
      csvRender: (updatedAt) =>
        new Date(updatedAt as string).toLocaleDateString("vi-VN"),
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    },
    {
      title: "Thao tác",
      dataIndex: "orderCode",
      key: "actions",
      render: (orderCode) => (
        <Button
          size="small"
          onClick={() => router.push("/admin/orders/" + orderCode)}
        >
          Xem chi tiết
        </Button>
      ),
      csvRender: () => "Xem chi tiết",
      align: "center",
    },
  ];

  return (
    <Card
      className="w-full"
      title="Danh sách đơn hàng"
      titleAction={
        <div className="justify-self-end">
          <SearchBar />
        </div>
      }
    >
      {data && data.length > 0 ? (
        <div className="flex flex-col">
          <Table
            data={data}
            columns={columns}
            rowKey="_id"
            pagination={{
              total: totalResults,
              current: currentPage,
              pageSize: resultsPerPage,
              onChange: handleChangePage,
              showSizeChanger: false, // Disable page size changer since it's handled server-side
              showQuickJumper: true,
              showTotal: (total: number, range: [number, number]) =>
                `${range[0]}-${range[1]} của ${total} đơn hàng`,
            }}
            exportFileName="danh-sach-don-hang.csv"
            scroll={{ x: "max-content" }}
          />
        </div>
      ) : (
        <div className="flex h-96 w-full items-center justify-center text-gray-500">
          <p className="text-lg">Không có đơn hàng nào</p>
        </div>
      )}
    </Card>
  );
}
