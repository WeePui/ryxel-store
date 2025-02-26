'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Spinner from '@/app/_components/UI/Spinner';
import Button from '@/app/_components/UI/Button';
import Input from '@/app/_components/UI/Input';
import { updatePasswordAction } from '@libs/actions';
import { FaCircleExclamation } from 'react-icons/fa6';

interface UpdatePasswordState {
  success: boolean;
  errors: {
    passwordCurrent?: string;
    password?: string;
    passwordConfirm?: string;
  };
}

function FormUpdatePassword() {
  const [state, action, isPending] = useActionState(updatePasswordAction, {
    success: false,
    errors: null,
  });

  useEffect(() => {
    if (state.success) {
      toast.success('Password updated successfully');
      return;
    }
    if (state.errors) {
      toast.error(state.errors.message);
      return;
    }
  }, [state.success, state.errors]);

  if (isPending) return <Spinner />;

  return (
    <form
      className="flex w-full max-w-lg flex-col items-center gap-4 py-4"
      action={action}
    >
      <div className="w-full">
        {state?.errors?.passwordConfirm && (
          <p className="flex items-center gap-2 p-2 text-xs text-red-500">
            <FaCircleExclamation />
            {state?.errors?.passwordCurrent}
          </p>
        )}
        <Input
          name="passwordCurrent"
          id="passwordCurrent"
          type="password"
          label="Mật khẩu hiện tại"
          error={state?.errors?.passwordCurrent}
        />
      </div>

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
          type="password"
          label="Mật khẩu mới"
          error={state?.errors?.password}
        />
      </div>

      <div className="w-full">
        {state?.errors?.passwordConfirm && (
          <p className="flex items-center gap-2 p-2 text-xs text-red-500">
            <FaCircleExclamation />
            {state?.errors?.passwordConfirm}
          </p>
        )}
        <Input
          name="passwordConfirm"
          id="passwordConfirm"
          type="password"
          label="Xác nhận mật khẩu"
        />
        <div className="mt-6 flex justify-center">
          <Button role="submit">Đổi mật khẩu</Button>
        </div>
      </div>
    </form>
  );
}

export default FormUpdatePassword;
