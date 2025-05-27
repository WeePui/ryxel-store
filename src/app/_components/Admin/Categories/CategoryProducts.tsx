"use client";

import Card from "../../UI/Card";
import Button from "../../UI/Button";
import { Table, TableColumn } from "../../UI/Table";
import Image from "next/image";
import NavLink from "../../UI/NavLink";
import { mappingStock } from "@/app/_utils/mappingStock";
import { getTintedColor } from "@/app/_helpers/getTintedColor";
import { Product } from "@/app/_types/product";
import formatMoney from "@/app/_utils/formatMoney";

// const data = [
//   {
//     _id: '1',
//     name: 'Product 1',
//     lowestPrice: 384728434,
//     updatedAt: '2023-1-1',
//     stock: 39848,
//     sold: 983498,
//     imageCover: '/anya-so-cute.jpg',
//   },
// ];

interface CategoryProductsProps {
  products: Product[];
}

export default function CategoryProducts({ products }: CategoryProductsProps) {
  // Define columns for the enhanced Table component
  const columns: TableColumn<Product>[] = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <div className="relative aspect-square w-16">
            <Image
              src={record.imageCover}
              alt={record.name}
              fill
              className="rounded object-cover"
            />
          </div>
          <p className="text-primary-500">{record.name}</p>
        </div>
      ),
      csvRender: (_, record) => record.name,
    },
    {
      title: "Giá tiền",
      dataIndex: "lowestPrice",
      key: "price",
      render: (value) => formatMoney(value as number),
      csvRender: (value) => (value as number).toLocaleString("vi-VN") + " VND",
    },
    {
      title: "Cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => new Date(value as string).toLocaleDateString("vi-VN"),
      csvRender: (value) =>
        new Date(value as string).toLocaleDateString("vi-VN"),
    },
    {
      title: "Tồn kho",
      dataIndex: "totalStock",
      key: "stock",
      render: (value) => (
        <div className="flex w-full items-center justify-center">
          <div
            className="w-fit rounded-full px-2 py-1 text-xs"
            style={{
              backgroundColor: getTintedColor(
                mappingStock(value as number).color,
              ),
            }}
          >
            <span style={{ color: mappingStock(value as number).color }}>
              {mappingStock(value as number).text}
            </span>
          </div>
        </div>
      ),
      csvRender: (value) => mappingStock(value as number).text,
      align: "center",
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      csvRender: (value) => (value as number).toString(),
    },
    {
      title: "Thao tác",
      dataIndex: "slug",
      key: "actions",
      render: (value) => (
        <div className="flex items-center justify-center gap-2">
          <NavLink
            href={`/admin/products/${value as string}`}
            className="truncate"
          >
            Xem chi tiết
          </NavLink>
        </div>
      ),
      csvRender: () => "Xem chi tiết",
      align: "center",
    },
  ];

  return (
    <Card
      title="Sản phẩm theo danh mục"
      className="w-full"
      titleAction={<ProductSearchBar />}
    >
      {" "}
      <Table
        data={products}
        columns={columns}
        rowKey="_id"
        className="w-full font-semibold text-primary-500"
        exportFileName="san-pham-theo-danh-muc.csv"
      />
    </Card>
  );
}

function ProductSearchBar() {
  return (
    <div className="flex h-full items-center gap-4 py-2">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        className="w-full rounded-md border border-gray-300 px-4 py-2"
      />
      <Button className="truncate" size="small">
        Tìm kiếm
      </Button>
    </div>
  );
}
