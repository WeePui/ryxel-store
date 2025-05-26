"use client";

import { useState } from "react";
import Card from "../../UI/Card";
import { Table, TableColumn } from "../../UI/Table";
import Image from "next/image";
import TabSelector from "../../UI/TabSelector";
import { mappingStock } from "@/app/_utils/mappingStock";
import { getTintedColor } from "@/app/_helpers/getTintedColor";

interface Product {
  _id: number;
  name: string;
  variant: {
    _id: number;
    name: string;
    sku: string;
    sold: number;
    stock: number;
    images: string[];
  };
}

const data = [
  {
    _id: 1,
    name: "Anya so cute 1",
    variant: {
      _id: 1,
      name: "Variant 1",
      sku: "SKU123",
      sold: 10,
      stock: 5,
      images: ["/anya-so-cute.jpg"],
    },
  },
  {
    _id: 2,
    name: "Anya so cute 2",
    variant: {
      _id: 2,
      name: "Variant 2",
      sku: "SKU456",
      sold: 20,
      stock: 0,
      images: ["/anya-so-cute.jpg"],
    },
  },
  {
    _id: 3,
    name: "Anya so cute 3",
    variant: {
      _id: 3,
      name: "Variant 3",
      sku: "SKU789",
      sold: 30,
      stock: 15,
      images: ["/anya-so-cute.jpg"],
    },
  },
  {
    _id: 4,
    name: "Anya so cute 4",
    variant: {
      _id: 4,
      name: "Variant 4",
      sku: "SKU101",
      sold: 40,
      stock: 20,
      images: ["/anya-so-cute.jpg"],
    },
  },
  {
    _id: 5,
    name: "Anya so cute 5",
    variant: {
      _id: 5,
      name: "Variant 5",
      sku: "SKU112",
      sold: 50,
      stock: 260,
      images: ["/anya-so-cute.jpg"],
    },
  },
];

export default function TopSellingProducts() {
  const [range, setRange] = useState("day");

  const columns: TableColumn<Product>[] = [
    {
      title: "STT",
      dataIndex: "_id", // Adding required dataIndex
      key: "index",
      render: (_, __, index) => <span className="font-bold">{index + 1}</span>,
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <div className="relative aspect-square w-12 md:aspect-video md:w-full">
            <Image
              src={record.variant.images[0]}
              alt={record.name}
              fill
              className="rounded object-cover"
            />
          </div>
          <div>
            <span className="font-bold text-primary-500">
              {record.name} - {record.variant.name}
            </span>
            <p className="text-sm text-grey-500">{record.variant.sku}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Lượt bán",
      dataIndex: "variant", // Changed from array to string
      key: "sold",
      render: (_, record) => (
        <span className="font-bold">{record.variant.sold}</span>
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "variant", // Changed from array to string
      key: "stock",
      render: (_, record) => (
        <div className="flex w-full items-center justify-center">
          <div
            className="flex w-fit items-center justify-center gap-2 rounded-full px-2 py-1 text-white"
            style={{
              color: mappingStock(record.variant.stock).color,
              backgroundColor: getTintedColor(
                mappingStock(record.variant.stock).color,
              ),
            }}
          >
            <span className="whitespace-nowrap text-xs font-bold">
              {mappingStock(record.variant.stock).text}
            </span>
          </div>
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <Card
      title="Sản phẩm bán chạy"
      className="flex flex-grow flex-col gap-6 pb-10"
      titleAction={
        <TabSelector
          tabLabels={["Theo ngày", "Theo tuần", "Theo tháng"]}
          tabValues={["day", "week", "month"]}
          selectedTab={range}
          onTabSelect={setRange}
        />
      }
    >
      <Table data={data} columns={columns} rowKey="_id" className="w-full" />
    </Card>
  );
}
