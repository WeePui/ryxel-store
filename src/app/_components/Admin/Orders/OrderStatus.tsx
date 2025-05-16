// components/Admin/Orders/OrderStatus.tsx
'use client';

import { mappingOrderStatus } from '@/app/_utils/mappingOrderStatus';
import Card from '../../UI/Card';
import { useState, useTransition } from 'react';
import Button from '../../UI/Button';
import { updateOrderStatusAction } from '@/app/_libs/actions';
import { toast } from 'react-toastify';
import Input from '../../UI/Input';

interface OrderStatusProps {
  currentStatus: string;
  orderCode: string;
  orderId: string;
  currentAdminNotes?: string;
}

const statusOptions = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
];

export default function OrderStatus({
  currentStatus,
  orderCode,
  currentAdminNotes,
  orderId,
}: OrderStatusProps) {
  const [pending, startTransition] = useTransition();
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [adminNotes, setAdminNotes] = useState(currentAdminNotes || '');

  const handleChangeStatus = () => {
    startTransition(async () => {
      const result = await updateOrderStatusAction(
        orderId,
        newStatus,
        adminNotes,
        orderCode
      );

      if (result.success) {
        toast.success('Đơn hàng đã được cập nhật thành công');
        setNewStatus(newStatus);
      } else {
        toast.error('Cập nhật đơn hàng thất bại: ' + result.errors!.message);
      }
    });
  };

  return (
    <Card title="Trạng thái đơn hàng">
      <div className="flex items-center gap-2 mt-4">
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="border-2 border-grey-300 rounded-md px-3 py-2 font-bold text-center text-sm focus:outline-none focus:ring-primary-500 flex-[7]"
        >
          {statusOptions.map((status) => {
            const { text } = mappingOrderStatus(status);
            return (
              <option key={status} value={status}>
                {text}
              </option>
            );
          })}
        </select>
        <Button
          onClick={handleChangeStatus}
          className="flex-[3] whitespace-nowrap"
          size="small"
          disabled={currentStatus === 'refunded'}
          loading={pending}
        >
          Thay đổi
        </Button>
      </div>
      <Input
        className="mt-4"
        type="textarea"
        label="Ghi chú"
        name="adminNotes"
        id="adminNotes"
        value={adminNotes}
        onChange={(e) => setAdminNotes(e.target.value)}
      />
    </Card>
  );
}
