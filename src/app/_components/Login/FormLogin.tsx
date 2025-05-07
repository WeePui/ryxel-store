'use client';

import Button from '@/app/_components/UI/Button';
import Input from '@/app/_components/UI/Input';
import { useActionState } from 'react';
import { loginAction } from '@libs/actions';
import { FaCircleExclamation } from 'react-icons/fa6';
import Spinner from '../UI/Spinner';
import errorMessages from '@/app/_utils/mappingErrorMessages';

function FormLogin() {
  const [state, action, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="mx-auto mt-14 lg:mt-4  flex w-full max-w-7xl flex-col items-center gap-10">
      <div className="w-full max-w-lg gap-2 rounded-lg bg-white px-16 lg:px-8 py-8 shadow-sm">
        <h3 className="mb-8 text-center text-lg font-extrabold text-primary-500">
          Đăng nhập bằng mật khẩu
        </h3>
        <form
          className="flex w-full flex-col items-center gap-6"
          action={action}
        >
          <div className="w-full">
            {state?.errors?.email && (
              <p className="flex items-center gap-2 p-2 text-xs text-red-500">
                <FaCircleExclamation />
                {errorMessages[state?.errors?.email] || state?.errors?.email}
              </p>
            )}
            <Input
              id="email"
              type="email"
              name="email"
              label="Địa chỉ email"
              error={!!state?.errors?.email}
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
              id="password"
              type="password"
              name="password"
              label="Mật khẩu"
              error={!!state?.errors?.password}
            />
          </div>
          <Button type="primary" disabled={isPending} role="submit">
            {isPending ? <Spinner /> : 'Đăng nhập'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
