'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Button from '../UI/Button';
import PaymentMethods from '../UI/PaymentMethods';
import Spinner from '../UI/Spinner';
import { verifyDiscountCodeAction } from '@/app/_libs/actions';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import formatCurrency from '@/app/_utils/formatCurrency';
import CheckoutButton from './CheckoutButton';
import { Address } from '@/app/_types/address';
import { getShippingFee } from '@/app/_libs/apiServices';

interface CheckoutItem {
  product: string;
  variant: string;
  quantity: number;
}

interface CheckoutSummaryProps {
  code: string;
  subtotal: number;
  address: Address | null;
  paymentMethod: string | null;
  lineItems: CheckoutItem[];
  onCodeChange?: (code: string) => void;
}

function CheckoutSummary({
  code,
  subtotal,
  address,
  paymentMethod,
  lineItems,
  onCodeChange,
}: CheckoutSummaryProps) {
  const [discountState, action, isPending] = useActionState(
    verifyDiscountCodeAction,
    { success: false, discountAmount: 0, code: code && '', errors: {} }
  );
  const [isApplyVoucher, setIsApplyVoucher] = useState(false);
  const [loadingShippingFee, startTransition] = useTransition();
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState<string>('');

  useEffect(() => {
    if (address) {
      startTransition(async () => {
        const { data } = await getShippingFee(address, lineItems);
        const { shippingFee: fee, expectedDeliveryDate: deliveryDate } = data;

        startTransition(() => {
          setShippingFee(fee);
          setExpectedDeliveryDate(deliveryDate);
        });
      });
    }
  }, [address, lineItems]);

  return (
    <div className="sticky top-20 flex flex-col divide-y-2 divide-gray-300 rounded-xl bg-grey-50 px-4 font-semibold">
      <div className="flex items-center justify-between py-4 xl:flex-col gap-2">
        <h2 className="text-2xl font-bold">Tóm tắt đơn hàng</h2>
        <p className="text-xs text-grey-400">
          *Lưu ý: bạn chỉ có thể huỷ đơn trong vòng 30 phút kể từ khi đặt hàng
          và trước khi đơn hàng được xác nhận.
        </p>
      </div>
      <div className="flex flex-col transition-all duration-300">
        <h3
          onClick={() => setIsApplyVoucher((prev) => !prev)}
          className="flex cursor-pointer justify-between py-4 font-semibold"
        >
          Áp dụng voucher
          <span className="text-xl">
            {isApplyVoucher ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </h3>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isApplyVoucher ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {isApplyVoucher &&
            (discountState?.success ? (
              discountState?.success && (
                <div className="flex items-center gap-2 pb-4">
                  <FaCheck className="text-xl text-green-500" />
                  {discountState?.code?.toString().toUpperCase()} đã được sử
                  dụng thành công
                </div>
              )
            ) : (
              <form className="flex w-full flex-col gap-2 py-4" action={action}>
                {discountState?.errors?.message && (
                  <p className="flex items-center gap-2 text-red-500">
                    <FaXmark /> {discountState.errors.message}
                  </p>
                )}
                <div className="flex w-full gap-2">
                  <input
                    name="code"
                    placeholder="Voucher code"
                    className="w-full rounded-lg border-2 border-grey-300 bg-transparent p-4 text-lg font-semibold transition-all duration-300 focus:border-primary-default"
                    defaultValue={discountState?.code || ''}
                    onChange={(e) => onCodeChange?.(e.target.value)}
                  />
                  <input
                    name="lineItems"
                    type="hidden"
                    value={JSON.stringify(lineItems)}
                  />
                  <Button role="submit" disabled={isPending}>
                    {isPending ? (
                      <Spinner />
                    ) : (
                      <span className="text-base">Dùng</span>
                    )}
                  </Button>
                </div>
              </form>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 py-4">
        <div className="flex justify-between">
          <h3>Tổng cộng</h3>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div>
          <div className="flex justify-between">
            <h3>Phí vận chuyển</h3>
            <span>{formatCurrency(shippingFee)}</span>
          </div>
          <p className="text-xs text-gray-500 text-right">
            *Dự kiến giao hàng:{' '}
            {new Date(expectedDeliveryDate).toLocaleDateString('vi-VN')}
          </p>
        </div>
        {discountState?.success && (
          <div className="flex justify-between">
            <h3>Giảm giá</h3>
            <span>- {formatCurrency(discountState?.discountAmount || 0)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between py-6 text-xl">
        <h3>Tổng thanh toán</h3>
        <span>
          {formatCurrency(
            subtotal - (discountState?.discountAmount || 0) + (shippingFee || 0)
          )}
        </span>
      </div>

      <div className="flex w-full flex-col">
        <CheckoutButton
          lineItems={lineItems}
          address={address?._id || ''}
          paymentMethod={paymentMethod || ''}
          code={discountState?.code || ''}
          loading={loadingShippingFee}
        />
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

export default CheckoutSummary;
