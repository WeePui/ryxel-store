'use client';

import { useRouter } from 'next/navigation';
import Button from '../UI/Button';
import PaymentMethods from '../UI/PaymentMethods';
import formatCurrency from '@/app/_utils/formatCurrency';
import { useTransition } from 'react';
import { storeSelectedCartItemsAction } from '@/app/_libs/actions';
import { toast } from 'react-toastify';

interface OrderSummaryProps {
  subtotal: number;
  selectedItems: {
    product: string;
    variant: string;
  }[];
}

function OrderSummary({ subtotal, selectedItems }: OrderSummaryProps) {
  const [, startTransition] = useTransition();
  const router = useRouter();

  function handleCheckout() {
    if (selectedItems.length === 0) {
      toast.error('Bạn chưa chọn sản phẩm nào để thanh toán!');
      return;
    }

    startTransition(async () => {
      const result = await storeSelectedCartItemsAction(selectedItems);

      if (result.errors) {
        console.error('Error storing selected items:', result.errors.message);
        return;
      }

      router.push('/checkout?fromCart=1');
    });
  }

  return (
    <div className="sticky top-20 flex flex-col divide-y-2 divide-gray-300 rounded-xl bg-grey-50 px-4 font-semibold">
      <h2 className="py-4 text-2xl font-bold">Tóm tắt đơn hàng</h2>

      <div className="py-6">
        <div className="flex justify-between text-xl">
          <h3>Tổng thanh toán</h3>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <p className="text-xs text-grey-400 mt-1 text-right">
          (Sản phẩm đã chọn: x{selectedItems.length})
        </p>
      </div>

      <div className="flex w-full flex-col">
        <Button onClick={handleCheckout} size="large">
          Tiến hành đặt hàng
        </Button>
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
