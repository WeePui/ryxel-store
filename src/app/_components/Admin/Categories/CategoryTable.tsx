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
import { Category } from '@/app/_types/category';
import Link from 'next/link';
import Button from '../../UI/Button';
import { useState } from 'react';
import Modal from '../../UI/Modal';
import AddCategoryForm from './AddCategoryForm';

interface CategoryOverviewProps {
  data: Array<
    Category & { revenue: number; changeRate: number; totalProducts?: number }
  >;
}

export default function CategoryTable({ data }: CategoryOverviewProps) {
  const [openModal, setOpenModal] = useState(false);

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
            <TableBodyRow key={category._id}>
              <TableBodyCell className="flex items-center gap-4 col-span-2">
                <div className="w-16 relative aspect-square">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="text-lg font-semibold">{category.name}</div>
              </TableBodyCell>
              <TableBodyCell
                className="items-center flex md:flex-col md:items-start"
                label="Slug"
              >
                {category.slug}
              </TableBodyCell>
              <TableBodyCell
                className="items-center flex md:flex-col md:items-start"
                label="Ngày tạo"
              >
                {category.createdAt}
              </TableBodyCell>
              <TableBodyCell
                className="items-center flex justify-center md:items-start md:justify-start sm:flex-col sm:items-start gap-2"
                label="Số lượng: "
              >
                {category.totalProducts ?? 0}
              </TableBodyCell>
              <TableBodyCell className="text-center flex items-center justify-center">
                <Link
                  href={`/admin/categories/${category.slug}`}
                  className="text-primary-400 hover:underline"
                >
                  Xem chi tiết
                </Link>
              </TableBodyCell>
            </TableBodyRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
