"use client";

import { Table, TableColumn } from "../../UI/Table";
import Button from "../../UI/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import SearchBar from "../../Header/SearchBar";
import Modal from "../../UI/Modal";
import AddVoucherForm from "./AddVoucherForm";

// Cập nhật interface để khớp với mô hình database
interface Discount {
  _id: string;
  code: string;
  name: string;
  startDate: string;
  endDate: string;
  maxUse: number;
  minOrderValue: number;
  discountPercentage: number;
  discountMaxValue: number;
  maxUsePerUser: number;
  usedUser: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface VoucherTableProps {
  data: Discount[];
  totalResults?: number;
  resultsPerPage?: number;
}

export default function VoucherTable({
  data,
  totalResults = 0,
  resultsPerPage = 10,
}: VoucherTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<Discount | null>(null);
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

  // Cập nhật cách tính số lượt còn lại
  const getRemainingUses = (voucher: Discount) => {
    return voucher.maxUse - (voucher.usedUser?.length || 0);
  };

  const getStatusBadge = (voucher: Discount) => {
    const now = new Date();
    const startDate = new Date(voucher.startDate);
    const endDate = new Date(voucher.endDate);
    const remainingUses = getRemainingUses(voucher);

    if (!voucher.isActive) {
      return { text: "Không kích hoạt", color: "#6B7280" }; // gray
    } else if (now < startDate) {
      return { text: "Chưa bắt đầu", color: "#3B82F6" }; // blue
    } else if (now > endDate) {
      return { text: "Hết hạn", color: "#EF4444" }; // red
    } else if (remainingUses <= 0) {
      return { text: "Hết lượt", color: "#F59E0B" }; // amber
    } else {
      return { text: "Đang hoạt động", color: "#10B981" }; // green
    }
  };

  // Cập nhật cách định dạng giá trị giảm giá
  const formatDiscountValue = (voucher: Discount) => {
    // Server always uses percentage model
    return `${voucher.discountPercentage}%`;
  };
  // Define columns for the enhanced Table
  const columns: TableColumn<Discount>[] = [
    {
      title: "Mã voucher",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá trị",
      dataIndex: "discountPercentage",
      key: "discountValue",
      render: (_, record) => formatDiscountValue(record),
      csvRender: (_, record) => formatDiscountValue(record),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        const status = getStatusBadge(record);
        return (
          <div
            className="flex w-fit items-center justify-center rounded-full p-1 px-2 text-xs font-semibold text-white"
            style={{ backgroundColor: status.color }}
          >
            <span className="whitespace-nowrap">{status.text}</span>
          </div>
        );
      },
      csvRender: (_, record) => getStatusBadge(record).text,
    },
    {
      title: "Lượt còn",
      dataIndex: "remainingUses",
      key: "remainingUses",
      render: (_, record) => getRemainingUses(record),
      csvRender: (_, record) => getRemainingUses(record).toString(),
    },
    {
      title: "Thời hạn",
      dataIndex: "endDate",
      key: "endDate",
      render: (value) => new Date(value as string).toLocaleDateString("vi-VN"),
      csvRender: (value) =>
        new Date(value as string).toLocaleDateString("vi-VN"),
    },
    {
      title: "Thao tác",
      key: "actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="flex w-full items-center justify-center gap-2">
          <Button size="small" onClick={() => setEditingVoucher(record)}>
            Sửa
          </Button>
        </div>
      ),
      csvRender: () => "Sửa",
      align: "center",
    },
  ];

  return (
    <Card
      className="w-full"
      title="Danh sách mã giảm giá"
      titleAction={
        <div className="flex items-center gap-2 justify-self-end">
          <Button size="small" onClick={() => setOpenModal(true)}>
            Thêm mã giảm giá
          </Button>
          <SearchBar />
        </div>
      }
    >
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <AddVoucherForm />
        </Modal>
      )}
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
                `${range[0]}-${range[1]} của ${total} mã giảm giá`,
            }}
            className="w-full"
            exportFileName="danh-sach-ma-giam-gia.csv"
          />
        </div>
      ) : (
        <div className="flex h-96 w-full items-center justify-center text-gray-500">
          <p className="text-lg">Không có mã giảm giá nào</p>
        </div>
      )}
      {editingVoucher && (
        <Modal
          onClose={() => setEditingVoucher(null)}
          closeOnOutsideClick={false}
        >
          <AddVoucherForm discount={editingVoucher} />
        </Modal>
      )}
    </Card>
  );
}
