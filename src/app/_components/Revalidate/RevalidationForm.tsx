'use client';

import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { reauthenticateAction } from '@libs/actions';
import Input from '@components/UI/Input';
import Button from '@components/UI/Button';
import { FaCircleExclamation } from 'react-icons/fa6';
import Spinner from '../UI/Spinner';

function RevalidationForm() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';
  const [state, action, isPending] = useActionState(
    reauthenticateAction.bind(null, redirectUrl),
    undefined
  );

  return (
    <form className="flex w-full flex-col items-center gap-6" action={action}>
      <div className="w-full">
        {state?.errors?.password && (
          <p className="flex items-center gap-2 p-2 text-xs text-red-500">
            <FaCircleExclamation />
            {state?.errors?.password}
          </p>
        )}
        <Input
          name="password"
          id="password"
          label="Mật khẩu"
          type="password"
          error={!!state?.errors?.password}
        />
      </div>
      <Button role="submit" disabled={isPending}>
        {isPending ? <Spinner /> : 'Xác nhận'}
      </Button>
    </form>
  );
}

export default RevalidationForm;
