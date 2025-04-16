'use client';

import { useActionState } from 'react';
import Spinner from '@/app/_components/UI/Spinner';
import { resetPasswordAction } from '@libs/actions';
import { FaCircleExclamation, FaRegCircleXmark } from 'react-icons/fa6';
import Input from '../UI/Input';
import Button from '../UI/Button';

interface FormResetPasswordProps {
  resetToken: string;
}

function FormResetPassword({ resetToken }: FormResetPasswordProps) {
  const [state, action, isPending] = useActionState(resetPasswordAction, {
    success: undefined,
    errors: {},
  });

  if (isPending) return <Spinner />;

  if (state?.success === false) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white px-16 lg:px-8 py-12 text-grey-400 shadow-sm">
        <FaRegCircleXmark className="text-5xl text-red-500" />
        <p>Token lấy lại mật khẩu của bạn không hợp lệ hoặc đã hết hạn.</p>
        <p className="mb-4">
          Bạn có thể thử lại bằng cách bấm vào nút Quên mật khẩu bên dưới.
        </p>
        <Button href="/forgot-password">Quên mật khẩu</Button>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-grey-300">
        Xin hãy điền vào mật khẩu mới cho tài khoản của bạn.
      </p>
      <form
        action={action}
        className="flex w-full max-w-xl flex-col items-center gap-8 rounded-lg bg-white  px-16 lg:px-8 py-12 shadow-sm"
      >
        <div className="w-full">
          {state?.errors?.password && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state?.errors?.password}
            </p>
          )}
          <Input
            id="password"
            type="password"
            name="password"
            label="Mật khẩu"
            error={!!state?.errors?.password}
          />
        </div>

        <Input
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          label="Xác nhận mật khẩu"
          error={!!state?.errors?.password}
        />
        <input type="hidden" name="resetToken" value={resetToken} />
        <Button type="primary" role="submit" disabled={isPending}>
          Cập nhật mật khẩu
        </Button>
      </form>
    </>
  );
}

export default FormResetPassword;
