"use client";

import { JSX, useState } from "react";
import Card from "../../UI/Card";
import { FaSignOutAlt, FaTruckLoading } from "react-icons/fa";
import { getTintedColor } from "@/app/_helpers/getTintedColor";
import { FaCubes } from "react-icons/fa6";
import { Product } from "@/app/_types/product";
import Modal from "../../UI/Modal";
import { Table, TableColumn } from "../../UI/Table";
import Image from "next/image";

interface ProductsOverviewProps {
  totalStock: number;
  totalOutStock: number;
  totalInStock: number;
  predictions: Array<{
    product: Product;
    predictedDaysToOutOfStock: number;
  }>;
}

export default function ProductsOverview({
  totalStock,
  totalOutStock,
  totalInStock,
  predictions,
}: ProductsOverviewProps) {
  const [openModal, setOpenModal] = useState(false);
  // Define columns for the predictions table
  const columns: TableColumn<{
    product: Product;
    predictedDaysToOutOfStock: number;
  }>[] = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="relative aspect-square h-12 w-12">
            <Image
              src={record.product.imageCover}
              alt={record.product.name}
              fill
              className="rounded object-cover"
            />
          </div>
          <div className="line-clamp-2">{record.product.name}</div>
        </div>
      ),
      csvRender: (_, record) => record.product.name,
    },
    {
      title: "Tồn kho",
      dataIndex: "product",
      key: "stock",
      render: (_, record) => record.product.totalStock,
      csvRender: (_, record) => record.product.totalStock.toString(),
    },
    {
      title: "Thời gian còn lại (ngày)",
      dataIndex: "predictedDaysToOutOfStock",
      key: "days",
      render: (value) => (
        <span className={(value as number) < 7 ? "font-bold text-red-500" : ""}>
          {value as number}
        </span>
      ),
      csvRender: (value) => (value as number).toString(),
    },
  ];

  return (
    <Card className="w-full">
      <ul className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] gap-4">
        <ProductsStat
          textColor="#FFA500"
          label="Tổng sản phẩm"
          bgColor={getTintedColor("#FFA500")}
          icon={<FaCubes />}
          value={totalStock}
        />
        <ProductsStat
          textColor="#FC2E20"
          label="Hết hàng"
          bgColor={getTintedColor("#FC2E20")}
          icon={<FaSignOutAlt />}
          value={totalOutStock}
        />
        <ProductsStat
          textColor="#25C0C0"
          label="Số lượng nhập (tuần)"
          bgColor={getTintedColor("#25C0C0")}
          icon={<FaTruckLoading />}
          value={totalInStock}
        />
        <ProductsStat
          textColor="#25C0C0"
          label="Sản phẩm sắp hết hàng"
          bgColor={getTintedColor("#25C0C0")}
          icon={<FaTruckLoading />}
          value={
            <div
              role="button"
              onClick={() => setOpenModal(true)}
              className="cursor-pointer text-sm text-primary-500 hover:text-primary-600 hover:underline"
            >
              Xem chi tiết
            </div>
          }
        />
      </ul>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <div className="flex w-full flex-col gap-4 p-4">
            <h2 className="text-xl font-bold">Sản phẩm sắp hết hàng</h2>
            <Table
              data={predictions}
              columns={columns}
              rowKey={(record) => record.product._id}
              className="w-full font-semibold text-primary-500"
              exportFileName="san-pham-sap-het-hang.csv"
            />
          </div>
        </Modal>
      )}
    </Card>
  );
}

interface ProductsStatProps {
  textColor: string;
  label: string;
  bgColor: string;
  icon: JSX.Element;
  changeRate?: number;
  value: number | JSX.Element;
}

function ProductsStat({
  textColor,
  label,
  bgColor,
  icon,
  value,
  changeRate,
}: ProductsStatProps) {
  const isPositive = changeRate ? changeRate > 0 : false;
  const changeRateClass = isPositive ? "text-green-500" : "text-red-500";
  const changeRateIcon = isPositive ? "↑" : "↓";
  const formattedChangeRate = changeRate
    ? `${(changeRate * 100).toFixed(2)}`
    : "";

  return (
    <div className="flex items-center gap-4">
      <div
        className="flex h-12 w-12 items-center justify-center rounded text-lg"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-grey-200">{label}</span>
        <div className="text-3xl font-bold">{value}</div>
        {changeRate && (
          <div
            className={`text-[10px] font-semibold ${changeRateClass} ${
              isPositive ? "bg-green-100" : "bg-red-100"
            } flex w-fit items-center gap-1 rounded-full px-2 py-1`}
          >
            <span>
              {isPositive ? "+" : "-"}
              {formattedChangeRate}% {changeRateIcon}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
