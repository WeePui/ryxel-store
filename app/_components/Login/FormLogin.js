'use client';

import Button from '@/app/_components/UI/Button';
import Input from '@/app/_components/UI/Input';
import { useActionState } from 'react';
import { loginAction } from '@libs/actions';
import { FaCircleExclamation } from 'react-icons/fa6';
import Spinner from '../UI/Spinner';

function FormLogin() {
  const [state, action, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="w-full max-w-lg gap-2 rounded-lg bg-white px-16 py-8 shadow-sm">
      <h3 className="mb-8 text-center text-lg font-extrabold text-primary-500">
        Sign in with password
      </h3>
      <form className="flex w-full flex-col items-center gap-6" action={action}>
        <div className="w-full">
          {state?.errors?.email && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state?.errors?.email}
            </p>
          )}
          <Input
            id="email"
            type="email"
            name="email"
            label="E-mail address"
            error={state?.errors?.email}
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
            label="Password"
            error={state?.errors?.password}
          />
        </div>
        <Button type="primary" disable={isPending} role="submit">
          {isPending ? <Spinner /> : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}

export default FormLogin;
