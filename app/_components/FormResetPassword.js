'use client';

import { useActionState } from 'react';
import Spinner from '@components/Spinner';
import { resetPasswordAction } from '@libs/actions';
import { FaCircleExclamation, FaRegCircleXmark } from 'react-icons/fa6';
import Input from './Input';
import Button from './Button';
import NavLink from './NavLink';

function FormResetPassword({ resetToken }) {
  const [state, action, isPending] = useActionState(resetPasswordAction, {
    fail: false,
  });

  if (isPending) return <Spinner />;

  if (state?.fail)
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white px-16 py-12 text-grey-400 shadow-sm">
        <FaRegCircleXmark className="text-5xl text-red-500" />
        <p>Your reset password token is invalid or expired</p>
        <p className="mb-4">
          You can try to reset password again by click Forgot password button
          below.
        </p>
        <Button href="/forgotPassword">Forgot password</Button>
      </div>
    );

  return (
    <>
      <p className="text-sm text-grey-300">
        Please enter new password and confirm it.
      </p>
      <form
        action={action}
        className="flex w-full max-w-xl flex-col items-center gap-8 rounded-lg bg-white px-16 py-12 shadow-sm"
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
            label="Password"
            error={state?.errors?.password}
          />
        </div>

        <Input
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          label="Confirm password"
          error={state?.errors?.password}
        />
        <input type="hidden" name="resetToken" value={resetToken} />
        <Button type="primary" role="submit" disabled={isPending}>
          Reset Password
        </Button>
      </form>
    </>
  );
}

export default FormResetPassword;
