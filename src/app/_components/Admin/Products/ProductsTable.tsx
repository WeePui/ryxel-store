"use client";

import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import SearchBar from "../../Header/SearchBar";
import { Table, TableColumn } from "../../UI/Table";
import Image from "next/image";
import { getTintedColor } from "@/app/_helpers/getTintedColor";
import { mappingStock } from "@/app/_utils/mappingStock";
import NavLink from "../../UI/NavLink";
import { Product } from "@/app/_types/product";
import formatMoney from "@/app/_utils/formatMoney";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProductsTableProps {
  products: Product[];
  totalProducts: number;
  resultsPerPage: number;
}

export default function ProductsTable({
  products,
  totalProducts,
  resultsPerPage,
}: ProductsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = Number(params.get("page")) || 1;

    setCurrentPage(page);
  }, [searchParams, products]);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page + "");

    router.replace(`${pathname}?${params.toString()}`);
    setCurrentPage(page);
  };

  // Define columns for the enhanced Table component
  const columns: TableColumn<Product>[] = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <div className="relative aspect-square w-16 flex-shrink-0">
            <Image
              src={record.imageCover}
              alt={record.name}
              fill
              className="rounded object-cover"
            />
          </div>
          <p className="line-clamp-3 text-primary-500">{record.name}</p>
        </div>
      ),
    },
    {
      title: "Giá tiền",
      dataIndex: "lowestPrice",
      key: "price",
      render: (value) => formatMoney(value as number),
    },
    {
      title: "Cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => new Date(value as string).toLocaleDateString("vi-VN"),
    },
    {
      title: "Tồn kho",
      dataIndex: "totalStock",
      key: "stock",
      render: (value) => (
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
      ),
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
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
      align: "center",
    },
  ];

  return (
    <Card
      title="Sản phẩm theo danh mục"
      className="w-full"
      titleAction={
        <div className="justify-self-end">
          <SearchBar />
        </div>
      }
    >
      {products && products.length > 0 ? (
        <div className="flex flex-col">
          <Table
            data={products}
            columns={columns}
            rowKey="_id"
            pagination={{
              total: totalProducts,
              current: currentPage,
              pageSize: resultsPerPage,
              onChange: handleChangePage,
            }}
            className="w-full font-semibold text-primary-500"
          />
        </div>
      ) : (
        <div className="col-span-full py-4 text-center text-gray-500">
          Không có sản phẩm nào
        </div>
      )}
    </Card>
  );
}
