"use client";

import Card from "../../UI/Card";
import {
  Table,
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
} from "../../UI/Table";
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
      <Table className="w-full font-semibold">
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell className="col-span-2">
              Tên danh mục
            </TableHeaderCell>
            <TableHeaderCell>Slug</TableHeaderCell>
            <TableHeaderCell>Ngày tạo</TableHeaderCell>
            <TableHeaderCell className="text-center">Số lượng</TableHeaderCell>
            <TableHeaderCell className="text-center">Thao tác</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.map((category) => (
            <TableRow
              key={category._id}
              category={category}
              pending={pending}
              onDelete={handleDeleteCategory}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

interface TableRowProps {
  category: Category & {
    revenue: number;
    changeRate: number;
    totalProducts?: number;
  };
  pending: boolean;
  onDelete: (categoryId: string) => void;
}

function TableRow({ category, pending, onDelete }: TableRowProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      {confirmDelete && (
        <Modal onClose={() => setConfirmDelete(false)}>
          <TextConfirmDialogue
            confirmText={category.slug}
            onConfirm={() => onDelete(category._id)}
            message="Nhập lại slug để xác nhận xóa danh mục này"
            errorText="Không chính xác"
          />
        </Modal>
      )}
      <TableBodyRow key={category._id}>
        <TableBodyCell className="col-span-2 flex items-center gap-4">
          <div className="relative aspect-square w-16">
            <Image
              src={category.image || "/no-image-placeholder.jpg"}
              alt={category.name}
              fill
              className="rounded object-cover"
            />
          </div>
          <div className="text-lg font-semibold text-primary-default">
            {category.name}
          </div>
        </TableBodyCell>
        <TableBodyCell
          className="flex items-center md:flex-col md:items-start"
          label="Slug"
        >
          {category.slug}
        </TableBodyCell>
        <TableBodyCell
          className="flex items-center md:flex-col md:items-start"
          label="Ngày tạo"
        >
          {new Date(category.createdAt).toLocaleDateString("vi-VN")}
        </TableBodyCell>
        <TableBodyCell
          className="flex items-center justify-center gap-2 md:items-start md:justify-start sm:flex-col sm:items-start"
          label="Số lượng: "
        >
          {category.totalProducts ?? 0}
        </TableBodyCell>
        <TableBodyCell className="flex flex-col items-center justify-center gap-2 text-center">
          <Link
            href={`/admin/categories/${category.slug}`}
            className="text-primary-400 hover:underline"
          >
            Xem chi tiết
          </Link>
          <Button
            variant="danger"
            size="small"
            loading={pending}
            onClick={() => setConfirmDelete(true)}
            icon={<FaTrash />}
            iconOnly
          />
        </TableBodyCell>
      </TableBodyRow>
    </>
  );
}
