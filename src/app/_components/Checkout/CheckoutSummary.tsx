'use client';

import { useActionState, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Button from '../UI/Button';
import PaymentMethods from '../UI/PaymentMethods';
import Spinner from '../UI/Spinner';
import { verifyDiscountCodeAction } from '@/app/_libs/actions';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import formatCurrency from '@/app/_utils/formatCurrency';
import CheckoutButton from './CheckoutButton';

interface CheckoutSummaryProps {
  code: string;
  subtotal: number;
}

const initialState = {
  success: false,
  discountAmount: 0,
  code: '',
  errors: {},
};

function CheckoutSummary({ code, subtotal }: CheckoutSummaryProps) {
  console.log('code', code);

  const [state, action, isPending] = useActionState(
    verifyDiscountCodeAction,
    initialState
  );
  const [isApplyVoucher, setIsApplyVoucher] = useState(false);

  return (
    <div className="sticky top-20 flex flex-col divide-y-2 divide-gray-300 rounded-xl bg-grey-50 px-4 font-semibold">
      <h2 className="py-4 text-2xl font-bold">Tóm tắt đơn hàng</h2>
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
            (state?.success ? (
              state?.success && (
                <div className="flex items-center gap-2 pb-4">
                  <FaCheck className="text-xl text-green-500" />
                  {state?.code?.toString().toUpperCase()} đã được sử dụng thành
                  công
                </div>
              )
            ) : (
              <form className="flex w-full flex-col gap-2 py-4" action={action}>
                {state?.errors?.message && (
                  <p className="flex items-center gap-2 text-red-500">
                    <FaXmark /> {state.errors.message}
                  </p>
                )}
                <div className="flex w-full gap-2">
                  <input
                    name="code"
                    placeholder="Voucher code"
                    className="w-full rounded-lg border-2 border-grey-300 bg-transparent p-4 text-lg font-semibold transition-all duration-300 focus:border-primary-default"
                    defaultValue={state?.code || ''}
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
      <div className="flex flex-col">
        <div className="flex justify-between py-4">
          <h3>Tổng cộng</h3>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {state?.success && (
          <div className="flex justify-between py-4">
            <h3>Giảm giá</h3>
            <span>- {formatCurrency(state?.discountAmount || 0)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between py-6 text-xl">
        <h3>Tổng thanh toán</h3>
        <span>{formatCurrency(subtotal - (state?.discountAmount || 0))}</span>
      </div>

      <div className="flex w-full flex-col">
        <CheckoutButton />
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
