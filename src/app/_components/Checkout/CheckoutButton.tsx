'use client';

import { useActionState, useEffect } from 'react';
import { createCheckoutSessionAction } from '@libs/actions';
import Button from '@components/UI/Button';
import Spinner from '../UI/Spinner';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

interface LineItem {
  product: string;
  variant: string;
  quantity: number;
}

interface CheckoutButtonProps {
  code?: string;
  address: string | null;
  paymentMethod: string | null;
  lineItems: LineItem[];
  loading?: boolean;
}

function CheckoutButton({
  code,
  address,
  paymentMethod,
  lineItems,
  loading,
}: CheckoutButtonProps) {
  const [state, action, isPending] = useActionState(
    createCheckoutSessionAction,
    undefined
  );
  const searchParams = useSearchParams();
  const processPayment = searchParams.get('processPayment');
  const orderCode = searchParams.get('orderCode');

  useEffect(() => {
    if (state?.errors) {
      toast.error(state.errors.message);
    }
  }, [state?.errors]);

  return (
    <form action={action} className="flex w-full flex-col">
      <input type="hidden" name="code" value={code || ''} />
      <input type="hidden" name="address" value={address || ''} />
      <input type="hidden" name="paymentMethod" value={paymentMethod || ''} />
      <input type="hidden" name="lineItems" value={JSON.stringify(lineItems)} />
      <input
        type="hidden"
        name="processPayment"
        value={processPayment || '0'}
      />
      <input type="hidden" name="orderCode" value={orderCode || ''} />
      {/* Added processPayment */}
      <Button role="submit" disabled={isPending}>
        {isPending || loading ? <Spinner /> : 'Tiến hành thanh toán'}
      </Button>
    </form>
  );
}

export default CheckoutButton;
