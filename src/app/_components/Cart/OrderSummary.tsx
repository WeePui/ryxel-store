'use client';

import Button from '../UI/Button';
import PaymentMethods from '../UI/PaymentMethods';
import formatCurrency from '@/app/_utils/formatCurrency';

interface OrderSummaryProps {
  subtotal: number;
}

function OrderSummary({ subtotal }: OrderSummaryProps) {
  return (
    <div className="sticky top-20 flex flex-col divide-y-2 divide-gray-300 rounded-xl bg-grey-50 px-4 font-semibold">
      <h2 className="py-4 text-2xl font-bold">Tóm tắt đơn hàng</h2>

      <div className="flex justify-between py-6 text-xl">
        <h3>Tổng thanh toán</h3>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <div className="flex w-full flex-col">
        <Button href={`/checkout`}>Tiến hành đặt hàng</Button>
        <div className="my-5 flex flex-col items-center text-xs">
          <p>Phương thức thanh toán</p>
          <div className="mt-2 grid w-36 grid-cols-3 justify-center gap-2 text-5xl">
            <PaymentMethods />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
