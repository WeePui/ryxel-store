'use client';

import Button from '@components/Button';
import Input from '@components/Input';
import { useActionState } from 'react';
import { loginAction } from '@libs/actions';

function FormLogin() {
  const [state, action, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="w-full max-w-lg gap-2 rounded-lg bg-white px-16 py-8 shadow-sm">
      <h3 className="mb-8 text-center text-lg font-extrabold text-primary-500">
        Sign in with password
      </h3>
      <form className="flex w-full flex-col items-center gap-6" action={action}>
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state?.errors?.email}</p>
        )}
        {state?.errors?.message && (
          <p className="text-sm text-red-500">{state?.errors?.message}</p>
        )}
        <Input name="email" id="name" label="E-mail address" type="email" />
        {state?.errors?.password && (
          <p className="self-start text-sm text-red-500">
            {state?.errors?.password}
          </p>
        )}
        <Input id="password" type="password" name="password" label="Password" />
        <Button type="primary" disable={isPending} role="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default FormLogin;
