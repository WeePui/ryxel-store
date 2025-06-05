"use client";

import Card from "../../UI/Card";
import { Table, TableColumn } from "../../UI/Table";
import Image from "next/image";
import { Category } from "@/app/_types/category";
import Link from "next/link";
import Button from "../../UI/Button";
import { useState, useTransition } from "react";
import Modal from "../../UI/Modal";
import AddCategoryForm from "./AddCategoryForm";
import { FaTrash } from "react-icons/fa";
import { deleteCategoryAction } from "@/app/_libs/actions";
import { toast } from "react-toastify";
import TextConfirmDialogue from "../../UI/TextConfirmDialogue";

interface CategoryOverviewProps {
  data: Array<
    Category & { revenue: number; changeRate: number; totalProducts?: number }
  >;
}

export default function CategoryTable({ data }: CategoryOverviewProps) {
  const [openModal, setOpenModal] = useState(false);
  const [pending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDeleteCategory = async (categoryId: string) => {
    startTransition(async () => {
      const result = await deleteCategoryAction(categoryId);
      if (result.success) {
        toast.success("Xóa danh mục thành công!");
      } else {
        toast.error("Có lỗi xảy ra khi xóa danh mục.");
      }
    });
  };
  // Define columns for the enhanced Table component
  const columns: TableColumn<
    Category & { revenue: number; changeRate: number; totalProducts?: number }
  >[] = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="col-span-2 flex items-center gap-4">
          <div className="relative aspect-square w-16">
            <Image
              src={record.image || "/no-image-placeholder.jpg"}
              alt={record.name}
              fill
              className="rounded object-cover"
            />
          </div>
          <div className="text-lg font-semibold text-primary-default">
            {record.name}
          </div>
        </div>
      ),
      csvRender: (_, record) => record.name,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      csvRender: (value) => value as string,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => new Date(value as string).toLocaleDateString("vi-VN"),
      csvRender: (value) =>
        new Date(value as string).toLocaleDateString("vi-VN"),
    },
    {
      title: "Số lượng",
      dataIndex: "totalProducts",
      key: "totalProducts",
      render: (value) => <span>{(value as number) ?? 0}</span>,
      csvRender: (value) => ((value as number) ?? 0).toString(),
      align: "center",
    },
    {
      title: "Thao tác",
      key: "actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <Link
            href={`/admin/categories/${record.slug}`}
            className="text-primary-400 hover:underline"
          >
            Xem chi tiết
          </Link>
          <Button
            variant="danger"
            size="small"
            loading={pending}
            onClick={() => setConfirmDelete(record._id)}
            icon={<FaTrash />}
            iconOnly
          />
        </div>
      ),
      csvRender: () => "Xem chi tiết / Xóa",
      align: "center",
    },
  ];

  return (
    <Card
      title="Danh sách danh mục"
      titleAction={
        <Button size="small" onClick={() => setOpenModal(true)}>
          Thêm danh mục
        </Button>
      }
    >
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <AddCategoryForm />
        </Modal>
      )}
      <Table
        data={data}
        columns={columns}
        rowKey="_id"
        className="w-full font-semibold"
        exportFileName="danh-sach-danh-muc.csv"
      />
      {confirmDelete && (
        <Modal onClose={() => setConfirmDelete(null)}>
          <TextConfirmDialogue
            confirmText={
              data.find((cat) => cat._id === confirmDelete)?.slug || ""
            }
            onConfirm={() => {
              handleDeleteCategory(confirmDelete);
              setConfirmDelete(null);
            }}
            message="Nhập lại slug để xác nhận xóa danh mục này"
            errorText="Không chính xác"
          />
        </Modal>
      )}
    </Card>
  );
}
