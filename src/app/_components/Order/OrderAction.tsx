'use client';

import Card from '../UI/Card';
import Button from '../UI/Button';
import { Order } from '@/app/_types/order';
import { downloadFile } from '@/app/_libs/apiServices';
import { useState } from 'react';

interface OrderActionProps {
  order: Order;
  authToken: string;
}

export default function OrderAction({ order, authToken }: OrderActionProps) {
  const [exporting, setExporting] = useState(false);

  const handleExportExcel = async () => {
    setExporting(true);

    await downloadFile(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/orderCode/${order.orderCode}/export-excel`,
      { value: authToken }
    );

    setExporting(false);
  };

  const handlePrint = () => {
    const printWindow = window.open(
      `/admin/orders/${order.orderCode}/print`,
      '_blank'
    );
    printWindow?.addEventListener('load', () => {
      printWindow.print(); // Optional: auto-trigger print
    });
  };

  return (
    <Card title="Thao tác đơn hàng">
      <div className="flex flex-wrap gap-4 mt-6">
        <Button size="small" onClick={handlePrint}>
          In đơn hàng
        </Button>
        <Button size="small" onClick={handleExportExcel} loading={exporting}>
          Xuất đơn hàng (XLSX)
        </Button>
        <Button size="small">Gửi e-mail trạng thái đơn hàng</Button>
      </div>
    </Card>
  );
}
