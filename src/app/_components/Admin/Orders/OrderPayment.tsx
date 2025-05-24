"use client";

import { JSX, useState, useTransition } from "react";
import Card from "../../UI/Card";
import { FaMoneyBill, FaCcStripe } from "react-icons/fa";
import { mappingPaymentMethod } from "@/app/_utils/mappingPaymentMethodText";
import { SiZalo } from "react-icons/si";
import formatMoney from "@/app/_utils/formatMoney";
import Button from "../../UI/Button";
import { refundOrderAction } from "@/app/_libs/actions";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import Modal from "../../UI/Modal";
import TextConfirmDialogue from "../../UI/TextConfirmDialogue";

const paymentIcon: { [key: string]: string | JSX.Element } = {
  cod: <FaMoneyBill />,
  stripe: <FaCcStripe />,
  zalopay: (
    <div className="rounded border bg-white px-1 shadow-sm">
      <SiZalo />
    </div>
  ),
};

interface OrderPaymentProps {
  paymentMethod: string;
  checkout?: { paymentId: string; checkoutId: string; amount: number };
  refundable?: boolean;
  orderId: string;
}

export default function OrderPayment({
  paymentMethod,
  checkout,
  refundable = false,
  orderId,
}: OrderPaymentProps) {
  const [pending, startTransition] = useTransition();
  const [confirm, setConfirm] = useState(false);
  const { orderCode } = useParams();
  const paymentMethodMap = mappingPaymentMethod(paymentMethod);

  const handleRefund = () => {
    startTransition(async () => {
      const result = await refundOrderAction(orderId, orderCode as string);

      if (result.success) {
        toast.success("Hoàn tiền thành công");
      } else {
        toast.error("Hoàn tiền thất bại: " + result.errors!.message);
      }
    });
  };

  return (
    <Card title="Thông tin thanh toán">
      <div className="mt-4 flex items-center gap-2 font-semibold">
        <div className="text-xl">{paymentIcon[paymentMethod]}</div>
        <span>{paymentMethodMap.text}</span>
      </div>
      {checkout && (
        <>
          <div className="mt-2 flex flex-col gap-2 text-sm text-gray-500">
            <span title={checkout.paymentId} className="break-words">
              Payment ID:{" "}
              <span className="font-mono">{checkout.paymentId}</span>
            </span>
            <span title={checkout.checkoutId} className="break-words">
              Checkout ID:{" "}
              <span className="font-mono">{checkout.checkoutId}</span>
            </span>
            <span>Số tiền: {formatMoney(checkout.amount)}</span>
          </div>
          {refundable && (
            <div className="flex items-center justify-end gap-2">
              <Button
                size="small"
                variant="danger"
                loading={pending}
                onClick={() => setConfirm(true)}
                disabled={pending}
              >
                Hoàn tiền
              </Button>
            </div>
          )}
        </>
      )}
      {confirm && (
        <Modal onClose={() => setConfirm(false)}>
          <TextConfirmDialogue
            onConfirm={handleRefund}
            confirmText={orderCode as string}
            message="Nhập mã đơn hàng để xác nhận hoàn tiền"
            errorText="Mã đơn hàng không chính xác"
            noticeText="Số tiền được hoàn lại là 100% giá trị đơn hàng"
          />
        </Modal>
      )}
    </Card>
  );
}
