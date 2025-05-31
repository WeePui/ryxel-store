"use client";

import Card from "@/app/_components/UI/Card";
import { Table, TableColumn } from "@/app/_components/UI/Table";
import { Order } from "@/app/_types/order";
import formatMoney from "@/app/_utils/formatMoney";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import Button from "@/app/_components/UI/Button";

interface OrderHistoryTableProps {
  orders: Order[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filter: string) => void;
  currentFilter: string;
  loading: boolean;
}

export default function OrderHistoryTable({
  orders,
  totalResults,
  currentPage,
  onPageChange,
  onFilterChange,
  currentFilter,
  loading,
}: OrderHistoryTableProps) {
  const router = useRouter();

  // Order history table columns
  const orderColumns: TableColumn<Order>[] = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
      render: (value: unknown) => (
        <span className="font-mono text-sm text-blue-600">
          {value as string}
        </span>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => new Date(value as string).toLocaleDateString("vi-VN"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        const statusMap: Record<string, { label: string; color: string }> = {
          pending: {
            label: "Chờ xác nhận",
            color: "bg-yellow-100 text-yellow-700",
          },
          processing: {
            label: "Đang xử lý",
            color: "bg-blue-100 text-blue-700",
          },
          shipped: {
            label: "Đang vận chuyển",
            color: "bg-purple-100 text-purple-700",
          },
          delivered: {
            label: "Đã giao hàng",
            color: "bg-green-100 text-green-700",
          },
          cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
        };
        const status = statusMap[value as string] || {
          label: value as string,
          color: "bg-gray-100 text-gray-700",
        };
        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${status.color}`}
          >
            {status.label}
          </span>
        );
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (value) => (
        <span className="font-semibold text-green-600">
          {formatMoney(value as number)}
        </span>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "orderCode",
      key: "actions",
      render: (value: unknown) => (
        <Button
          variant="ghost"
          size="small"
          icon={<FaEye />}
          onClick={() => router.push(`/admin/orders/${value as string}`)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const filterOptions = [
    { label: "Tất cả", value: "" },
    { label: "Chờ xác nhận", value: "pending" },
    { label: "Đang xử lý", value: "processing" },
    { label: "Đang vận chuyển", value: "shipped" },
    { label: "Đã giao hàng", value: "delivered" },
    { label: "Đã hủy", value: "cancelled" },
  ];

  return (
    <Card title="Lịch sử đơn hàng">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant="filter"
              size="small"
              active={currentFilter === option.value}
              onClick={() => onFilterChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
          </div>
        ) : orders.length > 0 ? (
          <Table
            data={orders}
            columns={orderColumns}
            rowKey="_id"
            pagination={{
              total: totalResults,
              current: currentPage,
              pageSize: 10,
              onChange: onPageChange,
              showSizeChanger: false, // Disable page size changer since it's handled server-side
              showQuickJumper: true,
              showTotal: (total: number, range: [number, number]) =>
                `${range[0]}-${range[1]} của ${total} đơn hàng`,
            }}
            className="w-full"
          />
        ) : (
          <div className="py-8 text-center text-gray-500">
            Không tìm thấy đơn hàng nào
          </div>
        )}
      </div>
    </Card>
  );
}
