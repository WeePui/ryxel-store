'use client';

import { useActionState } from 'react';
import { createCheckoutSessionAction } from '@libs/actions';
import Button from '@components/UI/Button';
import Spinner from '../UI/Spinner';

function CheckoutButton() {
  const [, action, isPending] = useActionState(
    createCheckoutSessionAction,
    undefined
  );

  return (
    <form action={action} className="flex w-full flex-col">
      <Button role="submit" disabled={isPending}>
        {isPending ? <Spinner /> : 'Tiến hành thanh toán'}
      </Button>
    </form>
  );
}

export default CheckoutButton;
