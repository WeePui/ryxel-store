"use client";

import Card from "../UI/Card";
import Button from "../UI/Button";
import { Order } from "@/app/_types/order";
import { downloadFile } from "@/app/_libs/apiServices";
import { useState, useTransition } from "react";
import { sendOrderViaEmailAction } from "@/app/_libs/actions";
import { toast } from "react-toastify";

interface OrderActionProps {
  order: Order;
  authToken: string;
}

export default function OrderAction({ order, authToken }: OrderActionProps) {
  const [pending, startTransition] = useTransition();
  const [exporting, setExporting] = useState(false);

  const handleExportExcel = async () => {
    setExporting(true);

    await downloadFile(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/orderCode/${order.orderCode}/export-excel`,
      { value: authToken },
    );

    setExporting(false);
  };

  const handlePrint = () => {
    const printWindow = window.open(
      `/admin/orders/${order.orderCode}/print`,
      "_blank",
    );
    printWindow?.addEventListener("load", () => {
      printWindow.print(); // Optional: auto-trigger print
    });
  };

  const handleSendEmail = async () => {
    startTransition(async () => {
      const result = await sendOrderViaEmailAction(order._id);

      if (result.success) {
        toast.success("Email đã được gửi thành công!");
      } else {
        toast.error("Có lỗi xảy ra khi gửi email.");
      }
    });
  };

  return (
    <Card title="Thao tác đơn hàng">
      <div className="mt-6 flex flex-wrap gap-4">
        <Button size="small" onClick={handlePrint}>
          In đơn hàng
        </Button>
        <Button size="small" onClick={handleExportExcel} loading={exporting}>
          Xuất đơn hàng (XLSX)
        </Button>
        <Button size="small" onClick={handleSendEmail} loading={pending}>
          Gửi e-mail trạng thái đơn hàng
        </Button>
      </div>
    </Card>
  );
}
